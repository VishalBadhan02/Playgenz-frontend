
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent py-16 px-8 text-white shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Connect. Play. Win.
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-white/90">
          Join the ultimate sports platform for enthusiasts. Create teams, schedule matches, 
          and participate in tournaments all in one place.
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/register"
            className="rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-sm hover:bg-white/90 hover:scale-105 transition-all"
          >
            Get Started
          </Link>
          
          <Link
            to="/tournaments"
            className="group flex items-center gap-2 text-base font-semibold leading-6 text-white"
          >
            Find Tournaments
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />
    </div>
  );
};

export default Hero;
