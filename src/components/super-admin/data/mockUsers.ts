
import { User } from '../types/user-types';

// Mock data for users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'user',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2023-06-28',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'team_captain',
    status: 'active',
    joinDate: '2023-02-20',
    lastActive: '2023-06-25',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Michael Wong',
    email: 'michael@example.com',
    role: 'venue_admin',
    status: 'active',
    joinDate: '2023-03-10',
    lastActive: '2023-06-27',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Emma Garcia',
    email: 'emma@example.com',
    role: 'tournament_organizer',
    status: 'active',
    joinDate: '2023-01-05',
    lastActive: '2023-06-28',
    profileImage: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'user',
    status: 'suspended',
    joinDate: '2023-04-12',
    lastActive: '2023-05-15',
    profileImage: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: '6',
    name: 'Olivia Taylor',
    email: 'olivia@example.com',
    role: 'user',
    status: 'pending',
    joinDate: '2023-06-01',
    lastActive: '2023-06-01',
    profileImage: 'https://i.pravatar.cc/150?img=6'
  },
  {
    id: '7',
    name: 'William Davis',
    email: 'william@example.com',
    role: 'user',
    status: 'banned',
    joinDate: '2023-02-18',
    lastActive: '2023-04-20',
    profileImage: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: '8',
    name: 'David Miller',
    email: 'david@example.com',
    role: 'super_admin',
    status: 'active',
    joinDate: '2022-12-10',
    lastActive: '2023-06-28',
    profileImage: 'https://i.pravatar.cc/150?img=8'
  }
];
