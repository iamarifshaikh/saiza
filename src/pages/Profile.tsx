import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Crown, 
  LogOut, 
  Edit3, 
  Check, 
  X,
  Shield,
  Clock,
  BookOpen,
  FolderHeart,
  Plus,
  Trash2,
  FileText,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const colleges = [
  "Government Polytechnic Mumbai",
  "V.J.T.I. Mumbai",
  "K.J. Somaiya Polytechnic",
  "Thakur Polytechnic",
  "Rizvi College of Engineering",
  "D.J. Sanghvi College of Engineering",
  "Sardar Patel Institute of Technology",
  "Fr. Conceicao Rodrigues College",
  "Thadomal Shahani Engineering College",
  "Vidyalankar Polytechnic",
  "Bharati Vidyapeeth's Polytechnic",
  "Shah and Anchor Kutchhi Engineering College",
  "Other",
];

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'recent' | 'mywords'>('profile');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: auth.user?.name || '',
    college: auth.user?.college || '',
    semester: auth.user?.semester || '',
  });

  if (!auth.isSignedUp || !auth.user) {
    navigate('/');
    return null;
  }

  const handleSave = () => {
    auth.updateUser(editData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setEditData({
      name: auth.user?.name || '',
      college: auth.user?.college || '',
      semester: auth.user?.semester || '',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    auth.logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      auth.createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setIsCreatePlaylistOpen(false);
      toast.success('Collection created successfully');
    }
  };

  const handleDeletePlaylist = (playlistId: string) => {
    auth.deletePlaylist(playlistId);
    toast.success('Collection deleted');
  };

  const handleRemoveNoteFromPlaylist = (playlistId: string, noteId: string) => {
    auth.removeNoteFromPlaylist(playlistId, noteId);
    toast.success('Note removed from collection');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold mb-2">
              {auth.user.name}
            </h1>
            <p className="text-muted-foreground">
              Manage your SAIZA profile
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8 animate-fade-up stagger-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              <User size={16} className="inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'recent'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              <Clock size={16} className="inline mr-2" />
              Recent
            </button>
            <button
              onClick={() => setActiveTab('mywords')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'mywords'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
            >
              <FolderHeart size={16} className="inline mr-2" />
              My Words
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <>
              {/* Profile Card */}
              <div className="card-premium p-6 lg:p-8 animate-fade-up stagger-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Profile Information</h2>
                  {!isEditing ? (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit3 size={16} />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X size={16} />
                      </Button>
                      <Button 
                        variant="lime" 
                        size="sm"
                        onClick={handleSave}
                      >
                        <Check size={16} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Name */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input 
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="h-10 rounded-xl"
                        />
                      ) : (
                        <p className="font-medium">{auth.user.name}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Email Address
                      </label>
                      <p className="font-medium">{auth.user.email}</p>
                    </div>
                  </div>

                  {/* College */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground mb-1 block">
                        College
                      </label>
                      {isEditing ? (
                        <Select 
                          value={editData.college} 
                          onValueChange={(v) => setEditData({ ...editData, college: v })}
                        >
                          <SelectTrigger className="h-10 rounded-xl">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent>
                            {colleges.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium">{auth.user.college || 'Not set'}</p>
                      )}
                    </div>
                  </div>

                  {/* Semester */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Current Semester
                      </label>
                      {isEditing ? (
                        <Select 
                          value={editData.semester} 
                          onValueChange={(v) => setEditData({ ...editData, semester: v })}
                        >
                          <SelectTrigger className="h-10 rounded-xl">
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {semesters.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium">{auth.user.semester || 'Not set'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Status */}
              <div className={`card-premium p-6 mt-6 animate-fade-up stagger-2 ${auth.user.isPremium ? 'bg-gradient-to-r from-primary/10 to-primary/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${auth.user.isPremium ? 'bg-primary/20' : 'bg-muted'}`}>
                    {auth.user.isPremium ? (
                      <Crown size={24} className="text-primary" />
                    ) : (
                      <Shield size={24} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {auth.user.isPremium ? 'Premium Member' : 'Free Account'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {auth.user.isPremium 
                        ? 'You have access to all premium content' 
                        : 'Upgrade to access all premium notes'
                      }
                    </p>
                  </div>
                  {!auth.user.isPremium && (
                    <Button variant="premium" size="sm" onClick={() => navigate('/premium')}>
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>

              {/* Logout */}
              <div className="mt-8 animate-fade-up stagger-3">
                <Button 
                  variant="outline" 
                  className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Sign Out
                </Button>
              </div>
            </>
          )}

          {/* Recent Notes Tab */}
          {activeTab === 'recent' && (
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Notes</h2>
                <p className="text-sm text-muted-foreground">
                  Continue where you left off
                </p>
              </div>

              {auth.recentNotes.length === 0 ? (
                <div className="card-premium p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No recent notes</h3>
                  <p className="text-muted-foreground mb-6">
                    Start reading notes and they'll appear here
                  </p>
                  <Link to="/study">
                    <Button variant="lime">
                      Browse Notes
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {auth.recentNotes.map((note) => (
                    <Link
                      key={note.noteId}
                      to={`/study/${note.courseType}/${note.domain}/${note.subject}/${note.noteId}`}
                      className="block"
                    >
                      <div className="card-premium p-4 flex items-center gap-4 hover:shadow-medium transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                          <FileText size={20} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{note.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Page {note.lastPage} • {new Date(note.visitedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <ArrowRight size={16} className="text-primary" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Words Tab */}
          {activeTab === 'mywords' && (
            <div className="space-y-6 animate-fade-up">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">My Words</h2>
                  <p className="text-sm text-muted-foreground">
                    Your saved note collections
                  </p>
                </div>
                <Dialog open={isCreatePlaylistOpen} onOpenChange={setIsCreatePlaylistOpen}>
                  <DialogTrigger asChild>
                    <Button variant="lime" size="sm" className="gap-2">
                      <Plus size={16} />
                      New Collection
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Collection</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        placeholder="Collection name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                      <Button
                        variant="lime"
                        className="w-full"
                        onClick={handleCreatePlaylist}
                        disabled={!newPlaylistName.trim()}
                      >
                        Create Collection
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {auth.myWordsPlaylists.length === 0 ? (
                <div className="card-premium p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <FolderHeart size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No collections yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create a collection to organize your favorite notes
                  </p>
                  <Button variant="lime" onClick={() => setIsCreatePlaylistOpen(true)}>
                    <Plus size={16} className="mr-2" />
                    Create First Collection
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {auth.myWordsPlaylists.map((playlist) => (
                    <div key={playlist.id} className="card-premium p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FolderHeart size={18} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{playlist.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {playlist.notes.length} notes
                            </p>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Collection?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete "{playlist.name}" and remove all notes from it.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDeletePlaylist(playlist.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      {playlist.notes.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                          No notes in this collection yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {playlist.notes.map((note) => (
                            <div
                              key={note.noteId}
                              className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl group"
                            >
                              <FileText size={16} className="text-muted-foreground" />
                              <Link
                                to={`/study/${note.courseType}/${note.domain}/${note.subject}/${note.noteId}`}
                                className="flex-1 text-sm hover:text-primary transition-colors"
                              >
                                {note.title}
                              </Link>
                              <button
                                onClick={() => handleRemoveNoteFromPlaylist(playlist.id, note.noteId)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded-lg transition-all"
                              >
                                <X size={14} className="text-destructive" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
