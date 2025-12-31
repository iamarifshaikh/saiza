import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LaunchCountdownProps {
    targetDate: Date;
    onLaunch: () => void;
}

const LaunchCountdown: React.FC<LaunchCountdownProps> = ({ targetDate, onLaunch }) => {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    const [stage, setStage] = useState<'counting' | 'ignition' | 'welcome'>('counting');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return null;
        };

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            setTimeLeft(remaining);

            if (!remaining && stage === 'counting') {
                setStage('ignition');
                clearInterval(timer);

                // Sequence: Ignition (2.5s) -> Welcome (4s) -> Launch
                setTimeout(() => {
                    setStage('welcome');
                    setTimeout(() => {
                        localStorage.setItem('launch_completed', 'true'); // Persist launch state
                        onLaunch();
                    }, 4000); // Time to read the welcome message
                }, 2500); // Time for Big Bang animation
            }
        }, 1000);

        // Initial calc
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate, stage, onLaunch]);

    // Format number with leading zero
    const f = (n: number) => n < 10 ? `0${n}` : n;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden text-white selection:bg-cyan-500/30"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                {/* Vivid Kinetic Background - Reverted to Electric Blue/Cyan Era */}
                {stage !== 'welcome' && (
                    <motion.div
                        exit={{ opacity: 0, scale: 2 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 pointer-events-none overflow-hidden"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                                rotate: [0, 90, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[180px] mix-blend-screen"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, 100, 0],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[40%] right-[-10%] w-[70vw] h-[70vw] bg-cyan-500/20 rounded-full blur-[180px] mix-blend-screen"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                y: [0, -50, 0],
                                opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen"
                        />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
                    </motion.div>
                )}

                {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-[90vw] mx-auto text-center">

                    <AnimatePresence mode="wait">
                        {stage === 'counting' && (
                            <motion.div
                                key="counting"
                                exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="w-full"
                            >
                                {/* Motivational Lines - Editorial Style */}
                                <div className="mb-20 flex flex-col items-center gap-2 md:gap-4 relative">
                                    {/* Decorative Line */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 60 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="absolute -top-24 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
                                    />

                                    <motion.h2
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-cyan-100/50"
                                    >
                                        New year.
                                    </motion.h2>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white"
                                    >
                                        New system.
                                    </motion.h2>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-indigo-200"
                                    >
                                        New momentum.
                                    </motion.h2>
                                </div>

                                {/* Ultra-Clean Countdown */}
                                <div className="mb-24 w-full">
                                    {timeLeft ? (
                                        <div className="flex items-baseline justify-center gap-4 sm:gap-12 md:gap-20 font-sans">
                                            <TimeUnit value={f(timeLeft.days)} label="Days" delay={0.8} />
                                            <Separator delay={0.9} />
                                            <TimeUnit value={f(timeLeft.hours)} label="Hours" delay={1.0} />
                                            <Separator delay={1.1} />
                                            <TimeUnit value={f(timeLeft.minutes)} label="Minutes" delay={1.2} />
                                            <Separator delay={1.3} />
                                            <TimeUnit value={f(timeLeft.seconds)} label="Seconds" isActive delay={1.4} />
                                        </div>
                                    ) : null}
                                </div>

                                {/* Bottom Manifest */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1.8 }}
                                    className="max-w-4xl space-y-8 mx-auto"
                                >
                                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm md:text-lg font-medium text-cyan-200/60 tracking-wide uppercase text-center">
                                        <span>No Backlogs</span>
                                        <span className="text-cyan-500/20">•</span>
                                        <span>No Confusion</span>
                                        <span className="text-cyan-500/20">•</span>
                                        <span>No Panic</span>
                                    </div>

                                    <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto text-center">
                                        This year, everything aligns — <span className="font-medium text-cyan-300">your syllabus</span>, <span className="font-medium text-indigo-300">your time</span>, <span className="font-medium text-blue-300">your results</span>.
                                    </p>

                                    <div className="pt-12 flex justify-center">
                                        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent rounded-full" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {stage === 'ignition' && (
                            <motion.div
                                key="ignition"
                                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                exit={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="text-[10vw] md:text-[12vw] leading-none font-black tracking-tighter text-cyan-50 mix-blend-difference text-center">
                                    SYSTEM ONLINE
                                </div>
                            </motion.div>
                        )}

                        {stage === 'welcome' && (
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#050505]"
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ width: { duration: 2, ease: "easeInOut" } }}
                                    className="relative px-8 md:px-0"
                                >
                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white text-center leading-relaxed">
                                        Your <span className="text-cyan-400 font-medium">new way to study</span><br />
                                        has officially begun.
                                    </h1>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                        className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-8 mx-auto"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const TimeUnit = ({ value, label, isActive = false, delay }: { value: string | number, label: string, isActive?: boolean, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="flex flex-col items-center gap-2 md:gap-6"
    >
        <div className={cn(
            "text-5xl sm:text-7xl md:text-[8rem] leading-[0.8] font-bold tracking-tighter tabular-nums",
            isActive ? "text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]" : "text-white/40"
        )}>
            {value}
        </div>
        <div className="text-[10px] sm:text-sm font-semibold uppercase tracking-[0.3em] text-white/30">
            {label}
        </div>
    </motion.div>
);

const Separator = ({ delay }: { delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay }}
        className="text-4xl sm:text-6xl md:text-8xl font-thin text-white/10 -mt-2 md:-mt-8"
    >
        /
    </motion.div>
);

export default LaunchCountdown;
