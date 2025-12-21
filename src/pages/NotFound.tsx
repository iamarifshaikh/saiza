import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center relative overflow-hidden font-sans">

            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 text-red-500 rounded-full text-xs font-bold uppercase tracking-wider animate-fade-in">
                    <FileQuestion size={14} />
                    <span>Error 404</span>
                </div>

                <h1 className="font-display text-8xl md:text-[150px] font-black leading-none mb-6 relative select-none">
                    <span className="text-gray-200 absolute top-1 left-1 -z-10 blur-[1px]">Out of Syllabus</span>
                    <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Lost?
                    </span>
                </h1>

                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
                    This page is <br className="hidden md:block" /> <span className="text-primary decoration-wavy underline decoration-primary/30 underline-offset-4">Out of Syllabus</span>
                </h2>

                <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                    The topic you are looking for hasn't been covered yet, or it might have been removed from the curriculum.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/">
                        <Button size="xl" className="rounded-full bg-black text-white hover:bg-gray-800 h-14 px-8 font-bold shadow-xl shadow-black/10 transition-transform hover:-translate-y-1">
                            <Home size={20} className="mr-2" />
                            Back to Campus
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="xl"
                        className="rounded-full h-14 px-8 font-bold text-gray-500 hover:text-foreground hover:bg-gray-100"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
