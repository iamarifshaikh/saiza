import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const location = useLocation();
  const auth = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Notes", path: "/study" },
    { name: "Contact", path: "/contact" },
  ];

  const activeIndex = navLinks.findIndex(link =>
    link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path)
  );

  // Update indicator position
  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    if (targetIndex !== -1 && navRefs.current[targetIndex]) {
      const el = navRefs.current[targetIndex];
      setIndicatorStyle({
        left: el?.offsetLeft || 0,
        width: el?.offsetWidth || 0,
        opacity: 1
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex, activeIndex]);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/5 py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300" />
              <img src="/adroits-logo.png" alt="Adroits Logo" className="w-8 h-8 object-contain relative z-10 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <span className="font-display text-2xl font-black text-foreground tracking-tighter uppercase">Adroits</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 relative">
            {/* Sliding Indicator */}
            <div
              className="absolute h-full bg-primary/10 rounded-lg transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity
              }}
            />

            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                ref={el => { navRefs.current[idx] = el; }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 relative z-10",
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/premium">
              <Button size="lg" className="rounded-xl bg-foreground hover:bg-primary text-background font-black px-7 transition-all hover:-translate-y-0.5 shadow-lg shadow-black/5 h-11">
                Premium
              </Button>
            </Link>

            {auth.isSignedUp ? (
              <Link to="/profile">
                <button className="w-11 h-11 rounded-xl bg-black/5 border border-black/5 flex items-center justify-center hover:bg-black/10 transition-all group">
                  <User size={20} className="text-foreground group-hover:text-primary transition-colors" />
                </button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="rounded-xl font-black h-11 px-8 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-400 text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 border-none">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {auth.isSignedUp && (
              <Link to="/profile">
                <button className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center">
                  <User size={18} className="text-foreground" />
                </button>
              </Link>
            )}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 text-foreground transition-all hover:bg-black/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white border-b border-black/5 p-6 animate-fade-in z-50 shadow-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-5 py-4 rounded-xl text-base font-black transition-all",
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "bg-black/5 text-foreground hover:bg-black/10"
                  )}
                >
                  {link.name}
                  {isActive(link.path) && <ChevronRight size={18} />}
                </Link>
              ))}
              <div className="pt-6 mt-2 border-t border-black/5">
                <Link to="/premium" onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="w-full rounded-xl bg-foreground text-background font-black h-14">
                    Get Premium +
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
