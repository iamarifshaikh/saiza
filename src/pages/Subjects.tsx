import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Lock, FileText, Crown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import PremiumPopup from "@/components/popups/PremiumPopup";
import SignupPopup from "@/components/popups/SignupPopup";
import UserInfoPopup from "@/components/popups/UserInfoPopup";
import { toast } from "sonner";

const subjectsByDomain: Record<string, { id: string; title: string; isPremium: boolean }[]> = {
  computer: [
    { id: "dsa", title: "Data Structures & Algorithms", isPremium: false },
    { id: "os", title: "Operating Systems", isPremium: false },
    { id: "dbms", title: "Database Management Systems", isPremium: true },
    { id: "cn", title: "Computer Networks", isPremium: false },
    { id: "se", title: "Software Engineering", isPremium: true },
    { id: "ai", title: "Artificial Intelligence", isPremium: true },
  ],
  it: [
    { id: "web", title: "Web Development", isPremium: false },
    { id: "cloud", title: "Cloud Computing", isPremium: true },
    { id: "security", title: "Cyber Security", isPremium: false },
    { id: "mobile", title: "Mobile App Development", isPremium: true },
  ],
  mechanical: [
    { id: "thermo", title: "Thermodynamics", isPremium: false },
    { id: "manufacturing", title: "Manufacturing Processes", isPremium: false },
    { id: "design", title: "Machine Design", isPremium: true },
    { id: "fluid", title: "Fluid Mechanics", isPremium: false },
  ],
  extc: [
    { id: "digital", title: "Digital Electronics", isPremium: false },
    { id: "signals", title: "Signals & Systems", isPremium: true },
    { id: "comm", title: "Communication Systems", isPremium: false },
    { id: "microprocessor", title: "Microprocessors", isPremium: true },
  ],
  electrical: [
    { id: "power", title: "Power Systems", isPremium: false },
    { id: "machines", title: "Electrical Machines", isPremium: true },
    { id: "control", title: "Control Systems", isPremium: false },
  ],
  chemical: [
    { id: "process", title: "Process Engineering", isPremium: false },
    { id: "reactions", title: "Chemical Reactions", isPremium: true },
    { id: "heat", title: "Heat Transfer", isPremium: false },
  ],
  civil: [
    { id: "structures", title: "Structural Analysis", isPremium: false },
    { id: "construction", title: "Construction Management", isPremium: true },
    { id: "surveying", title: "Surveying", isPremium: false },
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
  const subjects = subjectsByDomain[domain || ""] || [];
  const domainTitle = domainNames[domain || ""] || "Unknown Domain";
  const courseTitle = courseType === "diploma" ? "Diploma" : "Engineering";
  
  const auth = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);

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

  const handleSignup = (email: string, password: string, name: string) => {
    const success = auth.signUp(email, password, name);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-up flex-wrap">
            <Link to="/study" className="hover:text-foreground transition-colors">Study</Link>
            <span>/</span>
            <Link to={`/study/${courseType}`} className="hover:text-foreground transition-colors">{courseTitle}</Link>
            <span>/</span>
            <span className="text-foreground">{domainTitle}</span>
          </div>

          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 animate-fade-up">
              {domainTitle}
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-up stagger-1">
              Select a subject to access study notes and materials.
            </p>
          </div>

          {/* Subjects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Link
                key={subject.id}
                to={`/study/${courseType}/${domain}/${subject.id}`}
                onClick={(e) => handleSubjectClick(e, subject)}
                className="group animate-fade-up"
                style={{ animationDelay: `${(index + 2) * 0.05}s` }}
              >
                <div className={`bg-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-medium hover:-translate-y-1 border border-border shadow-soft ${subject.isPremium && !auth.user?.isPremium ? "relative overflow-hidden opacity-80" : ""}`}>
                  {subject.isPremium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-mint text-secondary rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                      <Crown size={12} />
                      Premium
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${subject.isPremium ? 'bg-primary/20' : 'bg-lime/20'}`}>
                      {subject.isPremium && !auth.user?.isPremium ? (
                        <Lock size={24} className="text-primary" />
                      ) : (
                        <FileText size={24} className="text-foreground" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">
                    {subject.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-sm text-muted-foreground">
                      {subject.isPremium && !auth.user?.isPremium ? 'Unlock with Premium' : 'View Notes'}
                    </span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
