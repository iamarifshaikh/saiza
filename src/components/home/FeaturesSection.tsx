import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageWithSkeleton from "@/components/ui/image-with-skeleton";

const features = [
    {
        title: "Personalized Learning Paths",
        description: "Get personalized note recommendations based on your syllabus."
    },
    {
        title: "Live Sessions & Webinars",
        description: "Where students can engage directly with instructors."
    },
    {
        title: "Student Dashboard",
        description: "Students can access their notes, track progress."
    },
    {
        title: "Community & Networking",
        description: "Connect students through a community platform."
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Soft decorative background element */}
            <div className="absolute top-1/2 left-0 w-[30%] h-[30%] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Interface / Image Area */}
                    <div className="relative animate-fade-right">
                        {/* Main Image Container */}
                        <div className="relative rounded-[3rem] overflow-hidden glass-card aspect-square lg:aspect-[4/3] p-4 shadow-xl border-white/40">
                            <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                                <ImageWithSkeleton
                                    src="/features_collaboration_illustration_1766306627174.png"
                                    alt="Student Learning"
                                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* Floating Stats - Decoration matching reference */}
                        <div className="absolute top-12 -left-8 glass-card p-5 rounded-[2rem] animate-float shadow-xl border-white/60 z-30" style={{ animationDelay: '0s' }}>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Platform Growth</p>
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-black">25.20%</span>
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] font-black rounded-full uppercase">Up</span>
                            </div>
                            <Button size="sm" className="mt-4 w-full h-10 text-[10px] font-black uppercase tracking-widest bg-black text-white hover:bg-primary transition-all rounded-full">
                                Analytics &gt;
                            </Button>
                        </div>

                        <div className="absolute -bottom-6 right-8 glass-card p-6 rounded-[2.2rem] animate-float shadow-xl min-w-[220px] border-white/60 z-30" style={{ animationDelay: '1.5s' }}>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</p>
                                <Sparkles className="text-primary w-4 h-4" />
                            </div>
                            <h4 className="text-3xl font-black mb-3 italic tracking-tighter">55%</h4>
                            <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[55%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                            </div>
                        </div>

                        {/* Decorative Squiggly (SVG) */}
                        <svg className="absolute -top-10 -right-10 text-primary/20 w-32 h-32 -rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 50 Q 25 25 50 50 T 90 50" />
                        </svg>
                    </div>

                    {/* Right Content */}
                    <div className="animate-fade-up">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Our Engineering
                        </span>

                        <h2 className="font-display text-5xl lg:text-[4rem] font-black mb-8 leading-[0.9] tracking-tighter text-foreground">
                            Powerful Features for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Modern Learners</span>
                        </h2>

                        <p className="text-muted-foreground text-xl mb-12 leading-relaxed font-medium opacity-70">
                            From personalized recommendations to interactive content, we've got everything you need to succeed in your engineering journey.
                        </p>

                        <div className="grid gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-[2rem] border border-transparent hover:border-white/40 hover:glass-card transition-all duration-500 cursor-default"
                                >
                                    <div className="flex gap-6">
                                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-white border border-gray-100 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-primary shadow-sm group-hover:shadow-primary/40 transition-all duration-500">
                                            <Check size={24} strokeWidth={4} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h4>
                                            <p className="text-muted-foreground text-sm font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
