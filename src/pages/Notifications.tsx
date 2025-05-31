import React, { useEffect, useState } from 'react';
import {
  Bell,
  Calendar,
  Trophy,
  Users,
  MessageCircle,
} from 'lucide-react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import { ErrorModal } from '@/components/ErrorModal';
import useNotificationService from '@/services/notificationService';
import NotificationTabs from '@/components/notifications/NotificationTabs';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'friend' | 'team' | 'match' | 'tournament' | 'message' | 'achievement';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionable: boolean;
}

// Dummy data (replace with fetched data when backend is connected)
const notifications: Notification[] = [
  {
    id: '1',
    type: 'friend',
    title: 'Friend Request',
    description: 'John Smith sent you a friend request',
    time: '2 hours ago',
    read: false,
    actionable: true
  },
  {
    id: '2',
    type: 'team',
    title: 'Team Invitation',
    description: 'You have been invited to join Golden Eagles',
    time: '5 hours ago',
    read: false,
    actionable: true
  },
  {
    id: '3',
    type: 'match',
    title: 'Match Reminder',
    description: 'Your match with Phoenix Rising starts in 2 hours',
    time: '1 day ago',
    read: true,
    actionable: false
  },
  {
    id: '4',
    type: 'tournament',
    title: 'Tournament Update',
    description: 'Summer Basketball Championship schedule has been updated',
    time: '2 days ago',
    read: true,
    actionable: false
  },
  {
    id: '5',
    type: 'message',
    title: 'New Message',
    description: 'You have a new message from Mike in Thunder Strikers',
    time: '3 days ago',
    read: true,
    actionable: true
  },
  {
    id: '6',
    type: 'achievement',
    title: 'New Achievement',
    description: 'You\'ve unlocked "Hat-trick Hero" achievement!',
    time: '4 days ago',
    read: false,
    actionable: false
  }
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'requests' | 'team' | 'tournament' | 'achievement'>('all');
  const { getNotifications } = useNotificationService();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });

  useEffect(() => {
    console.log("Notifications data:", data?.data);
  }, [data]);



  const getFilteredNotifications = () => {

    const titlePicker = (type: string) => {
      const title =
        type === "user"
          ? "Friend Request"
          : type === "team"
            ? "Team Invitation"
            : type === "tournament"
              ? "Tournament Update"
              : "New Achievement";
      return title;
    };

    const typePicker = (type: string) => {
      const title =
        type === "user"
          ? "friend"
          : type === "team"
            ? "friend"
            : type === "tournament"
              ? "Tournament Update"
              : "New Achievement";
      return title;
    };

    const jsdnj = data?.data.map((value: any) => ({
      id: value?._id,
      type: typePicker(value?.type),
      title: titlePicker(value?.type),
      description: `${value?.data?.name} ${value?.message}`,
      time: formatDistanceToNow(new Date(value?.updatedAt), { addSuffix: true }),
      read: true,
      actionable: value?.status === 0 ? true : false
    }));

    let filtered = jsdnj;

    if (activeTab === 'unread') {
      filtered = filtered.filter(n => !n.read);
    }

    if (activeCategory !== 'all') {
      switch (activeCategory) {
        case 'requests':
          filtered = filtered.filter(n =>
            n.type === 'friend' || (n.type === 'team' && n.actionable)
          );
          break;
        case 'team':
          filtered = filtered.filter(n =>
            n.type === 'team' || n.type === 'match'
          );
          break;
        case 'tournament':
          filtered = filtered.filter(n => n.type === 'tournament');
          break;
        case 'achievement':
          filtered = filtered.filter(n => n.type === 'achievement');
          break;
      }
    }

    return filtered;
  };

  const getCategoryCount = (category: 'all' | 'requests' | 'team' | 'tournament' | 'achievement') => {
    let filtered = activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications;

    switch (category) {
      case 'all':
        return filtered.length;
      case 'requests':
        return filtered.filter(n =>
          n.type === 'friend' || (n.type === 'team' && n.actionable)
        ).length;
      case 'team':
        return filtered.filter(n =>
          n.type === 'team' || n.type === 'match'
        ).length;
      case 'tournament':
        return filtered.filter(n => n.type === 'tournament').length;
      case 'achievement':
        return filtered.filter(n => n.type === 'achievement').length;
      default:
        return 0;
    }
  };

  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <ErrorModal
        open={isError}
        onClose={() => refetch()}
        error={error}
        header="Server Error"
        description="We're experiencing some issues with our server. Please try again later."
      />
    );
  }

  return (
    <div className="space-y-8">

      <Tabs defaultValue={activeTab} className="w-full" onValueChange={(val) => setActiveTab(val as 'all' | 'unread')}>
        <NotificationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          getCategoryCount={getCategoryCount}
        />

        <TabsContent value="all" className="mt-6 space-y-4">
          {getFilteredNotifications().map((notification: any) => (
            <NotificationItem key={notification?.id} notification={notification} />
          ))}
          {getFilteredNotifications().length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notifications found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6 space-y-4">
          {getFilteredNotifications().map((notification: any) => (
            <NotificationItem key={notification?.id} notification={notification} />
          ))}
          {getFilteredNotifications().length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No unread notifications</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};






export default Notifications;






