import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const CustomCursor = () => {
    const { user, isSignedUp } = useAuth();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isGrabbing, setIsGrabbing] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            const computedCursor = window.getComputedStyle(target).cursor;
            setIsPointer(computedCursor === 'pointer');
            setIsGrabbing(computedCursor === 'grab' || computedCursor === 'grabbing');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="hidden lg:flex fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out items-start gap-1"
            style={{
                left: position.x,
                top: position.y,
                transform: `rotate(${isPointer || isGrabbing ? '0' : '-15'}deg) scale(${isPointer || isGrabbing ? 1.1 : 1})`
            }}
        >
            {/* Hand or Arrow */}
            {isPointer || isGrabbing ? (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                >
                    <path d="M14 9V5a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4.5M18 9V4a3 3 0 0 0-3-3 3 3 0 0 0-3 3v5M10 9V4a3 3 0 0 0-3-3 3 3 0 0 0-3 3v10c0 4.42 3.58 8 8 8s8-3.58 8-8V9a3 3 0 0 0-3-3 3 3 0 0 0-3 3" />
                </svg>
            ) : (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                >
                    <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.83-4.83 4.4 9.1c.13.26.43.38.7.28l2.23-.8c.27-.1.4-.4.28-.67l-4.42-9.15h6.35c.31 0 .47-.37.25-.6L6.15 2.85c-.22-.22-.65-.06-.65.36z" />
                </svg>
            )}

            {/* Badge - Show name only if signed up/logged in */}
            {isSignedUp && user?.name && (
                <div className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded-full shadow-lg whitespace-nowrap -mt-1 -ml-1 border border-white/20 select-none uppercase tracking-widest">
                    @{user.name.split(' ')[0]}
                </div>
            )}
        </div>
    );
};

export default CustomCursor;
