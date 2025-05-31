
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, MapPin, Plus, Users } from 'lucide-react';
import MatchHeader from '@/components/matches/MatchHeader';
import MatchTabs from '@/components/matches/MatcTabs';
import MatchFilter from '@/components/matches/MatchFilter';
import { MatchCard } from '@/components/matches/MatchCard';
import EmptyState from '@/components/matches/EmptyState';
import MatchList from '@/components/matches/MatchList';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import { ErrorModal } from '@/components/ErrorModal';
import useTeamService from '@/services/teamService';

interface Match {
  id: string;
  homeTeam: {
    name: string;
    score?: number;
    teamId?: string;
  };
  awayTeam: {
    name: string;
    score?: number;
    teamId?: string;
  };
  date: string;
  time: string;
  venue: string;
  status: 'scheduled' | 'live' | 'completed' | 'upcoming';
  matchType?: string;
  sessionId?: string;

}

const matches: Match[] = [
  {
    id: '1',
    homeTeam: {
      name: 'Thunder Strikers',
      score: 78,
    },
    awayTeam: {
      name: 'Phoenix Rising',
      score: 65,
    },
    date: 'Aug 12, 2023',
    time: '5:30 PM',
    venue: 'Central Sports Arena',
    status: 'completed',
  },
  {
    id: '2',
    homeTeam: {
      name: 'City Wolves',
    },
    awayTeam: {
      name: 'Golden Eagles',
    },
    date: 'Sep 25, 2023',
    time: '3:00 PM',
    venue: 'Downtown Sports Complex',
    status: 'scheduled',
  },
  {
    id: '3',
    homeTeam: {
      name: 'Thunder Strikers',
      score: 45,
    },
    awayTeam: {
      name: 'Blue Hawks',
      score: 42,
    },
    date: 'Current',
    time: 'Live',
    venue: 'Riverside Courts',
    status: 'live',
  },
];

const Matches = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'live'>('upcoming');
  const { fetchMatches } = useTeamService();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    data: matchData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['matches'],
    queryFn: () => fetchMatches(),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  console.log('Match Data:', matchData);

  return (
    <div className="space-y-8">

      <MatchHeader />

      <MatchTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <MatchFilter />


      <MatchList matches={matchData?.data} activeTab={activeTab} />

      {/* <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div> */}

      <EmptyState />
    </div>
  );
};



export default Matches;
