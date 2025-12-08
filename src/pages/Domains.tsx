import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const domains = [
    {
        id: "computer",
        title: "Computer Engineering",
        description: "Programming, Data Structures, OS, DBMS, and more",
        icon: "💻",
        color: "bg-lime",
        subjects: 12,
    },
    {
        id: "it",
        title: "Information Technology",
        description: "Networking, Web Development, Cloud Computing",
        icon: "🌐",
        color: "bg-mint",
        subjects: 10,
    },
    {
        id: "mechanical",
        title: "Mechanical Engineering",
        description: "Thermodynamics, Manufacturing, Machine Design",
        icon: "⚙️",
        color: "bg-coral",
        subjects: 14,
    },
    {
        id: "extc",
        title: "Electronics & Telecommunication",
        description: "Digital Electronics, Communication Systems, Signals",
        icon: "📡",
        color: "bg-lime",
        subjects: 11,
    },
    {
        id: "electrical",
        title: "Electrical Engineering",
        description: "Power Systems, Electrical Machines, Control Systems",
        icon: "⚡",
        color: "bg-mint",
        subjects: 13,
    },
    {
        id: "chemical",
        title: "Chemical Engineering",
        description: "Process Engineering, Thermodynamics, Reactions",
        icon: "🧪",
        color: "bg-coral",
        subjects: 9,
    },
    {
        id: "civil",
        title: "Civil Engineering",
        description: "Structural Analysis, Construction, Surveying",
        icon: "🏗️",
        color: "bg-lime",
        subjects: 12,
    },
];

const Domains = () => {
    const { courseType } = useParams();
    const courseTitle = courseType === "diploma" ? "Diploma" : "Engineering";

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-up">
                        <Link to="/study" className="hover:text-foreground transition-colors">Study</Link>
                        <span>/</span>
                        <span className="text-foreground">{courseTitle}</span>
                    </div>

                    {/* Header */}
                    <div className="max-w-2xl mb-12">
                        <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 animate-fade-up">
                            {courseTitle} Domains
                        </h1>
                        <p className="text-muted-foreground text-lg animate-fade-up stagger-1">
                            Select your engineering domain to access subject-wise study materials.
                        </p>
                    </div>

                    {/* Domains Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {domains.map((domain, index) => (
                            <Link
                                key={domain.id}
                                to={`/study/${courseType}/${domain.id}`}
                                className="group animate-fade-up"
                                style={{ animationDelay: `${(index + 2) * 0.05}s` }}
                            >
                                <div className={`${domain.color} rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:shadow-medium hover:-translate-y-1`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-4xl">{domain.icon}</span>
                                        <button className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                    <h3 className="font-display text-xl font-bold mb-2">
                                        {domain.title}
                                    </h3>
                                    <p className="text-foreground/70 text-sm mb-4 flex-1">
                                        {domain.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="bg-card/50 rounded-full px-3 py-1 text-xs font-medium">
                                            {domain.subjects} Subjects
                                        </span>
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
