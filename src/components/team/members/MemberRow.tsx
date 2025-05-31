
import React from 'react';
import { TeamMember } from '../types/teamTypes';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Mail, Shield, Award, Ban, Users } from 'lucide-react';

interface MemberRowProps {
  member: TeamMember;
  onRemove: (id: string) => void;
  onRoleChange: (id: string, role: TeamMember['role']) => void;
}

const MemberRow: React.FC<MemberRowProps> = ({ member, onRemove, onRoleChange }) => {
  const getRoleBadgeColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'Captain':
        return "bg-amber-500 hover:bg-amber-600";
      case 'Coach':
        return "bg-emerald-500 hover:bg-emerald-600";
      case 'Manager':
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-secondary hover:bg-secondary/80";
    }
  };

  return (
    <tr className="hover:bg-muted/30">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-muted-foreground">
              {member.status === 'active' ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <Badge className={`${getRoleBadgeColor(member.role)}`}>
          {member.role}
        </Badge>
      </td>
      <td className="p-4 text-muted-foreground">
        {member.joinedDate}
      </td>
      <td className="p-4 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onRoleChange(member?.modalId, 'Player')}>
              <Users className="mr-2 h-4 w-4" />
              <span>Player</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleChange(member?.modalId, 'Coach')}>
              <Award className="mr-2 h-4 w-4" />
              <span>Coach</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleChange(member?.modalId, 'Captain')}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Captain</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleChange(member?.modalId, 'Manager')}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Manager</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onRemove(member.modalId)}
            >
              <Ban className="mr-2 h-4 w-4" />
              <span>Remove from team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default MemberRow;
