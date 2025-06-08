
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import FindTeam from "./pages/FindTeam";
import TeamRegistration from "./pages/TeamRegistration";
import Matches from "./pages/Matches";
import Tournaments from "./pages/Tournaments";
import TournamentDetail from "./pages/TournamentDetail";
import TournamentDashboard from "./pages/TournamentDashboard";
import TournamentRegistration from "./pages/TournamentRegistration";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import VenueAdmin from "./pages/VenueAdmin";
import Leaderboard from "./pages/Leaderboard";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import SearchUsers from "./pages/SearchUsers";
import Profile from "./pages/Profile";
import TeamProfile from "./pages/TeamProfile";
import NotFound from "./pages/NotFound";
import SuperAdmin from "./pages/SuperAdmin";
import TeamManagementPage from "./pages/TeamManagement";
import Bookings from "./pages/Bookings";
import Scorecard from "./pages/ScoreCard";
import { GlobalErrorHandler } from "./components/RootLayout";
import EditProfile from "./pages/EditProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalErrorHandler />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Auth Routes (Public but restricted - redirects if already logged in) */}
              <Route element={<PublicRoute restricted={true} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/team/manage/:id" element={<TeamManagementPage />} />
                <Route path="/team/:id" element={<TeamProfile />} />
                <Route path="/register-team" element={<TeamRegistration />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/venue/:id" element={<VenueDetails />} />
                <Route path="/venues/admin" element={<VenueAdmin />} />
                <Route path="/tournaments" element={<Tournaments />} />
                <Route path="/tournament/:id" element={<TournamentDetail />} />
                <Route path="/tournament/:id/dashboard" element={<TournamentDashboard />} />
                <Route path="/register-tournament" element={<TournamentRegistration />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/achievements" element={<Profile />} />
                <Route path="/find-team" element={<FindTeam />} />
                <Route path="/search-users" element={<SearchUsers />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages/:type?/:t?/:id?" element={<Messages />} />
                <Route path="/profile/:id?" element={<Profile />} />
                <Route path="/settings" element={<Profile />} />
                <Route path="/super-admin" element={<SuperAdmin />} />
                <Route path="/scorecard/:sport?/:id?" element={<Scorecard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
