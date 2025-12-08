import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface SignupPopupProps {
    isOpen: boolean;
    onClose?: () => void;
    onSignup: (email: string, password: string, name: string) => boolean;
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
    });
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

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

        const success = onSignup(formData.email, formData.password, formData.name);

        if (success) {
            toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
            if (onClose) onClose();
        }

        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
                onClick={canClose ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md animate-scale-in">
                <div className="bg-card rounded-3xl shadow-lg overflow-hidden border border-border/50">
                    {/* Close button */}
                    {canClose && onClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}

                    {/* Header */}
                    <div className="p-8 pb-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                            {isLogin ? 'Welcome Back' : 'Join SAIZA'}
                        </h2>
                        {message ? (
                            <p className="text-muted-foreground text-sm">{message}</p>
                        ) : (
                            <p className="text-muted-foreground text-sm">
                                {isLogin
                                    ? 'Sign in to continue learning'
                                    : 'Create an account to access premium notes'
                                }
                            </p>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium mb-2 text-foreground/80">
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground/80">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter your email"
                                className="h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-foreground/80">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="h-12 rounded-xl bg-muted/50 border-border/50 focus:border-primary pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="lime"
                            size="lg"
                            className="w-full mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground pt-2">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-medium hover:underline"
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
