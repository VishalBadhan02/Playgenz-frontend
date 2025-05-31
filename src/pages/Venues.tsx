
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Clock, Users, Search, Filter, Star, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import useTournamentService from '@/services/tournamentService';
import { ErrorModal } from '@/components/ErrorModal';
import { VenueCard } from '@/components/bookings/VenueCard';
import useVenueService from '@/services/venueService';

const venues = [
  {
    _id: '1',
    name: 'Central Sports Arena',
    address: '123 Main St, Downtown',
    sports: ['Basketball', 'Volleyball'],
    price: 50,
    rating: 4.5,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1568287556346-8c70d3d3746c',
    facilities: ['Changing Rooms', 'Parking', 'Cafeteria', 'Scoreboard']
  },
  {
    _id: '2',
    name: 'Riverside Courts',
    address: '456 River Rd, Westside',
    sports: ['Basketball', 'Tennis'],
    price: 40,
    rating: 4.2,
    available: true,
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
    facilities: ['Changing Rooms', 'Parking', 'Lighting',]
  },
  {
    _id: '3',
    name: 'Downtown Sports Complex',
    address: '789 Center Ave, Downtown',
    sports: ['Football', 'Basketball', 'Swimming'],
    price: 75,
    rating: 4.8,
    available: false,
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e',
    facilities: ['Changing Rooms', 'Parking', 'Cafeteria', 'Gym', 'Scoreboard', 'Seating Area']
  }
];

const Venues = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'booked' | 'tournament'>('all');
  const { fetchVenues } = useVenueService();


  const {
    data: venueData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['fetchVenues'],
    queryFn: () => fetchVenues(),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  const venues = venueData?.data?.venues;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Venues</h1>
          <p className="text-muted-foreground">Find and book venues for your matches and practice sessions</p>
        </div>
        <Link
          to="/venues/admin"
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Settings className="h-4 w-4" />
          Manage Venues
        </Link>
      </div>

      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search venues..."
            className="w-full rounded-md border px-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'all'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
          onClick={() => setActiveTab('all')}
        >
          All Venues
        </button>

        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'booked'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
          onClick={() => setActiveTab('booked')}
        >
          My Bookings
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </div>
    </div>
  );
};



export default Venues;
