import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
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

// Sample notes data
const notesData: Record<string, { id: string; title: string; description: string; isPremium: boolean; pages: number; readTime: string; date: string }[]> = {
  dsa: [
    {
      id: 'arrays',
      title: 'Arrays & Strings Masterclass',
      description: 'Comprehensive guide to array manipulation, string algorithms, and sliding window techniques.',
      isPremium: false,
      pages: 45,
      readTime: '30 min',
      date: 'Aug 12'
    },
    {
      id: 'linked-lists',
      title: 'Linked List Implementation',
      description: 'Deep dive into Singly, Doubly, and Circular linked lists with complete code examples.',
      isPremium: false,
      pages: 32,
      readTime: '25 min',
      date: 'Aug 14'
    },
    {
      id: 'trees',
      title: 'Binary Trees & BST',
      description: 'Visualizations and traversals (Inorder, Preorder, Postorder) for binary trees.',
      isPremium: true,
      pages: 56,
      readTime: '45 min',
      date: 'Aug 20'
    },
    {
      id: 'graphs',
      title: 'Graph Algorithms (BFS/DFS)',
      description: 'Shortest path algorithms, adjacency matrix vs list, and real-world applications.',
      isPremium: true,
      pages: 62,
      readTime: '55 min',
      date: 'Aug 25'
    },
  ],
  // Fallback for other subjects
  default: [
    {
      id: 'intro',
      title: 'Introduction & Basics',
      description: 'Fundamental concepts and definitions to get started with the subject.',
      isPremium: false,
      pages: 12,
      readTime: '10 min',
      date: 'Sep 01'
    },
    {
      id: 'advanced',
      title: 'Advanced Concepts Part 1',
      description: 'Exploring complex topics and theoretical frameworks in depth.',
      isPremium: true,
      pages: 34,
      readTime: '35 min',
      date: 'Sep 05'
    },
  ]
};

const subjectNames: Record<string, string> = {
  dsa: 'Data Structures',
  os: 'Operating Systems',
  dbms: 'DBMS',
  cn: 'Computer Networks',
  se: 'Software Eng.',
  ai: 'AI & ML',
};

const NotesList = () => {
  const { courseType, domain, subject } = useParams();
  const rawNotes = notesData[subject || ''] || notesData['default'];
  // Duplicate for demo density
  const notes = [...rawNotes, ...rawNotes];

  const subjectTitle = subjectNames[subject || ''] || 'Subject Notes';
  const courseTitle = courseType === 'diploma' ? 'Diploma' : 'Engineering';
  const domainName = domain ? (domain.charAt(0).toUpperCase() + domain.slice(1)) : 'Subject';

  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuth();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 -z-10 bg-mesh opacity-[0.15] lg:opacity-40" />

      {/* Animated Background Blobs - Subtler for mobile */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 lg:opacity-100">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] lg:w-[40%] h-[40%] bg-primary/5 lg:bg-primary/10 rounded-full blur-[80px] lg:blur-[120px] animate-pulse-glow" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[20%] -right-[5%] w-[60%] lg:w-[35%] h-[35%] bg-cyan-400/5 lg:bg-cyan-400/10 rounded-full blur-[60px] lg:blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />
      <main className="pt-24 lg:pt-40 pb-12 lg:pb-32 px-4 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* Navigation & Title Section */}
          <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-12 animate-fade-in">
            {/* Back Button */}
            <div className="flex items-center text-xs lg:text-sm font-medium text-muted-foreground">
              <Link to={`/study/${courseType}/${domain}`} className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                <span className="bg-white p-1.5 lg:p-2 rounded-xl shadow-sm border border-gray-100 group-hover:bg-primary/5 transition-colors">
                  <ChevronLeft size={16} className="text-gray-400 group-hover:text-primary" />
                </span>
                <span className="font-bold">Back to Subjects</span>
              </Link>
            </div>

            {/* Heading & Badge */}
            <div className="space-y-1.5 lg:space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50/50 text-blue-600 px-2.5 py-1 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider border border-blue-100/50 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {notes.length} Modules Available
              </div>
              <h1 className="font-display text-3xl lg:text-7xl font-black text-foreground tracking-tight leading-[1] lg:leading-[0.85] uppercase">
                {subjectTitle}
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
                className="w-full h-12 lg:h-14 pl-12 rounded-2xl lg:rounded-[1.25rem] bg-white border-gray-200 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm lg:text-base border-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Notes List */}
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
                  <div className={`bg-white rounded-2xl lg:rounded-[1.5rem] p-4 lg:p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 ${note.isPremium && !auth.user?.isPremium ? 'opacity-90' : ''}`}>

                    {/* Icon */}
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm ${note.isPremium ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'}`}>
                      {note.isPremium ? <Crown size={20} className="lg:w-7 lg:h-7" /> : <FileText size={20} className="lg:w-7 lg:h-7" />}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0 space-y-1 lg:space-y-2">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <h3 className="font-display text-base lg:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors sm:truncate">
                          {note.title}
                        </h3>
                        {note.isPremium && (
                          <span className="bg-amber-100 text-amber-700 text-[8px] lg:text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs lg:text-sm line-clamp-2 sm:line-clamp-1 leading-relaxed">{note.description}</p>

                      <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-[10px] lg:text-xs font-bold text-gray-400 pt-1">
                        <span className="flex items-center gap-1.5 bg-gray-50/80 px-2 py-1 rounded-lg border border-gray-100">
                          <FileText size={12} className="text-primary/70" /> {note.pages} pages
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50/80 px-2 py-1 rounded-lg border border-gray-100">
                          <Clock size={12} className="text-primary/70" /> {note.readTime}
                        </span>
                        <span className="bg-gray-50/80 px-2 py-1 rounded-lg border border-gray-100 text-gray-400">
                          {note.date}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-4 sm:mt-0 w-full sm:w-auto shrink-0">
                      <Button variant="outline" className={`w-full sm:w-32 rounded-xl font-bold h-10 lg:h-12 border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-xs lg:text-base ${note.isPremium && !auth.user?.isPremium ? 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-500 group-hover:border-gray-200 cursor-not-allowed' : ''}`}>
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
              <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No notes found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
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

export default NotesList;
