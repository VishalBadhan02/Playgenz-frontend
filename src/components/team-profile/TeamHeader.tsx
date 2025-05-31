
import React from 'react';
import { Users, Edit, Settings, Share } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const TeamHeader: React.FC<any> = ({ header }) => {
  console.log(header)
  const isMobile = useIsMobile();

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent p-4 md:p-8 text-white">
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-white bg-white">
            <Users className="h-full w-full p-4 text-muted-foreground" />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{header?.name}</h1>
            <p className="text-white/80">
              {header?.sport ? `${header.sport.charAt(0).toUpperCase()}${header.sport.slice(1)}` : ''} Team
            </p>
            <div className="mt-2 flex justify-center gap-3 md:gap-4 md:justify-start">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xs text-white/70">Members</span>
                <span className="font-semibold">{header?.members?.lenght || "0"}</span>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <span className="text-xs text-white/70">Matches</span>
                <span className="font-semibold">32</span>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <span className="text-xs text-white/70">Tournaments</span>
                <span className="font-semibold">5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3 md:mt-0">
          <button className="rounded-full bg-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-primary hover:bg-white/90 transition-colors">
            {isMobile ? (
              <Edit className="h-4 w-4" />
            ) : (
              <>
                <Edit className="mr-2 inline-block h-4 w-4" />
                Edit Team
              </>
            )}
          </button>

          <button className="rounded-full bg-white/20 p-1.5 md:px-2 md:py-2 hover:bg-white/30 transition-colors">
            <Settings className="h-4 w-4" />
          </button>

          <button className="rounded-full bg-white/20 p-1.5 md:px-2 md:py-2 hover:bg-white/30 transition-colors">
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
