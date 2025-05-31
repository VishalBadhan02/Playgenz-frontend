
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TeamProfile from './profile/TeamProfile';
import TeamMembers from './TeamMembers';
import TeamInvitations from './TeamInvitations';
import TeamSettings from './TeamSettings';
import { useToast } from '@/hooks/use-toast';
import { mockTeamData, mockMembers, mockInvitations } from './data/mockTeamData';
import { TeamData, TeamMember, Invitation } from './types/teamTypes';
import { useIsMobile } from '@/hooks/use-mobile';
import useTeamService from '@/services/teamService';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ErrorModal } from '../ErrorModal';
import { Spinner } from '../Spinner';
import { formateTeamData } from '../utils/formateTeamData';

const TeamManagement: React.FC = () => {
  const [team, setTeam] = useState<TeamData>(mockTeamData);
  const [invitations, setInvitations] = useState<Invitation[]>(mockInvitations);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { id } = useParams()
  const { getTeamDetails, handleAddPlayer, handlePlayerUpdates, updateTeamDetails } = useTeamService();


  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['team-profile', id],
    queryFn: () => getTeamDetails(id),
    enabled: !!id,
  });

  console.log(data)

  const {
    mutate: sendInvite,
    isPending: isSendingInvite,
  } = useMutation({
    mutationFn: (playerData: object) =>
      handleAddPlayer(playerData),
    onSuccess: () => {
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to `
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


  const {
    mutate: handleUpdate,
    isPending: updateLoading,
  } = useMutation({
    mutationFn: ({ playerId, teamId, type }: { playerId: string, teamId: string, type: string }) =>
      handlePlayerUpdates(playerId, teamId, type),
    onSuccess: () => {
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to `
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


  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="Server Error"
    description="We're experiencing some issues with our server. Please try again later."
  />;

  useEffect(() => {
    // console.log(data?.data)
    if (isLoading) {
      <Spinner />
    }
  }, [isLoading]);


  const handleTeamUpdate = async (updatedTeam: Partial<TeamData>) => {
    const teamData = await formateTeamData(updatedTeam)
    console.log(updatedTeam)
    const res = await updateTeamDetails(teamData)

    if (res.status === true) {
      refetch()
      toast({
        title: "Team updated",
        description: "Team profile has been successfully updated"
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    await handleUpdate({ playerId: memberId, teamId: id, type: "remove" });
    refetch();
    toast({
      title: "Member removed",
      description: "Team member has been removed successfully"
    });
  };

  const handleRoleChange = async (memberId: string, newRole: TeamMember['role']) => {
    await handleUpdate({ playerId: memberId, teamId: id, type: newRole });
    refetch()
    toast({
      title: "Role updated",
      description: "Member role has been updated successfully"
    });
  };

  const handleCancelInvitation = (invitationId: string) => {
    setInvitations(prev => prev.filter(invitation => invitation.teamId !== invitationId));
    toast({
      title: "Invitation canceled",
      description: "The invitation has been canceled"
    });
  };

  const handleSendInvitation = async (userId: string, name: string) => {
    const newInvitation: Invitation = {
      teamId: id,
      playerId: userId,
      userName: name,
      status: 1,
      commit: "Player"
    };
    sendInvite(newInvitation);
    refetch()
    // setInvitations(prev => [...prev, newInvitation]);
    // toast({
    //   title: "Invitation sent",
    //   description: `An invitation has been sent to ${name}`
    // });
  };

  return (
    <div className="space-y-6 px-2 sm:px-0 pb-10 sm:pb-0">
      <Card className="border shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl">Team Management</CardTitle>
          <CardDescription className="text-sm sm:text-base">Manage your team's profile, members, and settings</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4 gap-0.5 p-1 text-xs' : 'grid-cols-4'}`}>
              <TabsTrigger value="profile" className={isMobile ? 'py-1.5 px-1' : ''}>Profile</TabsTrigger>
              <TabsTrigger value="members" className={isMobile ? 'py-1.5 px-1' : ''}>Members</TabsTrigger>
              <TabsTrigger value="invitations" className={isMobile ? 'py-1.5 px-0' : ''}>Invites</TabsTrigger>
              <TabsTrigger value="settings" className={isMobile ? 'py-1.5 px-1' : ''}>Settings</TabsTrigger>
            </TabsList>

            <div className="px-4 sm:px-0">
              <TabsContent value="profile" className="mt-4 sm:mt-6 focus-visible:outline-none focus-visible:ring-0">
                {data?.data && !isLoading && (
                  <TeamProfile team={data?.data} onUpdate={handleTeamUpdate} />
                )}
                {isLoading && (
                  <Spinner />
                )}
              </TabsContent>

              <TabsContent value="members" className="mt-4 sm:mt-6 focus-visible:outline-none focus-visible:ring-0">
                {data?.data && (<TeamMembers
                  members={data?.data?.members}
                  onRemove={handleRemoveMember}
                  onRoleChange={handleRoleChange}
                  onInvite={handleSendInvitation}
                />)}
              </TabsContent>

              <TabsContent value="invitations" className="mt-4 sm:mt-6 focus-visible:outline-none focus-visible:ring-0">
                <TeamInvitations
                  invitations={invitations}
                  onCancel={handleCancelInvitation}
                  onSendNew={handleSendInvitation}
                />
              </TabsContent>

              <TabsContent value="settings" className="mt-4 sm:mt-6 focus-visible:outline-none focus-visible:ring-0">
                {data?.data ?
                  <TeamSettings team={data?.data} onUpdate={refetch} />
                  : <Spinner />
                }
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
