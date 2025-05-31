import React from "react";
import { FolderClosed } from "lucide-react";

const NoTeamsFound: React.FC = () => {
    return (
        <div className="text-center py-12">
            <FolderClosed className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No teams found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters</p>
        </div>
    );
};

export default NoTeamsFound;