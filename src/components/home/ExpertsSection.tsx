import { cn } from "@/lib/utils";

const ExpertsSection = () => {
    const tags = [
        { name: "UX/UI", position: "bottom-16 left-8" },
        { name: "Marketing", position: "bottom-8 left-1/3" },
        { name: "Develop", position: "top-1/2 right-8" },
    ];

    return (
        <section className="py-16 lg:py-24 bg-muted/50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-6 items-stretch">
                    {/* Left Card - Our Experts */}
                    <div className="bg-lime rounded-3xl p-8 lg:p-10 relative min-h-[420px] flex flex-col overflow-hidden shadow-lg">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-foreground/20 border-2 border-lime flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 text-foreground/50" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                            Our Experts
                        </h2>
                        <p className="text-foreground/70 text-sm max-w-sm">
                            SAIZA brings you curated content from experienced educators who understand the needs of Diploma & Engineering students.
                        </p>

                        {/* Decorative Wave at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-32">
                            <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                                {[...Array(25)].map((_, i) => (
                                    <rect
                                        key={i}
                                        x={i * 16}
                                        y={Math.sin(i * 0.4) * 15 + 20}
                                        width="10"
                                        height={60 - Math.sin(i * 0.4) * 15}
                                        rx="5"
                                        fill="hsl(var(--foreground))"
                                        opacity={0.15}
                                    />
                                ))}
                            </svg>
                        </div>

                        {/* Tags */}
                        {tags.map((tag) => (
                            <div
                                key={tag.name}
                                className={cn(
                                    "absolute bg-card rounded-full px-4 py-2 text-sm font-medium shadow-soft text-foreground",
                                    tag.position
                                )}
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>

                    {/* Right Card - Stats */}
                    <div className="bg-secondary text-secondary-foreground rounded-3xl p-8 lg:p-10 flex flex-col min-h-[420px]">
                        <div className="grid grid-cols-3 gap-4 lg:gap-8 mb-8">
                            <div className="text-center">
                                <div className="font-display text-3xl lg:text-5xl font-bold text-lime mb-2">100+</div>
                                <p className="text-xs lg:text-sm text-secondary-foreground/70">Expert Instructors</p>
                            </div>
                            <div className="text-center">
                                <div className="font-display text-3xl lg:text-5xl font-bold text-lime mb-2">110+</div>
                                <p className="text-xs lg:text-sm text-secondary-foreground/70">Total Courses</p>
                            </div>
                            <div className="text-center">
                                <div className="font-display text-3xl lg:text-5xl font-bold text-lime mb-2">20K</div>
                                <p className="text-xs lg:text-sm text-secondary-foreground/70">Happy Students</p>
                            </div>
                        </div>

                        {/* Wave Decoration */}
                        <div className="flex-1 relative min-h-[200px]">
                            <svg viewBox="0 0 400 100" className="w-full absolute bottom-0" preserveAspectRatio="none">
                                {[...Array(25)].map((_, i) => (
                                    <rect
                                        key={i}
                                        x={i * 16}
                                        y={35 + Math.sin(i * 0.5) * 20}
                                        width="10"
                                        height={65 - Math.sin(i * 0.5) * 20}
                                        rx="5"
                                        fill="hsl(var(--lime))"
                                        opacity={0.4 + (i % 3) * 0.15}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpertsSection;
