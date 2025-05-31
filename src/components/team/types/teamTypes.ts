
// Define shared team-related types

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'Captain' | 'Coach' | 'Player' | 'Manager';
  joinedDate: string;
  status: 'active' | 'inactive';
  isFriend?: boolean;
  modalId: any
}

export interface TeamData {
  id: string;
  name: string;
  sport: string;
  description: string;
  location: string;
  foundedDate: string;
  logo?: string;
  coverImage?: string;
  members: any;
  openPositions: number;
  contactEmail: string;
  wins: number;
  losses: number;
  upcomingMatches: number;
}

export interface Invitation {
  teamId: string;
  playerId: string;
  userName: string;
  avatar?: string;
  status: 0 | 1 | 2;
  commit: string
}
