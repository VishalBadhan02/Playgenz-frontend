
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Contact } from './types';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onClick }) => {
  return (
    <button
      className={cn(
        "flex items-start gap-3 w-full p-3 text-left hover:bg-accent/10 transition-colors",
        isSelected && "bg-accent/20"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact?.avatar} alt={contact?.name} />
          <AvatarFallback>{contact?.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background",
            // contact.status === 'online' ? "bg-green-500" :
            // contact.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <span className="font-medium truncate">{contact?.name}</span>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {contact?.lastMessageTime}
          </span>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <p className={`text-sm text-muted-foreground ${contact?.status === 0 ? "font-bold" : ""} truncate`}>
            {contact.isTyping ? (
              <span className="italic text-primary">typing...</span>
            ) : (
              contact.lastMessage
            )}
          </p>
          {contact.unreadCount > 0 && (
            <Badge
              variant="default"
              className="ml-2 bg-primary text-white"
            >
              {contact?.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default ContactItem;
