
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, Calendar, Trophy, MapPin, Users, Search, 
  Award, Bell, BarChart, Settings, LogOut, PlusCircle, MessageSquare,
  ChevronLeft, ChevronRight, Menu  // Added Menu icon import
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, alert }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all",
        isActive 
          ? "bg-accent text-white" 
          : "text-foreground hover:bg-accent/10 hover:text-accent"
      )}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
      {alert && (
        <span className="ml-auto flex h-2 w-2 rounded-full bg-accent" />
      )}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Main sidebar */}
      {isOpen && (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-background transition-all duration-300 ease-in-out">
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center">
              <h2 className="px-4 text-lg font-semibold tracking-tight">
                Navigation
              </h2>
              <button 
                onClick={toggleSidebar}
                className="rounded-full p-1 hover:bg-accent/10 text-muted-foreground hover:text-accent"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <ScrollArea className="flex-1 overflow-auto">
              <div className="flex flex-col space-y-6 px-4">
                <div className="space-y-1">
                  <div className="space-y-1">
                    <SidebarItem icon={Home} label="Home" to="/home" />
                    <SidebarItem icon={Calendar} label="Bookings" to="/bookings" />
                    <SidebarItem icon={Calendar} label="Matches" to="/matches" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="px-4 text-lg font-semibold tracking-tight">
                    Competitions
                  </h2>
                  <div className="space-y-1">
                    <SidebarItem icon={Trophy} label="Tournaments" to="/tournaments" />
                    <SidebarItem icon={PlusCircle} label="Register Tournament" to="/register-tournament" />
                    <SidebarItem icon={BarChart} label="Leaderboard" to="/leaderboard" />
                    <SidebarItem icon={Award} label="Achievements" to="/achievements" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="px-4 text-lg font-semibold tracking-tight">
                    Teams
                  </h2>
                  <div className="space-y-1">
                    <SidebarItem icon={Users} label="Team Management" to="/teams" />
                    <SidebarItem icon={Search} label="Find Team" to="/find-team" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="px-4 text-lg font-semibold tracking-tight">
                    Venues
                  </h2>
                  <div className="space-y-1">
                    <SidebarItem icon={MapPin} label="Venues" to="/venues" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="px-4 text-lg font-semibold tracking-tight">
                    Account
                  </h2>
                  <div className="space-y-1">
                    <SidebarItem icon={Bell} label="Notifications" to="/notifications" alert={true} />
                    <SidebarItem icon={MessageSquare} label="Messages" to="/messages" alert={true} />
                    <SidebarItem icon={Settings} label="Settings" to="/settings" />
                    <SidebarItem icon={LogOut} label="Logout" to="/logout" />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </aside>
      )}
      
      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed left-4 top-20 z-40 rounded-full p-2 hover:bg-accent/10 text-muted-foreground hover:text-accent flex items-center justify-center shadow-md bg-background"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
