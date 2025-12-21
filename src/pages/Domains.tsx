import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight, Cpu, Globe, Settings, Radio, Zap, FlaskConical, Hammer } from "lucide-react";

const domains = [
    {
        id: "computer",
        title: "Computer Engineering",
        description: "Programming, Data Structures, OS, DBMS",
        icon: Cpu,
        color: "text-blue-500",
        bg: "bg-blue-50",
        subjects: 18,
    },
    {
        id: "it",
        title: "Information Technology",
        description: "Networking, Web Dev, Cloud Computing",
        icon: Globe,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        subjects: 15,
    },
    {
        id: "mechanical",
        title: "Mechanical Engineering",
        description: "Thermodynamics, Manufacturing, Design",
        icon: Settings,
        color: "text-orange-500",
        bg: "bg-orange-50",
        subjects: 22,
    },
    {
        id: "extc",
        title: "Electronics & Telecomm",
        description: "Digital Circuits, Signals, Communication",
        icon: Radio,
        color: "text-purple-500",
        bg: "bg-purple-50",
        subjects: 16,
    },
    {
        id: "electrical",
        title: "Electrical Engineering",
        description: "Power Systems, Machines, Control Systems",
        icon: Zap,
        color: "text-yellow-500",
        bg: "bg-yellow-50",
        subjects: 14,
    },
    {
        id: "chemical",
        title: "Chemical Engineering",
        description: "Process Engineering, Kinetics, Reactions",
        icon: FlaskConical,
        color: "text-teal-500",
        bg: "bg-teal-50",
        subjects: 11,
    },
    {
        id: "civil",
        title: "Civil Engineering",
        description: "Structures, Construction, Surveying",
        icon: Hammer,
        color: "text-red-500",
        bg: "bg-red-50",
        subjects: 19,
    },
];

const Domains = () => {
    const { courseType } = useParams();
    const courseTitle = courseType === "diploma" ? "Diploma" : "Engineering";

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <main className="pt-32 lg:pt-40 pb-20 lg:pb-32 px-4 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-10 animate-fade-in">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/study" className="hover:text-primary transition-colors">Study</Link>
                        <ChevronRight size={14} />
                        <span className="text-foreground font-bold">{courseTitle}</span>
                    </div>

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest border border-primary/20 mb-6 uppercase">
                            {courseTitle} Streams
                        </span>
                        <h1 className="font-display text-4xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight">
                            Select Your Branch
                        </h1>
                        <p className="text-muted-foreground text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            Choose your engineering domain to unlock a treasure trove of curated notes and resources.
                        </p>
                    </div>

                    {/* Domains Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {domains.map((domain, index) => (
                            <Link
                                key={domain.id}
                                to={`/study/${courseType}/${domain.id}`}
                                className="group relative animate-fade-up"
                                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
                            >
                                <div className="h-full bg-white rounded-2xl lg:rounded-[2rem] p-4 lg:p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl ${domain.bg} flex items-center justify-center md:mb-6 shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                                        <domain.icon size={24} className={`${domain.color} lg:w-7 lg:h-7`} />
                                    </div>

                                    <div className="flex-grow md:mb-4">
                                        <h3 className="font-display text-lg lg:text-2xl font-bold mb-1 md:mb-2 text-gray-900 group-hover:text-primary transition-colors">
                                            {domain.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs lg:text-sm leading-relaxed line-clamp-1 md:line-clamp-none">
                                            {domain.description}
                                        </p>
                                    </div>

                                    <div className="hidden md:flex items-center justify-between pt-6 mt-2 border-t border-gray-50 w-full">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-50 text-xs font-bold text-gray-600 border border-gray-100">
                                            {domain.subjects} Subjects
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>

                                    {/* Mobile Subject Count & Arrow */}
                                    <div className="flex md:hidden items-center gap-2 shrink-0">
                                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                            {domain.subjects}
                                        </span>
                                        <ChevronRight size={16} className="text-gray-300" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Domains;
