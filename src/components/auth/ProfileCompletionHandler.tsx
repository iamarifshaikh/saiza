import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import UserInfoPopup from '@/components/popups/UserInfoPopup';
import { useLocation } from 'react-router-dom';

const ProfileCompletionHandler = () => {
    const { isSignedUp, user, hasCompletedInfo, completeUserInfo } = useAuth();
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check if profile needs completion
        // We trigger it if signed up but hasn't completed info OR lacks a name
        const needsCompletion = isSignedUp && (!hasCompletedInfo || !user?.name || !user?.college || !user?.semester);

        // Don't show on auth pages to avoid clutter
        const isAuthPage = location.pathname === '/auth' || location.pathname === '/login';

        if (needsCompletion && !isAuthPage) {
            // Delay slightly for better UX after login redirect
            const timer = setTimeout(() => setShowPopup(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setShowPopup(false);
        }
    }, [isSignedUp, hasCompletedInfo, user, location.pathname]);

    const handleComplete = (college: string, semester: string, courseType: string, fullName?: string) => {
        completeUserInfo(college, semester, courseType, fullName);
        setShowPopup(false);
    };

    return (
        <UserInfoPopup
            isOpen={showPopup}
            onComplete={handleComplete}
        />
    );
};

export default ProfileCompletionHandler;
