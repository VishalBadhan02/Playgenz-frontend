
import React, { useEffect, useState } from 'react';
import TeamHeader from '@/components/team-profile/TeamHeader';
import TeamTabs from '@/components/team-profile/TeamTabs';
import TeamOverview from '@/components/team-profile/TeamOverview';
import TeamMembers from '@/components/team-profile/TeamMembers';
import TeamMatches from '@/components/team-profile/TeamMatches';
import TeamAchievements from '@/components/team-profile/TeamAchievements';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useTeamService from '@/services/teamService';
import { ErrorModal } from '@/components/ErrorModal';
import { Spinner } from '@/components/Spinner';

const TeamProfile = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'matches' | 'achievements'>('overview');

  const { id } = useParams();
  const { getTeamDetails } = useTeamService();



  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['team-profile', id],
    queryFn: () => getTeamDetails(id),
    enabled: !!id,
  });

  if (isError) return <ErrorModal
    open={isError}
    onClose={() => refetch()}
    error={error}
    header="string"
    description="string"
  />;

  useEffect(() => {
    // console.log(data?.data)
    if (isLoading) {
      <Spinner />
    }
  }, [isLoading]);



  return (
    <div className="space-y-4 md:space-y-8">
      <TeamHeader header={profile?.data} />

      <TeamTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
      />

      {activeTab === 'overview' && <TeamOverview overview={profile?.data} />}
      {activeTab === 'members' && profile?.data?.memberVisibility ? <TeamMembers members={profile?.data.members} /> : <div>This profile is private for member visibility</div>}
      {activeTab === 'matches' && <TeamMatches />}
      {activeTab === 'achievements' && <TeamAchievements />}
    </div>
  );
};

export default TeamProfile;
