import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  semester: string;
  isPremium: boolean;
}

interface RecentNote {
  noteId: string;
  subject: string;
  domain: string;
  courseType: string;
  title: string;
  lastPage: number;
  visitedAt: number;
}

interface MyWordsPlaylist {
  id: string;
  name: string;
  createdAt: number;
  notes: {
    noteId: string;
    subject: string;
    domain: string;
    courseType: string;
    title: string;
    addedAt: number;
  }[];
}

interface AuthState {
  isSignedUp: boolean;
  hasCompletedInfo: boolean;
  user: User | null;
  readingStartTime: number | null;
  hasShownInitialPopup: boolean;
  recentNotes: RecentNote[];
  myWordsPlaylists: MyWordsPlaylist[];
}

const AUTH_STORAGE_KEY = 'adroits_auth_state';

const getInitialState = (): AuthState => {
  const defaultState: AuthState = {
    isSignedUp: false,
    hasCompletedInfo: false,
    user: null,
    readingStartTime: null,
    hasShownInitialPopup: false,
    recentNotes: [],
    myWordsPlaylists: [],
  };

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all properties exist
      return {
        ...defaultState,
        ...parsed,
        recentNotes: parsed.recentNotes || [],
        myWordsPlaylists: parsed.myWordsPlaylists || [],
      };
    }
  } catch (e) {
    console.error('Error reading auth state:', e);
  }
  return defaultState;
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(getInitialState);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const signUp = useCallback((email: string, _password: string, name: string) => {
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      college: '',
      semester: '',
      isPremium: false,
    };

    setAuthState(prev => ({
      ...prev,
      isSignedUp: true,
      user,
      hasShownInitialPopup: true,
    }));

    return true;
  }, []);

  const completeUserInfo = useCallback((college: string, semester: string) => {
    setAuthState(prev => ({
      ...prev,
      hasCompletedInfo: true,
      user: prev.user ? { ...prev.user, college, semester } : null,
    }));
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  const upgradeToPremium = useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, isPremium: true } : null,
    }));
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isSignedUp: false,
      hasCompletedInfo: false,
      user: null,
      readingStartTime: null,
      hasShownInitialPopup: false,
      recentNotes: [],
      myWordsPlaylists: [],
    });
  }, []);

  const startReading = useCallback(() => {
    if (!authState.readingStartTime) {
      setAuthState(prev => ({
        ...prev,
        readingStartTime: Date.now(),
      }));
    }
  }, [authState.readingStartTime]);

  const markInitialPopupShown = useCallback(() => {
    setAuthState(prev => ({
      ...prev,
      hasShownInitialPopup: true,
    }));
  }, []);

  const getReadingDuration = useCallback(() => {
    if (!authState.readingStartTime) return 0;
    return (Date.now() - authState.readingStartTime) / 1000 / 60; // in minutes
  }, [authState.readingStartTime]);

  // Recent Notes functions
  const addRecentNote = useCallback((note: Omit<RecentNote, 'visitedAt'>) => {
    setAuthState(prev => {
      const filtered = prev.recentNotes.filter(n => n.noteId !== note.noteId);
      const newNote: RecentNote = { ...note, visitedAt: Date.now() };
      return {
        ...prev,
        recentNotes: [newNote, ...filtered].slice(0, 10), // Keep last 10
      };
    });
  }, []);

  const updateRecentNoteProgress = useCallback((noteId: string, lastPage: number) => {
    setAuthState(prev => ({
      ...prev,
      recentNotes: prev.recentNotes.map(n =>
        n.noteId === noteId ? { ...n, lastPage, visitedAt: Date.now() } : n
      ),
    }));
  }, []);

  // My Words (Playlist) functions
  const createPlaylist = useCallback((name: string) => {
    const playlist: MyWordsPlaylist = {
      id: Math.random().toString(36).substring(7),
      name,
      createdAt: Date.now(),
      notes: [],
    };
    setAuthState(prev => ({
      ...prev,
      myWordsPlaylists: [...prev.myWordsPlaylists, playlist],
    }));
    return playlist.id;
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setAuthState(prev => ({
      ...prev,
      myWordsPlaylists: prev.myWordsPlaylists.filter(p => p.id !== playlistId),
    }));
  }, []);

  const addNoteToPlaylist = useCallback((
    playlistId: string,
    note: { noteId: string; subject: string; domain: string; courseType: string; title: string }
  ) => {
    setAuthState(prev => ({
      ...prev,
      myWordsPlaylists: prev.myWordsPlaylists.map(p =>
        p.id === playlistId
          ? {
            ...p,
            notes: p.notes.some(n => n.noteId === note.noteId)
              ? p.notes
              : [...p.notes, { ...note, addedAt: Date.now() }],
          }
          : p
      ),
    }));
  }, []);

  const removeNoteFromPlaylist = useCallback((playlistId: string, noteId: string) => {
    setAuthState(prev => ({
      ...prev,
      myWordsPlaylists: prev.myWordsPlaylists.map(p =>
        p.id === playlistId
          ? { ...p, notes: p.notes.filter(n => n.noteId !== noteId) }
          : p
      ),
    }));
  }, []);

  const renamePlaylist = useCallback((playlistId: string, newName: string) => {
    setAuthState(prev => ({
      ...prev,
      myWordsPlaylists: prev.myWordsPlaylists.map(p =>
        p.id === playlistId ? { ...p, name: newName } : p
      ),
    }));
  }, []);

  return {
    ...authState,
    signUp,
    completeUserInfo,
    updateUser,
    upgradeToPremium,
    logout,
    startReading,
    getReadingDuration,
    markInitialPopupShown,
    addRecentNote,
    updateRecentNoteProgress,
    createPlaylist,
    deletePlaylist,
    addNoteToPlaylist,
    removeNoteFromPlaylist,
    renamePlaylist,
  };
};

export type { User, AuthState, RecentNote, MyWordsPlaylist };
