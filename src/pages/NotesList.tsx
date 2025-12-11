import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, ArrowRight, Lock, FileText, Crown } from 'lucide-react';

// Sample notes for Computer Engineering > DSA
const notesData: Record<string, { id: string; title: string; description: string; isPremium: boolean; pages: number }[]> = {
  dsa: [
    { 
      id: 'arrays-basics', 
      title: 'Arrays - Basics & Operations', 
      description: 'Complete guide to arrays, memory allocation, and common operations',
      isPremium: false,
      pages: 24
    },
    { 
      id: 'linked-lists', 
      title: 'Linked Lists Complete Guide', 
      description: 'Singly, doubly, and circular linked lists with implementations',
      isPremium: true,
      pages: 32
    },
  ],
  os: [
    { 
      id: 'process-management', 
      title: 'Process Management', 
      description: 'Processes, threads, scheduling algorithms',
      isPremium: false,
      pages: 28
    },
    { 
      id: 'memory-management', 
      title: 'Memory Management', 
      description: 'Virtual memory, paging, segmentation',
      isPremium: true,
      pages: 36
    },
  ],
};

const subjectNames: Record<string, string> = {
  dsa: 'Data Structures & Algorithms',
  os: 'Operating Systems',
  dbms: 'Database Management Systems',
  cn: 'Computer Networks',
  se: 'Software Engineering',
  ai: 'Artificial Intelligence',
};

const NotesList = () => {
  const { courseType, domain, subject } = useParams();
  const notes = notesData[subject || ''] || notesData['dsa'];
  const subjectTitle = subjectNames[subject || ''] || 'Subject Notes';
  const courseTitle = courseType === 'diploma' ? 'Diploma' : 'Engineering';

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
            <Link to={`/study/${courseType}/${domain}`} className="hover:text-foreground transition-colors">Computer Engineering</Link>
            <span>/</span>
            <span className="text-foreground">{subjectTitle}</span>
          </div>

          {/* Back Link */}
          <Link 
            to={`/study/${courseType}/${domain}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-up"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Subjects</span>
          </Link>

          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-4 animate-fade-up stagger-1">
              {subjectTitle}
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-up stagger-2">
              Select a note to start studying. Premium notes are marked with a crown.
            </p>
          </div>

          {/* Notes Grid */}
          <div className="grid gap-4 md:gap-6">
            {notes.map((note, index) => (
              <Link
                key={note.id}
                to={`/study/${courseType}/${domain}/${subject}/${note.id}`}
                className="group animate-fade-up"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="card-premium p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-6 hover:shadow-medium">
                  {/* Icon */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${note.isPremium ? 'bg-gradient-to-br from-primary/20 to-primary/5' : 'bg-muted'}`}>
                    {note.isPremium ? (
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    ) : (
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/60" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold line-clamp-2 sm:truncate">
                        {note.title}
                      </h3>
                      {note.isPremium && (
                        <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 w-fit">
                          <Crown size={12} />
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:truncate">
                      {note.description}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1 sm:mt-2">
                      {note.pages} pages
                    </p>
                  </div>

                  {/* Arrow - hidden on mobile */}
                  <div className="hidden sm:flex w-10 h-10 rounded-xl bg-muted/50 items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotesList;
