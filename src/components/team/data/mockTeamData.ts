
import { TeamData, TeamMember, Invitation } from '../types/teamTypes';

// Mock data
export const mockTeamData: TeamData = {
  id: '1',
  name: 'Thunder Strikers',
  sport: 'Basketball',
  description: 'Elite basketball team with 5+ years of competitive play. We focus on teamwork, skill development, and strategic gameplay.',
  location: 'New York, USA',
  foundedDate: 'January 2019',
  members: 12,
  openPositions: 3,
  contactEmail: 'thunderstrikers@example.com',
  wins: 24,
  losses: 6,
  upcomingMatches: 3
};

export const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Captain',
    joinedDate: 'Jan 2019',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Coach',
    joinedDate: 'Feb 2019',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Brown',
    role: 'Player',
    joinedDate: 'Mar 2019',
    status: 'active'
  },
  {
    id: '4',
    name: 'Jessica Chen',
    role: 'Player',
    joinedDate: 'Jul 2020',
    status: 'active'
  },
  {
    id: '5',
    name: 'David Liu',
    role: 'Player',
    joinedDate: 'Sep 2021',
    status: 'active'
  }
];

export const mockInvitations: Invitation[] = [
  {
    id: '1',
    userId: '101',
    name: 'John Smith',
    status: 'pending',
    date: '2023-10-15'
  },
  {
    id: '2',
    userId: '102',
    name: 'Emma Rodriguez',
    status: 'pending',
    date: '2023-10-17'
  }
];
