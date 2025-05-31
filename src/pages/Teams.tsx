
import React, { useEffect } from 'react';
import { Plus, Trophy, Calendar, Users, MoreHorizontal, Search, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import useUserService from '@/services/userService';

interface Team {
  id: string;
  name: string;
  sport: string;
  members: number;
  upcomingMatches: number;
  wins: number;
  losses: number;
  role: 'Captain' | 'Manager' | 'Player';
  imageUrl?: string;
}

const teams: Team[] = [
  {
    id: '1',
    name: 'Thunder Strikers',
    sport: 'Basketball',
    members: 12,
    upcomingMatches: 2,
    wins: 8,
    losses: 2,
    role: 'Captain',
    imageUrl: 'https://via.placeholder.com/64'
  },
  {
    id: '2',
    name: 'City Wolves',
    sport: 'Football',
    members: 18,
    upcomingMatches: 1,
    wins: 5,
    losses: 3,
    role: 'Player',
    imageUrl: 'https://via.placeholder.com/64'
  },
  {
    id: '3',
    name: 'Phoenix Rising',
    sport: 'Basketball',
    members: 10,
    upcomingMatches: 3,
    wins: 12,
    losses: 4,
    role: 'Manager',
    imageUrl: 'https://via.placeholder.com/64'
  }
];

const Teams = () => {
  const { getProfile } = useUserService();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getProfile(" "),
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Teams</h1>
          <p className="text-muted-foreground">Manage your teams and team memberships</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/register-team" className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Create Team</span>
          </Link>
          <Link to="/find-team" className="flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 hover:bg-secondary/90 transition-colors">
            <Search className="h-4 w-4" />
            <span>Find Teams</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.userTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="rounded-lg border p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Plus className="h-6 w-6 text-foreground" />
          </div>

          <h3 className="text-lg font-medium">Create a New Team</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Start a new team and invite your friends to join
          </p>

          <Link to="/register-team" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition-colors">
            Create Team
          </Link>
        </Card>

        <Card className="rounded-lg border p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Search className="h-6 w-6 text-foreground" />
          </div>

          <h3 className="text-lg font-medium">Find Teams</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Find teams to play against or join as a member
          </p>

          <Link to="/find-team" className="mt-4 inline-block rounded-md bg-secondary px-4 py-2 text-sm hover:bg-secondary/90 transition-colors">
            Browse Teams
          </Link>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Team Invitations</h2>
        <div className="rounded-lg border p-6">
          <div className="text-center">
            <p className="text-muted-foreground">No pending invitations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="overflow-hidden rounded-lg border hover:border-accent/40 transition-colors hover-scale">
      <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{team.name}</h3>
          <button className="rounded-full p-1 hover:bg-white/20 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-white/80">{team.sport}</p>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-3 w-3" />
            </div>
            <span className="text-sm">
              {team.wins}W - {team.losses}L
            </span>
          </div>

          <div className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
            {team.role}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{team.members} Members</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{team.upcomingMatches} Upcoming</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to={`/team/${team?.id}`} className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-primary/90 transition-colors text-center">
            View Team
          </Link>
          {(team.role === 'Captain' || team.role === 'Manager') && (
            <Link to={`/team/manage/${team?.id}`} className="rounded-md border px-3 py-1.5 text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-1">
              <Settings className="h-3 w-3" />
              <span>Manage</span>
            </Link>
          )}
          {team.role === 'Player' && (
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-secondary transition-colors">
              Leave Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
