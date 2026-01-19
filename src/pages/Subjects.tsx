import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Lock, BookOpen, Crown, Search, ChevronRight, Hash, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PremiumPopup from "@/components/popups/PremiumPopup";
import SignupPopup from "@/components/popups/SignupPopup";
import UserInfoPopup from "@/components/popups/UserInfoPopup";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import BackgroundAtmosphere from "@/components/ui/BackgroundAtmosphere";
import api from "@/lib/api";

const domainNames: Record<string, string> = {
  computer: "Computer Engineering",
  it: "Information Technology",
  mechanical: "Mechanical Engineering",
  extc: "Electronics & Telecommunication",
  electrical: "Electrical Engineering",
  chemical: "Chemical Engineering",
  civil: "Civil Engineering",
};

interface Subject {
  id: string;
  title: string;
  code: string;
  isPremium: boolean;
  domainId: string;
}

const Subjects = () => {
  const { courseType, domain } = useParams();
  const domainTitle = domainNames[domain || ""] || (domain?.toUpperCase() || "Unknown Domain");
  const courseTitle = courseType === "diploma" ? "Diploma" : "Engineering";

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        // Construct real DB ID from URL params (e.g., 'computer' -> 'eng-computer')
        // DataSeeder uses 'eng-' and 'dip-' prefixes
        const prefix = courseType === 'diploma' ? 'dip-' : 'eng-';
        const dbDomainId = prefix + domain;

        const res = await api.get(`/subjects/domain/${dbDomainId}`);
        setSubjects(res.data);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
        toast.error("Could not load subjects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (domain) {
      fetchSubjects();
    }
  }, [domain]);

  const filteredSubjects = subjects.filter(sub =>
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (e: React.MouseEvent, subject: Subject) => {
    if (subject.isPremium && !auth.user?.isPremium) {
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
    auth.completeUserInfo(college, semester, type, fullName);
    setShowUserInfoPopup(false);
  };

  return (
    <div className="min-h-screen bg-transparent font-sans relative overflow-hidden">
      <BackgroundAtmosphere />
      <Navbar />
      <main className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-10 animate-fade-in flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/study" className="hover:text-primary transition-colors">Study</Link>
            <ChevronRight size={14} />
            <Link to={`/study/${courseType}`} className="hover:text-primary transition-colors">{courseTitle}</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-bold">{domainTitle}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 animate-fade-up">
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest border border-primary/20 mb-4 uppercase">
                {courseTitle} Streams
              </span>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground tracking-tight">
                {domainTitle}
              </h1>
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={20} />
              <Input
                placeholder="Search for subjects..."
                className="w-full h-14 pl-12 rounded-full bg-card border-border shadow-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-base text-foreground font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <Spinner className="w-10 h-10 mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground animate-pulse">Loading Subjects...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredSubjects.length === 0 && (
            <div className="text-center py-20 bg-card rounded-[2.5rem] border border-dashed border-border">
              <Sparkles className="mx-auto text-muted-foreground/20 mb-4" size={48} strokeWidth={1.5} />
              <p className="text-xl text-muted-foreground font-bold opacity-60">No subjects found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-primary font-bold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Subjects Grid/List */}
          {!loading && (
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredSubjects.map((subject, index) => (
                <Link
                  key={subject.id}
                  to={`/study/${courseType}/${domain}/${subject.id}`}
                  onClick={(e) => handleSubjectClick(e, subject)}
                  className="group relative animate-fade-up"
                  style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                >
                  {/* Desktop Card View / Mobile List Item */}
                  <div className={`
                    h-full glass-card transition-all duration-300 relative overflow-hidden flex
                    rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 
                    flex-row sm:flex-col items-center sm:items-stretch gap-4 sm:gap-0
                    hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1
                  `}>

                    {/* Icon/Badge - Side in mobile, Top in desktop */}
                    <div className="flex sm:justify-between items-center sm:items-start sm:mb-6 shrink-0">
                      <div className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                        subject.isPremium ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                      )}>
                        {subject.isPremium ? <Crown size={20} className="sm:w-6 sm:h-6" /> : <BookOpen size={20} className="sm:w-6 sm:h-6" />}
                      </div>
                      <span className="hidden sm:flex bg-muted/50 text-muted-foreground/60 text-[10px] font-bold px-2 py-1 rounded-full border border-border items-center gap-1 uppercase tracking-widest">
                        <Hash size={10} /> {subject.code}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Code tag for mobile only */}
                      <div className="sm:hidden mb-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{subject.code}</span>
                      </div>

                      <h3 className="font-display text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors sm:line-clamp-2 sm:mb-2">
                        {subject.title}
                      </h3>

                      {/* Meta info for mobile only */}
                      <p className="sm:hidden text-[10px] text-gray-500">
                        {subject.isPremium ? 'Premium Access' : 'Free Notes'}
                      </p>
                    </div>

                    {/* Action block - Hidden text on mobile, full width on desktop */}
                    <div className="sm:mt-auto sm:pt-6 flex items-center justify-end sm:justify-between sm:border-t sm:border-border shrink-0">
                      <span className={cn(
                        "hidden sm:inline text-[10px] font-bold uppercase tracking-widest opacity-60",
                        subject.isPremium ? 'text-amber-500' : 'text-muted-foreground group-hover:text-primary transition-colors'
                      )}>
                        {subject.isPremium && !auth.user?.isPremium ? 'Locked' : 'View Notes'}
                      </span>

                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                        subject.isPremium && !auth.user?.isPremium
                          ? 'bg-muted/50 text-muted-foreground/40'
                          : 'bg-primary text-white group-hover:translate-x-1 sm:group-hover:translate-x-1.5 shadow-primary/20'
                      )}>
                        {subject.isPremium && !auth.user?.isPremium ? <Lock size={14} /> : <ArrowRight size={14} />}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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

// Simple Spinner Component (inline for simplicity if not exists)
const Spinner = ({ className }: { className?: string }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default Subjects;
