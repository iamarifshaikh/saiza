import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Flag, Lock, FileText, BookOpen, ChevronLeft, ChevronRight, Plus, Check, Maximize2, X } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import PremiumPopup from "@/components/popups/PremiumPopup";
import SignupPopup from "@/components/popups/SignupPopup";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import BackgroundAtmosphere from "@/components/ui/BackgroundAtmosphere";

// React-PDF Imports
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF Worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const NotesViewer = () => {
  const { courseType, domain, subject } = useParams();
  const location = useLocation();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showTopicsDrawer, setShowTopicsDrawer] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Page Navigation State
  const [currentPage, setCurrentPage] = useState(1);
  // const [direction, setDirection] = useState<'next' | 'prev'>('next'); // Unused
  const [_isFlipping, setIsFlipping] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);

  // Resize observer for responsive PDF width
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [containerRef]);


  // Focus Mode Toggle
  const toggleFocusMode = async () => {
    try {
      if (!isFocusMode) {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
      // Fallback for browsers that block FS or if it fails
      setIsFocusMode(!isFocusMode);
    }
  };

  // Sync FocusMode state with actual fullscreen state (handles ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFocusMode(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Get note details from navigation state or fallback
  const passedNote = location.state?.note;
  const noteDetails = {
    title: passedNote?.title || "Note Viewer",
    author: "Saiza Platform",
    pages: passedNote?.pages || 1,
    isPremium: passedNote?.isPremium || false,
    pdfUrl: passedNote?.pdfUrl || "",
  };

  // Determine access rights (For debugging: allow all for now, or respect logic)
  const isLoggedIn = auth.isSignedUp;
  const isPremiumUser = isLoggedIn && auth.user?.isPremium;
  // const isPreviewPage = currentPage <= 4;
  // const hasAccess = isLoggedIn || isPreviewPage;
  const hasAccess = true; // Temporary debug override to always show content
  const showPremiumBlock = !hasAccess;

  // Simulate loading - removed manual timeout, relying on PDF load
  // But we keep initial loading state for UI smoothness
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      setShowSignupPopup(true);
      return;
    }

    if (!isPremiumUser) {
      setShowPremiumPopup(true);
      return;
    }

    // Direct download link
    window.open(noteDetails.pdfUrl, '_blank');
    toast.success("Download started...");
  };

  const handleBuyPremium = () => {
    auth.upgradeToPremium();
    setShowPremiumPopup(false);
    toast.success("Welcome to Premium! You can now view this note.");
  };

  const changePage = (newDir: 'next' | 'prev') => {
    if (newDir === 'next') {
      if (numPages && currentPage >= numPages) return;
      if (!numPages && currentPage >= 10) return; // Fallback limit

      // Check for signup requirement after page 4
      if (!isLoggedIn && currentPage >= 4) {
        setShowSignupPopup(true);
        return;
      }

      // setDirection('next');
      setCurrentPage(p => p + 1);
    } else {
      if (currentPage <= 1) return;
      // setDirection('prev');
      setCurrentPage(p => p - 1);
    }
  };

  return (
    <div className={cn("min-h-screen font-sans flex flex-col transition-colors duration-700 relative overflow-hidden", isFocusMode ? "bg-[#050505]" : "bg-transparent")}>
      {!isFocusMode && <BackgroundAtmosphere />}
      {!isFocusMode && <Navbar />}

      {!isFocusMode ? (
        <main className="flex-grow pt-24 lg:pt-32 pb-8 px-4 lg:px-8">
          <div className="container mx-auto max-w-7xl h-full flex flex-col">

            {/* Header Bar */}
            <div className="glass-card bg-slate-900/40 backdrop-blur-xl rounded-[1.5rem] p-4 lg:p-6 shadow-2xl border-white/5 mb-4 lg:mb-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in relative z-20">
              <div className="flex items-center gap-3 lg:gap-4 w-full md:w-auto">
                <Link
                  to={`/study/${courseType}/${domain}/${subject}`}
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                >
                  <ArrowLeft size={18} className="lg:w-5 lg:h-5 text-foreground" />
                </Link>
                <div className="min-w-0 flex-1">
                  <h1 className="font-display text-base lg:text-xl font-bold line-clamp-1 text-foreground">
                    {noteDetails.title}
                  </h1>
                  <p className="text-[10px] lg:text-sm text-muted-foreground flex items-center gap-2 font-medium">
                    <span className="flex items-center gap-1"><FileText size={10} className="lg:w-3 lg:h-3" /> Page {currentPage} of {numPages || noteDetails.pages || '?'}</span>
                    <span>•</span>
                    <span className="truncate">{noteDetails.author}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 lg:gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsSaved(!isSaved);
                      toast.success(isSaved ? "Removed from My Notes" : "Added to My Notes");
                    }}
                    className={cn(
                      "rounded-full px-2 lg:px-4 h-9 lg:h-10 font-bold flex items-center gap-2 transition-all text-xs lg:text-sm",
                      isSaved ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20" : "text-muted-foreground bg-white/5 border border-white/5 hover:bg-white/10 hover:text-foreground"
                    )}
                  >
                    {isSaved ? <Check size={16} /> : <Plus size={16} />}
                    <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFocusMode}
                    className="text-gray-500 rounded-full hover:bg-gray-100 w-9 h-9 lg:w-10 lg:h-10 shrink-0"
                  >
                    <Maximize2 size={16} className="lg:w-4.5 lg:h-4.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 rounded-full hover:bg-gray-100 w-9 h-9 lg:w-10 lg:h-10 shrink-0">
                    <Share2 size={16} className="lg:w-4.5 lg:h-4.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 rounded-full hover:bg-gray-100 w-9 h-9 lg:w-10 lg:h-10 shrink-0">
                    <Flag size={16} className="lg:w-4.5 lg:h-4.5" />
                  </Button>
                </div>
                <Button
                  onClick={handleDownload}
                  size="sm"
                  className="rounded-full bg-black text-white w-9 h-9 lg:w-auto lg:px-6 lg:h-10 font-bold shadow-lg shadow-black/10 hover:bg-gray-800 text-xs lg:text-sm flex items-center justify-center lg:flex-none min-w-0 shrink-0"
                >
                  <Download size={14} className="lg:mr-2 lg:w-4 lg:h-4 shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">{isPremiumUser ? "Download PDF" : "Download"}</span>
                </Button>
              </div>
            </div>

            {/* Viewer Container */}
            <div className="flex-grow flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start relative pb-20 lg:pb-0">

              {/* Main PDF View */}
              <div
                className="w-full lg:col-span-9 relative min-h-[500px] lg:min-h-[600px] lg:h-auto perspective-1000 select-none pb-12 lg:pb-0 flex justify-center"
                onContextMenu={(e) => e.preventDefault()}
                ref={containerRef}
              >
                {!isLoading && !showPremiumBlock && noteDetails.pdfUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    {/* Desktop Navigation Buttons (Floating) */}
                    <button
                      onClick={() => changePage('prev')}
                      disabled={currentPage === 1}
                      className="hidden lg:flex absolute left-[-24px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-xl shadow-2xl border border-white/5 items-center justify-center text-foreground hover:text-primary hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={() => changePage('next')}
                      disabled={numPages ? currentPage >= numPages : false}
                      className="hidden lg:flex absolute right-[-24px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-xl shadow-2xl border border-white/5 items-center justify-center text-foreground hover:text-primary hover:scale-110 disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Mobile Navigation Toolbar (Fixed/Sticky at Bottom) */}
                    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl p-2 flex items-center gap-2 px-4">
                      <button
                        onClick={() => changePage('prev')}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary disabled:opacity-30"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      <button
                        onClick={() => setShowTopicsDrawer(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-xs font-bold shadow-lg active:scale-95 transition-all shadow-primary/20"
                      >
                        <BookOpen size={14} />
                        Topics
                      </button>

                      <button
                        onClick={() => changePage('next')}
                        disabled={numPages ? currentPage >= numPages : false}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary disabled:opacity-30"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>

                    <div className={cn(
                      "shadow-2xl rounded-[1rem] overflow-hidden transition-opacity duration-300 bg-white",
                      isLoading ? "opacity-0" : "opacity-100"
                    )}>
                      <Document
                        file={noteDetails.pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                          <div className="h-[600px] w-full flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                          </div>
                        }
                        error={
                          <div className="h-[400px] w-full flex flex-col items-center justify-center text-red-500 gap-2">
                            <FileText size={48} />
                            <p>Failed to load PDF.</p>
                          </div>
                        }
                      >
                        <Page
                          pageNumber={currentPage}
                          width={containerWidth ? Math.min(containerWidth, 900) : undefined}
                          className="max-w-full"
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </div>
                  </div>
                ) : showPremiumBlock ? (
                  /* Premium Block UI */
                  <div className="w-full h-[600px] bg-white rounded-[1.5rem] lg:rounded-[2rem] shadow-sm overflow-hidden z-10 px-4 relative flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0" />
                    <div className="relative z-10 p-4 lg:p-6 text-center">
                      <div className="w-14 h-14 lg:w-20 lg:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 lg:mb-6 animate-bounce-slow mx-auto">
                        <Lock size={32} className="text-primary lg:w-10 lg:h-10" />
                      </div>

                      <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2 lg:mb-3">
                        {!isLoggedIn ? 'Sign In Required' : 'Premium Content'}
                      </h2>
                      <p className="text-gray-500 text-sm lg:text-base max-w-md mb-6 lg:mb-8 leading-relaxed">
                        {!isLoggedIn
                          ? 'Join us to continue reading this note.'
                          : 'Unlock unlimited access to this and 1000+ other premium notes.'
                        }
                      </p>

                      <Button
                        size="xl"
                        onClick={() => !isLoggedIn ? setShowSignupPopup(true) : setShowPremiumPopup(true)}
                        className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-8 lg:px-10 h-12 lg:h-14 shadow-xl shadow-primary/20 text-sm lg:text-lg"
                      >
                        {!isLoggedIn ? 'Sign In' : 'Unlock Now - ₹599/yr'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Loading State */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-xl rounded-[1.5rem] lg:rounded-[2rem] border border-white/5 shadow-2xl h-[600px]">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-sm lg:text-base text-muted-foreground font-black uppercase tracking-[0.2em] animate-pulse opacity-60">Initializing Reader</p>
                  </div>
                )}
              </div>

              {/* Sidebar (Desktop only) */}
              <div className="hidden lg:block lg:col-span-3 space-y-6">
                {/* TOC */}
                <div className="glass-card bg-slate-900/40 backdrop-blur-xl rounded-[1.5rem] p-6 border-white/5 lg:sticky lg:top-24 shadow-2xl">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                    <BookOpen size={18} className="text-primary" />
                    Topics Covered
                  </h3>
                  <div className="space-y-3 relative max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/5" />

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
                          currentPage === i + 1 ? "bg-primary border-primary shadow-[0_0_10px_rgba(12,165,233,0.5)]" : "bg-slate-900 border-white/20 group-hover:border-primary"
                        )} />
                        <p className={cn(
                          "text-sm font-medium leading-tight pt-0.5 transition-colors",
                          currentPage === i + 1 ? "text-primary font-bold" : "text-muted-foreground group-hover:text-primary"
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
      ) : (
        <div className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden animate-fade-in transition-colors duration-1000">
          <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
          <div className="absolute top-[-25%] left-[-10%] w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Minimalist Focus Header */}
          <div className="fixed top-0 left-0 right-0 p-4 lg:p-6 flex items-center justify-between z-[210] safe-top">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={toggleFocusMode}
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-full px-4 h-10 lg:h-12 border border-white/10 backdrop-blur-md"
              >
                <X size={18} className="mr-2" />
                <span className="text-sm font-bold">Exit</span>
              </Button>

              <div className="hidden lg:block h-6 w-px bg-white/10 mx-2" />

              <div className="hidden lg:flex flex-col">
                <h2 className="text-white text-sm font-bold truncate max-w-xs">{noteDetails.title}</h2>
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono font-bold">Focus Session</p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTopicsDrawer(true)}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
              >
                <BookOpen size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
              >
                <Share2 size={20} />
              </Button>
              <Button
                onClick={handleDownload}
                className="rounded-full bg-white text-black px-6 h-10 lg:h-12 font-bold hover:bg-white/90 shadow-xl transition-all"
              >
                <Download size={18} className="lg:mr-2" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>

          {/* Centered Large Document View */}
          <div className="w-full max-w-5xl h-[85vh] lg:h-[80vh] px-4 lg:px-0 relative perspective-1000 flex justify-center items-center" ref={containerRef}>
            {/* Navigation Buttons */}
            <button
              onClick={() => changePage('prev')}
              disabled={currentPage === 1}
              className="absolute left-[20px] lg:left-[-100px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-20 lg:h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-0 transition-all duration-300"
            >
              <ChevronLeft size={48} className="hidden lg:block" />
              <ChevronLeft size={32} className="lg:hidden" />
            </button>

            <button
              onClick={() => changePage('next')}
              disabled={numPages ? currentPage >= numPages : false}
              className="absolute right-[20px] lg:right-[-100px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-20 lg:h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-0 transition-all duration-300"
            >
              <ChevronRight size={48} className="hidden lg:block" />
              <ChevronRight size={32} className="lg:hidden" />
            </button>

            {/* Page Content */}
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="bg-white rounded-[1rem] overflow-hidden shadow-2xl max-h-full">
                {!isLoading && noteDetails.pdfUrl && (
                  <Document
                    file={noteDetails.pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                      <div className="text-white/50">Loading PDF...</div>
                    }
                  >
                    <Page
                      pageNumber={currentPage}
                      width={containerWidth ? Math.min(containerWidth, 1000) : undefined}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="max-w-full"
                    />
                  </Document>
                )}
              </div>
            </div>
          </div>

          {/* Focus Progress Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-white/5">
            <div
              className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_10px_rgba(12,165,233,0.5)]"
              style={{ width: `${(currentPage / (numPages || 10)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {!isFocusMode && <Footer />}

      {/* Mobile Topics Drawer (Accessible in both modes) */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[300] transition-all duration-300",
          showTopicsDrawer ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            showTopicsDrawer ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setShowTopicsDrawer(false)}
        />

        {/* Drawer Content */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-8 pb-12 transition-transform duration-500 ease-out transform shadow-[0_-10px_40px_rgba(0,0,0,0.1)]",
            showTopicsDrawer ? "translate-y-0" : "translate-y-full"
          )}
        >
          {/* Handle */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />

          <h3 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
            <BookOpen size={24} className="text-primary" />
            Topics Covered
          </h3>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {["Introduction", "Basic Concepts", "Implementation", "Complexity Analysis", "Cases", "Conclusion"].map((topic, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl transition-all active:scale-[0.98]",
                  currentPage === i + 1 ? "bg-primary/5 border border-primary/10" : "bg-gray-50 border border-transparent"
                )}
                onClick={() => {
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentPage(i + 1);
                    setIsFlipping(false);
                    setShowTopicsDrawer(false);
                  }, 300);
                }}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  currentPage === i + 1 ? "bg-primary text-white" : "bg-white text-gray-400 border border-gray-200"
                )}>
                  {i + 1}
                </div>
                <p className={cn(
                  "font-bold transition-colors",
                  currentPage === i + 1 ? "text-primary" : "text-gray-600"
                )}>
                  {topic}
                </p>
                {currentPage === i + 1 && (
                  <Check size={18} className="ml-auto text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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