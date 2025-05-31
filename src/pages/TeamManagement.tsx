
import React from 'react';
import TeamManagementComponent from '@/components/team/TeamManagement';

const TeamManagementPage = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-8">Team Management</h1>
      <TeamManagementComponent />
    </div>
  );
};

export default TeamManagementPage;
