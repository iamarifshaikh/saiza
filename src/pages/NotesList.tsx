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
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-4 lg:px-8">
        <div className="container mx-auto max-w-5xl">

          {/* Top Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 animate-fade-in">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link to={`/study/${courseType}/${domain}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                <span className="bg-gray-100 p-1.5 rounded-lg"><ChevronLeft size={16} /></span>
                <span>Back to Subjects</span>
              </Link>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <Input
                placeholder="Search topic..."
                className="w-full h-12 pl-12 rounded-full bg-white border-gray-200 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {notes.length} Notes Available
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
              {subjectTitle}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Curated study materials for {domainName} {courseTitle}. Master the concepts with ease.
            </p>
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
                  <div className={`bg-white rounded-[1.5rem] p-5 sm:p-6 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 ${note.isPremium && !auth.user?.isPremium ? 'opacity-90' : ''}`}>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm ${note.isPremium ? 'bg-amber-50 text-amber-500' : 'bg-red-50 text-red-500'}`}>
                      {note.isPremium ? <Crown size={28} /> : <FileText size={28} />}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                          {note.title}
                        </h3>
                        {note.isPremium && (
                          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-1">{note.description}</p>

                      <div className="flex items-center gap-4 text-xs font-medium text-gray-400 pt-1">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <FileText size={12} /> {note.pages} Pages
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <Clock size={12} /> {note.readTime} read
                        </span>
                        <span className="hidden sm:inline-block">•</span>
                        <span className="hidden sm:inline-block">Updated {note.date}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                      <Button variant="outline" className={`w-full sm:w-32 rounded-xl font-bold h-12 border-gray-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all ${note.isPremium && !auth.user?.isPremium ? 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-500 group-hover:border-gray-200 cursor-not-allowed' : ''}`}>
                        {note.isPremium && !auth.user?.isPremium ? (
                          <><Lock size={16} className="mr-2" /> Locked</>
                        ) : (
                          <>Read Note <ChevronRight size={16} className="ml-1" /></>
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
