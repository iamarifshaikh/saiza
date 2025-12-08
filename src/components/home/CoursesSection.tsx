// import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const courses = [
    {
        title: "UX/UI Design",
        description: "UI/UX design is the process of creating a user-friendly and visually appealing interface",
        color: "bg-lime",
        slug: "computer",
    },
    {
        title: "Web Development",
        description: "Learn modern web technologies, frameworks, and best practices for building applications",
        color: "bg-mint",
        slug: "it",
    },
    {
        title: "Digital Marketing",
        description: "Master digital strategies, SEO, and social media marketing techniques",
        color: "bg-coral",
        slug: "mechanical",
    },
    {
        title: "Data Science",
        description: "Explore data analysis, machine learning, and statistical modeling",
        color: "bg-lime",
        slug: "extc",
    },
    {
        title: "Cloud Computing",
        description: "Learn cloud infrastructure, deployment, and scalable architectures",
        color: "bg-mint",
        slug: "electrical",
    },
    {
        title: "Cyber Security",
        description: "Master security protocols, ethical hacking, and system protection",
        color: "bg-coral",
        slug: "civil",
    },
];

const CoursesSection = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCourses = 3;

    const handlePrev = () => {
        setStartIndex((prev) => (prev > 0 ? prev - 1 : courses.length - visibleCourses));
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev < courses.length - visibleCourses ? prev + 1 : 0));
    };

    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8 bg-muted/30 rounded-3xl py-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
                    <h2 className="font-display text-3xl lg:text-5xl font-bold max-w-md">
                        Explore Our Online Courses
                    </h2>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                            aria-label="Previous"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-all duration-300"
                            aria-label="Next"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Course Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.slice(startIndex, startIndex + visibleCourses).map((course, index) => (
                        <Link
                            key={course.title}
                            to={`/study/engineering/${course.slug}`}
                            className="group animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`${course.color} rounded-3xl p-6 lg:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-medium hover:-translate-y-2 shadow-lg border border-border/20`}>
                                <h3 className="font-display text-xl lg:text-2xl font-bold mb-3 text-foreground">
                                    {course.title}
                                </h3>
                                <p className="text-foreground/70 text-sm mb-6">
                                    {course.description}
                                </p>

                                {/* Illustration Placeholder */}
                                <div className="mt-auto h-40 rounded-2xl bg-foreground/5 flex items-center justify-center relative overflow-hidden">
                                    {/* Decorative desk illustration */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-foreground/10 rounded-t-lg" />
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-16 bg-foreground/15 rounded-md" />
                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-8 bg-foreground/20 rounded" />

                                    {/* Arrow button */}
                                    <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
