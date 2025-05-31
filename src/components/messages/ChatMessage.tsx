
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex",
        message?.isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          message?.isOwn ?
            "bg-primary text-primary-foreground" :
            "bg-muted text-foreground"
        )}
      >
        <p>{message?.text}</p>
        <div className={cn(
          "flex items-center justify-end gap-1 mt-1 text-xs",
          message?.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          <span>{message?.timestamp}</span>
          {message?.isOwn && message?.status && (
            <span>
              {message?.status === 'sent' && '✓'}
              {message?.status === 'delivered' && '✓✓'}
              {message?.status === 'read' && '✓✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
