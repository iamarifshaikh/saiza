import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CoursesSection from "@/components/home/CoursesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import Reveal from "@/components/animations/Reveal";
const Index = () => {
    return (
        <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-primary/20 selection:text-primary relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 -z-10 bg-mesh opacity-40" />

            {/* Animated Background Blobs */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '0s' }} />
                <div className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
            </div>

            <Navbar />
            <main className="relative z-10">
                <HeroSection />
                <FeaturesSection />
                <CoursesSection />
                <TestimonialsSection />
                <FAQSection />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
