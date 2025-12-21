import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Flag, Lock, FileText, BookOpen, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import PremiumPopup from "@/components/popups/PremiumPopup";
import SignupPopup from "@/components/popups/SignupPopup";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NotesViewer = () => {
  const { courseType, domain, subject } = useParams();
  const location = useLocation();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Page Navigation State
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [_isFlipping, setIsFlipping] = useState(false); // Added state for flip animation control

  // Get note details from navigation state or fallback
  const passedNote = location.state?.note;
  const noteDetails = {
    title: passedNote?.title || "Complete DSA Roadmap & Notes",
    author: "Prof. R.K. Sharma",
    pages: passedNote?.pages || 45,
    isPremium: passedNote?.isPremium || false,
  };

  // Determine access rights
  const isLoggedIn = auth.isSignedUp;
  const isPremiumUser = isLoggedIn && auth.user?.isPremium;
  const isPreviewPage = currentPage <= 4;
  const hasAccess = isLoggedIn || isPreviewPage;
  const showPremiumBlock = !hasAccess;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    if (!isLoggedIn) {
      setShowSignupPopup(true);
      return;
    }

    if (!isPremiumUser) {
      setShowPremiumPopup(true);
      return;
    }

    toast.success("Download started...");
  };

  const handleBuyPremium = () => {
    auth.upgradeToPremium();
    setShowPremiumPopup(false);
    toast.success("Welcome to Premium! You can now view this note.");
  };

  const changePage = (newDir: 'next' | 'prev') => {
    if (newDir === 'next') {
      if (currentPage >= 10) return;

      // Check for signup requirement after page 4
      if (!isLoggedIn && currentPage >= 4) {
        setShowSignupPopup(true);
        return;
      }

      setDirection('next');
      setCurrentPage(p => p + 1);
    } else {
      if (currentPage <= 1) return;
      setDirection('prev');
      setCurrentPage(p => p - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl h-full flex flex-col">

          {/* Header Bar */}
          <div className="bg-white rounded-[1.5rem] p-4 lg:p-6 shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in relative z-20">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Link
                to={`/study/${courseType}/${domain}/${subject}`}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="font-display text-lg lg:text-xl font-bold line-clamp-1">
                  {noteDetails.title}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="flex items-center gap-1"><FileText size={12} /> Page {currentPage} of {noteDetails.pages}</span>
                  <span>•</span>
                  <span>{noteDetails.author}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsSaved(!isSaved);
                  toast.success(isSaved ? "Removed from My Notes" : "Added to My Notes");
                }}
                className={cn(
                  "rounded-full px-4 font-bold flex items-center gap-2 transition-all",
                  isSaved ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-gray-500 hover:bg-gray-100"
                )}
              >
                {isSaved ? <Check size={18} /> : <Plus size={18} />}
                {isSaved ? "Saved" : "Add to My Notes"}
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 rounded-full hover:bg-gray-100">
                <Flag size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 rounded-full hover:bg-gray-100">
                <Share2 size={18} />
              </Button>
              <Button
                onClick={handleDownload}
                className="rounded-full bg-black text-white px-6 font-bold shadow-lg shadow-black/10 hover:bg-gray-800"
              >
                <Download size={16} className="mr-2" />
                {isPremiumUser ? "Download PDF" : "Download (Premium Only)"}
              </Button>
            </div>
          </div>

          {/* Viewer Container */}
          <div className="flex-grow grid lg:grid-cols-12 gap-6 items-start relative">

            {/* Main PDF View */}
            <div
              className="lg:col-span-9 relative min-h-[600px] lg:h-[800px] perspective-1000 select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-gray-500 font-medium animate-pulse">Loading Document...</p>
                </div>
              ) : !showPremiumBlock ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative">

                  {/* Navigation Buttons (Floating) */}
                  <button
                    onClick={() => changePage('prev')}
                    disabled={currentPage === 1}
                    className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 pointer-events-auto"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={() => changePage('next')}
                    disabled={currentPage >= 10} // Mock limit
                    className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-700 hover:text-primary hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 pointer-events-auto"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Page Display with simulated flip animation */}
                  <div
                    key={currentPage}
                    className={cn(
                      "bg-white shadow-2xl w-full max-w-4xl h-full rounded-[1rem] p-8 lg:p-12 flex flex-col relative overflow-hidden transition-all",
                      direction === 'next' ? "animate-in slide-in-from-right-8 fade-in duration-500 ease-out" : "animate-in slide-in-from-left-8 fade-in duration-500 ease-out"
                    )}
                  >
                    {/* Mock Page Content */}
                    <div className="w-full h-full border border-gray-100 p-4 lg:p-8 flex flex-col">
                      <div className="w-full border-b border-gray-100 pb-4 mb-8 flex justify-between items-center text-gray-300 text-xs font-mono uppercase select-none">
                        <span>Chapter 1: Implementation</span>
                        <span>{noteDetails.title}</span>
                      </div>

                      <div className="space-y-6">
                        {/* Simulate alternating text for demo feel */}
                        <div className="w-3/4 h-8 bg-gray-800/80 rounded mb-8" />
                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-5/6 h-3 bg-gray-200 rounded" />
                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-4/5 h-3 bg-gray-200 rounded" />

                        <div className="py-8">
                          <div className="w-full aspect-video bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                            Figure {currentPage}: Conceptual Model
                          </div>
                        </div>

                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-full h-3 bg-gray-200 rounded" />
                        <div className="w-11/12 h-3 bg-gray-200 rounded" />
                      </div>

                      <div className="mt-auto pt-8 border-t border-gray-100 flex justify-center text-gray-400 text-sm font-medium select-none">
                        Page {currentPage}
                      </div>
                    </div>
                  </div>

                  {/* Page Shadow Pile Effect */}
                  <div className="absolute top-2 left-2 w-full max-w-4xl h-full bg-white rounded-[1rem] shadow-sm -z-10" />
                  <div className="absolute top-4 left-4 w-full max-w-4xl h-full bg-white rounded-[1rem] shadow-sm -z-20" />

                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-sm overflow-hidden z-10">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0" />
                  <div className="relative z-10 p-6 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce-slow mx-auto">
                      <Lock size={40} className="text-primary" />
                    </div>

                    {/* Dynamic Message based on Login state */}
                    <h2 className="font-display text-3xl font-bold mb-3">
                      {!isLoggedIn ? 'Sign In Required' : 'Premium Content'}
                    </h2>
                    <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                      {!isLoggedIn
                        ? 'You have reached the free preview limit. Please sign in to continue reading.'
                        : 'This document is part of our premium collection. Unlock unlimited access to this and 1000+ other notes.'
                      }
                    </p>

                    <Button
                      size="xl"
                      onClick={() => !isLoggedIn ? setShowSignupPopup(true) : setShowPremiumPopup(true)}
                      className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-10 h-14 shadow-xl shadow-primary/20"
                    >
                      {!isLoggedIn ? 'Sign In to View' : 'Unlock Full Access - ₹599/yr'}
                    </Button>
                  </div>

                  {/* Blurred background mock */}
                  <div className="absolute inset-0 -z-10 p-12 opacity-30 blur-sm pointer-events-none">
                    <div className="w-3/4 h-8 bg-gray-800 rounded mb-8" />
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-full h-4 bg-gray-300 rounded" />)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              {/* TOC */}
              <div className="bg-white rounded-[1.5rem] p-6 border border-gray-200 lg:sticky lg:top-24">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  Topics Covered
                </h3>
                <div className="space-y-3 relative max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Timeline line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />

                  {["Introduction", "Basic Concepts", "Implementation", "Complexity Analysis", "Cases", "Conclusion"].map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 relative group cursor-pointer"
                      onClick={() => {
                        setIsFlipping(true);
                        setTimeout(() => {
                          setCurrentPage(i + 1);
                          setIsFlipping(false);
                        }, 300);
                      }}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 mt-1 z-10 transition-colors",
                        currentPage === i + 1 ? "bg-primary border-primary" : "bg-white border-gray-300 group-hover:border-primary"
                      )} />
                      <p className={cn(
                        "text-sm font-medium leading-tight pt-0.5 transition-colors",
                        currentPage === i + 1 ? "text-primary font-bold" : "text-gray-600 group-hover:text-primary"
                      )}>
                        {topic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <PremiumPopup
        isOpen={showPremiumPopup}
        onClose={() => setShowPremiumPopup(false)}
        onBuyPremium={handleBuyPremium}
        isSignedUp={isLoggedIn}
        onSignupRequired={() => {
          setShowPremiumPopup(false);
          setShowSignupPopup(true);
        }}
      />

      <SignupPopup
        isOpen={showSignupPopup}
        onClose={() => setShowSignupPopup(false)}
        onSignup={(email, password, name, semester, branch) => {
          // Mock signup logic
          auth.signUp(email, password, name);
          // In a real app we'd save semester/branch here
          console.log("Signup with:", email, name, semester, branch);
          setShowSignupPopup(false);
          return true;
        }}
        canClose={true}
        message="Sign up to view notes and download"
      />
    </div>
  );
};

export default NotesViewer;