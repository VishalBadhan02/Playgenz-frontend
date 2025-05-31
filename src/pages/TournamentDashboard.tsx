
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Edit, Image } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import TournamentTabs from '@/components/tournament-dashboard/TournamentTabs';
import { useQuery } from '@tanstack/react-query';
import useTournamentService from '@/services/tournamentService';
import { Spinner } from '@/components/Spinner';
import { ErrorModal } from '@/components/ErrorModal';

const TournamentDashboard = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const { getTournaments } = useTournamentService();
  // Mock data for the tournament
  const tournament = {
    id: id || '1',
    name: 'Summer Cricket Championship 2025',
    status: 'upcoming',
    registrationStatus: 'open',
    registeredTeams: 10,
    maxTeams: 16,
    startDate: 'June 15, 2025',
    endDate: 'July 10, 2025',
  };

  const {
    data: tournamentData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['tournament-dashBoard'],
    queryFn: () => getTournaments(id),
  });

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

  // console.log("tournamentData", tournamentData?.data)

  const handleStatusChange = (status: 'open' | 'closed') => {
    toast({
      title: "Registration status updated",
      description: `Registration is now ${status}`,
    });
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{tournamentData?.data?.name} {tournamentData?.data?.sport} Championship</h1>
          <p className="text-muted-foreground">Admin Dashboard</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Badge variant={tournament.status === 'upcoming' ? 'secondary' :
            tournament.status === 'in-progress' ? 'default' : 'outline'}>
            {tournament.status === 'upcoming' ? 'Upcoming' :
              tournament.status === 'in-progress' ? 'In Progress' : 'Completed'}
          </Badge>

          <Link to={`/tournament/${id}`}>
            <Button variant="outline" size="sm">
              View Public Page
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage key aspects of your tournament</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setActiveTab('details')}>
              <Edit className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-center">Edit Details</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setActiveTab('teams')}>
              <Users className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-center">Manage Teams</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setActiveTab('fixtures')}>
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-center">Fixtures</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setActiveTab('gallery')}>
              <Image className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium text-center">Upload Photos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle>Registration Status</CardTitle>
              <CardDescription>Control team registrations</CardDescription>
            </div>
            <Badge variant={tournament.registrationStatus === 'open' ? 'default' : 'secondary'}>
              {tournament.registrationStatus === 'open' ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm">
                {tournament.registeredTeams} of {tournament.maxTeams} teams registered
              </span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('closed')}
                  disabled={tournament.registrationStatus === 'closed'}
                  className="flex-grow sm:flex-grow-0"
                >
                  Close Registration
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange('open')}
                  disabled={tournament.registrationStatus === 'open'}
                  className="flex-grow sm:flex-grow-0"
                >
                  Open Registration
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="w-full">
        <TournamentTabs activeTab={activeTab} setActiveTab={setActiveTab} tournament={tournamentData?.data} />
      </ScrollArea>
    </div>
  );
};

export default TournamentDashboard;
