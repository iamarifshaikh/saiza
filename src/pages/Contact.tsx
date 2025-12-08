import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
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
            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 animate-fade-up">
                            Get in Touch
                        </h1>
                        <p className="text-muted-foreground text-lg animate-fade-up stagger-1">
                            Have questions or feedback? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <div className="animate-fade-up stagger-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Your Name
                                    </label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        required
                                        className="rounded-xl h-12 border-border/50 focus:border-lime focus:ring-lime"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        required
                                        className="rounded-xl h-12 border-border/50 focus:border-lime focus:ring-lime"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can we help you?"
                                        required
                                        rows={5}
                                        className="rounded-xl resize-none border-border/50 focus:border-lime focus:ring-lime"
                                    />
                                </div>
                                <Button type="submit" variant="lime" size="lg" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6 animate-fade-up stagger-3">
                            <div className="bg-lime rounded-3xl p-6 lg:p-8">
                                <h3 className="font-display text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center flex-shrink-0">
                                            <Mail size={20} className="text-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Email</p>
                                            <p className="text-foreground/70 text-sm">support@saiza.edu</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center flex-shrink-0">
                                            <Phone size={20} className="text-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Phone</p>
                                            <p className="text-foreground/70 text-sm">+91 98765 43210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={20} className="text-foreground" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Address</p>
                                            <p className="text-foreground/70 text-sm">Mumbai, Maharashtra, India</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Icons */}
                                <div className="mt-8 pt-6 border-t border-foreground/10">
                                    <p className="font-semibold text-foreground mb-4">Connect With Us</p>
                                    <div className="flex gap-3">
                                        {/* WhatsApp */}
                                        <a
                                            href="https://wa.me/919876543210"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-green-500/30"
                                        >
                                            <MessageCircle size={22} className="text-white" />
                                        </a>
                                        {/* Telegram */}
                                        <a
                                            href="https://t.me/saiza_edu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-blue-500/30"
                                        >
                                            <Send size={20} className="text-white" />
                                        </a>
                                        {/* Email */}
                                        <a
                                            href="mailto:support@saiza.edu"
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime to-mint flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-lime/30"
                                        >
                                            <Mail size={20} className="text-foreground" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-secondary text-secondary-foreground rounded-3xl p-6 lg:p-8">
                                <h3 className="font-display text-xl font-bold mb-4">Quick Response</h3>
                                <p className="text-secondary-foreground/70 text-sm">
                                    We typically respond within 24 hours. For urgent queries, please call us directly or reach out via WhatsApp.
                                </p>
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
