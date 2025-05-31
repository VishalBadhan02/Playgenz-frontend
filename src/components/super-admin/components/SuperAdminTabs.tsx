
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, MapPin, Calendar, AlertCircle, Cog } from 'lucide-react';
import UserManagement from '@/components/super-admin/UserManagement';
import TournamentApprovals from '@/components/super-admin/TournamentApprovals';
import VenueManagement from '@/components/super-admin/VenueManagement';
import MatchVerification from '@/components/super-admin/MatchVerification';
import SystemSettings from '@/components/super-admin/SystemSettings';
import ReportManagement from '@/components/super-admin/ReportManagement';
import { useIsMobile } from '@/hooks/use-mobile';

interface SuperAdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const SuperAdminTabs = ({ activeTab, onTabChange }: SuperAdminTabsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={onTabChange}
      className="w-full"
    >
      <div className="overflow-x-auto px-2 sm:px-4 md:px-6 pt-2 sm:pt-4 md:pt-6">
        <TabsList className="w-full md:w-auto justify-start mb-2 sm:mb-4 overflow-x-auto flex-nowrap">
          <TabsTrigger value="users" className="flex items-center gap-1 flex-shrink-0">
            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Users</span>
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="flex items-center gap-1 flex-shrink-0">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Tournaments</span>
          </TabsTrigger>
          <TabsTrigger value="venues" className="flex items-center gap-1 flex-shrink-0">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Venues</span>
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex items-center gap-1 flex-shrink-0">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Matches</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1 flex-shrink-0">
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1 flex-shrink-0">
            <Cog className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm whitespace-nowrap">Settings</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="users" className="p-0 m-0">
        <UserManagement />
      </TabsContent>
      
      <TabsContent value="tournaments" className="p-0 m-0">
        <TournamentApprovals />
      </TabsContent>
      
      <TabsContent value="venues" className="p-0 m-0">
        <VenueManagement />
      </TabsContent>
      
      <TabsContent value="matches" className="p-0 m-0">
        <MatchVerification />
      </TabsContent>
      
      <TabsContent value="reports" className="p-0 m-0">
        <ReportManagement />
      </TabsContent>
      
      <TabsContent value="settings" className="p-0 m-0">
        <SystemSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SuperAdminTabs;
