
import React, { useEffect, useState } from 'react';
import { Search, UserPlus, MessageSquare, Check, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAsync } from '@/hooks/use-async';
import useUserService from '@/services/userService';

// Mock user data
interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline' | 'sent' | 'none' | 'friends' | 'received';
  location?: string;
  sports?: string[];
  isFriend?: boolean;
  isPending?: boolean;
}

const UserSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();
  const { loading, execute, ServerErrorModal } = useAsync();
  const { getFriends } = useUserService();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce); // Cancel on cleanup
  }, [searchQuery]); // Run when searchQuery changes

  const fetchUsers = async () => {
    execute(
      getFriends(searchQuery)
        .then((response) => {
          const { status, data, message } = response;
          if (!status) {
            throw new Error(message || 'Login failed due to invalid credentials.');
          }

          const usersList = data.users?.map((user: any) => ({
            id: user?._id,
            name: user?.userName,
            avatar: user?.profilePicture,
            status: user?.status,
            location: 'Boston',
            sports: ['Tennis', 'Swimming'],
          })) || [];

          setUsers(usersList);
          // setFilteredUsers(usersList);

          return response;
        }),
      {
        errorMessage: "Failed fetching profile",
        showErrorModal: true,
      }
    );
  };



  // Filter users based on search query
  const filteredUsers = users?.filter(user =>
    searchQuery === '' ||
    user?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    user?.username?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    (user?.sports && user?.sports.some(sport =>
      sport?.toLowerCase().includes(searchQuery?.toLowerCase())
    ))
  );

  const handleUserClick = (user: User) => {
    window.location.href = `/profile/${user.id}`;
  };




  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Find Friends</h2>

      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or username..."
          className="pl-9 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Users list */}
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 block h-2 w-2 rounded-full border-2 border-background",
                        user.status === 'online' ? "bg-green-500" :
                          user.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{user.name}</h3>
                      <span className="text-xs text-muted-foreground">{user.username}</span>
                    </div>
                    {user.sports && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {user.status === "sent" && (
                          <Button variant="outline" size="sm">Undo</Button>
                        )}
                        {user.status === "friends" && (
                          <Button variant="secondary" size="sm">Unfriend</Button>
                        )}
                        {user.status === "none" && (
                          <Button variant="default" size="sm">Add</Button>
                        )}
                        {user.status === "received" && (
                          <Button variant="destructive" size="sm">Accept</Button>
                        )}

                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium mb-1">No users found</h3>
              <p>Try adjusting your search</p>
            </div>
          )}
        </div>
      </ScrollArea>


    </div>
  );
};

export default UserSearch;
