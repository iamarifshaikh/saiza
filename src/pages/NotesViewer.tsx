import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PDFViewer from '@/components/pdf/PDFViewer';
import SignupPopup from '@/components/popups/SignupPopup';
import UserInfoPopup from '@/components/popups/UserInfoPopup';
import PremiumPopup from '@/components/popups/PremiumPopup';
import AddToPlaylistPopup from '@/components/popups/AddToPlaylistPopup';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Crown, Lock, ShieldAlert, FolderHeart } from 'lucide-react';
import { toast } from 'sonner';

// Sample notes data
const notesData: Record<string, { id: string; title: string; isPremium: boolean }[]> = {
  dsa: [
    { id: 'arrays-basics', title: 'Arrays - Basics & Operations', isPremium: false },
    { id: 'linked-lists', title: 'Linked Lists Complete Guide', isPremium: true },
  ],
  os: [
    { id: 'process-management', title: 'Process Management', isPremium: false },
    { id: 'memory-management', title: 'Memory Management', isPremium: true },
  ],
  control: [
    { id: 'arrays-basics', title: 'Control Systems Basics', isPremium: false },
    { id: 'feedback-systems', title: 'Feedback Systems', isPremium: true },
  ],
};

const NotesViewer = () => {
  const { courseType, domain, subject, noteId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [canCloseSignup, setCanCloseSignup] = useState(true);
  const [signupMessage, setSignupMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Get note info
  const notes = notesData[subject || ''] || notesData['dsa'];
  const currentNote = notes.find(n => n.id === noteId) || notes[0];
  const isPremiumNote = currentNote?.isPremium || false;
  const isPremiumUser = auth.user?.isPremium || false;
  const shouldBlur = isPremiumNote && !isPremiumUser;

  // Track recent note
  useEffect(() => {
    if (auth.isSignedUp && currentNote && !shouldBlur) {
      auth.addRecentNote({
        noteId: currentNote.id,
        subject: subject || 'dsa',
        domain: domain || 'computer',
        courseType: courseType || 'engineering',
        title: currentNote.title,
        lastPage: currentPage,
      });
    }
  }, [auth.isSignedUp, currentNote?.id, shouldBlur]);

  // Update page progress
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (auth.isSignedUp && currentNote) {
      auth.updateRecentNoteProgress(currentNote.id, page);
    }
  };

  // Initial popup logic - show signup if not signed up
  useEffect(() => {
    if (!auth.isSignedUp && !auth.hasShownInitialPopup) {
      setShowSignupPopup(true);
      setCanCloseSignup(true);
      setSignupMessage('Sign up to unlock all features and save your progress');
    } else if (auth.isSignedUp && !auth.hasCompletedInfo) {
      setShowUserInfoPopup(true);
    }
  }, [auth.isSignedUp, auth.hasShownInitialPopup, auth.hasCompletedInfo]);

  // Start reading timer
  useEffect(() => {
    if (!shouldBlur) {
      auth.startReading();
    }
  }, [shouldBlur]);

  // 2-minute lock check (changed from 5 minutes)
  useEffect(() => {
    if (auth.isSignedUp) return;

    const checkReadingTime = () => {
      const duration = auth.getReadingDuration();
      if (duration >= 2 && !isLocked) {
        setIsLocked(true);
        setShowSignupPopup(true);
        setCanCloseSignup(false);
        setSignupMessage('You\'ve been reading for 2 minutes. Please sign up to continue.');
        toast.info('Please sign up to continue reading');
      }
    };

    const interval = setInterval(checkReadingTime, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [auth.isSignedUp, auth.getReadingDuration, isLocked]);

  const handleSignup = useCallback((email: string, password: string, name: string) => {
    const success = auth.signUp(email, password, name);
    if (success) {
      setShowSignupPopup(false);
      setIsLocked(false);
      if (!auth.hasCompletedInfo) {
        setShowUserInfoPopup(true);
      }
    }
    return success;
  }, [auth]);

  const handleCompleteInfo = useCallback((college: string, semester: string) => {
    auth.completeUserInfo(college, semester);
    setShowUserInfoPopup(false);
  }, [auth]);

  const handleBuyPremium = useCallback(() => {
    auth.upgradeToPremium();
    setShowPremiumPopup(false);
    toast.success('Welcome to Premium! Enjoy unlimited access.');
  }, [auth]);

  const handleCloseSignup = useCallback(() => {
    if (canCloseSignup) {
      setShowSignupPopup(false);
      auth.markInitialPopupShown();
    }
  }, [canCloseSignup, auth]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 lg:pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb & Back */}
          <div className="flex items-center justify-between mb-6 animate-fade-up">
            <Link 
              to={`/study/${courseType}/${domain}/${subject}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Notes</span>
            </Link>

            <div className="flex items-center gap-2">
              {auth.isSignedUp && !shouldBlur && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPlaylistPopup(true)}
                  className="gap-2"
                >
                  <FolderHeart size={16} />
                  Add to My Words
                </Button>
              )}
              
              {isPremiumNote && !isPremiumUser && (
                <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                  <Crown size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Premium Note</span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="mb-8 animate-fade-up stagger-1">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
              {currentNote?.title}
            </h1>
            <p className="text-muted-foreground">
              {courseType === 'diploma' ? 'Diploma' : 'Engineering'} • {subject?.toUpperCase()}
            </p>
          </div>

          {/* PDF Viewer */}
          <div className={`animate-fade-up stagger-2 relative ${isLocked ? 'pointer-events-none' : ''}`}>
            <PDFViewer 
              pdfUrl="/sample.pdf"
              isPremium={isPremiumNote}
              isBlurred={shouldBlur || isLocked}
              onPageChange={handlePageChange}
            />

            {/* Premium Overlay */}
            {shouldBlur && !isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-3xl">
                <div className="text-center p-8 max-w-md">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">
                    Unlock this Premium Note
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get full access to all premium study materials with SAIZA Premium
                  </p>
                  <Button 
                    variant="premium" 
                    size="lg"
                    onClick={() => setShowPremiumPopup(true)}
                  >
                    <Crown size={18} />
                    Buy Premium
                  </Button>
                </div>
              </div>
            )}

            {/* Lock Overlay for 2-min timeout */}
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-3xl z-10">
                <div className="text-center p-8 max-w-md">
                  <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="w-10 h-10 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">
                    Content Locked
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Please sign up to continue reading
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-muted/30 rounded-2xl border border-border/50 animate-fade-up stagger-3">
            <p className="text-xs text-muted-foreground text-center">
              This content is protected. Screenshots, screen recordings, copying, and printing are disabled.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* Popups */}
      <SignupPopup 
        isOpen={showSignupPopup}
        onClose={handleCloseSignup}
        onSignup={handleSignup}
        canClose={canCloseSignup}
        message={signupMessage}
      />

      <UserInfoPopup 
        isOpen={showUserInfoPopup}
        onComplete={handleCompleteInfo}
      />

      <PremiumPopup 
        isOpen={showPremiumPopup}
        onClose={() => setShowPremiumPopup(false)}
        onBuyPremium={handleBuyPremium}
        isSignedUp={auth.isSignedUp}
        onSignupRequired={() => {
          setShowPremiumPopup(false);
          setShowSignupPopup(true);
          setCanCloseSignup(false);
          setSignupMessage('Please sign up to purchase premium');
        }}
      />

      <AddToPlaylistPopup
        isOpen={showPlaylistPopup}
        onClose={() => setShowPlaylistPopup(false)}
        note={{
          noteId: currentNote?.id || '',
          subject: subject || '',
          domain: domain || '',
          courseType: courseType || '',
          title: currentNote?.title || '',
        }}
      />
    </div>
  );
};

export default NotesViewer;
