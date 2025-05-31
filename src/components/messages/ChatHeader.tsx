
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { Contact, Team } from './types';

interface ChatHeaderProps {
  contact?: Contact;
  team?: Team;
  onBack?: () => void;
  isMobile?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ contact, team, onBack, isMobile = false }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-3">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
        )}
        <Avatar>
          <AvatarImage
            src={contact?.avatar || team?.avatar}
            alt={contact?.name || team?.name}
          />
          <AvatarFallback>
            {(contact?.name || team?.name)?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{contact?.name || team?.name}</h3>
          {contact && (
            <p className="text-xs text-muted-foreground">
              {/* {contact.status === 'online' ? 'Online' : */}
              {/* // contact.status === 'away' ? 'Away' : 'Offline'}   */}
            </p>
          )}
          {team && (
            <p className="text-xs text-muted-foreground">{team.members} members</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        {!isMobile && (
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
