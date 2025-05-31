
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, BarChart, Calendar, Bell, MessageSquare, Menu, X } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import { ThemeSelector } from './ThemeSelector';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        // Only auto-open on larger screens if it wasn't explicitly closed
        if (!localStorage.getItem('sidebarClosed')) {
          setIsSidebarOpen(true);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when location changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  // Save sidebar state to localStorage
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      if (isSidebarOpen) {
        localStorage.removeItem('sidebarClosed');
      } else {
        localStorage.setItem('sidebarClosed', 'true');
      }
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Overlay to close sidebar on mobile */}
        {isSidebarOpen && window.innerWidth < 1024 && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out pb-16 md:pb-0", // Add padding to bottom for mobile nav
            isSidebarOpen ? "lg:ml-72" : "ml-0" // Simplified margin logic
          )}
        >
          <div className="container py-6 px-4 sm:px-6 animate-fade-in">
            <div className="fixed bottom-20 right-6 z-40 md:bottom-6">
              <ThemeSelector />
            </div>
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation Bar for Mobile Screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link 
            to="/home" 
            className={cn(
              "flex flex-col items-center justify-center text-xs gap-1 transition-colors",
              location.pathname === "/home" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/leaderboard" 
            className={cn(
              "flex flex-col items-center justify-center text-xs gap-1 transition-colors",
              location.pathname === "/leaderboard" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart size={20} />
            <span>Leaderboard</span>
          </Link>
          
          <Link 
            to="/matches" 
            className={cn(
              "flex flex-col items-center justify-center text-xs gap-1 transition-colors",
              location.pathname === "/matches" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Calendar size={20} />
            <span>Matches</span>
          </Link>
          
          <Link 
            to="/messages" 
            className={cn(
              "flex flex-col items-center justify-center text-xs gap-1 transition-colors relative",
              location.pathname === "/messages" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MessageSquare size={20} />
            <span>Messages</span>
            <span className="absolute top-2 right-1/3 h-2 w-2 rounded-full bg-accent" />
          </Link>
          
          <Link 
            to="/notifications" 
            className={cn(
              "flex flex-col items-center justify-center text-xs gap-1 transition-colors relative",
              location.pathname === "/notifications" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bell size={20} />
            <span>Notifications</span>
            <span className="absolute top-2 right-1/3 h-2 w-2 rounded-full bg-accent" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
