import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminDashboardLoaderProps {
    onComplete?: () => void;
}

const AdminDashboardLoader: React.FC<AdminDashboardLoaderProps> = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete?.(), 800);
        }, 1500); // Shorter duration for dashboard reloads

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020412] transition-all duration-1000 ease-in-out",
            isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        )}>
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center relative overflow-hidden mb-6 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                    <Shield size={28} className="text-primary/60 relative z-10" />
                    <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping [animation-duration:2s]" />
                </div>

                <div className="text-center">
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.6em] pl-2 animate-pulse">
                        Resynchronizing Dashboard
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardLoader;
