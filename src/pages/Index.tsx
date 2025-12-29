import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CoursesSection from "@/components/home/CoursesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import BackgroundAtmosphere from "@/components/ui/BackgroundAtmosphere";

const Index = () => {
    return (
        <div className="min-h-screen bg-transparent font-sans selection:bg-primary/20 selection:text-primary relative overflow-hidden">
            <BackgroundAtmosphere />

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
