
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, User, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import UserSearch from '@/components/messages/UserSearch';


interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className={cn(
        "container flex h-16 items-center justify-between px-4 sm:px-6",
        isSidebarOpen ? "lg:ml-72" : "ml-0" // Simplified margin logic
      )}>
        {/* Left section with menu toggle and logo */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={toggleSidebar}
              className="inline-flex lg:hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              PlayGenzz
            </span>
          </Link>
        </div>

        {/* Right section with search and profile */}
        <div className="flex items-center justify-end space-x-4">
          {isAuthenticated && (
            <>
              <div className={cn(
                "transition-all duration-300 overflow-hidden",
                showSearch ? "w-full max-w-xs" : "w-0"
              )}>
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search for teams, tournaments..."
                    className="w-full rounded-full bg-secondary pl-8 pr-4 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-accent/10 hover:text-accent",
                      showSearch && "text-accent"
                    )}
                    aria-label="Search users"
                  >
                    <Search size={18} />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <UserSearch />
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors overflow-hidden">
                  <User size={18} className="text-primary" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {!isAuthenticated && (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
