
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ContactItem from './ContactItem';
import TeamItem from './TeamItem';
import { Contact, Team } from './types';
import { TabsContent } from '@/components/ui/tabs';

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string, type: string) => void;
}

export const FriendsList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  onSelectContact
}) => {
  return (
    <TabsContent value="friends" className="m-0">
      <div className="divide-y">
        {contacts.map((contact: Contact) => (
          <ContactItem
            key={contact._id}
            contact={contact}
            isSelected={selectedContactId === contact._id}
            onClick={() => onSelectContact(contact._id, contact.type)}
          />
        ))}
      </div>
    </TabsContent>
  );
};

interface TeamListProps {
  teams: Team[];
  selectedTeamId: string | null;
  onSelectTeam: (id: string) => void;
}

export const TeamsList: React.FC<TeamListProps> = ({
  teams,
  selectedTeamId,
  onSelectTeam
}) => {
  return (
    <TabsContent value="teams" className="m-0">
      <div className="divide-y">
        {teams.map((team) => (
          <TeamItem
            key={team.id}
            team={team}
            isSelected={selectedTeamId === team.id}
            onClick={() => onSelectTeam(team.id)}
          />
        ))}
      </div>
    </TabsContent>
  );
};
