
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Team } from './types';

interface TeamItemProps {
  team: Team;
  isSelected: boolean;
  onClick: () => void;
}

const TeamItem: React.FC<TeamItemProps> = ({ team, isSelected, onClick }) => {
  return (
    <button
      className={cn(
        "flex items-start gap-3 w-full p-3 text-left hover:bg-accent/10 transition-colors",
        isSelected && "bg-accent/20"
      )}
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={team.avatar} alt={team.name} />
        <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <span className="font-medium truncate block">{team.name}</span>
            <span className="text-xs text-muted-foreground">{team.members} members</span>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {team.lastMessageTime}
          </span>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {team.lastMessage}
          </p>
          {team.unreadCount > 0 && (
            <Badge 
              variant="default" 
              className="ml-2 bg-primary text-white"
            >
              {team.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default TeamItem;
