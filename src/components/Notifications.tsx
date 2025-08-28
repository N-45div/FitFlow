import React from 'react';
import { Brain, TrendingUp, Dumbbell, Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  timestamp: number;
  read: boolean;
  type?: 'insight' | 'health_alert' | 'workout_reminder' | 'general';
}

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onMarkAsRead }) => {
  const unreadNotifications = notifications.filter(n => !n.read);

  if (unreadNotifications.length === 0) return null;

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'insight':
        return <Brain className="h-4 w-4 text-purple-500" />;
      case 'health_alert':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'workout_reminder':
        return <Dumbbell className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationStyle = (type?: string) => {
    switch (type) {
      case 'insight':
        return 'border-l-4 border-purple-500 bg-purple-50';
      case 'health_alert':
        return 'border-l-4 border-orange-500 bg-orange-50';
      case 'workout_reminder':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-sm w-full border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">🤖 AI Wellness Insights</h3>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {unreadNotifications.length}
        </span>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {unreadNotifications.map(notification => (
          <div 
            key={notification.id} 
            className={`p-3 rounded-lg ${getNotificationStyle(notification.type)} transition-all duration-200`}
          >
            <div className="flex items-start space-x-2">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <p className="text-sm text-gray-800 leading-relaxed">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={onMarkAsRead} 
        className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-200 shadow-sm"
      >
        Mark All as Read
      </button>
    </div>
  );
};

export default Notifications;
