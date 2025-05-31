
import React from 'react';
import ActivityFeed from '@/components/ActivityFeed';
import UpcomingEvents from '@/components/UpcomingEvents';

const Home = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
        <p className="text-muted-foreground">Track your activities and upcoming events</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-6">
        <div className="md:col-span-4 space-y-8">
          <UpcomingEvents />
          <ActivityFeed />
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <div className="rounded-lg border p-5">
            <h3 className="font-medium">My Teams</h3>
            <div className="mt-3 space-y-2">
              <TeamItem name="Thunder Strikers" role="Captain" />
              <TeamItem name="City Wolves" role="Player" />
            </div>
            <button className="mt-4 w-full rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
              Create New Team
            </button>
          </div>
          
          <div className="rounded-lg border p-5">
            <h3 className="font-medium">Tournaments</h3>
            <div className="mt-3 space-y-4">
              <div>
                <h4 className="text-sm font-medium">Active Tournaments</h4>
                <p className="text-2xl font-semibold text-accent">2</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Upcoming Tournaments</h4>
                <p className="text-2xl font-semibold text-primary">4</p>
              </div>
            </div>
            <button className="mt-4 w-full rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
              View All Tournaments
            </button>
          </div>
          
          <div className="rounded-lg border p-5">
            <h3 className="font-medium">Quick Actions</h3>
            <div className="mt-3 grid gap-2">
              <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                Schedule a Match
              </button>
              <button className="w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors">
                Find a Tournament
              </button>
              <button className="w-full rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
                Book a Venue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TeamItemProps {
  name: string;
  role: string;
}

const TeamItem: React.FC<TeamItemProps> = ({ name, role }) => {
  return (
    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted transition-colors">
      <span className="font-medium">{name}</span>
      <span className="text-xs text-muted-foreground">{role}</span>
    </div>
  );
};

export default Home;
