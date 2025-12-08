import { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
import {
    ZoomIn,
    ZoomOut,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2,
    FileText
} from 'lucide-react';

interface PDFViewerProps {
    pdfUrl: string;
    isPremium?: boolean;
    isBlurred?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PDFViewer = ({ pdfUrl, isPremium = false, isBlurred = false }: PDFViewerProps) => {
    const [zoom, setZoom] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(10); // Simulated
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Block right-click
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    // Block keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'c')) ||
                e.key === 'PrintScreen'
            ) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative flex flex-col bg-gradient-to-b from-secondary/5 to-secondary/10 rounded-3xl overflow-hidden border border-border/50 shadow-lg ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[calc(100vh-200px)] min-h-[500px]'}`}
        >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-sm border-b border-border/50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">
                        {isPremium ? 'Premium Note' : 'Study Note'}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {/* Zoom Controls */}
                    <button
                        onClick={handleZoomOut}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        disabled={isBlurred}
                    >
                        <ZoomOut size={18} />
                    </button>
                    <span className="w-14 text-center text-sm font-medium">{zoom}%</span>
                    <button
                        onClick={handleZoomIn}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        disabled={isBlurred}
                    >
                        <ZoomIn size={18} />
                    </button>

                    <div className="w-px h-6 bg-border mx-2" />

                    {/* Page Navigation */}
                    <button
                        onClick={handlePrevPage}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        disabled={currentPage === 1 || isBlurred}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-medium px-2">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        disabled={currentPage === totalPages || isBlurred}
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="w-px h-6 bg-border mx-2" />

                    {/* Fullscreen */}
                    <button
                        onClick={toggleFullscreen}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                </div>
            </div>

            {/* PDF Content Area */}
            <div
                className={`flex-1 overflow-auto custom-scrollbar p-4 md:p-8 ${isBlurred ? 'premium-blur' : ''}`}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                }}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
            >
                <div
                    className="mx-auto bg-card rounded-2xl shadow-soft overflow-hidden pdf-protected-container"
                    style={{
                        width: `${Math.min(800 * (zoom / 100), 1200)}px`,
                        minHeight: '600px',
                    }}
                >
                    {/* Simulated PDF Content */}
                    <div className="p-8 md:p-12 space-y-6 no-select">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold mb-2">Data Structures & Algorithms</h2>
                            <p className="text-muted-foreground">Chapter {currentPage}: Introduction to Arrays</p>
                        </div>

                        <div className="space-y-4 text-foreground/80 leading-relaxed">
                            <p>
                                An array is a collection of items stored at contiguous memory locations.
                                The idea is to store multiple items of the same type together. This makes
                                it easier to calculate the position of each element by simply adding an
                                offset to a base value.
                            </p>

                            <div className="bg-muted/30 rounded-xl p-4 font-mono text-sm">
                                <pre className="text-primary">{`// Array declaration in C++
int arr[5] = {1, 2, 3, 4, 5};

// Accessing elements
cout << arr[0]; // Output: 1`}</pre>
                            </div>

                            <h3 className="text-lg font-semibold mt-6">Time Complexity</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access: O(1)</li>
                                <li>Search: O(n)</li>
                                <li>Insertion: O(n)</li>
                                <li>Deletion: O(n)</li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-6">Advantages</h3>
                            <p>
                                Arrays allow random access of elements. This makes accessing elements
                                by position faster. Arrays have better cache locality that can make a
                                pretty big difference in performance.
                            </p>

                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-6">
                                <p className="text-sm font-medium text-primary">
                                    Important: Practice implementing these concepts with real coding problems
                                    to solidify your understanding.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protection Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'transparent',
                }}
            />
        </div>
    );
};

export default PDFViewer;
