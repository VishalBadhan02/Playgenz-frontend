
import React from 'react';
import { Users, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const TeamMembers = ({ members }) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-xl md:text-2xl font-semibold">Team Members</h2>
      </div>

      <div className="space-y-3 md:space-y-4">
        {members.map((value: any, i: any) => (
          <MemberCard key={value.id} index={i} name={value?.name} id={value?.id} role={value?.role} />
        ))}
      </div>
    </div>
  );
};

interface MemberCardProps {
  index: number;
  name: string;
  role: string;
  id: string
}

const MemberCard = ({ index, name, role, id }: MemberCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-3 md:p-4">
        <div className="flex items-center gap-3 md:gap-4">
          <Avatar className="h-10 w-10 md:h-12 md:w-12">
            <AvatarFallback>{`P${index}`}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm md:text-base">{name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {role}
            </p>
          </div>
        </div>

        {isMobile ? (

          <Link to={"/profile/" + id}>
            <button className="rounded-md bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20 transition-colors">
              View 
            </button>
          </Link>

        ) : (
          <div className="flex items-center gap-2">
            <button className="rounded-md border px-3 py-1 text-xs hover:bg-secondary transition-colors">
              Message
            </button>
            <Link to={"/profile/" + id}>
              <button className="rounded-md bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20 transition-colors">
                View Profile
              </button>
            </Link>

            <button className="rounded-full p-1 hover:bg-muted transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMembers;
