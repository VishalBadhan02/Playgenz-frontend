
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFiltersProps {
  searchQuery: string;
  roleFilterValue: string;
  statusFilterValue: string;
  onSearchChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

const UserFilters = ({
  searchQuery,
  roleFilterValue,
  statusFilterValue,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange
}: UserFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-9 w-full"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Select
          value={roleFilterValue}
          onValueChange={onRoleFilterChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-roles">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="team_captain">Team Captain</SelectItem>
            <SelectItem value="venue_admin">Venue Admin</SelectItem>
            <SelectItem value="tournament_organizer">Tournament Organizer</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={statusFilterValue}
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-statuses">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserFilters;
