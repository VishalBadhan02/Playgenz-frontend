
import React from 'react';
import { MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TeamMatches = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <h2 className="text-xl md:text-2xl font-semibold">Team Matches</h2>
        <div className="flex gap-2">
          <button className="rounded-md border px-3 py-1 text-xs md:text-sm hover:bg-secondary transition-colors">
            Past Matches
          </button>
          <button className="rounded-md bg-primary px-3 py-1 text-xs md:text-sm text-white hover:bg-primary/90 transition-colors">
            Upcoming Matches
          </button>
        </div>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <MatchCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

interface MatchCardProps {
  index: number;
}

const MatchCard = ({ index }: MatchCardProps) => {
  return (
    <Card>
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0">
          <div className="text-xs md:text-sm text-muted-foreground">
            {`Oct ${index * 5}, 2023 • ${index + 2}:00 PM`}
          </div>
          <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary w-fit">
            Upcoming
          </div>
        </div>
        
        <div className="mt-3 md:mt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex w-full md:w-auto items-center gap-2 md:gap-4 mb-3 md:mb-0">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <div className="font-medium text-sm md:text-base">Thunder Strikers</div>
              <div className="text-xs md:text-sm text-muted-foreground">Home Team</div>
            </div>
          </div>
          
          <div className="text-lg md:text-xl font-bold my-1 md:my-0">VS</div>
          
          <div className="flex w-full md:w-auto items-center gap-2 md:gap-4 flex-row-reverse md:flex-row">
            <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-accent/10">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
            </div>
            <div className="text-right md:text-left">
              <div className="font-medium text-sm md:text-base">Opponent {index}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Away Team</div>
            </div>
          </div>
        </div>
        
        <div className="mt-3 md:mt-4 flex flex-col md:flex-row items-start md:items-center md:justify-between border-t pt-3 md:pt-4 gap-3 md:gap-0">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs md:text-sm">{`Arena ${index}`}</span>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-initial rounded-md border px-3 py-1 text-xs hover:bg-secondary transition-colors">
              Details
            </button>
            <button className="flex-1 md:flex-initial rounded-md bg-primary px-3 py-1 text-xs text-white hover:bg-primary/90 transition-colors">
              RSVP
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMatches;
