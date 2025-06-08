import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RotateCw, Square, Circle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageDataUrl: string) => void;
  onBack: () => void;
}

export const ImageCropper = ({ imageSrc, onCropComplete, onBack }: ImageCropperProps) => {
  const { toast } = useToast();
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotation, setRotation] = useState(0);
  const [cropShape, setCropShape] = useState<'square' | 'circle'>('circle');

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    
    // Set initial crop to center square/circle
    const size = Math.min(width, height) * 0.8;
    const x = (width - size) / 2;
    const y = (height - size) / 2;
    
    setCrop({
      unit: 'px',
      x,
      y,
      width: size,
      height: size,
    });
  }, []);

  const getCroppedImg = useCallback(async (
    image: HTMLImageElement,
    crop: PixelCrop,
    rotation = 0
  ): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;
    
    // Calculate the scaled crop dimensions
    const scaleX = imageWidth / image.width;
    const scaleY = imageHeight / image.height;
    
    const scaledCrop = {
      x: crop.x * scaleX,
      y: crop.y * scaleY,
      width: crop.width * scaleX,
      height: crop.height * scaleY,
    };

    // Set canvas size
    const size = Math.max(scaledCrop.width, scaledCrop.height);
    canvas.width = size;
    canvas.height = size;

    // Draw the image
    ctx.save();
    
    // Move to center for rotation
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-size / 2, -size / 2);
    
    // Draw the cropped portion
    ctx.drawImage(
      image,
      scaledCrop.x,
      scaledCrop.y,
      scaledCrop.width,
      scaledCrop.height,
      (size - scaledCrop.width) / 2,
      (size - scaledCrop.height) / 2,
      scaledCrop.width,
      scaledCrop.height
    );
    
    ctx.restore();

    // If circle crop, mask it
    if (cropShape === 'circle') {
      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (distance > radius) {
            const index = (y * size + x) * 4;
            data[index + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    }

    return canvas.toDataURL('image/png', 1.0);
  }, [cropShape]);

  const handleCropComplete = useCallback(async () => {
    if (!completedCrop || !imgRef.current) {
      toast({
        title: "Error",
        description: "Please select an area to crop",
        variant: "destructive",
      });
      return;
    }

    try {
      const croppedImageUrl = await getCroppedImg(
        imgRef.current,
        completedCrop,
        rotation
      );
      onCropComplete(croppedImageUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to crop image",
        variant: "destructive",
      });
    }
  }, [completedCrop, rotation, getCroppedImg, onCropComplete, toast]);

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant={cropShape === 'square' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCropShape('square')}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={cropShape === 'circle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCropShape('circle')}
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop={cropShape === 'circle'}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  maxWidth: '100%',
                  maxHeight: '60vh',
                }}
                className="block"
              />
            </ReactCrop>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onBack}>
          Back to Upload
        </Button>
        <Button onClick={handleCropComplete}>
          Continue to Filters
        </Button>
      </div>
    </div>
  );
};