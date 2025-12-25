import React from 'react';
import { Bell, BellOff, Check, Trash2, Package, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, AppNotification } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationIcon: React.FC<{ type: AppNotification['type'] }> = ({ type }) => {
  switch (type) {
    case 'order':
      return <Package className="h-4 w-4 text-primary" />;
    case 'offer':
      return <Tag className="h-4 w-4 text-green-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const NotificationItem: React.FC<{ 
  notification: AppNotification; 
  onRead: () => void;
}> = ({ notification, onRead }) => {
  return (
    <div 
      className={`p-3 border-b border-border last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50 ${
        !notification.read ? 'bg-primary/5' : ''
      }`}
      onClick={onRead}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
              {notification.title}
            </p>
            {!notification.read && (
              <span className="flex-shrink-0 h-2 w-2 bg-primary rounded-full" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    permission,
    requestPermission,
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold text-sm">Notifications</h3>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs"
                onClick={markAllAsRead}
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        {permission !== 'granted' && (
          <div className="p-3 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <BellOff className="h-4 w-4" />
              <span>Enable notifications for updates</span>
            </div>
            <Button size="sm" className="w-full" onClick={requestPermission}>
              Enable Notifications
            </Button>
          </div>
        )}

        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification}
                onRead={() => markAsRead(notification.id)}
              />
            ))
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-2 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs text-muted-foreground hover:text-destructive"
              onClick={clearNotifications}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
