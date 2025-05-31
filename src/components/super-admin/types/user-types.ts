
export type UserStatus = 'active' | 'suspended' | 'pending' | 'banned';
export type UserRole = 'user' | 'venue_admin' | 'team_captain' | 'tournament_organizer' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  lastActive: string;
  profileImage?: string;
}
