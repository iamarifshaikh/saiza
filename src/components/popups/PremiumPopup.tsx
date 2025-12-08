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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md animate-scale-in">
                <div className="bg-card rounded-3xl shadow-lg overflow-hidden border border-border/50">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <X size={16} />
                    </button>

                    {/* Locked Icon */}
                    <div className="pt-8 pb-4 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 relative">
                            <Lock className="w-8 h-8 text-primary" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <Crown className="w-3 h-3 text-primary-foreground" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                            Premium Content
                        </h2>
                        <p className="text-muted-foreground text-sm px-8">
                            This note is available exclusively for premium members
                        </p>
                    </div>

                    {/* Features */}
                    <div className="px-8 py-6">
                        <div className="bg-muted/30 rounded-2xl p-4 space-y-3">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Check size={12} className="text-primary" />
                                    </div>
                                    <span className="text-sm text-foreground/80">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="px-8 pb-8">
                        <div className="text-center mb-4">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-4xl font-bold">₹499</span>
                                <span className="text-muted-foreground">/year</span>
                            </div>
                        </div>

                        <Button
                            variant="premium"
                            size="lg"
                            className="w-full"
                            onClick={handleBuyClick}
                        >
                            <Crown size={18} />
                            {isSignedUp ? 'Get Premium Access' : 'Sign Up to Get Premium'}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground mt-3">
                            One-time payment • Full year access
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumPopup;
