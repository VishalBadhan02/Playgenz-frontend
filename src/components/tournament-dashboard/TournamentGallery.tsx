
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload, Trash, Grid, List } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TournamentGalleryProps {
  tournamentId: string;
}

interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  uploadDate: string;
}

const TournamentGallery: React.FC<TournamentGalleryProps> = ({ tournamentId }) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  
  // Mock data for gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: 'img1',
      url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1767&auto=format&fit=crop',
      caption: 'Tournament opening ceremony',
      uploadDate: 'June 15, 2025'
    },
    {
      id: 'img2',
      url: 'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?q=80&w=1587&auto=format&fit=crop',
      caption: 'Match day highlights',
      uploadDate: 'June 16, 2025'
    },
    {
      id: 'img3',
      url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1605&auto=format&fit=crop',
      caption: 'Team presentations',
      uploadDate: 'June 17, 2025'
    },
    {
      id: 'img4',
      url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1770&auto=format&fit=crop',
      caption: 'Action shots',
      uploadDate: 'June 18, 2025'
    },
  ];
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Simulate upload progress
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null) return 0;
          if (prev >= 100) {
            clearInterval(interval);
            
            // Once upload is complete
            toast({
              title: "Images uploaded",
              description: `Successfully uploaded ${files.length} images`,
            });
            
            // Reset progress after a delay
            setTimeout(() => setUploadProgress(null), 1000);
            
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };
  
  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId) 
        : [...prev, imageId]
    );
  };
  
  const handleDeleteSelected = () => {
    if (selectedImages.length === 0) return;
    
    toast({
      title: "Images deleted",
      description: `Successfully deleted ${selectedImages.length} images`,
    });
    
    setSelectedImages([]);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Tournament Gallery</CardTitle>
              <CardDescription>Upload and manage tournament photos</CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode('grid')}>
                <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-primary' : ''}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setViewMode('list')}>
                <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : ''}`} />
              </Button>
              {selectedImages.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete ({selectedImages.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center w-full">
            <Label 
              htmlFor="gallery-upload" 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-foreground font-medium">Click to upload gallery images</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (Max. 10MB each)</p>
              </div>
              <Input 
                id="gallery-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                multiple
                onChange={handleFileUpload}
              />
            </Label>
          </div>
          
          {uploadProgress !== null && (
            <Alert>
              <div className="flex items-center">
                <div className="w-full">
                  <AlertTitle>Uploading images...</AlertTitle>
                  <AlertDescription className="mt-2">
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </AlertDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-2">Cancel</Button>
              </div>
            </Alert>
          )}
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div 
                    className={`absolute inset-0 z-10 border-2 ${
                      selectedImages.includes(image.id) ? 'border-primary' : 'border-transparent'
                    } rounded-md transition-all`}
                    onClick={() => toggleImageSelection(image.id)}
                  ></div>
                  <AspectRatio ratio={1} className="overflow-hidden rounded-md">
                    <img
                      src={image.url}
                      alt={image.caption || 'Tournament photo'}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="mt-1 text-xs text-muted-foreground truncate">
                    {image.caption}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {galleryImages.map((image) => (
                <div 
                  key={image.id}
                  className={`flex items-center gap-3 p-2 rounded-md ${
                    selectedImages.includes(image.id) ? 'bg-accent/20' : 'hover:bg-muted'
                  } transition-colors`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                    <img
                      src={image.url}
                      alt={image.caption || 'Tournament photo'}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{image.caption || 'Untitled Image'}</p>
                    <p className="text-xs text-muted-foreground">Uploaded on {image.uploadDate}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// A helper component for the file upload label
const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props}>
      {children}
    </label>
  );
};

export default TournamentGallery;
