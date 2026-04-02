import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Share } from 'react-native';

// Types
export interface Favorite {
  categoryId: string;
  templateId: string;
  addedAt: number;
}

export interface CopyHistoryItem {
  templateId: string;
  categoryId: string;
  content: string;
  copiedAt: number;
  title: string;
}

export interface Comment {
  id: string;
  templateId: string;
  author: string;
  text: string;
  createdAt: number;
  likes: number;
}

// Search Hook
export function useSearch(templates: any[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(t => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      (t.title && t.title.toLowerCase().includes(query)) ||
      (t.description && t.description.toLowerCase().includes(query)) ||
      (t.content && t.content.toLowerCase().includes(query))
    );
  });

  return { searchQuery, setSearchQuery, filteredTemplates };
}

// Favorites Hook
export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem('favorites');
      if (data) setFavorites(JSON.parse(data));
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = useCallback(async (categoryId: string, templateId: string) => {
    const newFavorite: Favorite = { categoryId, templateId, addedAt: Date.now() };
    const updated = [...favorites, newFavorite];
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  }, [favorites]);

  const removeFavorite = useCallback(async (templateId: string) => {
    const updated = favorites.filter(f => f.templateId !== templateId);
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  }, [favorites]);

  const isFavorite = useCallback((templateId: string) => {
    return favorites.some(f => f.templateId === templateId);
  }, [favorites]);

  return { favorites, loading, addFavorite, removeFavorite, isFavorite };
}

// Share Hook
export function useShareTemplate() {
  const shareTemplate = useCallback(async (title: string, content: string) => {
    try {
      const message = `Svar Direkt - ${title}\n\n${content}\n\nLadda ner appen: https://play.google.com/store/apps/details?id=space.manus.svar.direkt`;
      
      await Share.share({
        message,
        title: `Dela: ${title}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, []);

  return { shareTemplate };
}

// Copy History Hook
export function useCopyHistory() {
  const [history, setHistory] = useState<CopyHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('copyHistory');
      if (data) setHistory(JSON.parse(data));
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = useCallback(async (item: CopyHistoryItem) => {
    const updated = [item, ...history.slice(0, 9)]; // Keep last 10
    setHistory(updated);
    await AsyncStorage.setItem('copyHistory', JSON.stringify(updated));
  }, [history]);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await AsyncStorage.removeItem('copyHistory');
  }, []);

  return { history, loading, addToHistory, clearHistory };
}

// Text Formatting Hook
export function useTextFormatting(initialText: string = '') {
  const [text, setText] = useState(initialText);

  const applyBold = useCallback((selectedText: string) => {
    setText(prev => prev.replace(selectedText, `**${selectedText}**`));
  }, []);

  const applyItalic = useCallback((selectedText: string) => {
    setText(prev => prev.replace(selectedText, `*${selectedText}*`));
  }, []);

  const applyUnderline = useCallback((selectedText: string) => {
    setText(prev => prev.replace(selectedText, `__${selectedText}__`));
  }, []);

  const addBulletPoint = useCallback(() => {
    setText(prev => prev + '\n• ');
  }, []);

  const addNumberedPoint = useCallback(() => {
    const lines = text.split('\n');
    const lastNumber = lines.filter(l => /^\d+\./.test(l)).length;
    setText(prev => prev + `\n${lastNumber + 1}. `);
  }, [text]);

  return { 
    text, 
    setText, 
    applyBold, 
    applyItalic, 
    applyUnderline, 
    addBulletPoint, 
    addNumberedPoint 
  };
}

// Comments Hook
export function useComments() {
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const data = await AsyncStorage.getItem('comments');
      if (data) setComments(JSON.parse(data));
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = useCallback(async (templateId: string, text: string, author: string = 'Anonym') => {
    const newComment: Comment = {
      id: `${Date.now()}`,
      templateId,
      author,
      text,
      createdAt: Date.now(),
      likes: 0,
    };

    const updated = {
      ...comments,
      [templateId]: [...(comments[templateId] || []), newComment],
    };

    setComments(updated);
    await AsyncStorage.setItem('comments', JSON.stringify(updated));
  }, [comments]);

  const getComments = useCallback((templateId: string) => {
    return (comments[templateId] || []).sort((a, b) => b.createdAt - a.createdAt);
  }, [comments]);

  const likeComment = useCallback(async (templateId: string, commentId: string) => {
    const updated = {
      ...comments,
      [templateId]: (comments[templateId] || []).map(c =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ),
    };

    setComments(updated);
    await AsyncStorage.setItem('comments', JSON.stringify(updated));
  }, [comments]);

  return { comments, loading, addComment, getComments, likeComment };
}
