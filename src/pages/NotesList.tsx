import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Crown, Search, FileText, Clock, ChevronLeft, Lock } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import PremiumPopup from "@/components/popups/PremiumPopup";
import SignupPopup from "@/components/popups/SignupPopup";
import UserInfoPopup from "@/components/popups/UserInfoPopup";
import { toast } from "sonner";
import BackgroundAtmosphere from "@/components/ui/BackgroundAtmosphere";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  pages: number;
  readTime: string;
  date: string;
  pdfUrl: string;
}

const NotesList = () => {
  const { courseType, domain, subject } = useParams();
  // const location = useLocation(); // Unused
  const auth = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);

  const courseTitle = courseType === 'diploma' ? 'Diploma' : 'Engineering';
  const domainName = domain ? (domain.charAt(0).toUpperCase() + domain.slice(1)) : 'Subject';
  const subjectName = subject ? (subject.charAt(0).toUpperCase() + subject.slice(1)) : 'Subject Notes'; // Fallback if API fail

  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!subject) return;
      try {
        setLoading(true);
        const res = await api.get(`/notes/subject/${subject}`);
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to load notes", err);
        toast.error("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [subject]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.description && note.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleNoteClick = (e: React.MouseEvent, isPremium: boolean) => {
    if (isPremium && !auth.user?.isPremium) {
      e.preventDefault();
      setShowPremiumPopup(true);
    }
  };

  const handleBuyPremium = () => {
    auth.upgradeToPremium();
    setShowPremiumPopup(false);
    toast.success('Welcome to Premium! Enjoy unlimited access.');
  };

  const handleSignup = async (email: string, password: string, name: string, semester?: string, branch?: string) => {
    const success = await auth.signUp(email, password, name);
    if (semester || branch) {
      console.log("Additional info:", semester, branch);
    }
    if (success) {
      setShowSignupPopup(false);
      setShowUserInfoPopup(true);
    }
    return success;
  };

  const handleCompleteInfo = (college: string, semester: string, type: string, fullName?: string) => {
    // Pass courseType from params if not provided, though UserInfoPopup provides logic.
    // Actually UserInfoPopup passes (college, semester, courseType, fullName).
    // So we just need to match the signature.
    // Wait, UserInfoPopup onComplete signature is (college, semester, courseType, fullName).
    // auth.completeUserInfo signature is (college, semester, courseType, name).
    auth.completeUserInfo(college, semester, type, fullName);
    setShowUserInfoPopup(false);
  };

  return (
    <div className="min-h-screen bg-transparent font-sans relative overflow-hidden">
      <BackgroundAtmosphere />

      <Navbar />
      <main className="pt-24 lg:pt-40 pb-12 lg:pb-32 px-4 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* Navigation & Title Section */}
          <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-12 animate-fade-in">
            {/* Back Button */}
            <div className="flex items-center text-xs lg:text-sm font-medium text-muted-foreground">
              <Link to={`/study/${courseType}/${domain}`} className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                <span className="glass-card bg-slate-900/40 p-1.5 lg:p-2 rounded-xl shadow-sm border-white/5 group-hover:bg-primary/10 transition-colors">
                  <ChevronLeft size={16} className="text-muted-foreground group-hover:text-primary" />
                </span>
                <span className="font-bold">Back to Subjects</span>
              </Link>
            </div>

            {/* Heading & Badge */}
            <div className="space-y-1.5 lg:space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest border border-primary/20 backdrop-blur-sm shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {filteredNotes.length} Modules Available
              </div>
              <h1 className="font-display text-3xl lg:text-7xl font-black text-foreground tracking-tight leading-[1] lg:leading-[0.85] uppercase">
                {subjectName}
              </h1>
              <p className="text-muted-foreground text-xs lg:text-xl max-w-2xl leading-relaxed font-medium">
                Curated study materials for {domainName} {courseTitle}. Master the concepts with ease.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-xl group pt-2 lg:pt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <Input
                placeholder="Search topic or keywords..."
                className="w-full h-12 lg:h-14 pl-12 rounded-2xl lg:rounded-[1.25rem] bg-white/5 border-white/5 shadow-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm lg:text-base border-2 text-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <Spinner className="w-10 h-10 mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground animate-pulse">Loading Notes...</p>
            </div>
          )}

          {/* Notes List */}
          {!loading && (
            <div className="grid gap-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, index) => (
                  <Link
                    key={index}
                    to={`/study/${courseType}/${domain}/${subject}/${note.id}`}
                    state={{ note }} // Pass note data to viewer
                    onClick={(e) => handleNoteClick(e, note.isPremium)}
                    className="group relative animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`glass-card bg-slate-900/20 backdrop-blur-xl rounded-2xl lg:rounded-[1.5rem] p-4 lg:p-6 border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 ${note.isPremium && !auth.user?.isPremium ? 'opacity-90' : ''}`}>

                      {/* Icon */}
                      <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-inner ${note.isPremium ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                        {note.isPremium ? <Crown size={20} className="lg:w-7 lg:h-7" /> : <FileText size={20} className="lg:w-7 lg:h-7" />}
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0 space-y-1 lg:space-y-2">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <h3 className="font-display text-base lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors sm:truncate">
                            {note.title}
                          </h3>
                          {note.isPremium && (
                            <span className="bg-amber-500/10 text-amber-500 text-[8px] lg:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shrink-0 border border-amber-500/20 shadow-inner">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs lg:text-sm line-clamp-2 sm:line-clamp-1 leading-relaxed font-medium">{note.description}</p>

                        <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[10px] lg:text-xs font-black text-muted-foreground/40 pt-1 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                            <FileText size={12} className="text-primary/70" /> {note.pages || 0} pages
                          </span>
                          <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                            <Clock size={12} className="text-primary/70" /> {note.readTime || '5 min'}
                          </span>
                          <span className="bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-muted-foreground/40">
                            {note.date || 'Recent'}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="mt-4 sm:mt-0 w-full sm:w-auto shrink-0">
                        <Button variant="outline" className={`w-full sm:w-32 rounded-xl font-bold h-10 lg:h-12 border-white/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-xs lg:text-base ${note.isPremium && !auth.user?.isPremium ? 'bg-white/5 text-muted-foreground/40 group-hover:bg-white/10 group-hover:text-muted-foreground/60 group-hover:border-white/10 cursor-not-allowed' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                          {note.isPremium && !auth.user?.isPremium ? (
                            <><Lock size={14} className="mr-1.5 lg:w-4 lg:h-4" /> Locked</>
                          ) : (
                            <>Read Note <ChevronRight size={14} className="ml-1 lg:w-4 lg:h-4" /></>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-24 glass-card bg-slate-900/10 backdrop-blur-xl border border-dashed border-white/5 rounded-[2.5rem]">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-muted-foreground/40" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">No notes found</h3>
                  <p className="text-muted-foreground font-medium italic opacity-60">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Popups */}
      <PremiumPopup
        isOpen={showPremiumPopup}
        onClose={() => setShowPremiumPopup(false)}
        onBuyPremium={handleBuyPremium}
        isSignedUp={auth.isSignedUp}
        onSignupRequired={() => {
          setShowPremiumPopup(false);
          setShowSignupPopup(true);
        }}
      />

      <SignupPopup
        isOpen={showSignupPopup}
        onClose={() => setShowSignupPopup(false)}
        onSignup={handleSignup}
        canClose={true}
        message="Sign up to purchase premium"
      />

      <UserInfoPopup
        isOpen={showUserInfoPopup}
        onComplete={handleCompleteInfo}
      />
    </div>
  );
};

// Simple Spinner (Same as Subjects.tsx)
const Spinner = ({ className }: { className?: string }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default NotesList;
