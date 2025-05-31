
import React from 'react';
import { Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TeamAchievements = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold">Team Achievements</h2>
      
      <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <AchievementCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

interface AchievementCardProps {
  index: number;
}

const AchievementCard = ({ index }: AchievementCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-accent p-3 md:p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-medium">{`Achievement ${index}`}</h3>
          <Trophy className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <p className="text-xs md:text-sm text-white/80">{`Tournament ${index}`}</p>
      </div>
      
      <CardContent className="p-3 md:p-4">
        <p className="text-xs md:text-sm text-muted-foreground">
          {`Achieved for outstanding performance in the ${index % 2 === 0 ? 'regional' : 'national'} tournament.`}
        </p>
        
        <div className="mt-3 md:mt-4 flex items-center justify-between">
          <div className="text-xs md:text-sm text-muted-foreground">
            {`${index % 2 === 0 ? 'June' : 'August'} 202${index % 3 + 1}`}
          </div>
          
          <button className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamAchievements;
