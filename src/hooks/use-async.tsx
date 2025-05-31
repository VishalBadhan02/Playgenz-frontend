
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useAsync<T = any>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const { toast } = useToast();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const execute = useCallback(
    async (promise: Promise<T>, options?: {
      successMessage?: string;
      errorMessage?: string;
      showErrorModal?: boolean;
    }) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await promise;
        setState({ data, loading: false, error: null });

        if (options?.successMessage) {
          toast({
            title: "Success",
            description: options.successMessage,
          });
        }

        return data;
      } catch (error) {
        console.error("API Error:", error);
        const errorObj = error instanceof Error ? error : new Error(String(error));
        setState({ data: null, loading: false, error: errorObj });

        if (options?.errorMessage) {
          toast({
            title: "Error",
            description: options.errorMessage,
            variant: "destructive",
          });
        }
        if (error.message === 'FORM_VALIDATION_ERROR') {
          return; // Don't show modal for form-handled errors
        }
        // Show modal for server errors
        if (options?.showErrorModal) {
          setShowErrorModal(true);
        }

        throw errorObj;
      }
    },
    [toast]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  const closeErrorModal = useCallback(() => {
    setShowErrorModal(false);
  }, []);

  const ServerErrorModal = useCallback(() => {
    return (
      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Server Error
            </DialogTitle>
            <DialogDescription>
              We're experiencing some issues with our server. Please try again later.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {state.error && (
              <p className="text-sm text-muted-foreground break-words">
                {state.error.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={closeErrorModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }, [closeErrorModal, showErrorModal, state.error]);

  return {
    ...state,
    execute,
    reset,
    ServerErrorModal,
  };
}
