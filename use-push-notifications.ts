import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface ReminderNotification {
  id: string;
  title: string;
  body: string;
  topic: string;
  dueDate: Date;
  dueTime: string;
}

/**
 * Hook to manage push notifications for reminders
 * Sends notification 1 day before deadline at 09:00
 */
export function usePushNotifications() {
  useEffect(() => {
    // Request notification permissions on iOS
    if (Platform.OS === 'ios') {
      requestNotificationPermissions();
    }
  }, []);

  const requestNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };

  /**
   * Schedule a reminder notification for 1 day before deadline at 09:00
   */
  const scheduleReminder = async (reminder: ReminderNotification) => {
    try {
      // Parse due date
      const dueDate = new Date(reminder.dueDate);
      
      // Calculate notification time: 1 day before at 09:00
      const notificationDate = new Date(dueDate);
      notificationDate.setDate(notificationDate.getDate() - 1);
      notificationDate.setHours(9, 0, 0, 0);

      // Only schedule if notification date is in the future
      if (notificationDate > new Date()) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '⏰ Påminnelse',
            body: `${reminder.topic}\nTermin: ${reminder.dueDate} ${reminder.dueTime}`,
            data: {
              reminderId: reminder.id,
              topic: reminder.topic,
              dueDate: reminder.dueDate.toString(),
              dueTime: reminder.dueTime,
            },
            sound: true,
            badge: 1,
          },
          trigger: {
            date: notificationDate,
          },
        });

        console.log(`Reminder scheduled for ${reminder.topic} on ${notificationDate}`);
      }
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  };

  /**
   * Cancel a scheduled reminder
   */
  const cancelReminder = async (reminderId: string) => {
    try {
      // Get all scheduled notifications
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      
      // Find and cancel matching notification
      for (const notification of notifications) {
        if (notification.content.data?.reminderId === reminderId) {
          await Notifications.cancelScheduledNotificationAsync(notification.identifier);
          console.log(`Reminder cancelled: ${reminderId}`);
        }
      }
    } catch (error) {
      console.error('Error cancelling reminder:', error);
    }
  };

  /**
   * Get all scheduled reminders
   */
  const getScheduledReminders = async () => {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      return notifications.filter(n => n.content.data?.reminderId);
    } catch (error) {
      console.error('Error getting scheduled reminders:', error);
      return [];
    }
  };

  return {
    scheduleReminder,
    cancelReminder,
    getScheduledReminders,
  };
}
