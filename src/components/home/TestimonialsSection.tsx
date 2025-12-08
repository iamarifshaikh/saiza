import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "CEO, Company",
        content: "I was skeptical about e-learning at first, but after using this platform, I am a true believer. The content is top-notch and the ability to connect with other students and instructors has enhanced my learning experience.",
        avatar: "R",
    },
    {
        name: "Ronald Richards",
        role: "CEO, Company",
        content: "I was skeptical about e-learning at first, but after using this platform, I am a true believer. The content is top-notch and the ability to connect with other students and instructors has enhanced my learning experience.",
        avatar: "R",
    },
    {
        name: "Savannah Nguyen",
        role: "CEO, Company",
        content: "I was skeptical about e-learning at first, but after using this platform, I am a true believer. The content is top-notch and the ability to connect with other students and instructors has enhanced my learning experience.",
        avatar: "S",
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
    };

    return (
        <section className="py-16 lg:py-24 bg-muted/40">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
                    <h2 className="font-display text-3xl lg:text-5xl font-bold">
                        What Our Customer Say About Us
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

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.name + index}
                            className={`bg-card rounded-3xl p-6 lg:p-8 transition-all duration-300 hover:shadow-medium shadow-soft border border-border/50 ${index === currentIndex ? "ring-2 ring-lime shadow-lime" : ""
                                }`}
                        >
                            {/* Avatar and Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lime to-mint flex items-center justify-center">
                                    <span className="text-xl font-display font-bold text-foreground">
                                        {testimonial.avatar}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-display font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>

                            {/* Quote */}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {testimonial.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
