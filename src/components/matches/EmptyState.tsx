import React from 'react';
import { Calendar } from 'lucide-react';

const EmptyState = () => {
    return (
        <div className="rounded-lg border border-dashed p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Schedule a New Match</h3>
            <p className="mt-1 text-sm text-muted-foreground">Challenge another team or create a friendly match</p>
            <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition-colors">
                Schedule Match
            </button>
        </div>
    );
};

export default EmptyState;