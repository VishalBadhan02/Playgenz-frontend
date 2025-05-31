
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';

const SuperAdminHeader = () => {
  return (
    <>
      <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-1 sm:gap-2">
        <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        Admin Controls
      </CardTitle>
      <CardDescription className="text-xs sm:text-sm">
        You have full access to all administrative functions
      </CardDescription>
    </>
  );
};

export default SuperAdminHeader;
