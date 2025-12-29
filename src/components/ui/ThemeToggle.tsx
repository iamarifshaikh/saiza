import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className }: { className?: string }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none group overflow-hidden",
                isDark
                    ? "bg-slate-900 border border-white/10 shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]"
                    : "bg-slate-100 border border-black/5 shadow-[inner_0_2px_4px_rgba(0,0,0,0.05)]",
                className
            )}
            aria-label="Toggle theme"
        >
            {/* Background Atmosphere Elements */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isDark ? "opacity-100" : "opacity-0"
            )}>
                <div className="absolute top-1 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
                <div className="absolute top-4 left-5 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-2 left-8 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isDark ? "opacity-0" : "opacity-100"
            )}>
                <div className="absolute top-1 right-3 w-2 h-2 bg-yellow-400/20 rounded-full blur-[2px]" />
                <div className="absolute top-3 right-6 w-1.5 h-1.5 bg-blue-400/10 rounded-full blur-[1px]" />
            </div>

            {/* The Toggle Knob */}
            <div
                className={cn(
                    "absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center transform",
                    isDark
                        ? "translate-x-7 bg-indigo-600 shadow-[0_4px_12px_rgba(79,70,229,0.4)]"
                        : "translate-x-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                )}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Sun Icon */}
                    <Sun
                        size={14}
                        className={cn(
                            "absolute transition-all duration-500 transform",
                            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-yellow-500"
                        )}
                        strokeWidth={2.5}
                    />
                    {/* Moon Icon */}
                    <Moon
                        size={14}
                        className={cn(
                            "absolute transition-all duration-500 transform",
                            isDark ? "rotate-0 scale-100 opacity-100 text-white" : "-rotate-90 scale-0 opacity-0"
                        )}
                        strokeWidth={2.5}
                    />
                </div>
            </div>

            {/* Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
    );
};

export default ThemeToggle;
