import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Shield
} from 'lucide-react';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
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
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
