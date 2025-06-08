import { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image, Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string) => void;
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const { toast } = useToast();
  const [isDragActive, setIsDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, JPEG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onImageUpload(dataUrl);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload, toast]);

  const { getRootProps, getInputProps, isDragActive: dropzoneIsDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDrop([file]);
    }
  };

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onImageUpload(imageSrc);
      setShowCamera(false);
    }
  }, [onImageUpload]);

  const openCamera = () => {
    setShowCamera(true);
  };

  if (showCamera) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Take a photo</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCamera(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                width="100%"
                height="auto"
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
                videoConstraints={{
                  width: 640,
                  height: 640,
                  facingMode: "user"
                }}
              />
            </div>
            
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowCamera(false)}
              >
                Cancel
              </Button>
              <Button onClick={capturePhoto}>
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-2 border-dashed transition-colors">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`text-center cursor-pointer transition-all duration-200 ${
              isDragActive || dropzoneIsDragActive
                ? "scale-105 opacity-80"
                : "hover:scale-102"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-6 rounded-full transition-colors ${
                isDragActive || dropzoneIsDragActive 
                  ? "bg-primary/20 text-primary" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {isDragActive || dropzoneIsDragActive ? (
                  <Upload className="h-12 w-12" />
                ) : (
                  <Image className="h-12 w-12" />
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {isDragActive || dropzoneIsDragActive
                    ? "Drop your image here"
                    : "Upload your profile picture"
                  }
                </h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PNG, JPG, JPEG, GIF, BMP, WebP (max 10MB)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-border"></div>
        <span className="text-sm text-muted-foreground">or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          className="w-full"
        >
          <Image className="h-4 w-4 mr-2" />
          Choose from Gallery
        </Button>
        <Button
          variant="outline"
          onClick={openCamera}
          className="w-full"
        >
          <Camera className="h-4 w-4 mr-2" />
          Take Photo
        </Button>
      </div>
    </div>
  );
};