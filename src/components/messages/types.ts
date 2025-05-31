
export type ContactStatus = 'online' | 'offline' | 'away';

export type Contact = {
  _id: string;
  name: string;
  avatar?: string;
  status: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isTyping?: boolean;
  type: string;
};

export type Team = {
  id: string;
  name: string;
  avatar?: string;
  members: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  isOwn: boolean;
};
