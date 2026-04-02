import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: number; // timestamp
  notificationId?: string;
  completed: boolean;
}

const REMINDERS_STORAGE_KEY = "svar_direkt_reminders";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReminders();
    requestNotificationPermissions();
  }, []);

  const requestNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permissions not granted");
      }
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
    }
  };

  const loadReminders = async () => {
    try {
      const saved = await AsyncStorage.getItem(REMINDERS_STORAGE_KEY);
      if (saved) {
        setReminders(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading reminders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addReminder = async (
    title: string,
    description: string,
    dueDate: Date
  ) => {
    try {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title,
        description,
        dueDate: dueDate.getTime(),
        completed: false,
      };

      // Schedule notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Påminnelse: " + title,
          body: description,
          sound: true,
        },
        trigger: {
          date: dueDate,
        },
      });

      reminder.notificationId = notificationId;

      const updated = [reminder, ...reminders];
      setReminders(updated);
      await AsyncStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(updated));

      return reminder;
    } catch (error) {
      console.error("Error adding reminder:", error);
      throw error;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      const reminder = reminders.find((r) => r.id === id);
      if (reminder?.notificationId) {
        await Notifications.cancelScheduledNotificationAsync(
          reminder.notificationId
        );
      }

      const updated = reminders.filter((r) => r.id !== id);
      setReminders(updated);
      await AsyncStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const completeReminder = async (id: string) => {
    try {
      const updated = reminders.map((r) =>
        r.id === id ? { ...r, completed: true } : r
      );
      setReminders(updated);
      await AsyncStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error completing reminder:", error);
    }
  };

  return {
    reminders,
    isLoading,
    addReminder,
    deleteReminder,
    completeReminder,
  };
}
