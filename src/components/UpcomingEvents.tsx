
import React from 'react';
import { Calendar, Trophy, MapPin, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'match' | 'tournament';
  date: string;
  time: string;
  location: string;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Thunder Strikers vs. Phoenix Rising',
    type: 'match',
    date: 'Sep 25, 2023',
    time: '3:00 PM',
    location: 'Central Sports Arena'
  },
  {
    id: '2',
    title: 'Summer Basketball Championship',
    type: 'tournament',
    date: 'Oct 5-7, 2023',
    time: 'All Day',
    location: 'Downtown Sports Complex'
  },
  {
    id: '3',
    title: 'Blue Hawks vs. Red Dragons',
    type: 'match',
    date: 'Oct 10, 2023',
    time: '5:30 PM',
    location: 'Riverside Courts'
  }
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm hover-scale hover:border-accent">
      <div className={`rounded-t-lg p-3 font-medium text-white ${event.type === 'match' ? 'bg-primary' : 'bg-accent'}`}>
        {event.type === 'match' ? 'Upcoming Match' : 'Tournament'}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium">{event.title}</h3>
        
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <button className="mt-4 w-full rounded-lg border border-primary px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
          {event.type === 'match' ? 'View Details' : 'View Tournament'}
        </button>
      </div>
    </div>
  );
};

const UpcomingEvents: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View Calendar
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
