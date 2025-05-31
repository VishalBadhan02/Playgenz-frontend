
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import TournamentLeaderboard from '@/components/tournament-details/TournamentLeaderboard';
import { TournamentOverview } from '@/components/tournament-details/TournamentOverview';
import { TournamentTeams } from '@/components/tournament-details/TournamentTeams';
import { TournamentMatches } from '@/components/tournament-details/TournamentMatches';
import { TournamentPhotos } from '@/components/tournament-details/TournamentPhotos';
import { TournamentHeader } from '@/components/tournament-details/TournamentHeader';
import { TournamentTabSelection } from '@/components/tournament-details/TournamentTabSelection';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import { ErrorModal } from '@/components/ErrorModal';
import { useParams } from 'react-router-dom';
import useTournamentService from '@/services/tournamentService';

interface Tournament {
  id: string;
  name: string;
  sport: string;
  format: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  maxTeams: number;
  registeredTeams: number;
  entryFee: string;
  prize: string;
  organizer: string;
  posterImage?: string;
  images?: string[];
}

// const tournamentData: Tournament = {
//   id: '1',
//   name: 'Summer Cricket Championship 2025',
//   sport: 'Cricket',
//   format: 'T20',
//   startDate: 'June 15, 2025',
//   endDate: 'July 10, 2025',
//   location: 'Central Sports Complex, Downtown',
//   description: 'The biggest cricket tournament of the summer. Join us for exciting T20 matches featuring teams from all over the region. Great prizes and opportunities await the winners!',
//   status: 'upcoming',
//   maxTeams: 16,
//   registeredTeams: 10,
//   entryFee: '$250 per team',
//   prize: '$5,000 for winner, $2,000 for runner-up',
//   organizer: 'City Sports Association',
//   posterImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1605&auto=format&fit=crop',
//   images: [
//     'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1767&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?q=80&w=1587&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1605&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1770&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1526&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1629286668273-e142dbf84ad7?q=80&w=1771&auto=format&fit=crop',
//   ]
// };

const TournamentDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { getTournaments } = useTournamentService();
  // Current user is admin (this would be determined by authentication in a real app)

  const {
    data: tournament,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['tournament-dashBoard'],
    queryFn: () => getTournaments(id),
  });

  // console.log(tournament)
  const tournamentData =
  {
    id: tournament?.data?._id,
    name: tournament?.data?.name,
    sport: tournament?.data?.sport,
    format: `T${tournament?.data?.playingPeriod}`,
    startDate: new Date(tournament?.data?.start_date).toLocaleDateString(),
    endDate: new Date(tournament?.data?.end_date).toLocaleDateString(),
    location: tournament?.data?.address,
    description: tournament?.data?.description || "The biggest cricket tournament of the summer.",
    maxTeams: tournament?.data?.totalTeams,
    registeredTeams: 10,
    entryFee: tournament?.data?.entryFee,
    prize: tournament?.data?.prizes?.firstPrice,
    hasRegistered: tournament?.data?.teamId,
    organizer: "Regular",
    posterImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1605&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1767&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?q=80&w=1587&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1605&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=1770&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1526&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1629286668273-e142dbf84ad7?q=80&w=1771&auto=format&fit=crop',
    ]
  }



  useEffect(() => {
    if (isLoading) {
      <Spinner />
    }
  }, [isLoading])

  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;
  return (
    <div className="space-y-6 md:space-y-8 max-w-full overflow-x-hidden">
      <TournamentHeader tournamentData={tournamentData} refresh={refetch} />

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        {/* <TournamentTabSelection activeTab={activeTab} /> */}

        <TabsContent value="overview" className="overflow-x-hidden">
          <TournamentOverview tournamentData={tournamentData} />
        </TabsContent>

        <TabsContent value="teams" className="overflow-x-hidden">
          <TournamentTeams tournamentData={tournamentData} />
        </TabsContent>

        <TabsContent value="matches" className="overflow-x-hidden">
          <TournamentMatches />
        </TabsContent>

        <TabsContent value="photos" className="overflow-x-hidden">
          <TournamentPhotos tournamentData={tournamentData} />
        </TabsContent>

        <TabsContent value="leaderboard" className="overflow-x-hidden">
          <div className="mt-4 md:mt-6">
            <TournamentLeaderboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TournamentDetail;

