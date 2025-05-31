import React from 'react';
import { Plus } from 'lucide-react';

const MatchHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Matches</h1>
                <p className="text-muted-foreground">View and manage your upcoming and past matches</p>
            </div>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Schedule Match</span>
            </button>
        </div>
    );
};

export default MatchHeader;