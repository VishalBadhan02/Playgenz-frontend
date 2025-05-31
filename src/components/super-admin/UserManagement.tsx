
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { User } from './types/user-types';
import { mockUsers } from './data/mockUsers';
import UserCard from './components/UserCard';
import UsersTable from './components/UsersTable';
import UserDetailsDialog from './components/UserDetailsDialog';
import UserFilters from './components/UserFilters';

const UserManagement = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [roleFilterValue, setRoleFilterValue] = useState<string>('all-roles');
  const [statusFilterValue, setStatusFilterValue] = useState<string>('all-statuses');

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRoleFilter = roleFilterValue === 'all-roles' ? true : user.role === roleFilterValue;
    const matchesStatusFilter = statusFilterValue === 'all-statuses' ? true : user.status === statusFilterValue;
    
    return matchesSearch && matchesRoleFilter && matchesStatusFilter;
  });

  const handleActionClick = (action: string, user: User) => {
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setUserDetailsOpen(true);
        break;
      case 'promote':
        toast({
          title: "Role updated",
          description: `${user.name} has been promoted to Team Captain`
        });
        break;
      case 'suspend':
        toast({
          title: "User suspended",
          description: `${user.name}'s account has been suspended`
        });
        break;
      case 'activate':
        toast({
          title: "User activated",
          description: `${user.name}'s account has been activated`
        });
        break;
      case 'delete':
        toast({
          title: "User deleted",
          description: `${user.name}'s account has been deleted`
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden p-2 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">User Management</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage user accounts, roles, and permissions
        </p>
        
        <UserFilters 
          searchQuery={searchQuery}
          roleFilterValue={roleFilterValue}
          statusFilterValue={statusFilterValue}
          onSearchChange={setSearchQuery}
          onRoleFilterChange={setRoleFilterValue}
          onStatusFilterChange={setStatusFilterValue}
        />
      </div>

      <div className="w-full overflow-x-auto">
        {/* Mobile view */}
        {isMobile ? (
          <div className="grid gap-3 sm:gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onActionClick={handleActionClick} 
                />
              ))
            ) : (
              <p className="text-center py-8 text-muted-foreground">No users found matching your filters</p>
            )}
          </div>
        ) : (
          /* Desktop view */
          <div className="rounded-md border overflow-hidden">
            <UsersTable 
              users={filteredUsers} 
              onActionClick={handleActionClick} 
            />
          </div>
        )}
      </div>

      {/* User details dialog */}
      {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={userDetailsOpen}
          onOpenChange={setUserDetailsOpen}
          onAction={handleActionClick}
        />
      )}
    </div>
  );
};

export default UserManagement;
