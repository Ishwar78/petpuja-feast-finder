import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'info';
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  permission: NotificationPermission;
  requestPermission: () => Promise<void>;
  addNotification: (notification: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('app-notifications');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    localStorage.setItem('app-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast.error('Notifications not supported in this browser');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast.success('Notifications enabled!');
        // Send a test notification
        new Notification('Notifications Enabled', {
          body: 'You will now receive order updates and special offers!',
          icon: '/favicon.ico'
        });
      } else if (result === 'denied') {
        toast.error('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to enable notifications');
    }
  }, []);

  const sendBrowserNotification = useCallback((title: string, message: string) => {
    if (permission === 'granted' && 'Notification' in window) {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico'
      });
    }
  }, [permission]);

  const addNotification = useCallback((notification: Omit<AppNotification, 'id' | 'read' | 'createdAt'>) => {
    const newNotification: AppNotification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date().toISOString()
    };

    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50 notifications
    
    // Show toast
    toast(notification.title, {
      description: notification.message
    });

    // Send browser notification
    sendBrowserNotification(notification.title, notification.message);
  }, [sendBrowserNotification]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      permission,
      requestPermission,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
