
import React from 'react';
import { TeamMember } from '../types/teamTypes';
import MemberRow from './MemberRow';
import EmptyMembers from './EmptyMembers';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMemberCard from './MobileMemberCard';

interface MembersTableProps {
  members: TeamMember[];
  searchTerm: string;
  onRemove: (id: string) => void;
  onRoleChange: (id: string, role: TeamMember['role']) => void;
}

const MembersTable: React.FC<MembersTableProps> = ({
  members,
  searchTerm,
  onRemove,
  onRoleChange
}) => {
  const isMobile = useIsMobile();
  const filteredMembers = members?.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredMembers?.length === 0) {
    return (
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left font-medium">Member</th>
              <th className="p-4 text-left font-medium">Role</th>
              <th className="p-4 text-left font-medium">Joined</th>
              <th className="p-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <EmptyMembers />
          </tbody>
        </table>
      </div>
    );
  }

  // Mobile view uses cards instead of table
  if (isMobile) {
    return (
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <MobileMemberCard
            key={member.id}
            member={member}
            onRemove={onRemove}
            onRoleChange={onRoleChange}
          />
        ))}
      </div>
    );
  }

  // Desktop view uses table
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-4 text-left font-medium">Member</th>
            <th className="p-4 text-left font-medium">Role</th>
            <th className="p-4 text-left font-medium">Joined</th>
            <th className="p-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {filteredMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              onRemove={onRemove}
              onRoleChange={onRoleChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersTable;
