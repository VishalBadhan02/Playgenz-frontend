
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, X, Check } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Invitation } from './types/teamTypes';
import FriendSelector from './FriendSelector';

interface TeamInvitationsProps {
  invitations: any[];
  onCancel: (id: string) => void;
  onSendNew: (userId: string, name: string) => void;
}

const TeamInvitations: React.FC<TeamInvitationsProps> = ({
  invitations,
  onCancel,
  onSendNew
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const filteredInvitations = invitations.filter(invitation =>
    invitation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: any['status']) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="default" className="bg-green-500">Accepted</Badge>;
      case 'declined':
        return <Badge variant="secondary" className="bg-red-500 text-white">Declined</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invitations..."
            className="pl-9 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>New Invitation</span>
        </Button>
      </div>

      {filteredInvitations.length > 0 ? (
        <div className="space-y-4">
          {filteredInvitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex items-center justify-between rounded-md border p-4"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={invitation.avatar} alt={invitation.name} />
                  <AvatarFallback>{invitation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{invitation.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Invited on {new Date(invitation.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(invitation.status)}

                {invitation.status === 'pending' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCancel(invitation.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cancel</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-medium mb-1">No invitations found</h3>
          <p className="text-muted-foreground">Invite new members to your team</p>
          <Button className="mt-4" onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Send Invitation</span>
          </Button>
        </div>
      )}

      {/* Send New Invitation Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite New Team Member</DialogTitle>
            <DialogDescription>
              Select a friend to invite to your team.
            </DialogDescription>
          </DialogHeader>

          <FriendSelector
            onSelectFriend={(userId, name) => {
              onSendNew(userId, name);
              setInviteDialogOpen(false);
            }}
          />

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamInvitations;
