import { Loader2 } from "lucide-react";
import type { FC } from "react";

export const Spinner: FC = () => {
    return (
        <div className="flex items-center justify-center h-[80vh] w-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
};
