import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface UserInfoPopupProps {
    isOpen: boolean;
    onComplete: (college: string, semester: string) => void;
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

const UserInfoPopup = ({ isOpen, onComplete }: UserInfoPopupProps) => {
    const [college, setCollege] = useState('');
    const [semester, setSemester] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!college || !semester) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        onComplete(college, semester);
        toast.success('Profile updated successfully!');
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-secondary/80 backdrop-blur-md" />

            {/* Modal */}
            <div className="relative w-full max-w-md animate-scale-in">
                <div className="bg-card rounded-3xl shadow-lg overflow-hidden border border-border/50">
                    {/* Header */}
                    <div className="p-8 pb-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <GraduationCap className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                            Complete Your Profile
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            Help us personalize your learning experience
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground/80">
                                College Name
                            </label>
                            <Select value={college} onValueChange={setCollege}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary">
                                    <SelectValue placeholder="Select your college" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {colleges.map((c) => (
                                        <SelectItem key={c} value={c} className="rounded-lg">
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground/80">
                                Current Semester
                            </label>
                            <Select value={semester} onValueChange={setSemester}>
                                <SelectTrigger className="h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary">
                                    <SelectValue placeholder="Select your semester" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {semesters.map((s) => (
                                        <SelectItem key={s} value={s} className="rounded-lg">
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            variant="lime"
                            size="lg"
                            className="w-full mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Continue'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPopup;
