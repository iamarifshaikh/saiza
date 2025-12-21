import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    animation?: "reveal-fade" | "reveal-slide-left" | "reveal-slide-right" | "reveal-zoom";
    delay?: number;
    duration?: number;
    width?: "fit-content" | "100%";
    className?: string;
}

const Reveal = ({
    children,
    animation = "reveal-fade",
    delay = 0,
    duration = 0.8,
    width = "100%",
    className = "",
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsActive(true);
                    // Once it's active, we can unobserve to save performance
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                width,
                position: "relative",
                transitionDelay: `${delay}s`,
                transitionDuration: `${duration}s`
            }}
            className={`reveal ${animation} ${isActive ? "active" : ""} ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
