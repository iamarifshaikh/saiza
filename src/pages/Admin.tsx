import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Shield,
  Plus,
  Trash2,
  BookOpen,
  FolderOpen,
  FileText,
  Crown,
  LogOut,
  Users,
  MessageSquare,
  BarChart3,
  Activity,
  Download,
  Eye,
  Search,
  Mail,
  Phone,
  TrendingUp,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import AdminPreloader from '@/components/ui/AdminPreloader';
import AdminDashboardLoader from '@/components/ui/AdminDashboardLoader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Reveal from '@/components/animations/Reveal';
import api from "@/lib/api";

// Admin credentials (TODO: Move to backend auth ideally, but keeping as is for client-side gate)
const ADMIN_PASSWORD = 'adroits2024admin';

interface Domain {
  id: string;
  name: string;
  courseType: 'diploma' | 'engineering';
}

interface Subject {
  id: string;
  name: string;
  domainId: string;
  isPremium: boolean;
}

interface Note {
  id: string;
  title: string;
  subjectId: string;
  isPremium: boolean;
  pdfUrl: string;
}

interface Interaction {
  id: string;
  userId: string;
  type: 'view' | 'download';
  contentId: string;
  timestamp: string;
  path?: string;
  details?: string;
}

interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  interactionsCount: number;
  lastActive: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface TrafficLog {
  date: string;
  visitors: number;
  domain: string;
}

const Admin = () => {
  // Check for existing session on mount
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_session') === 'active';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminPreloading, setIsAdminPreloading] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(() => {
    // If already authenticated on mount, show the dashboard loader
    return localStorage.getItem('admin_session') === 'active';
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'users' | 'analytics' | 'messages'>('overview');

  // Dynamic Data State
  const [domains, setDomains] = useState<Domain[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [logs, setLogs] = useState<Interaction[]>([]);

  // Use backend names for domain mapping if needed, but for now we'll rely on the API data

  // Hardcoded for now (or TODO: Fetch users/messages from backend)
  const [registeredUsers] = useState<RegisteredUser[]>([
    { id: 'u1', name: 'Arif Shaikh', email: 'arif@example.com', phone: '+91 9876543210', joinedAt: '2025-12-15', interactionsCount: 12, lastActive: '2025-12-29 14:30' },
  ]);

  // Hardcoded for now
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch Data on Authenticated Mount
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const [domainsRes, , , logsRes, healthRes] = await Promise.all([
            api.get('/domains').catch(err => {
              console.error("Domains Fetch Failed:", err);
              return { data: [] };
            }),
            // We need to fetch ALL subjects. The current API is /subjects/domain/:id. 
            // We might need to iterate domains or adds an endpoint /subjects/all. 
            // For now, let's fetch domains first, then fetch subjects for each.
            // ACTUALLY: Let's assume we have a way, or just fetch sequentially for now.
            Promise.resolve({ data: [] }), // Placeholder 
            Promise.resolve({ data: [] }), // Placeholder
            api.get('/admin/logs').catch(err => {
              console.error("Logs Fetch Failed:", err);
              return { data: [] };
            }),
            api.get('/health').catch((err) => {
              console.error("Health Check Failed:", err);
              return { data: { server: 'down', database: 'disconnected', error: err.message } };
            })
          ]);

          // Map backend 'title' to 'name' for frontend compatibility
          const mappedDomains = domainsRes.data.map((d: any) => ({
            ...d,
            name: d.title || d.name,
            courseType: d.courseType || 'engineering' // Fallback for old data
          }));
          setDomains(mappedDomains);

          setLogs(logsRes.data);
          setHealthStatus(healthRes.data);
          console.log("Health Check Response:", healthRes.data);
          console.log("Mapped Domains:", mappedDomains);

          // Cascading fetch for subjects (since we don't have get-all-subjects endpoint yet publicly maybe?)
          // Wait, the user wants dynamic.
          // Let's rely on fetching subjects when domains change or just iterate.
        } catch (e) {
          console.error("Failed to load admin data", e);
          toast.error("Failed to load dashboard data");
        }
      };

      // Initial fetch of domains and logs
      fetchData();
    }
  }, [isAuthenticated]);

  // Fetch all subjects and notes when domains are loaded
  useEffect(() => {
    const fetchContent = async () => {
      if (domains.length === 0) return;

      try {
        // Fetch subjects for all domains
        const allSubjects: Subject[] = [];
        for (const d of domains) {
          try {
            const res = await api.get(`/subjects/domain/${d.id}`);
            // Map backend response to interface if needed
            // user code uses 'name' backend uses 'title'. Let's map it.
            const mapped = res.data.map((s: any) => ({
              id: s.id,
              name: s.title,
              domainId: d.id, // backend might not return domainId in list
              isPremium: s.isPremium
            }));
            allSubjects.push(...mapped);
          } catch (err) { }
        }
        setSubjects(allSubjects);
      } catch (e) { console.error(e) }
    };
    fetchContent();
  }, [domains]);

  // Fetch notes when subjects are loaded
  useEffect(() => {
    const fetchNotes = async () => {
      if (subjects.length === 0) return;
      try {
        const allNotes: Note[] = [];
        for (const s of subjects) {
          try {
            const res = await api.get(`/notes/subject/${s.id}`);
            // Map backend 'Note' to frontend 'Note'
            // Backend: id, title, description, isPremium, pdfUrl...
            const mapped = res.data.map((n: any) => ({
              id: n.id,
              title: n.title,
              subjectId: s.id,
              isPremium: n.isPremium,
              pdfUrl: n.pdfUrl || ''
            }));
            allNotes.push(...mapped);
          } catch (err) { }
        }
        setNotes(allNotes);
      } catch (e) { console.error(e) }
    };
    fetchNotes();
  }, [subjects]);

  const interactions = logs; // Alias for compatibility

  // Messages state is declared above.
  // const [messages, setMessages] = ... (removed duplicate)

  const [trafficLogs] = useState<TrafficLog[]>([
    { date: '2025-12-23', visitors: 120, domain: 'Computer Engineering' },
    { date: '2025-12-24', visitors: 150, domain: 'Computer Engineering' },
    { date: '2025-12-25', visitors: 80, domain: 'Mechanical Engineering' },
    { date: '2025-12-26', visitors: 200, domain: 'Information Technology' },
    { date: '2025-12-27', visitors: 180, domain: 'Computer Engineering' },
    { date: '2025-12-28', visitors: 250, domain: 'Information Technology' },
    { date: '2025-12-29', visitors: 310, domain: 'Computer Engineering' },
  ]);

  // Form states update
  const [subjectCreationStream, setSubjectCreationStream] = useState<'engineering' | 'diploma'>('engineering');
  const [noteCreationStream, setNoteCreationStream] = useState<'engineering' | 'diploma'>('engineering');
  const [noteCreationDomainId, setNoteCreationDomainId] = useState<string>('');

  const [newDomain, setNewDomain] = useState<{ name: string; courseType: 'diploma' | 'engineering' }>({ name: '', courseType: 'engineering' });
  const [newSubject, setNewSubject] = useState({ name: '', domainId: '', isPremium: false });
  const [newNote, setNewNote] = useState({ title: '', subjectId: '', isPremium: false, pdfUrl: '' });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(messages.length > 0 ? messages[0].id : null);
  const [selectedUserLog, setSelectedUserLog] = useState<RegisteredUser | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [filterDomain] = useState<string>('all');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [logFilterType, setLogFilterType] = useState<string>('all');
  const [logFilterDomain] = useState<string>('all');

  const [healthStatus, setHealthStatus] = useState<{ server: string, database: string, error?: string } | null>(null);

  const activeUsers = useMemo(() =>
    registeredUsers.filter(u => u.interactionsCount > 10) // Mock logic: users with > 10 interactions are active
    , [registeredUsers]);

  const selectedMessage = useMemo(() =>
    messages.find(m => m.id === selectedMessageId) || null
    , [messages, selectedMessageId]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_session', 'active');
      setIsAdminPreloading(true); // Trigger "ruthless" preloader
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 500); // Small delay to sync with preloader start if needed
      setError('');
      toast.success('Access Granted');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
    toast.success('Logged out');
  };

  const handleAddDomain = async () => {
    if (newDomain.name) {
      try {
        // Standardize Slug Generation to match DataSeeder/Subjects.tsx
        const inputName = newDomain.name.toLowerCase();
        let coreSlug = inputName.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        if (inputName.includes('chem')) coreSlug = 'chemical';
        else if (inputName.includes('civil')) coreSlug = 'civil';
        else if (inputName.includes('mechan')) coreSlug = 'mechanical';
        else if (inputName.includes('electrical')) coreSlug = 'electrical';
        else if (inputName.includes('electronic') || inputName.includes('tele') || inputName.includes('extc')) coreSlug = 'electronics';
        else if (inputName.includes('computer') || inputName.includes('cse')) coreSlug = 'computer';
        else if (inputName.includes('information') || inputName === 'it') coreSlug = 'information-technology';

        const payload = {
          id: (newDomain.courseType === 'diploma' ? 'dip-' : 'eng-') + coreSlug,
          title: newDomain.name,
          courseType: newDomain.courseType,
          description: "No description" // Mock default
        };
        // Backend expects 'title' but frontend internal uses 'name'. 
        // Backend Domain: id, title, description, courseType, subjects
        // We need to match backend expectation.
        await api.post('/admin/domains', payload);

        setDomains([...domains, { ...newDomain, id: payload.id }]);
        setNewDomain({ name: '', courseType: 'engineering' });
        toast.success('Domain added successfully');
      } catch (e: any) {
        toast.error(e.response?.data?.message || "Failed to add domain");
      }
    }
  };

  const handleAddSubject = async () => {
    if (newSubject.name && newSubject.domainId) {
      try {
        const payload = {
          title: newSubject.name,
          code: "SUB" + Math.floor(Math.random() * 1000), // Mock code
          domainId: newSubject.domainId,
          isPremium: newSubject.isPremium
        };
        console.log("DEBUG: Sending Subject Payload:", payload);
        const res = await api.post('/admin/subjects', payload);

        // Append locally using real ID from backend
        // Note: Backend returns 'title', we map to 'name'
        const savedSubject = res.data;
        const realId = savedSubject.id;

        setSubjects(prev => [...prev, {
          id: realId,
          name: savedSubject.title || newSubject.name,
          domainId: newSubject.domainId,
          isPremium: newSubject.isPremium
        }]);

        setNewSubject({ name: '', domainId: '', isPremium: false });
        // Trigger a refresh of subjects completely to be safe
        // For now, simpler to just append.
        toast.success('Subject added successfully');
      } catch (e: any) {
        console.error("Add Subject Error:", e);
        const errorMsg = e.response?.data?.message || e.message || "Unknown error";
        toast.error(`Failed to add subject: ${errorMsg}`);
      }
    }
  };

  // State for File Upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddNote = async () => {
    if (newNote.title && newNote.subjectId && selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', newNote.title);
        formData.append('subjectId', newNote.subjectId);
        formData.append('isPremium', String(newNote.isPremium)); // Convert boolean to string for FormData
        formData.append('description', "Uploaded via Admin Dashboard");
        formData.append('pages', "1");
        formData.append('readTime', "1 min");

        await api.post('/admin/notes/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success('Note uploaded successfully');
        setNewNote({ title: '', subjectId: '', isPremium: false, pdfUrl: '' });
        setSelectedFile(null);
        // Refresh notes logic...
        const fakeNote = {
          id: 'temp-' + Date.now(),
          title: newNote.title,
          subjectId: newNote.subjectId,
          isPremium: newNote.isPremium,
          pdfUrl: '#'
        };
        setNotes(prev => [...prev, fakeNote]);

      } catch (e: any) {
        console.error(e);
        toast.error("Failed to upload note");
      }
    } else {
      toast.error("Please fill all fields and select a file");
    }
  };

  const handleDeleteDomain = async (id: string) => {
    try {
      await api.delete(`/admin/domains/${id}`);
      setDomains(domains.filter(d => d.id !== id));
      // Optional: Cascade delete subjects locally for UI consistency,
      // though fetching fresh data is better.
      setSubjects(subjects.filter(s => s.domainId !== id));
      toast.success('Domain deleted successfully');
    } catch (e) {
      toast.error("Failed to delete domain");
    }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      await api.delete(`/admin/subjects/${id}`);
      setSubjects(subjects.filter(s => s.id !== id));
      setNotes(notes.filter(n => n.subjectId !== id));
      toast.success('Subject deleted successfully');
    } catch (e: any) {
      console.error("Delete failed:", e);
      // Robust error formatting
      let msg = "Failed to delete subject";
      if (e.response?.data) {
        if (typeof e.response.data === 'string') msg = e.response.data;
        else if (typeof e.response.data === 'object') msg = JSON.stringify(e.response.data);
      } else if (e.message) {
        msg = e.message;
      }
      console.error("Delete Subject Failed:", e);
      toast.error(`Delete failed: ${msg}`);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await api.delete(`/admin/notes/${id}`);
      setNotes(notes.filter(n => n.id !== id));
      toast.success('Note deleted');
    } catch (e) {
      toast.error("Failed to delete note");
    }
  };

  const toggleMessageRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
    setSelectedMessageId(id);
  };

  const metrics = useMemo(() => ({
    totalUsers: registeredUsers.length,
    activeNow: 42,
    totalDownloads: interactions.filter(i => i.type === 'download').length,
    unreadMessages: messages.filter(m => !m.isRead).length
  }), [registeredUsers, interactions, messages]);

  const filteredUsers = useMemo(() => {
    return registeredUsers.filter(user => {
      const matchesSearch = (user.name?.toLowerCase() || "").includes(userSearchQuery.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(userSearchQuery.toLowerCase());
      const matchesCourse = filterCourse === 'all' || user.interactionsCount > 0;
      const matchesDomain = filterDomain === 'all' || user.id === 'u1';
      return matchesSearch && matchesCourse && matchesDomain;
    });
  }, [registeredUsers, userSearchQuery, filterCourse, filterDomain]);

  const filteredLogs = useMemo(() => {
    return interactions.filter(log => {
      const user = registeredUsers.find(u => u.id === log.userId);
      const note = notes.find(n => n.id === log.contentId);
      const domainName = subjects.find(s => s.id === note?.subjectId)?.domainId;

      const matchesSearch =
        (log.contentId?.toLowerCase() || "").includes(logSearchQuery.toLowerCase()) ||
        (user?.name?.toLowerCase() || "").includes(logSearchQuery.toLowerCase()) ||
        (note?.title?.toLowerCase() || "").includes(logSearchQuery.toLowerCase());

      const matchesType = logFilterType === 'all' || log.type === logFilterType;
      const matchesDomain = logFilterDomain === 'all' || domainName === logFilterDomain;

      return matchesSearch && matchesType && matchesDomain;
    });
  }, [interactions, logSearchQuery, logFilterType, logFilterDomain, registeredUsers, notes, subjects]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 selection:bg-primary/10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <Reveal animation="reveal-zoom" duration={0.8}>
            <div className="bg-card dark:bg-slate-950 border border-border p-12 rounded-3xl shadow-xl relative transition-all">
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
                  Adroits <span className="text-primary">Admin</span>
                </h1>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Security Gateway</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="h-12 rounded-xl bg-muted/50 border-input px-4 text-foreground font-medium focus:ring-2 focus:ring-primary/20 transition-all text-center"
                  />
                </div>

                {error && (
                  <p className="text-[10px] font-bold text-destructive text-center">{error}</p>
                )}

                <Button
                  className="w-full h-12 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold text-xs uppercase tracking-widest transition-all"
                  onClick={handleLogin}
                >
                  Confirm Identity
                </Button>

                <div className="text-center">
                  <Link to="/" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                    Back to Website
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  // Handle preloader states after all hooks and auth check
  if (isAdminPreloading) {
    return <AdminPreloader onComplete={() => setIsAdminPreloading(false)} />;
  }

  if (isDashboardLoading) {
    return <AdminDashboardLoader onComplete={() => setIsDashboardLoading(false)} />;
  }

  const sidebarItems: { id: typeof activeTab; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Content Management', icon: FolderOpen },
    { id: 'users', label: 'User Directory', icon: Users },
    { id: 'analytics', label: 'Traffic & Logs', icon: Activity },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: metrics.unreadMessages },
  ];

  return (
    <div className="min-h-screen bg-background flex selection:bg-primary/20">
      {/* SaaS Sidebar */}
      <aside className="w-80 bg-card dark:bg-slate-950 border-r border-border flex flex-col sticky top-0 h-screen z-50 transition-all">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">ADROITS</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-500 group relative ${activeTab === item.id
                  ? 'bg-primary/5 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full" />
                )}
                <div className="flex items-center gap-3 relative z-10">
                  <item.icon size={16} className={activeTab === item.id ? 'opacity-100 font-bold' : 'opacity-60'} />
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${activeTab === item.id ? 'text-primary' : ''}`}>{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-10">
          <div className="group cursor-pointer" onClick={handleLogout}>
            <div className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-rose-500/5 transition-colors group">
              <LogOut size={16} className="text-[#94A3B8]/60 group-hover:text-rose-400/60 transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8]/60 group-hover:text-rose-400/40 transition-colors">Terminate</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-background relative selection:bg-primary/20 transition-all">
        <header className="h-20 bg-card/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-40 border-b border-border transition-all">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
              <Input
                placeholder="Search resources..."
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-muted/50 dark:bg-white/5 border-transparent focus:bg-muted dark:focus:bg-white/10 transition-all font-medium text-sm text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-foreground">ADMINISTRATOR</p>
                <p className="text-[10px] font-medium text-primary uppercase tracking-widest mt-0.5">Full Access</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-primary/20">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Sections */}
        <div className="p-12 space-y-12">
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-fade-in">
              <div className="flex items-end justify-between px-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Overview</h2>
                  <p className="text-muted-foreground text-sm font-medium">Real-time data and system status.</p>
                </div>
                <div className="px-4 py-2 bg-muted rounded-xl text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Active Sessions', value: metrics.activeNow, icon: Activity, color: 'text-primary' },
                  { label: 'Total Users', value: metrics.totalUsers, icon: Users, color: 'text-slate-500' },
                  { label: 'Total Downloads', value: metrics.totalDownloads, icon: Download, color: 'text-emerald-500' },
                  { label: 'Unread Messages', value: metrics.unreadMessages, icon: Mail, color: 'text-amber-500' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card dark:bg-slate-900 p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-105">
                        <stat.icon className={`${stat.color} w-5 h-5`} strokeWidth={2} />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="card-premium dark:glass-card dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-primary/10 dark:border-white/5 shadow-premium dark:shadow-2xl transition-all duration-700">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-display font-bold tracking-tight text-foreground italic">Recent Interactions</h3>
                      <Link to="#" onClick={() => setActiveTab('analytics')} className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-primary/80 transition-colors">View All</Link>
                    </div>
                    <div className="space-y-4">
                      {interactions.slice(0, 5).map((log) => {
                        const user = registeredUsers.find(u => u.id === log.userId);
                        const note = notes.find(n => n.id === log.contentId);
                        return (
                          <div key={log.id} className="flex items-center justify-between p-5 rounded-2xl bg-background/30 dark:bg-white/5 border border-primary/5 dark:border-white/10 hover:bg-background/50 dark:hover:bg-white/[0.04] transition-all group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-white/[0.03] flex items-center justify-center border border-primary/10 dark:border-white/10 shadow-inner">
                                {log.type === 'download' ? <Download size={16} className="text-primary opacity-80" /> : <Eye size={16} className="text-primary opacity-80" />}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{user?.name} {log.type === 'download' ? 'downloaded' : 'viewed'}</p>
                                <p className="text-[10px] font-medium text-primary/60 tracking-wider">
                                  {log.path || (note?.title || log.contentId)}
                                </p>
                              </div>
                            </div>
                            <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">{log.timestamp}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-card dark:bg-slate-900 p-8 rounded-[2.5rem] border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-bold tracking-tight text-foreground">Top Users</h3>
                      <Users size={18} className="text-muted-foreground/40" />
                    </div>
                    <div className="space-y-4">
                      {activeUsers.slice(0, 3).map(user => (
                        <div key={user.id} className="flex items-center gap-4 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {user.name[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-bold text-foreground">{user.name}</p>
                            <p className="text-[10px] font-medium text-muted-foreground">Active Now</p>
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card dark:bg-slate-900 p-8 rounded-[2.5rem] border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-bold tracking-tight text-foreground">System Status</h3>
                      <div className={`w-2 h-2 rounded-full ${healthStatus?.database === 'connected' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Database</span>
                          <span className={healthStatus?.database === 'connected' ? 'text-emerald-500' : 'text-red-500'}>
                            {healthStatus?.database === 'connected' ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${healthStatus?.database === 'connected' ? 'bg-emerald-500' : 'bg-red-500'} w-full rounded-full`} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Server API</span>
                          <span className="text-primary">Online</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary/60 w-full rounded-full animate-pulse" />
                        </div>
                      </div>

                      {/* Error Display */}
                      {healthStatus?.error && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono leading-relaxed">
                          Error: {healthStatus.error}
                          <br />
                          <span className="opacity-50">Check if backend is running on port 8080.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-10 animate-fade-in">
              <div className="px-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Content Management</h2>
                <p className="text-muted-foreground text-sm font-medium">Manage domains, subjects, and study materials.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Domains */}
                <div className="bg-card dark:bg-slate-900 p-8 rounded-[2.5rem] border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">Domains</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl h-9 px-4 border-primary/20 text-primary hover:bg-primary/5 font-bold text-[10px] uppercase tracking-widest transition-all"
                      onClick={handleAddDomain}
                    >
                      <Plus size={14} className="mr-1.5" /> Add Domain
                    </Button>
                  </div>
                  <div className="space-y-4 mb-8">
                    <Input
                      placeholder="Domain Name (e.g. Computer Science)"
                      value={newDomain.name}
                      onChange={e => setNewDomain({ ...newDomain, name: e.target.value })}
                      className="h-11 rounded-xl bg-muted/50 border-input text-foreground placeholder:text-muted-foreground/40 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                    <Select defaultValue="engineering" onValueChange={(v) => setNewDomain({ ...newDomain, courseType: v as any })}>
                      <SelectTrigger className="h-11 rounded-xl bg-muted/50 border-input text-foreground text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    {domains.map(domain => (
                      <div key={domain.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 dark:bg-white/5 border border-transparent hover:border-border group transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                            {domain.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground">{domain.name}</p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-80">
                              {domain.courseType} <span className="opacity-40 text-muted-foreground ml-2 font-mono">{domain.id}</span>
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDomain(domain.id)} className="h-8 w-8 p-0 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/5 transition-all">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subjects */}
                <div className="bg-card dark:bg-slate-900 p-8 rounded-[2.5rem] border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">Subjects</h3>
                    <Button
                      className="rounded-xl h-9 px-4 bg-primary text-white hover:bg-primary/90 font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
                      onClick={handleAddSubject}
                    >
                      <Plus size={14} className="mr-1.5" /> Add Subject
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <Input
                      placeholder="Subject Name"
                      value={newSubject.name}
                      onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                      className="h-11 rounded-xl bg-muted/50 border-input text-foreground placeholder:text-muted-foreground/40 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium col-span-2"
                    />

                    {/* Stream Selection Filter */}
                    <Select value={subjectCreationStream} onValueChange={(v: 'engineering' | 'diploma') => setSubjectCreationStream(v)}>
                      <SelectTrigger className="h-11 rounded-xl bg-muted/50 border-input text-foreground text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Stream" />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Filtered Domain Selection */}
                    <Select onValueChange={(v) => setNewSubject({ ...newSubject, domainId: v })}>
                      <SelectTrigger className="h-11 rounded-xl bg-muted/50 border-input text-foreground text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Select Domain" />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        {domains
                          .filter(d => d.courseType === subjectCreationStream)
                          .map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)
                        }
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-3 px-4 bg-muted/50 border border-input rounded-xl h-11 col-span-2">
                      <input
                        type="checkbox"
                        checked={newSubject.isPremium}
                        onChange={e => setNewSubject({ ...newSubject, isPremium: e.target.checked })}
                        className="w-4 h-4 rounded accent-primary bg-transparent border-input"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Crown size={12} className="text-primary/60" /> Premium
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {subjects.map(subject => (
                      <div key={subject.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 dark:bg-white/5 border border-transparent hover:border-border transition-all">
                        <div className="flex items-center gap-4">
                          <BookOpen size={16} className="text-muted-foreground" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-foreground">{subject.name}</p>
                              {subject.isPremium && <Crown size={10} className="text-primary/60" />}
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{domains.find(d => d.id === subject.domainId)?.name}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteSubject(subject.id)} className="h-8 w-8 p-0 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/5 transition-all">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes Management */}
              <div className="bg-card dark:bg-slate-900 p-10 rounded-[2.5rem] border border-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Study Materials</h3>
                  <Button
                    className="rounded-xl h-11 px-6 bg-primary text-white shadow-lg shadow-primary/20 font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-primary/90"
                    onClick={handleAddNote}
                  >
                    <Plus size={16} className="mr-2" /> Upload Note
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 p-8 rounded-2xl bg-muted/50 dark:bg-white/5 border border-border">

                  {/* Stream Select */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Stream</p>
                    <Select value={noteCreationStream} onValueChange={(v: 'engineering' | 'diploma') => {
                      setNoteCreationStream(v);
                      setNoteCreationDomainId(''); // Reset domain
                    }}>
                      <SelectTrigger className="h-11 bg-card border-input rounded-xl text-[10px] font-bold uppercase tracking-widest">
                        <SelectValue placeholder="Select Stream" />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Domain Select */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Domain</p>
                    <Select value={noteCreationDomainId} onValueChange={setNoteCreationDomainId}>
                      <SelectTrigger className="h-11 bg-card border-input rounded-xl text-[10px] font-bold uppercase tracking-widest">
                        <SelectValue placeholder="Select Domain" />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        {domains
                          .filter(d => d.courseType === noteCreationStream)
                          .map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)
                        }
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Select */}
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</p>
                    <Select onValueChange={(v) => setNewNote({ ...newNote, subjectId: v })}>
                      <SelectTrigger className="h-11 bg-card border-input rounded-xl text-[10px] font-bold uppercase tracking-widest">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        {subjects
                          .filter(s => s.domainId === noteCreationDomainId)
                          .map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)
                        }
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Title</p>
                    <Input
                      placeholder="Note Title"
                      value={newNote.title}
                      onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                      className="h-11 bg-card border-input rounded-xl text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">PDF File</p>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="h-11 bg-card border-input rounded-xl text-sm font-medium file:bg-primary file:text-white file:rounded-lg file:mr-4 file:border-0 file:px-4 file:text-xs file:font-bold file:uppercase file:tracking-widest hover:file:bg-primary/90 transition-all cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4 md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newNote.isPremium}
                        onChange={e => setNewNote({ ...newNote, isPremium: e.target.checked })}
                        className="w-4 h-4 rounded accent-primary"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Premium Access</span>
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map(note => (
                    <div key={note.id} className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all group shadow-sm">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                          <FileText size={18} />
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)} className="text-muted-foreground h-8 w-8 hover:text-destructive hover:bg-destructive/5 rounded-full p-0">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-base text-foreground line-clamp-1">{note.title}</h4>
                          {note.isPremium && <Crown size={12} className="text-primary/60" />}
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{subjects.find(s => s.id === note.subjectId)?.name}</p>
                      </div>
                      <div className="pt-4 border-t border-border flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-primary/80">
                        <span>View File</span>
                        <span className="cursor-pointer hover:underline">Link &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-10 animate-fade-in">
              <div className="px-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">User Directory</h2>
                <p className="text-muted-foreground text-sm font-medium">Manage registered students and track engagement.</p>
              </div>

              <div className="bg-card dark:bg-slate-900 border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-4 bg-muted/20">
                  <div className="flex flex-1 gap-3 min-w-[300px]">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={16} />
                      <Input
                        placeholder="Search users..."
                        value={userSearchQuery}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        className="h-10 pl-11 rounded-xl bg-card border-input text-sm font-medium"
                      />
                    </div>
                    <Select value={filterCourse} onValueChange={setFilterCourse}>
                      <SelectTrigger className="w-[140px] h-10 rounded-xl bg-card border-input text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <SelectValue placeholder="Stream" />
                      </SelectTrigger>
                      <SelectContent className="bg-card dark:bg-slate-900 border-border">
                        <SelectItem value="all">All Streams</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl h-10 px-4 gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <Download size={14} /> Export CSV
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted/10">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">User</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Engagement</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Joined At</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Active</th>
                        <th className="px-6 py-4 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="group hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{user.name}</p>
                                <p className="text-[10px] font-medium text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary/40 rounded-full" style={{ width: `${Math.min(user.interactionsCount * 5, 100)}%` }} />
                              </div>
                              <span className="text-[10px] font-bold text-muted-foreground">{user.interactionsCount} hits</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-bold text-muted-foreground">{user.joinedAt}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Clock size={12} className="text-muted-foreground/40" />
                              <span className="text-[10px] font-bold text-muted-foreground">{user.lastActive}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="font-bold text-[10px] uppercase tracking-widest text-primary hover:bg-primary/5 transition-all opacity-0 group-hover:opacity-100"
                              onClick={() => setSelectedUserLog(user)}
                            >
                              Log
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-10 animate-fade-in">
              <div className="px-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Analytics</h2>
                <p className="text-muted-foreground text-sm font-medium">Platform engagement and growth metrics.</p>
              </div>

              <div className="grid lg:grid-cols-4 gap-8">
                <div className="bg-card p-8 rounded-[2.5rem] border border-border flex flex-col justify-between group transition-all shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">High Traffic Day</h4>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><TrendingUp size={14} /></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight text-foreground">Sunday</h3>
                    <p className="text-xs font-bold text-emerald-500">
                      +12.4% <span className="text-muted-foreground font-medium">this week</span>
                    </p>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-[2.5rem] border border-border flex flex-col justify-between group transition-all shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Popular Subject</h4>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Activity size={14} /></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight text-foreground">COMPS</h3>
                    <p className="text-xs font-bold text-primary">62% <span className="text-muted-foreground font-medium">engagement</span></p>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-card p-8 rounded-[2.5rem] border border-border flex flex-col justify-between group transition-all shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">User Retention</h4>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Shield size={14} /></div>
                    </div>
                    <h3 className="text-4xl font-bold mb-4 tracking-tight text-foreground">84.2%</h3>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/60 rounded-full" style={{ width: '84.2%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Traffic Trends</h4>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">Weekly Overview</h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-4 py-1.5 rounded-lg bg-muted text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last 7 Days</div>
                  </div>
                </div>

                <div className="flex items-end justify-between h-56 gap-4 relative mb-12">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-px w-full bg-primary/20" />)}
                  </div>
                  {trafficLogs.map((log, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar relative">
                      <div
                        className="w-full bg-primary/10 group-hover/bar:bg-primary/30 rounded-t-xl transition-all duration-500 relative cursor-pointer"
                        style={{ height: `${(log.visitors / 350) * 100}%` }}
                      >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border px-3 py-1.5 rounded-lg text-[10px] font-bold opacity-0 group-hover/bar:opacity-100 transition-all shadow-xl z-20 whitespace-nowrap">
                          {log.visitors} visitors
                          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-card rotate-45 border-r border-b border-border" />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{log.date.split('-').slice(2).join('')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/10 p-8 rounded-2xl border border-border">
                  <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">Detailed Activity</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={14} />
                        <Input
                          placeholder="Search logs..."
                          value={logSearchQuery}
                          onChange={e => setLogSearchQuery(e.target.value)}
                          className="h-9 pl-9 w-48 rounded-lg bg-card border-input text-xs font-medium"
                        />
                      </div>
                      <Select value={logFilterType} onValueChange={setLogFilterType}>
                        <SelectTrigger className="w-[110px] h-9 rounded-lg bg-card border-input text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card dark:bg-slate-900 border-border">
                          <SelectItem value="all">All Logs</SelectItem>
                          <SelectItem value="view">Views</SelectItem>
                          <SelectItem value="download">Downloads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {filteredLogs.slice(0, 10).map(log => {
                      const user = registeredUsers.find(u => u.id === log.userId);
                      const note = notes.find(n => n.id === log.contentId);
                      const subject = subjects.find(s => s.id === note?.subjectId);
                      const domain = domains.find(d => d.id === subject?.domainId);
                      return (
                        <div key={log.id} className="p-3 rounded-lg bg-card/50 border border-transparent hover:border-border transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/60">
                                {log.type === 'download' ? <Download size={14} /> : <Eye size={14} />}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-foreground">{user?.name} <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-widest ml-1">{log.type}ed</span></p>
                                <p className="text-[10px] font-medium text-muted-foreground truncate max-w-[200px]">{note?.title} • {domain?.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-foreground">{log.timestamp.split(' ')[1]}</p>
                              <p className="text-[9px] font-medium text-muted-foreground opacity-60 mt-0.5">{log.timestamp.split(' ')[0]}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-10 animate-fade-in">
              <div className="px-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">Message Center</h2>
                <p className="text-muted-foreground text-sm font-medium">Coordinate inquiries and support requests.</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-320px)]">
                <div className="bg-card dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-sm flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-border bg-muted/20">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Messages</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {messages.map(msg => (
                      <button
                        key={msg.id}
                        onClick={() => toggleMessageRead(msg.id)}
                        className={`w-full text-left p-6 border-b border-border transition-all hover:bg-muted/30 group relative ${!msg.isRead ? 'bg-primary/[0.02]' : ''}`}
                      >
                        {!msg.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-sm ${!msg.isRead ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{msg.name}</h4>
                          <span className="text-[10px] text-muted-foreground/40 font-medium">{msg.createdAt}</span>
                        </div>
                        <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{msg.message}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-card rounded-[2.5rem] border border-border shadow-sm flex flex-col p-8 overflow-hidden">
                  {selectedMessage ? (
                    <div className="animate-fade-in flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8 border-b border-border pb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                            {selectedMessage.name[0]}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">{selectedMessage.name}</h3>
                            <div className="flex gap-4 mt-1">
                              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5"><Mail size={14} className="opacity-40" /> {selectedMessage.email}</span>
                              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5"><Phone size={14} className="opacity-40" /> {selectedMessage.phone}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          className="rounded-xl h-10 px-6 font-bold text-[10px] uppercase tracking-widest"
                          onClick={() => setIsReplyOpen(true)}
                        >
                          Send Reply
                        </Button>
                      </div>
                      <div className="flex-1 overflow-y-auto pr-2">
                        <div className="bg-muted/10 p-8 rounded-2xl border border-border">
                          <h4 className="text-base font-bold mb-6 text-foreground">Subject: {selectedMessage.subject}</h4>
                          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {selectedMessage.message}
                          </p>
                        </div>
                      </div>
                      <div className="pt-8 mt-auto border-t border-border">
                        <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest text-center">Received on {selectedMessage.createdAt}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-20">
                      <MessageSquare size={64} strokeWidth={1.5} className="mb-6" />
                      <h3 className="text-xl font-bold tracking-tight">Select a message</h3>
                      <p className="text-sm font-medium mt-1">Choose a conversation from the list to view details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Log Modal */}
        {selectedUserLog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/60 dark:bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedUserLog(null)} />
            <div className="w-full max-w-2xl relative z-10 bg-card rounded-[2rem] shadow-2xl border border-border overflow-hidden">
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                    {selectedUserLog.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{selectedUserLog.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedUserLog.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedUserLog(null)}>
                  <Plus className="rotate-45" size={20} />
                </Button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Activity History</h4>
                <div className="space-y-3">
                  {interactions.filter(i => i.userId === selectedUserLog.id).map(log => {
                    const note = notes.find(n => n.id === log.contentId);
                    return (
                      <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-transparent hover:border-border transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-card border border-border ${log.type === 'download' ? 'text-emerald-500' : 'text-primary'}`}>
                            {log.type === 'download' ? <Download size={14} /> : <Eye size={14} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{log.type === 'download' ? 'Download' : 'View'}</p>
                            <p className="text-[10px] text-muted-foreground font-medium">{note?.title || log.contentId}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground/60">{log.timestamp}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-8 border-t border-border flex justify-end">
                <Button className="rounded-xl px-8" onClick={() => setSelectedUserLog(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {isReplyOpen && selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/60 dark:bg-slate-950/80 backdrop-blur-md" onClick={() => setIsReplyOpen(false)} />
            <div className="w-full max-w-lg relative z-10 bg-card rounded-[2rem] shadow-2xl border border-border p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Compose Reply</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">To: {selectedMessage.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsReplyOpen(false)}>
                  <Plus className="rotate-45" size={20} />
                </Button>
              </div>
              <div className="space-y-6">
                <div className="bg-muted/10 p-4 rounded-xl border border-border">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Original Message</p>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{selectedMessage.message}</p>
                </div>
                <textarea
                  className="w-full h-40 bg-card border border-input rounded-xl p-4 text-sm font-medium text-foreground focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Type your response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold uppercase text-[10px] tracking-widest" onClick={() => setIsReplyOpen(false)}>Cancel</Button>
                  <Button
                    className="flex-[2] rounded-xl h-11 font-bold uppercase text-[10px] tracking-widest"
                    onClick={() => {
                      toast.success('Reply sent successfully');
                      setIsReplyOpen(false);
                      setReplyText('');
                    }}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
