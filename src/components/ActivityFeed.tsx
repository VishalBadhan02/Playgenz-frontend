
import React from 'react';
import { Calendar, Trophy, Users, MapPin } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'match' | 'tournament' | 'team' | 'venue';
  title: string;
  description: string;
  time: string;
}

const activityItems: ActivityItem[] = [
  {
    id: '1',
    type: 'match',
    title: 'Match Scheduled',
    description: 'Thunder Strikers vs. Phoenix Rising',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'tournament',
    title: 'Tournament Registration Open',
    description: 'Summer Basketball Championship 2023',
    time: '5 hours ago'
  },
  {
    id: '3',
    type: 'team',
    title: 'New Team Created',
    description: 'Golden Eagles are looking for players',
    time: '1 day ago'
  },
  {
    id: '4',
    type: 'venue',
    title: 'Venue Booked',
    description: 'Riverside Sports Complex - Court 3',
    time: '2 days ago'
  }
];

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'match':
      return <Calendar className="h-5 w-5 text-green-500" />;
    case 'tournament':
      return <Trophy className="h-5 w-5 text-accent" />;
    case 'team':
      return <Users className="h-5 w-5 text-blue-500" />;
    case 'venue':
      return <MapPin className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activityItems.map((item) => (
          <div 
            key={item.id} 
            className="flex gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors hover-scale"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <ActivityIcon type={item.type} />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
