import { useState } from "react";
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

// Subject Data Mock
const subjectsByDomain: Record<string, { id: string; title: string; isPremium: boolean; code: string }[]> = {
  computer: [
    { id: "dsa", title: "Data Structures", isPremium: false, code: "CSC301" },
    { id: "os", title: "Operating Systems", isPremium: false, code: "CSC302" },
    { id: "dbms", title: "Database Mgmt Systems", isPremium: true, code: "CSC303" },
    { id: "cn", title: "Computer Networks", isPremium: false, code: "CSC304" },
    { id: "se", title: "Software Engineering", isPremium: true, code: "CSC305" },
    { id: "ai", title: "Artificial Intelligence", isPremium: true, code: "CSC306" },
  ],
  it: [
    { id: "web", title: "Web Development", isPremium: false, code: "ITC301" },
    { id: "cloud", title: "Cloud Computing", isPremium: true, code: "ITC302" },
    { id: "security", title: "Cyber Security", isPremium: false, code: "ITC303" },
    { id: "mobile", title: "Mobile App Dev", isPremium: true, code: "ITC304" },
  ],
  mechanical: [
    { id: "thermo", title: "Thermodynamics", isPremium: false, code: "MEC301" },
    { id: "manufacturing", title: "Manufacturing Processes", isPremium: false, code: "MEC302" },
    { id: "design", title: "Machine Design", isPremium: true, code: "MEC303" },
    { id: "fluid", title: "Fluid Mechanics", isPremium: false, code: "MEC304" },
  ],
  extc: [
    { id: "digital", title: "Digital Electronics", isPremium: false, code: "EXT301" },
    { id: "signals", title: "Signals & Systems", isPremium: true, code: "EXT302" },
    { id: "comm", title: "Communication Systems", isPremium: false, code: "EXT303" },
    { id: "microprocessor", title: "Microprocessors", isPremium: true, code: "EXT304" },
  ],
  electrical: [
    { id: "power", title: "Power Systems", isPremium: false, code: "ELC301" },
    { id: "machines", title: "Electrical Machines", isPremium: true, code: "ELC302" },
    { id: "control", title: "Control Systems", isPremium: false, code: "ELC303" },
  ],
  chemical: [
    { id: "process", title: "Process Engineering", isPremium: false, code: "CHE301" },
    { id: "reactions", title: "Chemical Reactions", isPremium: true, code: "CHE302" },
    { id: "heat", title: "Heat Transfer", isPremium: false, code: "CHE303" },
  ],
  civil: [
    { id: "structures", title: "Structural Analysis", isPremium: false, code: "CIV301" },
    { id: "construction", title: "Construction Mgmt", isPremium: true, code: "CIV302" },
    { id: "surveying", title: "Surveying", isPremium: false, code: "CIV303" },
  ],
};

const domainNames: Record<string, string> = {
  computer: "Computer Engineering",
  it: "Information Technology",
  mechanical: "Mechanical Engineering",
  extc: "Electronics & Telecommunication",
  electrical: "Electrical Engineering",
  chemical: "Chemical Engineering",
  civil: "Civil Engineering",
};

const Subjects = () => {
  const { courseType, domain } = useParams();
  const allSubjects = subjectsByDomain[domain || ""] || [];
  const domainTitle = domainNames[domain || ""] || "Unknown Domain";
  const courseTitle = courseType === "diploma" ? "Diploma" : "Engineering";

  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);

  const filteredSubjects = allSubjects.filter(sub =>
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectClick = (e: React.MouseEvent, subject: { id: string; isPremium: boolean }) => {
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

  const handleSignup = (email: string, password: string, name: string, semester?: string, branch?: string) => {
    const success = auth.signUp(email, password, name);
    if (semester || branch) {
      console.log("Additional info:", semester, branch);
    }
    if (success) {
      setShowSignupPopup(false);
      setShowUserInfoPopup(true);
    }
    return success;
  };

  const handleCompleteInfo = (college: string, semester: string) => {
    auth.completeUserInfo(college, semester);
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

          {/* Empty State */}
          {filteredSubjects.length === 0 && (
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

export default Subjects;
