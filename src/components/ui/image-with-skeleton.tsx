import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackClassName?: string;
}

const ImageWithSkeleton = ({
    src,
    alt,
    className,
    fallbackClassName,
    ...props
}: ImageWithSkeletonProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) {
            setHasError(true);
            setIsLoading(false);
            return;
        }

        // Reset state when src changes
        setIsLoading(true);
        setHasError(false);

        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (hasError || !src) {
        return <Skeleton className={cn("w-full h-full bg-muted animate-pulse", className, fallbackClassName)} />;
    }

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {isLoading && (
                <Skeleton className={cn("absolute inset-0 w-full h-full bg-muted z-10", fallbackClassName)} />
            )}
            <img
                src={src}
                alt={alt}
                className={cn("w-full h-full object-cover transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
                {...props}
            />
        </div>
    );
};

export default ImageWithSkeleton;
