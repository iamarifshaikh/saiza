import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
            toast.error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        // Persist login state
        auth.signUp(formData.email, formData.password, isLogin ? (auth.user?.name || "Guest") : formData.name);

        // Mock success
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');

        // Redirect to study page or profile
        navigate('/study');

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#0f172a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-primary/5 rounded-full blur-[120px] opacity-50" />
            </div>

            {/* Back to Home */}
            <Link to="/" className="absolute top-6 left-6 z-20 text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </Link>

            {/* Main Card */}
            <div className="relative w-full max-w-[440px] animate-scale-in">
                <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-primary/20 relative">

                    {/* Decorative Top Mesh */}
                    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/10 to-transparent z-0 pointer-events-none" />

                    {/* Header */}
                    <div className="pt-10 pb-6 text-center relative z-10 px-8">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20 rotate-3 transform hover:rotate-0 transition-transform duration-500">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2 tracking-tight text-white">
                            {isLogin ? 'Welcome Back' : 'Join Adroits'}
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed max-w-[90%] mx-auto">
                            {isLogin
                                ? 'Sign in to access your notes'
                                : 'Start your learning journey today'
                            }
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5 relative z-10">
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
                                    className="h-14 rounded-[1.2rem] bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-medium placeholder:text-gray-500"
                                />
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
                                className="h-14 rounded-[1.2rem] bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-medium placeholder:text-gray-500"
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
                                    placeholder="Enter your password"
                                    className="h-14 rounded-[1.2rem] bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-primary/50 transition-all font-medium placeholder:text-gray-500 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-14 rounded-[1.5rem] mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <p className="text-center text-sm text-gray-400 pt-4">
                            {isLogin ? "New to Adroits? " : 'Already a member? '}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-bold hover:underline"
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

export default Auth;
