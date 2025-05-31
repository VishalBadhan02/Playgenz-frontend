
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRole, UserStatus } from '../types/user-types';

export const getRoleBadge = (role: UserRole) => {
  switch (role) {
    case 'super_admin':
      return <Badge className="bg-purple-600">Super Admin</Badge>;
    case 'tournament_organizer':
      return <Badge className="bg-blue-600">Tournament Organizer</Badge>;
    case 'team_captain':
      return <Badge className="bg-green-600">Team Captain</Badge>;
    case 'venue_admin':
      return <Badge className="bg-yellow-600">Venue Admin</Badge>;
    default:
      return <Badge variant="outline">User</Badge>;
  }
};

export const getStatusBadge = (status: UserStatus) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'suspended':
      return <Badge className="bg-yellow-500">Suspended</Badge>;
    case 'pending':
      return <Badge className="bg-blue-500">Pending</Badge>;
    case 'banned':
      return <Badge className="bg-red-500">Banned</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};
