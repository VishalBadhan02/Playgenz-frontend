import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "./ImageUpload";
import { ImageCropper } from "./ImageCropper";
import { ImageFilters } from "./ImageFilters";
import { useToast } from "@/hooks/use-toast";

interface AvatarEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blob: Blob) => void;
}

export const AvatarEditor = ({ isOpen, onClose, onSave }: AvatarEditorProps) => {
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"upload" | "crop" | "filter">("upload");
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = useCallback((imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    // For camera photos, skip crop and go directly to filter
    if (imageDataUrl.includes('data:image/jpeg')) {
      setCroppedImage(imageDataUrl);
      setCurrentStep("filter");
    } else {
      setCurrentStep("crop");
    }
  }, []);

  const handleCropComplete = useCallback((croppedImageDataUrl: string) => {
    setCroppedImage(croppedImageDataUrl);
    setCurrentStep("filter");
  }, []);

  const handleSave = useCallback(async () => {
    if (!canvasRef.current || !croppedImage) {
      toast({
        title: "Error",
        description: "No image to save",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a canvas with the final filtered image
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Apply filters
        ctx.filter = `
          brightness(${filters.brightness}%) 
          contrast(${filters.contrast}%) 
          saturate(${filters.saturation}%) 
          blur(${filters.blur}px) 
          sepia(${filters.sepia}%)
        `;
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            onSave(blob);
            handleClose();
          }
        }, 'image/png', 1.0);
      };
      img.src = croppedImage;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive",
      });
    }
  }, [croppedImage, filters, onSave, toast]);

  const handleClose = useCallback(() => {
    setOriginalImage(null);
    setCroppedImage(null);
    setCurrentStep("upload");
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
    });
    onClose();
  }, [onClose]);

  const getTabValue = () => {
    switch (currentStep) {
      case "upload": return "upload";
      case "crop": return "crop";
      case "filter": return "filter";
      default: return "upload";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Avatar Editor</DialogTitle>
        </DialogHeader>
        
        <Tabs value={getTabValue()} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="upload" 
              disabled={currentStep !== "upload"}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              📸 Take/Upload
            </TabsTrigger>
            <TabsTrigger 
              value="crop" 
              disabled={currentStep === "upload"}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              ✂️ Crop
            </TabsTrigger>
            <TabsTrigger 
              value="filter" 
              disabled={currentStep !== "filter"}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              ✨ Filter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <ImageUpload onImageUpload={handleImageUpload} />
          </TabsContent>

          <TabsContent value="crop" className="mt-6">
            {originalImage && (
              <ImageCropper
                imageSrc={originalImage}
                onCropComplete={handleCropComplete}
                onBack={() => setCurrentStep("upload")}
              />
            )}
          </TabsContent>

          <TabsContent value="filter" className="mt-6">
            {croppedImage && (
              <ImageFilters
                imageSrc={croppedImage}
                filters={filters}
                onFiltersChange={setFilters}
                onBack={() => setCurrentStep("crop")}
                onSave={handleSave}
              />
            )}
          </TabsContent>
        </Tabs>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};