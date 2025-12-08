import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center">
                                <span className="font-display font-bold text-lg text-foreground">S</span>
                            </div>
                            <span className="font-display text-xl font-bold">SAIZA</span>
                        </Link>
                        <p className="text-secondary-foreground/70 text-sm max-w-sm">
                            Your one-stop educational platform for Diploma & Engineering students. Access quality notes and study materials.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-secondary-foreground/70">
                            <li><Link to="/" className="hover:text-secondary-foreground transition-colors">Home</Link></li>
                            <li><Link to="/study" className="hover:text-secondary-foreground transition-colors">Study</Link></li>
                            <li><Link to="/premium" className="hover:text-secondary-foreground transition-colors">Get Full Marks</Link></li>
                            <li><Link to="/contact" className="hover:text-secondary-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-display font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm text-secondary-foreground/70">
                            <li><Link to="/study/diploma" className="hover:text-secondary-foreground transition-colors">Diploma</Link></li>
                            <li><Link to="/study/engineering" className="hover:text-secondary-foreground transition-colors">Engineering</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-secondary-foreground/50">
                        © 2024 SAIZA. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-secondary-foreground/50">
                        <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-secondary-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
