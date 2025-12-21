import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import {
  User,
  GraduationCap,
  Crown,
  Edit3,
  Check,
  Clock,
  BookOpen,
  FolderHeart,
  Plus,
  Trash2,
  ArrowRight,
  Flame,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'collections' | 'history' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
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

  const handleLogout = () => {
    auth.logout();
    toast.success('Signed out successfully');
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">

          {/* Header Profile Card - Dark Blue Aesthetic */}
          <div className="relative rounded-[2.5rem] p-8 lg:p-12 mb-10 overflow-hidden group">
            {/* Dark Background with Blue Hue */}
            <div className="absolute inset-0 bg-[#0B1120] rounded-[2.5rem] z-0" />

            {/* Animated Gradient Glows */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_50%)] animate-slow-spin opacity-70 pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-0" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 z-0" />

            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-blue-500/20 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] z-0" />

            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                {/* Avatar Container with Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-[2rem] blur-[2px] opacity-75 animate-pulse" />
                <div className="relative w-full h-full rounded-[2rem] bg-[#0f172a] p-1 border border-blue-500/30 flex items-center justify-center overflow-hidden">
                  {auth.user.isPremium ? (
                    <div className="absolute top-2 right-2 z-20">
                      <Crown size={20} className="text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    </div>
                  ) : null}
                  <User size={56} className="text-blue-200/80" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/50 border border-blue-800/50 backdrop-blur-md mb-5 shadow-lg shadow-blue-900/20">
                  <span className={`w-2 h-2 rounded-full ${auth.user.isPremium ? 'bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'bg-blue-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-100">{auth.user.isPremium ? 'Pro Member' : 'Student Account'}</span>
                </div>

                <h1 className="font-display text-4xl lg:text-5xl font-bold mb-3 text-white tracking-tight drop-shadow-sm">
                  {auth.user.name}
                </h1>
                <p className="text-blue-200/70 flex items-center justify-center md:justify-start gap-2 mb-8 text-lg font-medium">
                  <GraduationCap size={20} className="text-blue-400" />
                  {auth.user.college || "No College Selected"} • {auth.user.semester || "Sem ?"}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  {!auth.user.isPremium && (
                    <button
                      onClick={() => navigate('/premium')}
                      className="relative h-14 px-8 rounded-full bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-2 group overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">Upgrade to Pro <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 via-white to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  )}
                  <Button variant="outline" className="h-14 px-8 rounded-full border-2 border-blue-500/20 hover:bg-blue-900/30 text-blue-100 hover:text-white font-bold text-lg bg-transparent" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'collections', label: 'Collections', icon: FolderHeart },
                  { id: 'history', label: 'History', icon: Clock },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 font-medium text-sm lg:text-base group",
                      activeTab === tab.id
                        ? "bg-gray-100 text-gray-900 font-bold"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <tab.icon size={20} className={cn("transition-colors", activeTab === tab.id ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600")} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-6">

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="animate-fade-up">
                  {/* Stats Grid */}
                  <div className="grid sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
                      <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
                        <Flame size={28} fill="currentColor" />
                      </div>
                      <p className="text-4xl font-bold font-display mb-1 text-gray-900">12</p>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Day Streak</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                        <BookOpen size={28} />
                      </div>
                      <p className="text-4xl font-bold font-display mb-1 text-gray-900">45</p>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Notes Read</p>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all">
                      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                        <Clock size={28} />
                      </div>
                      <p className="text-4xl font-bold font-display mb-1 text-gray-900">28h</p>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Study Time</p>
                    </div>
                  </div>

                  {/* Profile Edit Card */}
                  <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-bold">Personal Details</h2>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary hover:bg-primary/5"
                        onClick={() => {
                          if (isEditing) handleSave();
                          else setIsEditing(true);
                        }}
                      >
                        {isEditing ? <><Check size={18} className="mr-2" /> Save Changes</> : <><Edit3 size={18} className="mr-2" /> Edit Profile</>}
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <Input
                          disabled={!isEditing}
                          value={editData.name}
                          onChange={e => setEditData({ ...editData, name: e.target.value })}
                          className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all disabled:opacity-100 disabled:cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                        <Input
                          disabled
                          value={auth.user.email}
                          className="h-12 rounded-xl bg-gray-50 border-transparent text-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">College</label>
                        <Input
                          disabled={!isEditing}
                          value={editData.college}
                          onChange={e => setEditData({ ...editData, college: e.target.value })}
                          className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Semester</label>
                        <Input
                          disabled={!isEditing}
                          value={editData.semester}
                          onChange={e => setEditData({ ...editData, semester: e.target.value })}
                          className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* COLLECTIONS TAB */}
              {activeTab === 'collections' && (
                <div className="animate-fade-up">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">My Collections</h2>
                    <Dialog open={isCreatePlaylistOpen} onOpenChange={setIsCreatePlaylistOpen}>
                      <DialogTrigger asChild>
                        <Button className="rounded-full bg-black text-white hover:bg-gray-800">
                          <Plus size={18} className="mr-2" /> New Collection
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Collection</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <Input
                            placeholder="Collection name (e.g. Exam Prep)"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            className="h-12 rounded-xl"
                          />
                          <Button className="w-full" onClick={handleCreatePlaylist}>Create Collection</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {auth.myWordsPlaylists.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-gray-200">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <FolderHeart size={32} />
                      </div>
                      <p className="text-gray-500 font-medium">No collections created yet.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {auth.myWordsPlaylists.map(playlist => (
                        <div key={playlist.id} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 hover:shadow-md transition-all group relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center">
                              <FolderHeart size={24} />
                            </div>
                            <button onClick={() => handleDeletePlaylist(playlist.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <h3 className="font-bold text-lg mb-1">{playlist.name}</h3>
                          <p className="text-sm text-gray-500">{playlist.notes.length} Notes Saved</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
