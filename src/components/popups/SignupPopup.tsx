import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const branches = [
    "Computer Science (CSE)",
    "Information Technology (IT)",
    "Electronics (ECE)",
    "Electrical (EE)",
    "Mechanical (ME)",
    "Civil (CE)",
    "Biotech (BT)"
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

interface SignupPopupProps {
    isOpen: boolean;
    onClose?: () => void;
    onSignup: (email: string, password: string, name: string, semester?: string, branch?: string) => Promise<boolean> | boolean;
    canClose?: boolean;
    message?: string;
}

const SignupPopup = ({ isOpen, onClose, onSignup, canClose = true, message }: SignupPopupProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        semester: '',
        branch: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        // await new Promise(resolve => setTimeout(resolve, 1000));

        const isSignup = !isLogin;

        if (!formData.email || !formData.password || (isSignup && (!formData.name || !formData.semester || !formData.branch))) {
            toast.error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        const success = await onSignup(
            formData.email,
            formData.password,
            formData.name,
            isSignup ? formData.semester : undefined,
            isSignup ? formData.branch : undefined
        );

        if (success) {
            toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
            if (onClose) onClose();
        }

        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                onClick={canClose ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative w-full max-w-[440px] animate-scale-in">
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 relative">

                    {/* Decorative Background Mesh */}
                    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50/80 to-transparent z-0 pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Close button */}
                    {canClose && onClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 hover:text-black transition-all"
                        >
                            <X size={16} />
                        </button>
                    )}

                    {/* Header */}
                    <div className="pt-10 pb-6 text-center relative z-10 px-8">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20 rotate-3 transform hover:rotate-0 transition-transform duration-500">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900">
                            {isLogin ? 'Welcome Back' : 'Join Adroits'}
                        </h2>
                        {message ? (
                            <p className="text-gray-500 text-sm">{message}</p>
                        ) : (
                            <p className="text-gray-500 text-base leading-relaxed max-w-[80%] mx-auto">
                                {isLogin
                                    ? 'Sign in to access your notes'
                                    : 'Start your learning journey today'
                                }
                            </p>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-4 relative z-10">
                        {/* Name Field */}
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="h-12 rounded-[1rem] bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 transition-all font-medium placeholder:text-gray-400"
                                />
                            </div>
                        )}

                        {/* Semester & Branch Fields (Row) */}
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                        Semester
                                    </label>
                                    <select
                                        value={formData.semester}
                                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                        className="w-full h-12 px-3 rounded-[1rem] bg-gray-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Sem</option>
                                        {semesters.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                        Branch
                                    </label>
                                    <select
                                        value={formData.branch}
                                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                        className="w-full h-12 px-3 rounded-[1rem] bg-gray-50 border-transparent focus:bg-white focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Branch</option>
                                        {branches.map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="name@example.com"
                                className="h-12 rounded-[1rem] bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 transition-all font-medium placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Create password"
                                    className="h-12 rounded-[1rem] bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 transition-all font-medium placeholder:text-gray-400 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-14 rounded-[1.5rem] mt-4 bg-black text-white hover:bg-gray-800 font-bold text-base shadow-lg shadow-black/10 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <p className="text-center text-sm text-gray-500 pt-4">
                            {isLogin ? "New to Adroits? " : 'Already a member? '}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-black font-bold hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPopup;
