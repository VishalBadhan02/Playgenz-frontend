
import { Contact, Team, Message } from './types';

export const mockFriends: Contact[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    avatar: '/placeholder.svg',
    status: 'online',
    lastMessage: 'Are you coming to practice today?',
    lastMessageTime: '10m ago',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'Mike Thompson',
    avatar: '/placeholder.svg',
    status: 'offline',
    lastMessage: 'Great game yesterday!',
    lastMessageTime: '2h ago',
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: '/placeholder.svg',
    status: 'online',
    lastMessage: 'Can you help me with the tournament registration?',
    lastMessageTime: '1h ago',
    unreadCount: 2,
    isTyping: true,
  },
  {
    id: '4',
    name: 'David Liu',
    avatar: '/placeholder.svg',
    status: 'away',
    lastMessage: 'Check out this new venue I found',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Jessica Chen',
    avatar: '/placeholder.svg',
    status: 'online',
    lastMessage: "Let me know when you're free to practice",
    lastMessageTime: '3d ago',
    unreadCount: 0,
  },
];

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Thunderbolts FC',
    avatar: '/placeholder.svg',
    members: 18,
    lastMessage: 'Coach: Everyone be at the field by 5pm',
    lastMessageTime: '30m ago',
    unreadCount: 5,
  },
  {
    id: 't2',
    name: 'City Strikers',
    avatar: '/placeholder.svg',
    members: 22,
    lastMessage: 'Alex: Has anyone seen my cleats?',
    lastMessageTime: '2h ago',
    unreadCount: 0,
  },
  {
    id: 't3',
    name: 'East Side Volleyball',
    avatar: '/placeholder.svg',
    members: 14,
    lastMessage: 'Tournament details have been shared',
    lastMessageTime: 'Yesterday',
    unreadCount: 12,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '1',
    text: 'Hey, how are you doing?',
    timestamp: '10:15 AM',
    status: 'read',
    isOwn: false,
  },
  
];
