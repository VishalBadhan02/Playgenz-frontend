
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24">
      <Hero />
      
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard 
          title="Team Management" 
          description="Create and manage your teams. Add players, set team details, and manage team roles."
          icon="👥"
          link="/teams"
        />
        
        <FeatureCard 
          title="Match Scheduling" 
          description="Schedule matches with other teams, select venues, and manage your game calendar."
          icon="🏆"
          link="/matches"
        />
        
        <FeatureCard 
          title="Tournament Participation" 
          description="Join tournaments in your area and compete against the best teams."
          icon="🏅"
          link="/tournaments"
        />
        
        <FeatureCard 
          title="Venue Booking" 
          description="Find and book the perfect venues for your matches and practice sessions."
          icon="📍"
          link="/venues"
        />
        
        <FeatureCard 
          title="Live Scoring" 
          description="Keep track of your matches with our live scoring system."
          icon="📊"
          link="/scoring"
        />
        
        <FeatureCard 
          title="Leaderboard" 
          description="Track your team's performance and compete for the top spot on the leaderboard."
          icon="📈"
          link="/leaderboard"
        />
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join thousands of sports enthusiasts on PlayGenzz today.
        </p>
        
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
          >
            Create Account
          </Link>
          
          <Link
            to="/login"
            className="rounded-full border px-8 py-3 text-base font-semibold text-foreground shadow-sm hover:bg-secondary transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link 
      to={link}
      className="group rounded-xl border p-6 transition-all hover:border-accent/50 hover:shadow-md hover-scale"
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center text-accent opacity-0 transition-opacity group-hover:opacity-100">
        <span className="text-sm font-medium">Learn more</span>
        <ChevronRight className="ml-1 h-4 w-4" />
      </div>
    </Link>
  );
};

export default Index;
