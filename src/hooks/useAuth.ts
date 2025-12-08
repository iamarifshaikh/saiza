import { useState, useEffect, useCallback } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    college: string;
    semester: string;
    isPremium: boolean;
}

interface AuthState {
    isSignedUp: boolean;
    hasCompletedInfo: boolean;
    user: User | null;
    readingStartTime: number | null;
    hasShownInitialPopup: boolean;
}

const AUTH_STORAGE_KEY = 'saiza_auth_state';

const getInitialState = (): AuthState => {
    try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading auth state:', e);
    }
    return {
        isSignedUp: false,
        hasCompletedInfo: false,
        user: null,
        readingStartTime: null,
        hasShownInitialPopup: false,
    };
};

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>(getInitialState);

    // Persist state to localStorage
    useEffect(() => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }, [authState]);

    const signUp = useCallback((email: string, _password: string, name: string) => {
        // const _password = password;
        const user: User = {
            id: Math.random().toString(36).substring(7),
            name,
            email,
            // password:_password,
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
    };
};

export type { User, AuthState };