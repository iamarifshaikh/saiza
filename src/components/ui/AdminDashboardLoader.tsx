import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface AdminDashboardLoaderProps {
    onComplete?: () => void;
}

const AdminDashboardLoader: React.FC<AdminDashboardLoaderProps> = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete?.(), 800);
        }, 1500); // Shorter duration for dashboard reloads

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out",
            isDark ? "bg-[#020412]" : "bg-slate-50",
            isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        )}>
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]",
                    isDark ? "bg-primary/5" : "bg-primary/10"
                )} />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className={cn(
                    "w-16 h-16 rounded-2xl border flex items-center justify-center relative overflow-hidden mb-6 shadow-2xl transition-colors duration-500",
                    isDark ? "bg-slate-900 border-white/5" : "bg-white border-slate-200"
                )}>
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-50",
                        isDark ? "from-primary/10 to-transparent" : "from-primary/5 to-transparent"
                    )} />
                    <Shield size={28} className="text-primary/60 relative z-10" />
                    <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping [animation-duration:2s]" />
                </div>

                <div className="text-center">
                    <p className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.6em] pl-2 animate-pulse",
                        isDark ? "text-primary/40" : "text-primary/60"
                    )}>
                        Resynchronizing Dashboard
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLoader;
