import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HistoryMessage {
  id: string;
  text: string;
  templateTitle: string;
  categoryId: string;
  timestamp: number;
  date: string;
}

const HISTORY_STORAGE_KEY = "svar_direkt_message_history";
const MAX_HISTORY_ITEMS = 100;

export function useMessageHistory() {
  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const saved = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading message history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMessage = async (
    text: string,
    templateTitle: string,
    categoryId: string
  ) => {
    try {
      const newMessage: HistoryMessage = {
        id: Date.now().toString(),
        text,
        templateTitle,
        categoryId,
        timestamp: Date.now(),
        date: new Date().toLocaleDateString("sv-SE"),
      };

      const updated = [newMessage, ...history].slice(0, MAX_HISTORY_ITEMS);
      setHistory(updated);
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error adding message to history:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const updated = history.filter((msg) => msg.id !== id);
      setHistory(updated);
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error deleting message from history:", error);
    }
  };

  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  return {
    history,
    isLoading,
    addMessage,
    deleteMessage,
    clearHistory,
  };
}
