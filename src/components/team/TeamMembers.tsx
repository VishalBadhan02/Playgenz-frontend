
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';
import { TeamMember } from './types/teamTypes';
import MemberSearch from './members/MemberSearch';
import MembersTable from './members/MembersTable';
import InviteMemberDialog from './members/InviteMemberDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter
} from '@/components/ui/drawer';
import FriendSelector from './FriendSelector';

interface TeamMembersProps {
  members: TeamMember[];
  onRemove: (id: string) => void;
  onRoleChange: (id: string, role: TeamMember['role']) => void;
  onInvite: (userId: string, name: string) => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({
  members,
  onRemove,
  onRoleChange,
  onInvite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleInvite = (userId: string, name: string) => {
    onInvite(userId, name);
    setInviteDialogOpen(false);
  };

  // For mobile, we'll use a drawer instead of a dialog for the invite form
  if (isMobile) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <MemberSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Drawer open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DrawerTrigger asChild>
              <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite Member</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Invite New Team Member</DrawerTitle>
                <DrawerDescription>
                  Select a friend to invite to your team.
                </DrawerDescription>
              </DrawerHeader>

              <div className="px-4">
                <TeamInviteMemberContent onInvite={handleInvite} member={members} />
              </div>

              <DrawerFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <MembersTable
          members={members}
          searchTerm={searchTerm}
          onRemove={onRemove}
          onRoleChange={onRoleChange}
        />
      </div>
    );
  }

  // Desktop view
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <MemberSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button onClick={() => setInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Invite Member</span>
        </Button>
      </div>

      <MembersTable
        members={members}
        searchTerm={searchTerm}
        onRemove={onRemove}
        onRoleChange={onRoleChange}
      />

      <InviteMemberDialog
        members={members}
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        onInvite={onInvite}
      />
    </div>
  );
};

// Helper component to share code between Dialog and Drawer
const TeamInviteMemberContent: React.FC<{ onInvite: (userId: string, name: string) => void, member: TeamMember[] }> = ({ onInvite, member }) => {
  console.log("TeamInviteMemberContent", member)
  return (
    <div className="py-4">
      <div className="max-h-[50vh] overflow-auto">
        <div className="pb-4">
          <FriendSelectorWrapper onSelectFriend={onInvite} member={member} />
        </div>
      </div>
    </div>
  );
};

// Wrapper for the FriendSelector to ensure we're using the same component
const FriendSelectorWrapper: React.FC<{ onSelectFriend: (userId: string, name: string) => void, member: TeamMember[] }> = ({ onSelectFriend, member }) => {
  // const FriendSelector = React.lazy(() => import('./FriendSelector'));
  // console.log("checking inside", members)
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <FriendSelector onSelectFriend={onSelectFriend} members={member} />
    </React.Suspense>
  );
};

export default TeamMembers;
