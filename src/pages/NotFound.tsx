import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-mint/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-lg">
                {/* 404 Display */}
                <div className="relative mb-8">
                    <h1 className="font-display text-[180px] sm:text-[220px] font-bold leading-none bg-gradient-to-br from-foreground via-foreground/80 to-foreground/40 bg-clip-text text-transparent">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-lime/30 animate-ping" style={{ animationDuration: '2s' }} />
                    </div>
                </div>

                {/* Message */}
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 animate-fade-up">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground text-lg mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <Link to="/">
                        <Button variant="lime" size="lg" className="gap-2 w-full sm:w-auto">
                            <Home size={18} />
                            Go Home
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </Button>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-20 left-10 w-4 h-4 bg-lime rounded-full animate-float" />
                <div className="absolute top-20 right-10 w-3 h-3 bg-coral rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-20 left-20 w-2 h-2 bg-mint rounded-full animate-float" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
};

export default NotFound;
