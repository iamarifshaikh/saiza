import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide border border-primary/20 mb-6">
                            Contact Us
                        </span>
                        <h1 className="font-display text-4xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
                            Let's Start a Conversation
                        </h1>
                        <p className="text-muted-foreground text-lg lg:text-xl font-medium mx-auto leading-relaxed max-w-3xl">
                            Have questions about our notes, subjects, or platform? We're here to help you excel in your studies.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto items-start">
                        {/* Left Column: Contact Form */}
                        <div className="lg:col-span-7 animate-fade-up">
                            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary/60" />

                                <h3 className="font-display text-3xl font-bold mb-2">Send us a message</h3>
                                <p className="text-muted-foreground mb-10">We usually respond within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-bold text-foreground/80 pl-1">
                                                Name
                                            </label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                                required
                                                className="rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all text-base px-5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-bold text-foreground/80 pl-1">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                required
                                                className="rounded-2xl h-14 bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all text-base px-5"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-bold text-foreground/80 pl-1">
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us how we can help..."
                                            required
                                            rows={6}
                                            className="rounded-2xl resize-none bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all text-base p-5"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-14 rounded-full bg-black text-white hover:bg-black/80 text-base font-bold tracking-wide uppercase transition-all shadow-lg hover:shadow-xl mt-4"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Contact Info Cards */}
                        <div className="lg:col-span-5 space-y-6 animate-fade-up stagger-1">
                            {/* Dark/Black Info Card (Replaced bright primary) */}
                            <div className="bg-[#18181b] text-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute -top-24 -right-24 w-60 h-60 bg-primary/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />

                                <h3 className="font-display text-2xl font-bold mb-8 relative z-10">Contact Information</h3>

                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10 group-hover:border-primary/50 transition-colors">
                                            <Mail size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-0.5">Email Us</p>
                                            <a href="mailto:support@adroits.edu" className="opacity-70 hover:opacity-100 hover:text-primary transition-all">support@adroits.edu</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10 group-hover:border-primary/50 transition-colors">
                                            <Phone size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-0.5">Call Us</p>
                                            <p className="opacity-70">+91 98765 43210</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10 group-hover:border-primary/50 transition-colors">
                                            <MapPin size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-0.5">Visit Us</p>
                                            <p className="opacity-70 leading-relaxed">
                                                Mumbai, Maharashtra,<br />India
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Socials Card */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-gray-200/50 border border-gray-100">
                                <h3 className="font-display text-xl font-bold mb-6">Connect With Us</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/919876543210"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MessageCircle size={24} className="text-[#25D366] group-hover:text-white transition-colors" />
                                            <span className="font-bold text-[#25D366] group-hover:text-white transition-colors">WhatsApp</span>
                                        </div>
                                        <ArrowRight size={18} className="text-[#25D366] group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </a>

                                    {/* Telegram */}
                                    <a
                                        href="https://t.me/adroits_edu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between p-4 rounded-2xl bg-[#0088cc]/10 hover:bg-[#0088cc] transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Send size={24} className="text-[#0088cc] group-hover:text-white transition-colors" />
                                            <span className="font-bold text-[#0088cc] group-hover:text-white transition-colors">Telegram</span>
                                        </div>
                                        <ArrowRight size={18} className="text-[#0088cc] group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
