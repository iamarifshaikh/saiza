import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Crown, Download, ShieldCheck, Sparkles, Headphones } from "lucide-react";

const Premium = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <main className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-4 lg:px-8 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 center w-full h-full max-w-[1200px] mx-auto pointer-events-none">
                    <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
                </div>

                <div className="container mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-orange-400/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in shadow-lg shadow-orange-400/10">
                            <Crown size={16} className="text-orange-500 fill-orange-500" />
                            <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">Premium Membership</span>
                        </div>
                        <h1 className="font-display text-4xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
                            Unlock Your Full Potential
                        </h1>
                        <p className="text-muted-foreground text-lg lg:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
                            Get unlimited access to premium notes, downloadable resources, and exam-focused content designed to help you score more.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left: Features Grid */}
                        <div className="lg:col-span-7 space-y-8 animate-fade-up">
                            <h2 className="font-display text-3xl font-bold mb-8">Why Go Premium?</h2>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Verified Content</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Access notes verified by top professors and university toppers.</p>
                                </div>

                                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500">
                                        <Download size={28} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Offline Downloads</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Save notes to your device and study without internet connectivity.</p>
                                </div>

                                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                                        <Headphones size={28} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Priority Support</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Get your academic doubts resolved quickly by our expert team.</p>
                                </div>

                                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                                        <Sparkles size={28} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Exam Blueprints</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">Exclusive access to previous year paper analysis & scoring blueprints.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Pricing Card */}
                        <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
                            {/* Glow Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-tr from-primary/30 to-purple-500/30 blur-3xl -z-10 rounded-full opacity-70" />

                            <div className="bg-[#18181b] text-white rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden shadow-2xl border border-white/10">
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                                    MOST POPULAR
                                </div>

                                <div className="mb-8">
                                    <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Annual Pass</span>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-5xl lg:text-6xl font-bold font-display">₹599</span>
                                        <span className="text-gray-400 font-medium">/ year</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-3">Less than ₹50 per month</p>
                                </div>

                                <div className="space-y-4 mb-10">
                                    {[
                                        "Access to all Engineering & Diploma notes",
                                        "Unlimited PDF Downloads",
                                        "Priority Exam Support",
                                        "Dedicated Doubt Solving",
                                        "Verified PYQ Solutions",
                                        "Community Access"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={14} className="text-white bg-transparent" strokeWidth={3} />
                                            </div>
                                            <span className="text-gray-200 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button size="xl" className="w-full bg-white text-black hover:bg-gray-100 font-display font-bold text-lg rounded-2xl h-16 shadow-xl shadow-white/5 transition-transform hover:-translate-y-1">
                                    Get Premium Access
                                </Button>

                                <p className="text-center text-xs text-gray-500 mt-6 font-medium">
                                    Secure payment • Cancel anytime • 100% Satisfaction
                                </p>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-4 flex items-center justify-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-gray-700">Trusted by 10,000+ Students</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Premium;
