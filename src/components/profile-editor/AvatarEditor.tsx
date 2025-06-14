import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { ImageCropper } from "./ImageCropper";
import { ImageFilters } from "./ImageFilters";
import { useToast } from "@/hooks/use-toast";

interface AvatarEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blob: Blob, originalFile: any) => void;
}

export const AvatarEditor = ({ isOpen, onClose, onSave }: AvatarEditorProps) => {
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"upload" | "crop" | "filter">("upload");
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    sepia: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = useCallback((imageDataUrl: string, file?: File) => {
    setOriginalImage(imageDataUrl);
    setOriginalFile(file || null);
    setCurrentStep("upload");
  }, []);

  const handleCropComplete = useCallback((croppedImageDataUrl: string) => {
    setCroppedImage(croppedImageDataUrl);
    setCurrentStep("upload");
  }, []);

  const handleSave = useCallback(async () => {

    const imageToSave = croppedImage || originalImage;
    if (!canvasRef.current || !imageToSave) {
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
            onSave(blob, originalFile);
            handleClose();
          }
        }, 'image/png', 1.0);
      };
      img.src = imageToSave;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive",
      });
    }
  }, [croppedImage, originalImage, filters, onSave, toast, originalFile]);

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
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden rounded-xl border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 shrink-0">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Edit Avatar</h2>
              <p className="text-sm text-muted-foreground">Upload and preview your profile picture</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 rounded-full hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 min-h-0">
            {!originalImage ? (
              <div className="h-full flex items-center justify-center">
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
            ) : (
              <div className="h-full flex flex-col lg:flex-row gap-4">
                {/* Preview Section */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg min-h-[300px]">
                    <div className="relative">
                      <img
                        src={croppedImage || originalImage}
                        alt="Preview"
                        className="max-w-full max-h-[400px] object-contain rounded-lg"
                        style={{
                          filter: `
                            brightness(${filters.brightness}%) 
                            contrast(${filters.contrast}%) 
                            saturate(${filters.saturation}%) 
                            blur(${filters.blur}px) 
                            sepia(${filters.sepia}%)
                          `
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Options Panel */}
                <div className="lg:w-80 flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("crop")}
                      className="w-full"
                    >
                      Crop Image (Optional)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep("filter")}
                      className="w-full"
                    >
                      Apply Filters (Optional)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOriginalImage(null);
                        setCroppedImage(null);
                        setCurrentStep("upload");
                      }}
                      className="w-full"
                    >
                      Choose Different Photo
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <Button
                      onClick={handleSave}
                      className="w-full"
                      size="lg"
                    >
                      Save Avatar
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleClose}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Crop/Filter Overlays */}
            {currentStep === "crop" && originalImage && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-3xl">
                  <ImageCropper
                    imageSrc={originalImage}
                    onCropComplete={handleCropComplete}
                    onBack={() => setCurrentStep("upload")}
                  />
                </div>
              </div>
            )}

            {currentStep === "filter" && (originalImage || croppedImage) && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-3xl">
                  <ImageFilters
                    imageSrc={croppedImage || originalImage}
                    filters={filters}
                    onFiltersChange={setFilters}
                    onBack={() => setCurrentStep("upload")}
                    onSave={() => setCurrentStep("upload")}
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};