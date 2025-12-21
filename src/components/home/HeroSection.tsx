import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/image-with-skeleton";
import Reveal from "@/components/animations/Reveal";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden pt-32 lg:pt-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32 relative z-10">

                    {/* Left Content */}
                    <Reveal animation="reveal-fade" duration={1} delay={0.1}>
                        <div className="max-w-4xl">
                            <div className="mb-8">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    #1 Online Notes Platform 2025
                                </span>
                            </div>

                            <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] font-black tracking-tighter text-foreground mb-8">
                                <span className="block">Shape Your</span>
                                <span className="block py-2 whitespace-nowrap">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-500 to-blue-600">Future</span> with the
                                </span>
                                <span className="block whitespace-nowrap">Right Knowledge</span>
                            </h1>

                            <p className="text-muted-foreground text-xl leading-relaxed font-medium mb-12 max-w-lg opacity-80">
                                Discover a world of knowledge with our cutting-edge online notes. Empower yourself to succeed in your career, passions & personal growth journey.
                            </p>

                            <div className="flex items-center gap-4">
                                <Link to="/study">
                                    <Button className="h-14 px-10 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-bold tracking-wide uppercase shadow-2xl shadow-black/20 hover:shadow-black/40 transition-all hover:-translate-y-1 active:translate-y-0">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link to="/study">
                                    <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-black hover:scale-110 transition-all cursor-pointer shadow-xl hover:shadow-primary/20 active:scale-95 border-white/40">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right Content - Hero Image & Floating Cards */}
                    <Reveal animation="reveal-slide-right" duration={1.2} delay={0.3}>
                        <div className="relative isolate lg:ml-auto max-w-[500px] w-full lg:mt-12">
                            {/* 1. Background Glow Blob (Behind Image) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[75%] bg-gradient-to-b from-primary/10 to-primary/30 rounded-t-[5rem] -z-10 blur-sm" />

                            {/* 2. Main Image Container */}
                            <div className="rounded-[3rem] overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 relative aspect-[4/5] lg:aspect-[3/4] z-10 shadow-2xl group">
                                {/* Decorative internal glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-cyan-400/10 pointer-events-none" />

                                <ImageWithSkeleton
                                    src="/hero_engineering_illustration_1766306607398.png"
                                    alt="Student"
                                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* 3. Floating Card: Premium+ (Bottom Left Overlap) */}
                            <div className="absolute bottom-12 -left-12 glass-card p-6 rounded-[2rem] animate-float z-20 min-w-[220px] border-white/50" style={{ animationDelay: '0s' }}>
                                <span className="inline-block px-3 py-1 bg-black text-white rounded-full text-[10px] font-black mb-3 uppercase tracking-wider">50% Off</span>
                                <h4 className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-widest">Premium Plan</h4>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black tracking-tighter text-black">₹599</span>
                                    <span className="text-[10px] font-bold text-gray-500 mb-1.5 uppercase leading-tight">Yearly<br />Access</span>
                                </div>
                            </div>

                            {/* 4. Floating Card: Students (Top Right Inside) */}
                            <div className="absolute top-8 -right-4 bg-black text-white p-4 rounded-[1.5rem] shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-20 animate-float flex items-center gap-4 max-w-[240px] border border-white/10" style={{ animationDelay: '1s' }}>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-black" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-primary text-white border-2 border-black flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">+</div>
                                </div>
                                <p className="text-[10px] font-black leading-tight uppercase tracking-widest text-primary">20k+<br /><span className="text-white opacity-60">Students</span></p>
                            </div>

                            {/* 5. Floating Card: Best Collaboration (Right overlap) */}
                            <div className="absolute top-1/2 -right-12 translate-y-12 glass-card py-4 px-6 rounded-full animate-float flex items-center gap-4 z-20 shadow-2xl border-white/50" style={{ animationDelay: '2s' }}>
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 shrink-0">
                                    <Check size={20} strokeWidth={4} />
                                </div>
                                <div className="whitespace-nowrap">
                                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Certified</p>
                                    <p className="text-sm font-black text-black">Best Content</p>
                                </div>
                            </div>

                            {/* 6. Decorative Dots Animation */}
                            <div className="absolute -bottom-8 -left-8 grid grid-cols-5 gap-2 opacity-20 text-primary">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Bottom Stats Bar */}
                <Reveal animation="reveal-zoom" delay={0.5}>
                    <div className="glass-card rounded-[3rem] p-8 lg:p-14 mb-20 relative z-20 border-white/40 shadow-2xl overflow-hidden group">
                        {/* Internal highlights */}
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center space-y-2 group/item">
                                <h3 className="text-5xl lg:text-6xl font-black font-display tracking-tighter text-black transition-transform group-hover/item:scale-110">100%</h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Satisfaction rate</p>
                            </div>
                            <div className="text-center space-y-2 group/item">
                                <h3 className="text-5xl lg:text-6xl font-black font-display tracking-tighter text-black transition-transform group-hover/item:scale-110">12+</h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Years of experience</p>
                            </div>
                            <div className="text-center space-y-2 group/item">
                                <h3 className="text-5xl lg:text-6xl font-black font-display tracking-tighter text-black transition-transform group-hover/item:scale-110">500+</h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Total Notes</p>
                            </div>
                            <div className="text-center space-y-2 group/item">
                                <h3 className="text-5xl lg:text-6xl font-black font-display tracking-tighter text-black transition-transform group-hover/item:scale-110">140+</h3>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Subjects</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
export default HeroSection;
