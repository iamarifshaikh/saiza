import React, { useEffect, useState } from 'react';
import { Shield, Lock, Cpu, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminPreloaderProps {
    onComplete?: () => void;
}

const AdminPreloader: React.FC<AdminPreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing Secure Access");
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const statuses = [
            "Initializing Secure Access",
            "Authenticating Admin Credentials",
            "Loading Encrypted Databases",
            "Deciphering System Nodes",
            "Synchronizing Global Assets",
            "Access Granted"
        ];

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(() => onComplete?.(), 800);
                    }, 500);
                    return 100;
                }

                // Dynamic status updates
                const statusIdx = Math.floor((prev / 100) * statuses.length);
                if (statuses[statusIdx]) setStatus(statuses[statusIdx]);

                return prev + (Math.random() * 15);
            });
        }, 400);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020412] transition-all duration-1000 ease-in-out",
            isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
        )}>
            {/* Ruthless Background Ambience */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
                {/* Core Icon Reveal */}
                <div className="relative mb-12">
                    <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-2xl shadow-primary/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                        <Shield size={40} className="text-primary animate-pulse relative z-10" />

                        {/* Spinning Radar Effect */}
                        <div className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full animate-spin [animation-duration:3s]" />
                    </div>

                    {/* Floating Data Icons */}
                    <Lock size={16} className="absolute -top-4 -right-4 text-cyan-400/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <Cpu size={16} className="absolute -bottom-2 -left-6 text-primary/60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                    <Database size={16} className="absolute bottom-10 -right-8 text-blue-500/60 animate-bounce" style={{ animationDelay: '0.8s' }} />
                </div>

                {/* Text Reveal */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-4xl font-bold text-white tracking-widest mb-2 overflow-hidden">
                        <span className="inline-block animate-fade-in-up">ADROITS</span>
                    </h1>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] pl-2 animate-fade-in opacity-80">
                        Command Center
                    </p>
                </div>

                {/* Ruthless Loading Bar */}
                <div className="w-full relative py-4">
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 via-primary to-blue-600 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(12,165,233,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Progress Percent */}
                    <div className="absolute right-0 top-6 font-mono text-[10px] text-primary/60 font-bold">
                        {Math.floor(progress)}%
                    </div>

                    {/* Status Text */}
                    <div className="absolute left-0 top-6 font-mono text-[10px] text-white/40 font-medium uppercase tracking-widest animate-pulse">
                        &gt; {status}
                    </div>
                </div>
            </div>

            {/* Decorative Corner Borders */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/5" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/5" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/5" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/5" />
        </div>
    );
};

export default AdminPreloader;
