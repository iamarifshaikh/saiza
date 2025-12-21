import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const Study = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 lg:pt-40 pb-20 lg:pb-32 px-4 lg:px-8 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 center w-full h-full max-w-[1200px] mx-auto pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-50 rounded-full blur-3xl -z-10" />
                </div>

                <div className="container mx-auto">
                    {/* Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide border border-primary/20 mb-6 uppercase">
                            Academic Pathways
                        </span>
                        <h1 className="font-display text-4xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
                            Choose Your Learning Path
                        </h1>
                        <p className="text-muted-foreground text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                            Select your course to access curated notes, previous year papers, and study resources tailored for you.
                        </p>
                    </div>

                    {/* Selection Cards */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">

                        {/* 1. Engineering Card (Brand Primary) */}
                        <Link to="/study/engineering" className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-300 rounded-[2.8rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                            <div className="relative h-full bg-primary rounded-[2.5rem] p-8 lg:p-12 text-white overflow-hidden shadow-2xl transition-all duration-300 group-hover:-translate-y-2">

                                {/* Decorative Background Pattern */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />
                                <svg className="absolute top-8 right-8 w-24 h-24 text-white/10 rotate-12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-inner">
                                            <GraduationCap size={40} className="text-white drop-shadow-md" />
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                            <Sparkles size={12} />
                                            Most Popular
                                        </div>
                                    </div>

                                    <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">Engineering</h2>
                                    <p className="text-white/80 text-lg mb-12 max-w-sm leading-relaxed">
                                        Comprehensive resources for BE/B.Tech students across all major branches.
                                    </p>

                                    <div className="mt-auto flex items-center gap-4 group/btn">
                                        <span className="font-bold text-xl group-hover/btn:underline decoration-2 underline-offset-4">Explore Degree</span>
                                        <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center transition-transform group-hover/btn:translate-x-2">
                                            <ArrowRight size={24} strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* 2. Diploma Card (Dark Theme) */}
                        <Link to="/study/diploma" className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-[2.8rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                            <div className="relative h-full bg-[#18181b] rounded-[2.5rem] p-8 lg:p-12 text-white overflow-hidden shadow-2xl transition-all duration-300 group-hover:-translate-y-2">

                                {/* Decorative Background Pattern */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3" />
                                <svg className="absolute top-8 right-8 w-24 h-24 text-white/5 -rotate-12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-inner group-hover:border-primary/50 transition-colors">
                                            <BookOpen size={36} className="text-white group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
                                            Polytechnic
                                        </div>
                                    </div>

                                    <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">Diploma</h2>
                                    <p className="text-gray-400 text-lg mb-12 max-w-sm leading-relaxed">
                                        Focused study materials for Diploma students to master technical concepts.
                                    </p>

                                    <div className="mt-auto flex items-center gap-4 group/btn">
                                        <span className="font-bold text-xl group-hover/btn:underline decoration-2 underline-offset-4 decoration-primary">Explore Diploma</span>
                                        <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center transition-all group-hover/btn:translate-x-2 group-hover/btn:bg-primary">
                                            <ArrowRight size={24} strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Study;
