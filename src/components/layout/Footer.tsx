import { Link } from "react-router-dom";
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Send,
    MapPin,
    Mail,
    Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
    return (
        <footer className="bg-[#18181b] text-white pt-20 pb-10 border-t border-white/5 font-sans">
            <div className="container mx-auto px-4 lg:px-8">

                {/* Top Section: CTA & Newsletter */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 border-b border-white/10 pb-16">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                            Start your learning journey.
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Join 20,000+ students and get access to premium engineering notes.
                        </p>
                    </div>

                    <div className="w-full max-w-md relative">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full h-16 rounded-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 pl-8 pr-32 focus-visible:ring-primary/50 text-base"
                        />
                        <Button className="absolute right-2 top-2 bottom-2 rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-bold h-auto shadow-lg shadow-primary/20">
                            Join Now
                        </Button>
                    </div>
                </div>

                {/* Middle Grid: Links & Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 text-center lg:text-left space-y-6">
                        <Link to="/" className="inline-flex items-center gap-3 justify-center lg:justify-start group">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300" />
                                <img src="/adroits-logo.png" alt="Adroits Logo" className="w-8 h-8 object-contain relative z-10 group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">Adroits</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm mx-auto lg:mx-0">
                            The #1 online platform for engineering notes, resources, and student collaboration. Empowering the future of tech.
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 text-center lg:text-left space-y-6">
                        <h4 className="font-bold text-lg text-white">Company</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 text-center lg:text-left space-y-6">
                        <h4 className="font-bold text-lg text-white">Resources</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/study" className="hover:text-primary transition-colors">All Notes</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/community" className="hover:text-primary transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-4 text-center lg:text-left space-y-6">
                        <h4 className="font-bold text-lg text-white">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                                <MapPin size={20} className="text-primary mt-1" />
                                <span>Mumbai, Maharashtra, India</span>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                                <Mail size={20} className="text-primary mt-1" />
                                <a href="mailto:support@adroits.edu" className="hover:text-white transition-colors">support@adroits.edu</a>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-3">
                                <Phone size={20} className="text-primary mt-1" />
                                <span>+91 98765 43210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/5 text-gray-500 text-sm">
                    <p>© 2025 Adroits Education. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookies Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
