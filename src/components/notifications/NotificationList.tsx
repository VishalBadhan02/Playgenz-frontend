// components/notifications/NotificationList.tsx

import { NotificationItem } from "./NotificationItem";

interface Notification {
    id: string;
    type: 'friend' | 'team' | 'match' | 'tournament' | 'message' | 'achievement';
    title: string;
    description: string;
    time: string;
    read: boolean;
    actionable: boolean;
  }

interface Props {
    notifications: Notification[];
    emptyText: string;
}

const NotificationList: React.FC<Props> = ({ notifications, emptyText }) => {
    return notifications.length > 0 ? (
        <div className="space-y-4">
            {notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </div>
    ) : (
        <div className="text-center py-8">
            <p className="text-muted-foreground">{emptyText}</p>
        </div>
    );
};

export default NotificationList;
