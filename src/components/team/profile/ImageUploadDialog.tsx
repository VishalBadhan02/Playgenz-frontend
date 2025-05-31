
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  uploadType: 'logo' | 'cover';
  onUpload: () => void;
}

const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  open,
  onOpenChange,
  uploadType,
  onUpload
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload {uploadType === 'logo' ? 'Team Logo' : 'Cover Image'}</DialogTitle>
          <DialogDescription>
            Choose an image to upload as your {uploadType === 'logo' ? 'team logo' : 'cover image'}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-lg border-2 border-dashed p-12 text-center cursor-pointer hover:bg-accent/5">
            <p className="text-sm text-muted-foreground">
              Click to browse or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              SVG, PNG, JPG or GIF (max. 2MB)
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onUpload}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
