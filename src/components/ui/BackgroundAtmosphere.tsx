import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundAtmosphereProps {
    className?: string;
    showBlobs?: boolean;
}

const BackgroundAtmosphere: React.FC<BackgroundAtmosphereProps> = ({
    className,
    showBlobs = true
}) => {
    return (
        <div className={cn("fixed inset-0 -z-10 pointer-events-none overflow-hidden", className)}>
            {/* Base Mesh Gradient */}
            <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-60" />

            {/* Animated Background Blobs */}
            {showBlobs && (
                <>
                    <div
                        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 dark:bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"
                        style={{ animationDelay: '0s' }}
                    />
                    <div
                        className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-cyan-400/10 dark:bg-cyan-400/15 rounded-full blur-[100px] animate-pulse-glow"
                        style={{ animationDelay: '2s' }}
                    />
                    <div
                        className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px] animate-pulse-glow"
                        style={{ animationDelay: '4s' }}
                    />
                </>
            )}

            {/* Noise Texture Overlay for Depth */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default BackgroundAtmosphere;
