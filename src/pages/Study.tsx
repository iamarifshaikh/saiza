import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen } from "lucide-react";

const studyOptions = [
    {
        title: "Diploma",
        description: "Access comprehensive notes for all Diploma courses and subjects",
        icon: BookOpen,
        color: "bg-lime",
        path: "/study/diploma",
        stats: "50+ Subjects",
    },
    {
        title: "Engineering",
        description: "Complete study materials for Engineering degree programs",
        icon: GraduationCap,
        color: "bg-mint",
        path: "/study/engineering",
        stats: "80+ Subjects",
    },
];

const Study = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 animate-fade-up">
                            Choose Your Path
                        </h1>
                        <p className="text-muted-foreground text-lg animate-fade-up stagger-1">
                            Select your course type to access tailored study materials and notes for your curriculum.
                        </p>
                    </div>

                    {/* Study Options */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {studyOptions.map((option, index) => (
                            <Link
                                key={option.title}
                                to={option.path}
                                className="group animate-fade-up"
                                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                            >
                                <div className={`${option.color} rounded-3xl p-8 lg:p-12 h-full flex flex-col transition-all duration-300 hover:shadow-medium hover:-translate-y-2`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-foreground/10 flex items-center justify-center">
                                            <option.icon size={32} />
                                        </div>
                                        <span className="bg-card rounded-full px-4 py-2 text-sm font-medium">
                                            {option.stats}
                                        </span>
                                    </div>

                                    <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                                        {option.title}
                                    </h2>
                                    <p className="text-foreground/70 mb-8 flex-1">
                                        {option.description}
                                    </p>

                                    <Button variant="dark" size="lg" className="w-full group-hover:shadow-lg">
                                        Explore {option.title}
                                    </Button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Study;
