import React from 'react';
import { Bell, Calendar, Trophy, Users, MessageCircle, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import useNotificationService from '@/services/notificationService';

interface Notification {
  id: string;
  type: 'friend' | 'team' | 'match' | 'tournament' | 'message' | 'achievement';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionable: boolean;
}

export const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { handleRequest } = useNotificationService();

  const mutation = useMutation({
    mutationFn: ({ notificationId, actionType }: { notificationId: string; actionType: 'accept' | 'decline' }) =>
      handleRequest(notificationId, actionType),
    onSuccess: () => {
      // Handle successful mutation (e.g., show a success message or update local state)
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error('Error handling notification:', error);
    },
  });

  const getIcon = () => {
    switch (notification?.type) {
      case 'friend':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'team':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'match':
        return <Calendar className="h-5 w-5 text-primary" />;
      case 'tournament':
        return <Trophy className="h-5 w-5 text-accent" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
      case 'achievement':
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div
      className={`rounded-lg ${notification?.read ? 'bg-background' : 'bg-primary/5 border border-primary/10'
        } p-4 hover:bg-muted/50 transition-colors`}
    >
      <div className="flex gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{getIcon()}</div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`font-medium ${notification?.read ? '' : 'text-primary'}`}>{notification?.title}</h3>
            <span className="text-xs text-muted-foreground">{notification?.time}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{notification?.description}</p>

          {notification?.actionable && (
            <div className="mt-3 flex gap-2">
              <button
                className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90 transition-colors"
                onClick={() => mutation.mutate({ notificationId: notification?.id, actionType: 'accept' })}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Processing...' : notification?.type === 'friend' ? 'Accept' : notification?.type === 'team' ? 'Join' : notification?.type === 'message' ? 'Reply' : 'View'}
              </button>
              <button
                className="rounded-md border px-3 py-1 text-xs font-medium hover:bg-secondary transition-colors"
                onClick={() => mutation.mutate({ notificationId: notification?.id, actionType: 'decline' })}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Processing...' : notification?.type === 'friend' || notification?.type === 'team' ? 'Decline' : 'Dismiss'}
              </button>
            </div>
          )}
        </div>

        {!notification?.actionable && (
          <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};
