
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SuperAdminTabs from '@/components/super-admin/components/SuperAdminTabs';
import SuperAdminHeader from '@/components/super-admin/components/SuperAdminHeader';

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Optional: Analytics tracking for admin actions
    console.log(`Admin switched to ${value} tab`);
  };

  return (
    <div className="space-y-4 md:space-y-6 w-full overflow-hidden px-2 sm:px-4 md:px-6">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Manage all aspects of the sports platform</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 p-3 sm:p-4 md:p-6">
          <SuperAdminHeader />
        </CardHeader>
        <CardContent className="p-0">
          <SuperAdminTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdmin;
