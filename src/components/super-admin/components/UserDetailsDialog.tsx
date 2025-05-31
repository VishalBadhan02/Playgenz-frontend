
import React from 'react';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '../types/user-types';
import { getRoleBadge, getStatusBadge } from '../utils/user-badges';

interface UserDetailsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (action: string, user: User) => void;
}

const UserDetailsDialog = ({ user, open, onOpenChange, onAction }: UserDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] rounded-lg">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View and edit user information
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2 sm:py-4">
          <div className="flex justify-center mb-2">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Role</p>
              <div>{getRoleBadge(user.role)}</div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
              <div>{getStatusBadge(user.status)}</div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Join Date</p>
              <p className="font-medium">{user.joinDate}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Last Active</p>
              <p className="font-medium">{user.lastActive}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
          <Button 
            variant="destructive" 
            onClick={() => {
              onAction('delete', user);
              onOpenChange(false);
            }}
          >
            Delete Account
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
