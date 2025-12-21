const testimonials = [
    {
        name: "John Matthews",
        role: "Diploma Student",
        content: "This platform helped me land my dream job in data science. The notes were practical and easy to understand.",
        avatar: "/avatars/avatar-1.png", // Placeholder or dynamic color
        rating: 5
    },
    {
        name: "Sarah Lee",
        role: "Engineering Student",
        content: "I never thought I could start a business, but the entrepreneurship notes gave me the confidence.",
        avatar: "/avatars/avatar-2.png",
        rating: 5
    },
    {
        name: "Michael Davis",
        role: "Civil Engineer",
        content: "The flexibility of the notes allowed me to learn at my own pace while managing my job. Highly recommend.",
        avatar: "/avatars/avatar-3.png",
        rating: 5
    },
    {
        name: "David Harris",
        role: "CS Student",
        content: "Gained valuable insights into digital marketing that helped me grow my online business. Thank you!",
        avatar: "/avatars/avatar-4.png",
        rating: 5
    },
    {
        name: "Jessica Wilson",
        role: "Mechanical Student",
        content: "The UX/UI design notes were fantastic! It gave me the skills I needed to advance in my career.",
        avatar: "/avatars/avatar-5.png",
        rating: 5
    },
    {
        name: "Laura Martinez",
        role: "IT Professional",
        content: "This platform not only taught me new skills but also inspired me to keep learning and growing every day.",
        avatar: "/avatars/avatar-6.png",
        rating: 5
    },
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden backdrop-blur-[2px]">
            {/* Soft decorative background element */}
            <div className="absolute top-0 left-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px] -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20 animate-fade-up">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Our Feedbacks
                    </span>
                    <h2 className="font-display text-5xl lg:text-[4.5rem] font-black mb-8 leading-[0.9] tracking-tighter text-foreground">
                        What Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-500 to-blue-600 inline-block py-2">Learners Say</span>
                    </h2>
                    <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto opacity-60">
                        Hear directly from our students about how our premium notes have transformed their academic journeys.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="glass-card rounded-[2.5rem] p-8 lg:p-10 border-white/40 shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 animate-fade-up group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Stars */}
                            <div className="flex gap-1.5 mb-8">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current shadow-yellow-400/20" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-foreground text-lg mb-10 font-medium italic tracking-tight leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                "{testimonial.content}"
                            </p>

                            {/* User Profile */}
                            <div className="flex items-center gap-5 pt-8 border-t border-white/20">
                                <div className="w-14 h-14 rounded-[1.2rem] bg-black text-white flex items-center justify-center font-black text-xl shadow-xl shadow-black/10 origin-bottom-left group-hover:rotate-6 transition-transform">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="font-black text-base text-black tracking-tight uppercase tracking-widest">{testimonial.name}</h4>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
