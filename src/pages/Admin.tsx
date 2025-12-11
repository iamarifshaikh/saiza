import { useState } from 'react';
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
  Save,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Admin credentials (in production, this should be server-side)
const ADMIN_PASSWORD = 'saiza2024admin';

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Data state
  const [domains, setDomains] = useState<Domain[]>([
    { id: 'computer', name: 'Computer Engineering', courseType: 'engineering' },
    { id: 'it', name: 'Information Technology', courseType: 'engineering' },
    { id: 'mechanical', name: 'Mechanical Engineering', courseType: 'engineering' },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'dsa', name: 'Data Structures & Algorithms', domainId: 'computer', isPremium: false },
    { id: 'os', name: 'Operating Systems', domainId: 'computer', isPremium: false },
    { id: 'dbms', name: 'Database Management Systems', domainId: 'computer', isPremium: true },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: 'arrays-basics', title: 'Arrays - Basics & Operations', subjectId: 'dsa', isPremium: false, pdfUrl: '/demo-free.pdf' },
    { id: 'linked-lists', title: 'Linked Lists Complete Guide', subjectId: 'dsa', isPremium: true, pdfUrl: '/demo-premium.pdf' },
  ]);

  // Form states
  const [newDomain, setNewDomain] = useState<{ name: string; courseType: 'diploma' | 'engineering' }>({ name: '', courseType: 'engineering' });
  const [newSubject, setNewSubject] = useState({ name: '', domainId: '', isPremium: false });
  const [newNote, setNewNote] = useState({ title: '', subjectId: '', isPremium: false, pdfUrl: '' });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleAddDomain = () => {
    if (newDomain.name) {
      const id = newDomain.name.toLowerCase().replace(/\s+/g, '-');
      setDomains([...domains, { ...newDomain, id }]);
      setNewDomain({ name: '', courseType: 'engineering' });
      toast.success('Domain added successfully');
    }
  };

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.domainId) {
      const id = newSubject.name.toLowerCase().replace(/\s+/g, '-');
      setSubjects([...subjects, { ...newSubject, id }]);
      setNewSubject({ name: '', domainId: '', isPremium: false });
      toast.success('Subject added successfully');
    }
  };

  const handleAddNote = () => {
    if (newNote.title && newNote.subjectId) {
      const id = newNote.title.toLowerCase().replace(/\s+/g, '-');
      setNotes([...notes, { ...newNote, id }]);
      setNewNote({ title: '', subjectId: '', isPremium: false, pdfUrl: '' });
      toast.success('Note added successfully');
    }
  };

  const handleDeleteDomain = (id: string) => {
    setDomains(domains.filter(d => d.id !== id));
    setSubjects(subjects.filter(s => s.domainId !== id));
    toast.success('Domain deleted');
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    setNotes(notes.filter(n => n.subjectId !== id));
    toast.success('Subject deleted');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    toast.success('Note deleted');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">Admin Panel</h1>
              <p className="text-muted-foreground text-sm">Enter password to continue</p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="h-12 rounded-xl"
              />
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
              <Button
                variant="lime"
                className="w-full h-12"
                onClick={handleLogin}
              >
                Access Panel
              </Button>
              <Link to="/" className="block">
                <Button variant="ghost" className="w-full gap-2">
                  <ArrowLeft size={16} />
                  Back to Website
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">SAIZA Admin</h1>
                <p className="text-xs text-muted-foreground">Content Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft size={14} />
                  View Site
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-destructive hover:text-destructive"
                onClick={() => setIsAuthenticated(false)}
              >
                <LogOut size={14} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="domains" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="domains" className="gap-2">
              <FolderOpen size={14} />
              Domains
            </TabsTrigger>
            <TabsTrigger value="subjects" className="gap-2">
              <BookOpen size={14} />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <FileText size={14} />
              Notes
            </TabsTrigger>
          </TabsList>

          {/* Domains Tab */}
          <TabsContent value="domains" className="space-y-6">
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Domain</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Domain name (e.g., Computer Engineering)"
                  value={newDomain.name}
                  onChange={(e) => setNewDomain({ ...newDomain, name: e.target.value })}
                  className="flex-1 h-12 rounded-xl"
                />
                <Select
                  value={newDomain.courseType}
                  onValueChange={(v: string) => setNewDomain({ ...newDomain, courseType: v as Domain['courseType'] })}
                >
                  <SelectTrigger className="w-40 h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="lime" className="h-12 gap-2" onClick={handleAddDomain}>
                  <Plus size={16} />
                  Add
                </Button>
              </div>
            </div>

            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Existing Domains</h2>
              <div className="space-y-3">
                {domains.map((domain) => (
                  <div key={domain.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FolderOpen size={18} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium">{domain.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{domain.courseType}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteDomain(domain.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Subject</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Subject name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="h-12 rounded-xl"
                />
                <Select
                  value={newSubject.domainId}
                  onValueChange={(v) => setNewSubject({ ...newSubject, domainId: v })}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSubject.isPremium}
                    onChange={(e) => setNewSubject({ ...newSubject, isPremium: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <Crown size={16} className="text-primary" />
                  <span className="text-sm">Premium Subject</span>
                </label>
                <Button variant="lime" className="gap-2" onClick={handleAddSubject}>
                  <Plus size={16} />
                  Add Subject
                </Button>
              </div>
            </div>

            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Existing Subjects</h2>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <BookOpen size={18} className="text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{subject.name}</p>
                          {subject.isPremium && (
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Crown size={10} />
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {domains.find(d => d.id === subject.domainId)?.name}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteSubject(subject.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Note</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="h-12 rounded-xl"
                />
                <Select
                  value={newNote.subjectId}
                  onValueChange={(v) => setNewNote({ ...newNote, subjectId: v })}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="PDF URL (e.g., /notes/chapter1.pdf)"
                value={newNote.pdfUrl}
                onChange={(e) => setNewNote({ ...newNote, pdfUrl: e.target.value })}
                className="h-12 rounded-xl mb-4"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newNote.isPremium}
                    onChange={(e) => setNewNote({ ...newNote, isPremium: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <Crown size={16} className="text-primary" />
                  <span className="text-sm">Premium Note</span>
                </label>
                <Button variant="lime" className="gap-2" onClick={handleAddNote}>
                  <Plus size={16} />
                  Add Note
                </Button>
              </div>
            </div>

            <div className="card-premium p-6">
              <h2 className="text-lg font-semibold mb-4">Existing Notes</h2>
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{note.title}</p>
                          {note.isPremium && (
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Crown size={10} />
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {subjects.find(s => s.id === note.subjectId)?.name}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Note */}
        <div className="mt-8 p-4 bg-muted/30 rounded-xl text-center">
          <p className="text-sm text-muted-foreground">
            Note: Changes are stored locally. Connect to a database for persistent storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
