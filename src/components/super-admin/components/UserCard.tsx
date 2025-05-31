
import React from 'react';
import { MoreHorizontal, UserCog, Shield, UserX, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User } from '../types/user-types';
import { getRoleBadge, getStatusBadge } from '../utils/user-badges';

interface UserCardProps {
  user: User;
  onActionClick: (action: string, user: User) => void;
}

const UserCard = ({ user, onActionClick }: UserCardProps) => (
  <Card className="w-full">
    <CardContent className="p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
          <AvatarImage src={user.profileImage} alt={user.name} />
          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="font-medium truncate">{user.name}</div>
          <div className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</div>
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
            {getRoleBadge(user.role)}
            {getStatusBadge(user.status)}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onActionClick('view', user)}>
              <UserCog className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onActionClick('promote', user)}>
              <Shield className="mr-2 h-4 w-4" />
              Change Role
            </DropdownMenuItem>
            {user.status === 'active' ? (
              <DropdownMenuItem onClick={() => onActionClick('suspend', user)}>
                <UserX className="mr-2 h-4 w-4" />
                Suspend Account
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onActionClick('activate', user)}>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate Account
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onActionClick('delete', user)}
            >
              Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  </Card>
);

export default UserCard;
