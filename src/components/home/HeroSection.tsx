import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
            {/* Decorative top wave - orange gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

            <div className="container mx-auto px-4 lg:px-8 pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 lg:space-y-8">
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-up">
                            Mastering Your Skills{" "}
                            <span className="italic text-lime">E-Learning Made Easy</span>
                        </h1>
                        <p className="text-secondary-foreground/70 text-base lg:text-lg max-w-lg animate-fade-up stagger-1">
                            SAIZA is a comprehensive educational platform that simplifies the process of honing your skills and expertise for Diploma & Engineering students.
                        </p>
                        <div className="flex flex-wrap gap-4 animate-fade-up stagger-2">
                            <Link to="/study">
                                <Button variant="outline" size="lg" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                                    Browse Courses
                                </Button>
                            </Link>
                            <Link to="/premium">
                                <Button variant="heroFilled" size="lg" className="bg-secondary-foreground text-secondary">
                                    Get Full Marks
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Community Card */}
                    <div className="relative">
                        <div className="bg-lime rounded-3xl p-6 lg:p-8 relative animate-scale-in shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="font-display text-2xl lg:text-3xl font-bold text-secondary">
                                    Join our community
                                </h3>
                                <Link to="/study">
                                    <button className="w-10 h-10 rounded-full bg-secondary text-lime flex items-center justify-center hover:scale-110 transition-transform">
                                        <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </div>

                            {/* Student Image Placeholder */}
                            <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl overflow-hidden mb-4">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center">
                                        <svg className="w-20 h-20 text-secondary/50" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Members Badge */}
                                <div className="absolute bottom-4 left-4 bg-secondary rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-lime border-2 border-secondary flex items-center justify-center">
                                                <Users size={10} className="text-secondary" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-secondary-foreground">20K+ Members</span>
                                </div>
                            </div>

                            <p className="text-sm text-secondary/70">
                                Connect with fellow students, share knowledge, and grow together.
                            </p>
                        </div>

                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-12 h-12 lg:w-16 lg:h-16 bg-lime rounded-xl animate-float flex items-center justify-center shadow-lg rotate-12">
                            <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
