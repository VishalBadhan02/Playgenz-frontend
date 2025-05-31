
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAsync } from '@/hooks/use-async';
import { Search, ArrowLeft, UserPlus, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock user data - in a real app, this would come from an API
type UserStatus = 'online' | 'away' | 'offline';

interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  status: UserStatus;
  location?: string;
  sports?: string[];
  isFriend?: boolean;
  isPending?: boolean;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    username: '@sarahw',
    avatar: '/placeholder.svg',
    status: 'online',
    location: 'New York',
    sports: ['Football', 'Basketball'],
  },
  {
    id: '2',
    name: 'Mike Thompson',
    username: '@miket',
    avatar: '/placeholder.svg',
    status: 'offline',
    location: 'Los Angeles',
    sports: ['Cricket', 'Tennis'],
    isFriend: true,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    username: '@emmar',
    avatar: '/placeholder.svg',
    status: 'online',
    location: 'Chicago',
    sports: ['Basketball', 'Volleyball'],
    isPending: true,
  },
  {
    id: '4',
    name: 'David Liu',
    username: '@davidl',
    avatar: '/placeholder.svg',
    status: 'away',
    location: 'San Francisco',
    sports: ['Baseball', 'Football'],
  },
  {
    id: '5',
    name: 'Jessica Chen',
    username: '@jessicac',
    avatar: '/placeholder.svg',
    status: 'online',
    location: 'Boston',
    sports: ['Tennis', 'Swimming'],
  },
  {
    id: '6',
    name: 'Alex Johnson',
    username: '@alexj',
    avatar: '/placeholder.svg',
    status: 'offline',
    location: 'Seattle',
    sports: ['Hockey', 'Football'],
  },
  {
    id: '7',
    name: 'Taylor Swift',
    username: '@taylors',
    avatar: '/placeholder.svg',
    status: 'online',
    location: 'Nashville',
    sports: ['Volleyball', 'Basketball'],
  },
];

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { execute, loading } = useAsync();

  // Filter users based on search query and active tab
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.sports && user.sports.some(sport => 
        sport.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'friends') return matchesSearch && user.isFriend;
    if (activeTab === 'pending') return matchesSearch && user.isPending;
    
    return matchesSearch;
  });

  const handleAddFriend = async (userId: string) => {
    try {
      await execute(
        // In a real app, this would be an API call
        new Promise<void>((resolve) => {
          setTimeout(() => {
            setUsers(prevUsers => 
              prevUsers.map(user => 
                user.id === userId 
                  ? { ...user, isPending: true, isFriend: false } 
                  : user
              )
            );
            resolve();
          }, 500);
        }),
        {
          successMessage: "Friend request sent successfully!"
        }
      );
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleCancelRequest = async (userId: string) => {
    try {
      await execute(
        // In a real app, this would be an API call
        new Promise<void>((resolve) => {
          setTimeout(() => {
            setUsers(prevUsers => 
              prevUsers.map(user => 
                user.id === userId 
                  ? { ...user, isPending: false } 
                  : user
              )
            );
            resolve();
          }, 500);
        }),
        {
          successMessage: "Friend request canceled"
        }
      );
    } catch (error) {
      console.error("Error canceling friend request:", error);
    }
  };

  const handleRemoveFriend = async (userId: string) => {
    try {
      await execute(
        // In a real app, this would be an API call
        new Promise<void>((resolve) => {
          setTimeout(() => {
            setUsers(prevUsers => 
              prevUsers.map(user => 
                user.id === userId 
                  ? { ...user, isFriend: false } 
                  : user
              )
            );
            resolve();
          }, 500);
        }),
        {
          successMessage: "Friend removed successfully"
        }
      );
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Find Friends</h1>
      </div>
      
      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name, username, location or sports..."
          className="pl-9 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Tabs for filtering */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Users list */}
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div 
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
              >
                {/* User info */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span 
                      className={cn(
                        "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background",
                        user.status === 'online' ? "bg-green-500" :
                        user.status === 'away' ? "bg-yellow-500" : "bg-gray-400"
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      <span className="text-sm text-muted-foreground">{user.username}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      {user.location && <span>{user.location}</span>}
                    </div>
                    {user.sports && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {user.sports.map(sport => (
                          <Badge key={sport} variant="secondary" className="text-xs">
                            {sport}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Friend actions */}
                {user.isFriend ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRemoveFriend(user.id)}
                    disabled={loading}
                  >
                    <Check className="mr-1 h-3.5 w-3.5 text-green-500" />
                    Friends
                  </Button>
                ) : user.isPending ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCancelRequest(user.id)}
                    disabled={loading}
                  >
                    <X className="mr-1 h-3.5 w-3.5" />
                    Cancel
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddFriend(user.id)}
                    disabled={loading}
                  >
                    <UserPlus className="mr-1 h-3.5 w-3.5" />
                    Add
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
              <h3 className="text-lg font-medium mb-1">No users found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchUsers;
