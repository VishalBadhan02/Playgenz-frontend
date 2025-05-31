
import React from 'react';
import { Users } from 'lucide-react';

const EmptyChat: React.FC = () => {
  return (
    <div className="hidden md:flex flex-1 items-center justify-center bg-muted/10">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Users className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold">Select a conversation</h3>
        <p className="text-sm text-muted-foreground">
          Choose a friend or team to start messaging
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;
