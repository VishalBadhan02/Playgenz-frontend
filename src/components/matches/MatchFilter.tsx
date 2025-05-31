import React from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const MatchFilter = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-secondary">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous</span>
                </button>
                <div className="text-sm font-medium">September 2023</div>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-secondary">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next</span>
                </button>
            </div>
            <button className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-secondary transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
            </button>
        </div>
    );
};

export default MatchFilter;