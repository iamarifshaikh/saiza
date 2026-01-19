import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, GraduationCap, BookOpen, User as UserIcon, ScrollText } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/hooks/useAuth';

interface UserInfoPopupProps {
  isOpen: boolean;
  onComplete: (college: string, semester: string, courseType: string, fullName?: string) => void;
}

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
  "Shah and Anchor Kutchhi Engineering College",
  "Other",
];

const semesters = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester",
  "5th Semester", "6th Semester", "7th Semester", "8th Semester",
];

const UserInfoPopup = ({ isOpen, onComplete }: UserInfoPopupProps) => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [semester, setSemester] = useState('');
  const [courseType, setCourseType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.name) setFullName(user.name);
    if (user?.college) setCollege(user.college);
    if (user?.semester) setSemester(user.semester);
    if (user?.courseType) setCourseType(user.courseType);
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !college || !semester || !courseType) {
      toast.error('Please fill in all essential fields');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    onComplete(college, semester, courseType, fullName);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Premium Dark Backdrop */}
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-2xl" />

      {/* Floating Mesh Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg animate-scale-in z-10">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 relative">

          {/* Header Visual */}
          <div className="pt-12 pb-8 text-center px-10">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center mx-auto shadow-2xl shadow-primary/20 border border-white/20">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-black mb-3 tracking-tight text-white uppercase italic">
              Verify Identity
            </h2>
            <p className="text-gray-400 text-base font-medium max-w-sm mx-auto leading-relaxed">
              Complete your academic profile to unlock full platform features.
            </p>
          </div>

          {/* Premium Form */}
          <form onSubmit={handleSubmit} className="px-10 pb-12 space-y-6">
            <div className="grid grid-cols-1 gap-5">

              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                  <UserIcon size={12} className="text-primary" /> Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arif Shaikh"
                  className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-bold placeholder:text-gray-600 px-6"
                />
              </div>

              {/* Course Type Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                  <ScrollText size={12} className="text-primary" /> Course Type
                </label>
                <Select value={courseType} onValueChange={setCourseType}>
                  <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-bold px-6">
                    <SelectValue placeholder="Diploma or Engineering?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-[#0f172a] border-white/10 text-white z-[150] backdrop-blur-3xl p-2">
                    <SelectItem value="DIPLOMA" className="rounded-xl focus:bg-primary focus:text-white transition-colors py-3 px-4 font-bold">
                      Diploma
                    </SelectItem>
                    <SelectItem value="ENGINEERING" className="rounded-xl focus:bg-primary focus:text-white transition-colors py-3 px-4 font-bold">
                      Engineering
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* College Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                  <GraduationCap size={12} className="text-primary" /> Institution
                </label>
                <Select value={college} onValueChange={setCollege}>
                  <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-bold px-6">
                    <SelectValue placeholder="Select College" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-[#0f172a] border-white/10 text-white z-[150] backdrop-blur-3xl p-2 max-h-[200px] overflow-y-auto">
                    {colleges.map((c) => (
                      <SelectItem key={c} value={c} className="rounded-xl focus:bg-primary focus:text-white transition-colors py-3 px-4 font-bold">
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Semester Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                  <BookOpen size={12} className="text-primary" /> Academic Stage
                </label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-bold px-6">
                    <SelectValue placeholder="Current Semester" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl bg-[#0f172a] border-white/10 text-white z-[150] backdrop-blur-3xl p-2 max-h-[200px] overflow-y-auto">
                    {semesters.map((s) => (
                      <SelectItem key={s} value={s} className="rounded-xl focus:bg-primary focus:text-white transition-colors py-3 px-4 font-bold">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-16 rounded-[1.5rem] mt-4 bg-primary text-white hover:bg-primary/90 font-black text-lg shadow-[0_15px_30px_rgba(var(--primary),0.3)] transition-all hover:-translate-y-1 uppercase tracking-widest border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Saving Profile
                </div>
              ) : 'Access Platform'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPopup;
