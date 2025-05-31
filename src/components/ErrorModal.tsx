import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { FC } from "react";

interface ErrorModalProps {
    open: boolean;
    onClose: () => void;
    error?: Error | null;
    header: string;
    description: string
}

export const ErrorModal: FC<ErrorModalProps> = ({ open, onClose, error, header, description }) => {
    console.log(error)
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        {header}
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {error?.message && (
                        <p className="text-sm text-muted-foreground break-words">
                            {error.message}
                        </p>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
