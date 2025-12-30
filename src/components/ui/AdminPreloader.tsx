import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const AdminPreloader = ({ onComplete }: { onComplete: () => void }) => {
    const [exitAnimation, setExitAnimation] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setExitAnimation(true);
            setTimeout(() => {
                onComplete();
            }, 1000); // Cinematic exit duration
        }, 2800);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const isDark = theme === "dark";

    return (
        <div
            className={cn(
                "fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-1000 ease-in-out overflow-hidden",
                isDark ? "bg-[#010309]" : "bg-[#F8FAFC]",
                exitAnimation ? "opacity-0 scale-110 blur-2xl pointer-events-none" : "opacity-100 scale-100"
            )}
        >
            {/* Deep Atmospheric Layered Mesh - Admin Variation (Blue/Indigo Focus) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={cn(
                    "absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] animate-pulse-glow",
                    isDark ? "bg-primary/25" : "bg-primary/15"
                )} style={{ animationDuration: '4s' }} />
                <div className={cn(
                    "absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full blur-[120px] animate-pulse-glow",
                    isDark ? "bg-indigo-600/25" : "bg-indigo-600/15"
                )} style={{ animationDuration: '5s', animationDelay: '1s' }} />
            </div>

            {/* Center Stage Content */}
            <div className="relative flex flex-col items-center z-10">
                {/* Neon Logo Container */}
                <div className="relative mb-12 group">
                    <div className={cn(
                        "absolute inset-[-10px] rounded-3xl blur-2xl animate-pulse",
                        isDark ? "bg-primary/30" : "bg-primary/10"
                    )} />
                    <div className={cn(
                        "absolute inset-[-4px] rounded-3xl blur-md",
                        isDark ? "bg-white/10" : "bg-black/5"
                    )} />

                    <div className={cn(
                        "relative w-32 h-32 flex items-center justify-center backdrop-blur-2xl border rounded-[2.5rem] animate-scale-up-down transition-all duration-700",
                        isDark
                            ? "bg-white/5 border-white/20 shadow-[0_0_50px_rgba(var(--primary),0.3)]"
                            : "bg-black/5 border-black/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]"
                    )}>
                        <img
                            src="/adroits-logo.png"
                            alt="Logo"
                            className={cn(
                                "w-20 h-20 object-contain transition-all duration-700",
                                isDark ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                            )}
                        />
                    </div>
                </div>

                {/* Typography & Tech Loading Bar */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                        <h1 className={cn(
                            "text-4xl font-black tracking-[0.4em] uppercase ml-[0.4em] animate-fade-in-up transition-colors duration-700",
                            isDark ? "text-white" : "text-slate-900"
                        )}>
                            ADROITS
                        </h1>
                        <p className={cn(
                            "text-xs font-bold tracking-[0.4em] uppercase ml-[0.4em] animate-pulse transition-colors duration-700",
                            isDark ? "text-primary/80" : "text-primary"
                        )}>
                            Secure Administrative Access
                        </p>
                    </div>

                    <div className={cn(
                        "relative w-48 h-[2px] rounded-full overflow-hidden transition-colors duration-700",
                        isDark ? "bg-white/5" : "bg-black/5"
                    )}>
                        <div className={cn(
                            "absolute inset-0",
                            isDark ? "bg-primary/20" : "bg-primary/10"
                        )} />
                        {/* Admin specific loader gradient */}
                        <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent w-full animate-loading-bar" />
                    </div>
                </div>
            </div>

            {/* Shutter Reveal Transition Effect */}
            {exitAnimation && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className={cn(
                        "absolute inset-0 backdrop-blur-3xl animate-fade-out",
                        isDark ? "bg-black/40" : "bg-white/40"
                    )} />
                </div>
            )}
        </div>
    );
};

export default AdminPreloader;
