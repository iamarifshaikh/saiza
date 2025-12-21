import { Button } from '@/components/ui/button';
import { X, Crown, Lock, Check } from 'lucide-react';

interface PremiumPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onBuyPremium: () => void;
    isSignedUp: boolean;
    onSignupRequired: () => void;
}

const features = [
    "Access all premium notes",
    "Download study materials",
    "Ad-free experience",
    "Priority support",
];

const PremiumPopup = ({ isOpen, onClose, onBuyPremium, isSignedUp, onSignupRequired }: PremiumPopupProps) => {
    if (!isOpen) return null;

    const handleBuyClick = () => {
        if (!isSignedUp) {
            onSignupRequired();
        } else {
            onBuyPremium();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md animate-scale-in">
                <div className="bg-[#0f172a] rounded-[2.5rem] shadow-2xl overflow-hidden border border-primary/20 relative group">
                    {/* Glow Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all border border-white/5"
                    >
                        <X size={16} />
                    </button>

                    {/* Locked Icon Section */}
                    <div className="pt-10 pb-6 text-center relative z-10">
                        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mx-auto mb-6 relative shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                            <Lock className="w-10 h-10 text-white drop-shadow-md" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#0f172a]">
                                <Crown className="w-4 h-4 text-primary fill-primary" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">
                            Premium Content
                        </h2>
                        <p className="text-gray-400 text-sm px-8 leading-relaxed">
                            Unlock this note and get unlimited access to all study materials.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="px-8 py-4">
                        <div className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Check size={14} className="text-primary" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-200">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="px-8 pb-10">
                        <div className="text-center mb-6">
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-5xl font-bold text-white tracking-tight">₹599</span>
                                <span className="text-gray-400 font-medium">/ year</span>
                            </div>
                            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
                                Best Value
                            </span>
                        </div>

                        <Button
                            size="lg"
                            className="w-full h-16 rounded-[1.5rem] bg-gradient-to-r from-primary to-cyan-400 hover:from-cyan-400 hover:to-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group/btn border-none"
                            onClick={handleBuyClick}
                        >
                            <span className="relative z-10 flex items-center gap-2 justify-center">
                                <Crown size={20} className="fill-white/20" />
                                {isSignedUp ? 'Get Premium Access' : 'Sign Up for Premium'}
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </Button>

                        <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                            <Lock size={10} /> Secure payment • Cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumPopup;
