import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Users } from 'lucide-react';
import { FriendsList, TeamsList } from '@/components/messages/ContactList';
import EmptyChat from '@/components/messages/EmptyChat';
import Chat from '@/components/messages/Chat';
import SearchBox from '@/components/messages/SearchBox';
import { mockTeams } from '@/components/messages/data';
import useUserService from '@/services/userService';
import { useAsync } from '@/hooks/use-async';
import { useParams, useNavigate } from 'react-router-dom';
import WebSocketManager from '@/webSocketServices/userService';

const Messages = () => {
  const { id, type, t } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('friends');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(id || null);
  const [userFriends, setUserFriends] = useState<any[]>([]);
  const [singleContact, setSingleContact] = useState<any>(null);

  const { loading, execute, ServerErrorModal } = useAsync();
  const { getUserFriends, getChat } = useUserService();

  const wsManager = useRef<WebSocketManager | null>(null);

  // Sync param to state
  useEffect(() => {
    setSelectedContactId(id || null);
  }, [id]);

  // Fetch friends and messages when id changes
  useEffect(() => {
    fetchFriends();
    setupWebSocket()
    if (id) fetchChat();

    return () => {
      if (wsManager.current) {
        wsManager.current.disconnect();
        wsManager.current = null;
      }
      setMessages([]);
    };
  }, [id]);


  //in this function all the conversations are being fetched 
  const fetchFriends = async () => {
    execute(
      getUserFriends(t, id).then((response) => {
        const { status, data, message } = response;
        if (!status) throw new Error(message || 'Failed to fetch profile.');

        if (data?.userData) {
          setSingleContact(data.userData);
        } else if (data?.userChats) {
          setUserFriends(data.userChats);
        }

        return response;
      }),
      {
        errorMessage: 'Failed fetching profile',
        showErrorModal: true,
      }
    );
  };

  const fetchChat = async () => {
    execute(
      getChat(id).then((response) => {
        const { status, data, message } = response;
        if (!status) throw new Error(message || 'Failed to load chat.');

        setMessages(data);
        return response;
      }),
      {
        errorMessage: 'Failed fetching messages',
        showErrorModal: true,
      }
    );
  };

  const setupWebSocket = () => {
    if (wsManager.current) {
      wsManager.current.disconnect();
    }

    try {
      wsManager.current = new WebSocketManager(id);
      wsManager.current.connect();

      wsManager.current.subscribeToUpdates = (data: any) => {

        if (Array.isArray(data)) {
          setMessages((prev) => [...prev, ...data]);
        } else if (data) {
          setMessages((prev) => [...prev, data]); // handle single object
        }

      };

    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  };

  const selectedContact = useMemo(
    () => userFriends.find((friend) => friend._id === selectedContactId) || null,
    [selectedContactId, userFriends]
  );

  const handleSendMessage = (message: string, reciever: string) => {
    if (!id) return;
    const newMessageData = {
      id: id,
      isOwn: reciever,
      sender: 'You',
      text: message,
    };

    wsManager.current?.queueMessage({
      type: 'USER',
      subType: type,
      matchId: id,
      data: { message, sender: 'You' },
      to: reciever || "dfs"
    });
  };



  const selectedTeam = useMemo(
    () => mockTeams.find((team) => team.id === selectedContactId) || null,
    [selectedContactId]
  );

  const filteredFriends = useMemo(() => {
    return userFriends.filter((friend) =>
      friend.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userFriends, searchQuery]);

  const filteredTeams = useMemo(() => {
    return mockTeams.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] overflow-hidden rounded-lg border shadow">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r bg-background">
          <SearchBox searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          <Tabs defaultValue="friends" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="friends">
                <User className="mr-2 h-4 w-4" />
                Friends
              </TabsTrigger>
              <TabsTrigger value="teams">
                <Users className="mr-2 h-4 w-4" />
                Teams
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-16rem)]">
              {activeTab === 'friends' && (
                <FriendsList
                  contacts={filteredFriends}
                  selectedContactId={selectedContactId}
                  onSelectContact={(id, type) => navigate(`/messages/${type}/m/${id}`)}
                />
              )}
              {activeTab === 'teams' && (
                <TeamsList
                  teams={filteredTeams}
                  selectedTeamId={selectedContactId}
                  onSelectTeam={(id) => navigate(`/messages/team/m/${id}`)}
                />
              )}
            </ScrollArea>
          </Tabs>
        </div>

        {/* Main Chat View */}
        {(selectedContact || singleContact) ? (
          <Chat
            contact={selectedContact || singleContact}
            team={selectedTeam}
            messages={messages}
            loading={loading}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <EmptyChat />
        )}

        {/* Mobile View Chat */}
        {selectedContactId && (
          <Chat
            contact={selectedContact || singleContact}
            team={selectedTeam}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={() => navigate('/messages')}
            loading={loading}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
