import React, { useState, useEffect, useCallback, createContext, useContext, useMemo } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface User {
    id: string;
    name: string;
    email: string;
    college: string;
    semester: string;
    courseType?: 'ENGINEERING' | 'DIPLOMA';
    isPremium: boolean;
    role: string;
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

interface AuthContextType extends AuthState {
    signUp: (email: string, password: string, name: string) => Promise<boolean>;
    signIn: (email: string, password: string) => Promise<boolean>;
    completeUserInfo: (college: string, semester: string, courseType: string, name?: string) => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
    upgradeToPremium: () => Promise<void>;
    logout: () => void;
    startReading: () => void;
    getReadingDuration: () => number;
    markInitialPopupShown: () => void;
    addRecentNote: (note: Omit<RecentNote, 'visitedAt'>) => void;
    updateRecentNoteProgress: (noteId: string, lastPage: number) => void;
    createPlaylist: (name: string) => string;
    deletePlaylist: (playlistId: string) => void;
    addNoteToPlaylist: (playlistId: string, note: { noteId: string; subject: string; domain: string; courseType: string; title: string }) => void;
    removeNoteFromPlaylist: (playlistId: string, noteId: string) => void;
    renamePlaylist: (playlistId: string, newName: string) => void;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(getInitialState);

    // Sync to local storage
    useEffect(() => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }, [authState]);

    // Check token validity on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token && !authState.user) {
                try {
                    const res = await api.get('/user/profile');
                    setAuthState(prev => ({
                        ...prev,
                        isSignedUp: true,
                        hasCompletedInfo: !!(res.data.college && res.data.semester),
                        user: res.data
                    }));
                } catch (e) {
                    console.error("Token invalid", e);
                    logout();
                }
            }
        };
        checkAuth();
    }, []);

    const signUp = useCallback(async (email: string, password: string, name: string) => {
        try {
            await api.post('/auth/signup', { email, password, name });
            // Auto login after signup? Or require signin? 
            // The backend returns "User registered successfully!" string, not token.
            // So we return true and let UI redirect to Sign In.
            return true;
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data || "Signup failed");
            return false;
        }
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const res = await api.post('/auth/signin', { email, password });
            const { token, user } = res.data;

            localStorage.setItem('token', token);

            setAuthState(prev => ({
                ...prev,
                isSignedUp: true,
                user,
                hasCompletedInfo: !!(user.college && user.semester),
                hasShownInitialPopup: true, // Assuming login means they've seen intro
            }));

            return true;
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed");
            return false;
        }
    }, []);

    const completeUserInfo = useCallback(async (college: string, semester: string, courseType: string, name?: string) => {
        try {
            const res = await api.post('/user/complete-profile', { college, semester, courseType, name });
            const updatedUser = res.data;

            setAuthState(prev => ({
                ...prev,
                hasCompletedInfo: true,
                user: updatedUser,
            }));
            toast.success("Profile Updated!");
        } catch (error: any) {
            toast.error(error.response?.data || "Failed to update profile");
        }
    }, []);

    const updateUser = useCallback((updates: Partial<User>) => {
        // Optimistic update, ignoring backend for now as requested? 
        // Or should we implement UPDATE USER API?
        // User requested profile completion API, but not generic update yet.
        // We'll keep local state update for now or implement if needed.
        setAuthState(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, ...updates } : null,
        }));
    }, []);

    const upgradeToPremium = useCallback(async () => {
        try {
            await api.put('/user/premium');
            setAuthState(prev => ({
                ...prev,
                user: prev.user ? { ...prev.user, isPremium: true } : null,
            }));
            toast.success("Welcome to Premium!");
        } catch (error) {
            toast.error("Failed to upgrade");
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem(AUTH_STORAGE_KEY); // Clear persisted state
        setAuthState({
            isSignedUp: false,
            hasCompletedInfo: false,
            user: null,
            readingStartTime: null,
            hasShownInitialPopup: false,
            recentNotes: [],
            myWordsPlaylists: [],
        });
        window.location.reload(); // Force clear
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
        return (Date.now() - authState.readingStartTime) / 1000 / 60;
    }, [authState.readingStartTime]);

    const addRecentNote = useCallback((note: Omit<RecentNote, 'visitedAt'>) => {
        // Analytics Track
        try {
            api.post('/analytics/track', {
                action: 'VIEW_PDF',
                noteId: note.noteId,
                details: note.title
            });
        } catch (e) { /* ignore silent fail */ }

        setAuthState(prev => {
            const filtered = prev.recentNotes.filter(n => n.noteId !== note.noteId);
            const newNote: RecentNote = { ...note, visitedAt: Date.now() };
            return {
                ...prev,
                recentNotes: [newNote, ...filtered].slice(0, 10),
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

    const createPlaylist = useCallback((name: string) => {
        const playlistId = Math.random().toString(36).substring(7);
        const playlist: MyWordsPlaylist = {
            id: playlistId,
            name,
            createdAt: Date.now(),
            notes: [],
        };
        setAuthState(prev => ({
            ...prev,
            myWordsPlaylists: [...prev.myWordsPlaylists, playlist],
        }));
        return playlistId;
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

    const value = useMemo(() => ({
        ...authState,
        signUp,
        signIn,
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
    }), [authState, signUp, signIn, completeUserInfo, updateUser, upgradeToPremium, logout, startReading, getReadingDuration, markInitialPopupShown, addRecentNote, updateRecentNoteProgress, createPlaylist, deletePlaylist, addNoteToPlaylist, removeNoteFromPlaylist, renamePlaylist]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export type { User, AuthState, RecentNote, MyWordsPlaylist };
