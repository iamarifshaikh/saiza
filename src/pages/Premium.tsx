import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, BookOpen, Shield } from "lucide-react";

const features = [
    "Access to all premium notes",
    "Downloadable study materials",
    "Ad-free experience",
    "Early access to new content",
    "Priority support",
    "Exam preparation guides",
];

const Premium = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 bg-lime rounded-full px-4 py-2 mb-6 animate-fade-up">
                            <Crown size={18} />
                            <span className="text-sm font-semibold">Premium Membership</span>
                        </div>
                        <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 animate-fade-up stagger-1">
                            Get Full Marks with Premium Access
                        </h1>
                        <p className="text-muted-foreground text-lg animate-fade-up stagger-2">
                            Unlock all study materials, premium notes, and exclusive content to ace your exams.
                        </p>
                    </div>

                    {/* Pricing Card */}
                    <div className="max-w-lg mx-auto animate-fade-up stagger-3">
                        <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                            {/* Decorative */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-lime/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="font-display text-5xl lg:text-6xl font-bold">₹499</span>
                                    <span className="text-secondary-foreground/60">/year</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                                                <Check size={14} className="text-foreground" />
                                            </div>
                                            <span className="text-secondary-foreground/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button variant="lime" size="xl" className="w-full">
                                    Get Premium Now
                                </Button>

                                <p className="text-center text-xs text-secondary-foreground/50 mt-4">
                                    One-time payment. Access for 1 year.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="mt-24 grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Instant Access",
                                description: "Get immediate access to all premium content after payment",
                                color: "bg-lime",
                            },
                            {
                                icon: BookOpen,
                                title: "Comprehensive Notes",
                                description: "Well-structured notes covering entire syllabus",
                                color: "bg-mint",
                            },
                            {
                                icon: Shield,
                                title: "Exam Ready",
                                description: "Practice questions and previous year papers included",
                                color: "bg-coral",
                            },
                        ].map((benefit, index) => (
                            <div
                                key={benefit.title}
                                className={`${benefit.color} rounded-2xl p-6 lg:p-8 animate-fade-up`}
                                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-4">
                                    <benefit.icon size={24} />
                                </div>
                                <h3 className="font-display text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-foreground/70 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Premium;
