import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "@/components/ui/image-with-skeleton";

const noteCategories = [
    {
        title: "Computer Engineering",
        description: "Comprehensive notes for programming, algorithms, and system design.",
        slug: "computer",
        count: "120+ Notes",
        image: "/computer_engineering_illustration_1766306659114.png"
    },
    {
        title: "Mechanical Engineering",
        description: "Materials, thermodynamics, and mechanics notes for mastery.",
        slug: "mechanical",
        count: "85+ Notes",
        image: "/mechanical_engineering_illustration_1766306677226.png"
    },
    {
        title: "Civil Engineering",
        description: "Structural analysis, surveying, and fluid mechanics resources.",
        slug: "civil",
        count: "90+ Notes",
        image: "/civil_engineering_illustration_1766306694915.png"
    },
    {
        title: "Electrical Engineering",
        description: "Circuits, systems, and power engineering fundamentals.",
        slug: "electrical",
        count: "75+ Notes",
        image: "/electrical_engineering_illustration_1766306714708.png"
    },
    {
        title: "Electronics & Telecomm",
        description: "Signals, communication systems, and microprocessors.",
        slug: "extc",
        count: "60+ Notes",
        image: "/extc_engineering_illustration_1766306714708.png" // Reusing electrical for now
    },
    {
        title: "Information Technology",
        description: "Software engineering, networking, and data management.",
        slug: "it",
        count: "110+ Notes",
        image: "/computer_engineering_illustration_1766306659114.png" // Reusing computer for now
    },
];

const CoursesSection = () => {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden backdrop-blur-[2px]">
            {/* Soft decorative background element */}
            <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-cyan-400/5 rounded-full blur-[140px] -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 animate-fade-up">
                    <div className="space-y-6 max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Our Collections
                        </span>
                        <h2 className="font-display text-5xl lg:text-[4.5rem] font-black leading-[0.9] tracking-tighter text-foreground">
                            Explore Top <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Note Categories</span>
                        </h2>
                        <p className="text-muted-foreground text-xl font-medium opacity-60">
                            Curated study materials across all major engineering disciplines to help you master every subject.
                        </p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {noteCategories.map((category, index) => (
                        <Link
                            key={category.slug}
                            to={`/study/engineering/${category.slug}`}
                            className="group block animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="h-full glass-card rounded-[2.5rem] p-3 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 border-white/40 shadow-lg">
                                {/* Image Area */}
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/50 mb-6">
                                    <ImageWithSkeleton
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 origin-center grayscale-[0.3] group-hover:grayscale-0"
                                    />

                                    <div className="absolute top-4 right-4 glass-morphism px-4 py-1.5 rounded-full text-[10px] font-black text-primary border-white/60 shadow-md uppercase tracking-widest">
                                        {category.count}
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Content Area */}
                                <div className="px-5 pb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-display text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                                            {category.title}
                                        </h3>
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 shadow-md shadow-black/10">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Action */}
                <div className="mt-20 text-center animate-fade-up">
                    <Link to="/study">
                        <Button variant="outline" className="rounded-full px-12 glass-card border-white/40 hover:bg-black hover:text-white hover:border-black h-16 text-sm font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl">
                            View All Categories
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
