import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFriends } from '@/hooks/userFriends';
import { checkExistingPlayer } from '@/util/checkExistingPlayer';

interface FriendSelectorProps {
  onSelectFriend: (userId: string, name: string) => void;
  members: any;
}

const FriendSelector: React.FC<FriendSelectorProps> = ({ onSelectFriend, members }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: userFriends } = useFriends();

  const [filteredFriends, setFilteredFriends] = useState<any[]>([]);

  useEffect(() => {
    if (!userFriends || !userFriends.userFriends) return;
    console.log(members)
    const filterFriends = async () => {
      const filtered = await checkExistingPlayer(members, userFriends.userFriends);
      setFilteredFriends(filtered);
    };

    filterFriends();
  }, [userFriends, members]);

  const searchedFriends = filteredFriends.filter(friend =>
    friend?.friend?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search friends..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {searchedFriends.length > 0 ? (
            searchedFriends.map((friend) => (
              <div
                key={friend?.friend?._id}
                className="flex items-center justify-between rounded-md p-2 hover:bg-accent/10"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={friend?.friend?.profilePicture} alt={friend?.friend?.userName} />
                      <AvatarFallback>{friend?.friend?.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full border-2 border-background ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{friend?.friend?.userName}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {friend.status === 1 ? "Friend" : "Invite"}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onSelectFriend(friend?.friend?._id, friend?.friend?.userName)}
                >
                  Invite
                </Button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Search className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
              <p>No friends found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendSelector;
