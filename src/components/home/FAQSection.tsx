import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQSection = () => {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden backdrop-blur-[2px]">
            {/* Soft decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[160px] -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24 animate-fade-up">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Common Queries
                    </span>
                    <h2 className="font-display text-5xl lg:text-[4.5rem] font-black mb-8 leading-[0.9] tracking-tighter text-foreground">
                        Your Questions, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Answered</span>
                    </h2>
                    <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto opacity-60">
                        Explore the answers to frequently asked questions about our premium engineering notes platform.
                    </p>
                </div>

                {/* Accordion */}
                <div className="w-full max-w-4xl mx-auto animate-fade-up">
                    <AccordionPrimitive.Root type="single" collapsible className="space-y-6">
                        {[
                            {
                                id: "item-1",
                                question: "What types of notes do you offer?",
                                answer: "We offer comprehensive notes for Diploma and Engineering students across various streams including Computer Science, Mechanical, Civil, and Electrical engineering. Our notes cover all major subjects and semesters."
                            },
                            {
                                id: "item-2",
                                question: "What are the system requirements to access notes?",
                                answer: "To access our notes, all you need is a computer or mobile device with internet access, a modern browser (Chrome, Firefox, Safari), and a stable internet connection."
                            },
                            {
                                id: "item-3",
                                question: "How can I enroll in a course?",
                                answer: "While we primarily focus on notes, you can access our premium content by signing up and subscribing to our premium plans. Just click on \"Get Full Marks\" or \"Study\" to browse available materials."
                            },
                            {
                                id: "item-4",
                                question: "Can I access the course materials after completing the course?",
                                answer: "Yes! Once you purchase a premium plan or access our notes, you have lifetime access to the materials for that specific semester or subject, allowing you to review them whenever needed."
                            },
                            {
                                id: "item-5",
                                question: "Is there a refund policy if I'm not satisfied with a course?",
                                answer: "We strive for high quality, but if you face issues with our premium content, please contact our support team within 24 hours of purchase for assistance. Refund policies vary by plan."
                            }
                        ].map((item, index) => (
                            <AccordionPrimitive.Item
                                key={item.id}
                                value={item.id}
                                className={cn(
                                    "glass-card rounded-[2.5rem] px-8 lg:px-12 py-2 border-white/40 transition-all duration-500 hover:border-primary/30",
                                    "data-[state=open]:bg-white/60 data-[state=open]:shadow-2xl data-[state=open]:shadow-primary/5"
                                )}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <AccordionPrimitive.Header className="flex">
                                    <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-8 text-2xl lg:text-3xl font-black font-display text-left tracking-tight group [&[data-state=open]>div>div]:bg-primary [&[data-state=open]>div>div]:text-white">
                                        <span className="group-data-[state=open]:text-primary transition-colors duration-300">
                                            {item.question}
                                        </span>
                                        <div className="relative shrink-0 ml-6">
                                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-500 group-hover:border-primary/30">
                                                <Plus className="h-6 w-6 text-gray-400 group-data-[state=open]:hidden transition-transform duration-300" />
                                                <Minus className="h-6 w-6 text-white group-data-[state=closed]:hidden transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </AccordionPrimitive.Trigger>
                                </AccordionPrimitive.Header>
                                <AccordionPrimitive.Content className="overflow-hidden text-lg lg:text-xl text-muted-foreground font-medium data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                    <div className="pb-10 pt-2 leading-relaxed opacity-80 border-t border-white/20 mt-2">
                                        {item.answer}
                                    </div>
                                </AccordionPrimitive.Content>
                            </AccordionPrimitive.Item>
                        ))}
                    </AccordionPrimitive.Root>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
