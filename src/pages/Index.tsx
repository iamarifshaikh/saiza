import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ExpertsSection from "@/components/home/ExpertsSection";
import CoursesSection from "@/components/home/CoursesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <HeroSection />
                <ExpertsSection />
                <CoursesSection />
                <TestimonialsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
