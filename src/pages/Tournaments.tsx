import React, { useEffect, useState } from 'react';
import { Calendar, Trophy, MapPin, Users, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useTournamentService from '@/services/tournamentService';
import { Spinner } from '@/components/Spinner';
import { TournamentCard } from '@/components/tournament/TournamentCard';
import { ErrorModal } from '@/components/ErrorModal';



const Tournaments = () => {
  const [activeTab, setActiveTab] = useState<'nearby' | 'joined'>('nearby');
  const { fetchTournament } = useTournamentService();

  const {
    data: tournamentData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['tournaments'],
    queryFn: () => fetchTournament(),
  });

  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  useEffect(() => {
    if (isLoading) {
      <Spinner />
    }
  }, [isLoading])
  const tournamemtData = tournamentData?.data ?? [];


  return (
    <div className="space-y-8 max-w-full overflow-x-hidden">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
        <p className="text-muted-foreground">Discover and join tournaments in your area</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tournaments..."
            className="w-full rounded-md border px-9 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button className="flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex overflow-x-auto border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'nearby'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
          onClick={() => setActiveTab('nearby')}
        >
          Nearby
        </button>

        <button
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'joined'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground'
            }`}
          onClick={() => setActiveTab('joined')}
        >
          Joined
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournamemtData?.map((tournament: any) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
          />
        ))}
      </div>

      <div className="rounded-lg border border-dashed p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Trophy className="h-6 w-6 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-medium">Organize Your Tournament</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Create and manage your own tournaments with ease
        </p>

        <Link
          to="/register-tournament"
          className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Create Tournament
        </Link>
      </div>
    </div>
  );
};





export default Tournaments;
