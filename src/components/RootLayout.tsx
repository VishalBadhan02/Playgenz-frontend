import { ErrorModal } from "@/components/ErrorModal";
import { useErrorStore } from "./store/useErrorStore";

export const GlobalErrorHandler = () => {
    const { open, message, clearError } = useErrorStore();

    return (
        <ErrorModal
            open={open}
            onClose={clearError}
            header="Error"
            description="An error occurred"
            error={message ? new Error(message) : null}
        />
    );
};

// In your App
function App() {
    return (
        <>
            <GlobalErrorHandler />
            {/* Your routes/components go here */}
        </>
    );
}
