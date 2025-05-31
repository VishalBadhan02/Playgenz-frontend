
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Mail, CheckCircle, XCircle, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import useTournamentService from '@/services/tournamentService';
import { Spinner } from '../Spinner';
import TeamCard from './mobileTeamCard';
import { useAsync } from '@/hooks/use-async';
import useUserService from '@/services/userService';

interface TeamManagementProps {
  tournamentId: string;
}

interface TeamEntry {
  id: string;
  name: string;
  logo?: string;
  players: number;
  joinedDate: string;
  status: 'confirmed' | 'pending';
  contact: string;
  teamId: string;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ tournamentId }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending'>('all');
  const { loading, execute, ServerErrorModal } = useAsync();
  const { getUserFriends } = useUserService();


  const isMobile = useIsMobile();
  const { id } = useParams();
  const { fetchTournamentTeams, updateTournamentTeam } = useTournamentService();


  const {
    data: tournamentTeams,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['tournament-teams'],
    queryFn: () => fetchTournamentTeams(id),
  });

  const {
    mutate: teamUpdate,
    isPending: isPending,
  } = useMutation({
    mutationFn: (teamData: object) =>
      updateTournamentTeam(teamData),
    onSuccess: () => {
      toast({
        title: "Team approved",
        description: "Team has been confirmed for the tournament",
      });
      refetch(); // refetch team data to get updated invitations
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send the invitation"
      });
    }
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Spinner /> </div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

  // Mock data for the teams
  const teams: TeamEntry[] = tournamentTeams?.data?.teams;

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || team.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (teamId: string) => {
    const teamData = {
      _id: id,
      modalId: teamId,
      paymentStatus: 'confirmed',
      status: 1,
      matchStatus: 'registered',
    };
    // console.log("kdfsjno", teamData)
    teamUpdate(teamData);
  };

  const handleReject = (teamId: string) => {
    const teamData = {
      _id: id,
      modalId: teamId,
      paymentStatus: 'rejected',
      status: 0,
      matchStatus: 'rejected',
    };
    teamUpdate(teamData);
  };

  const handleInvite = () => {

  };

  const handleMessage = async (team: string) => {
    execute(
      // This is a mock promise that would typically be an API call
      getUserFriends("n", team)
        .then((response) => {
          const { status, data, message } = response;
          if (!status) {
            throw new Error(message || 'Login failed due to invalid credentials.');
          }
          window.location.href = `/messages/user/n/${data?.userData?._id}`
        }),
      {
        errorMessage: "Failed fetching profile",
        showErrorModal: true,
      }
    );
  }



  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Manage Teams</CardTitle>
              <CardDescription>Approve, reject, or invite teams</CardDescription>
            </div>
            <Button onClick={handleInvite} className="w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className="flex-grow sm:flex-grow-0"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'confirmed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('confirmed')}
                className="flex-grow sm:flex-grow-0"
              >
                Confirmed
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
                className="flex-grow sm:flex-grow-0"
              >
                Pending
              </Button>
            </div>
          </div>

          {filteredTeams.length === 0 ? (
            <div className="text-center py-10">
              <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No teams found matching your criteria</p>
            </div>
          ) : isMobile ? (
            // Mobile view with cards
            <div className="mt-4">
              {filteredTeams.map(team => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  isLoading={isPending}
                  handleMessage={handleMessage}
                />
              ))}

            </div>
          ) : (
            // Desktop view with table
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead className="hidden sm:table-cell">Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={team.logo} alt={team.name} />
                            <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-xs text-muted-foreground hidden sm:block">{team.contact}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{team.players}</TableCell>
                      <TableCell className="hidden sm:table-cell">{team.joinedDate}</TableCell>
                      <TableCell>
                        <Badge variant={team.status === 'confirmed' ? 'default' : 'secondary'}>
                          {team.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleMessage(team?.teamId)}>
                            <Mail className="h-4 w-4" />
                          </Button>
                          {team.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleApprove(team.id)}>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleReject(team.id)}>
                                <XCircle className="h-4 w-4 text-red-500" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;











// const renderMobileTeamCard = (team: TeamEntry) => {
//   return (
//     <Card key={team.id} className="mb-3">
//       <CardContent className="p-4">
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={team.logo} alt={team.name} />
//               <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div>
//               <div className="font-medium">{team.name}</div>
//               <div className="text-xs text-muted-foreground">{team.contact}</div>
//             </div>
//           </div>
//           <Badge variant={team.status === 'confirmed' ? 'default' : 'secondary'}>
//             {team.status === 'confirmed' ? 'Confirmed' : 'Pending'}
//           </Badge>
//         </div>

//         <div className="grid grid-cols-2 gap-2 text-sm mb-3">
//           <div>
//             <span className="text-muted-foreground">Players:</span>
//             <span className="ml-1 font-medium">{team.players}</span>
//           </div>
//           <div>
//             <span className="text-muted-foreground">Joined:</span>
//             <span className="ml-1 font-medium">{team.joinedDate}</span>
//           </div>
//         </div>

//         <div className="flex justify-end gap-2 mt-2">
//           <Button variant="outline" size="sm">
//             <Mail className="h-4 w-4 mr-1" />
//             <span>Contact</span>
//           </Button>
//           {team.status === 'pending' && (
//             <>
//               <Button variant="outline" size="sm" onClick={() => handleApprove(team.id)} className="text-green-500" disabled={isPending}>
//                 <CheckCircle className="h-4 w-4 mr-1" />
//                 {isPending ? <Spinner /> : <span>Approve</span>}
//               </Button>
//               <Button variant="outline" size="sm" onClick={() => handleReject(team.id)} className="text-red-500">
//                 <XCircle className="h-4 w-4 mr-1" />
//                 <span>Reject</span>
//               </Button>
//             </>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };