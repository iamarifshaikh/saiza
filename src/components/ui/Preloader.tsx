import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [loading, setLoading] = useState(true);
    const [exitAnimation, setExitAnimation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setExitAnimation(true);
            setTimeout(() => {
                setLoading(false);
                onComplete();
            }, 1000); // Cinematic exit duration
        }, 2800);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!loading) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[99999] flex items-center justify-center bg-[#020617] transition-all duration-1000 ease-in-out overflow-hidden",
                exitAnimation ? "opacity-0 scale-110 blur-2xl pointer-events-none" : "opacity-100 scale-100"
            )}
        >
            {/* Deep Atmospheric Layered Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-cyan-400/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] bg-blue-600/10 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDuration: '7s', animationDelay: '1.5s' }} />
            </div>

            {/* Center Stage Content */}
            <div className="relative flex flex-col items-center z-10">
                {/* Neon Logo Container */}
                <div className="relative mb-12 group">
                    <div className="absolute inset-[-10px] bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
                    <div className="absolute inset-[-4px] bg-white/10 rounded-3xl blur-md" />

                    <div className="relative w-32 h-32 flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_0_50px_rgba(var(--primary),0.3)] animate-scale-up-down">
                        <img
                            src="/adroits-logo.png"
                            alt="Logo"
                            className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                        />
                    </div>
                </div>

                {/* Typography & Tech Loading Bar */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-4xl font-black tracking-[0.4em] text-white uppercase ml-[0.4em] animate-fade-in-up">
                            ADROITS
                        </h1>
                        <p className="text-primary/60 text-xs font-bold tracking-[0.4em] uppercase ml-[0.4em] animate-pulse">
                            Ultimate Engineering Notes
                        </p>
                    </div>

                    <div className="relative w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20" />
                        <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent w-full animate-loading-bar" />
                    </div>
                </div>
            </div>

            {/* Shutter Reveal Transition Effect */}
            {exitAnimation && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl animate-fade-out" />
                </div>
            )}
        </div>
    );
};

export default Preloader;
