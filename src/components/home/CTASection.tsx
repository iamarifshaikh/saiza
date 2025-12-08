import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 lg:p-16 relative overflow-hidden">
                    {/* Decorative paper airplane */}
                    <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
                        <svg className="w-16 h-16 lg:w-24 lg:h-24 text-secondary-foreground/20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                        <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-lime animate-ping" />
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-16 right-32 w-8 h-8 border-2 border-dashed border-lime/30 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                    <div className="absolute bottom-16 right-24 w-4 h-4 bg-lime/30 rounded-full" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-bold mb-6 italic">
                            E-Learning A New Frontier in Education
                        </h2>
                        <p className="text-secondary-foreground/70 mb-8 text-lg">
                            E-Learning Has Transformed Education By Providing Accessibility
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/study">
                                <Button variant="lime" size="lg">
                                    Get Start Now
                                </Button>
                            </Link>
                            <Link to="/study">
                                <Button variant="outline" size="lg" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                                    Browse Courses
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
