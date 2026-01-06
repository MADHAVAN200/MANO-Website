
import React, { useState } from 'react';
import {
    Building, Briefcase, Factory, Hexagon, GraduationCap,
    MapPin, CheckCircle, ArrowRight, ChevronRight, Layout, Minimize2, Activity,
    ShieldCheck, DollarSign, FileText
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const featuredProjects = [
        {
            title: "High-Rise Residential Tower",
            location: "Mumbai",
            scope: ["Planning", "PMC", "QA/QC", "Billing Audit"],
            highlight: "Delivered a 40+ storey premium residential tower with complete planning, quality control, and execution oversight.",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&h=800&auto=format&fit=crop"
        },
        {
            title: "Corporate Commercial Building",
            location: "Pune",
            scope: ["Project Management", "QA/QC", "Cost Consultancy"],
            highlight: "A Grade-A commercial complex delivered with zero non-conformance and on-schedule handover.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&h=800&auto=format&fit=crop"
        },
        {
            title: "Industrial Manufacturing Facility",
            location: "Gujarat",
            scope: ["Planning", "Cost Audit", "EHS Audit", "PMC"],
            highlight: "End-to-end consultancy enabling a fully compliant, highly efficient industrial facility.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&h=800&auto=format&fit=crop"
        }
    ];

    const categoryProjects = [
        // Residential
        {
            category: "Residential",
            title: "Residential Tower Development",
            scope: ["Planning", "QA/QC", "PMC"],
            highlight: "High-rise tower delivered with optimum space utilization and premium finish quality.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&h=600&auto=format&fit=crop"
        },
        {
            category: "Residential",
            title: "Premium Housing Township",
            scope: ["Cost Consultancy", "Contract Management", "Billing Audit"],
            highlight: "Complete financial control and detailed quantity verification for 20+ buildings.",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&h=600&auto=format&fit=crop"
        },
        // Commercial
        {
            category: "Commercial",
            title: "IT/Corporate Office Building",
            scope: ["Execution", "QA/QC", "Project Management"],
            highlight: "Technically complex façade and interior works executed with precision.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=600&auto=format&fit=crop"
        },
        {
            category: "Commercial",
            title: "Retail & Shopping Complex",
            scope: ["Cost Audit", "Variation Validation", "QS"],
            highlight: "Over 30% savings achieved through cost optimization.",
            image: "https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?q=80&w=800&h=600&auto=format&fit=crop"
        },
        // Industrial
        {
            category: "Industrial",
            title: "Manufacturing Unit Setup",
            scope: ["EHS", "Planning", "QA", "PMC"],
            highlight: "Compliant, safe, and efficient industrial setup delivered on time.",
            image: "https://images.unsplash.com/photo-1565514020176-db79338b0a99?q=80&w=800&h=600&auto=format&fit=crop"
        },
        {
            category: "Industrial",
            title: "Warehouse Facility",
            scope: ["Billing Audit", "Contract Validation", "QA"],
            highlight: "Transparent billing and compliant construction documentation.",
            image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&h=600&auto=format&fit=crop"
        },
        // Hospitality
        {
            category: "Hospitality",
            title: "Business Hotel",
            scope: ["QA/QC", "Cost Consultancy"],
            highlight: "High-end interiors with strict finish quality checks.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
        },
        {
            category: "Hospitality",
            title: "Resort Development",
            scope: ["PMC", "EHS Audit", "QS"],
            highlight: "Harmonized execution between civil, landscape, and amenities.",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&h=600&auto=format&fit=crop"
        },
        // Institutional
        {
            category: "Institutional",
            title: "Educational Campus",
            scope: ["Planning", "QA", "Cost Estimation"],
            highlight: "Delivered multiple buildings with seamless coordination.",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&h=600&auto=format&fit=crop"
        },
        {
            category: "Institutional",
            title: "Government Facility",
            scope: ["Contract Management", "Billing Audit", "QA"],
            highlight: "Transparent auditing and full compliance with statutory norms.",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&h=600&auto=format&fit=crop"
        }
    ];

    const categories = ["All", "Residential", "Commercial", "Industrial", "Hospitality", "Institutional"];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,10,30,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 mb-6">
                        Our Portfolio
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Delivering excellence across residential, commercial, and industrial sectors with precision and integrity.
                    </p>
                </div>
            </section>

            {/* 1. FEATURED PROJECTS */}
            <section className="py-24 px-6 relative">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-16">
                            <div className="h-px bg-blue-500/30 flex-1"></div>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Featured Projects</h2>
                            <div className="h-px bg-blue-500/30 flex-1"></div>
                        </div>

                        <div className="space-y-16">
                            {featuredProjects.map((project, index) => (
                                <div key={project.id} className="group relative rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 h-full flex flex-col">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        <div className="relative h-[400px] lg:h-auto overflow-hidden">
                                            <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-8 md:p-12 flex flex-col justify-center relative">

                                            <div className="flex items-start justify-between mb-6">
                                                <div className="inline-flex items-center space-x-2 text-blue-400 text-sm font-semibold tracking-wide uppercase">
                                                    <MapPin size={16} />
                                                    <span>{project.location}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors">
                                                {project.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-3 mb-8">
                                                {project.scope.map((s, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/5">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4">
                                                {project.highlight}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 2. CATEGORY WISE SHOWCASE */}
            <section className="py-24 px-6 bg-white/5">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-8">Specialized Project Expertise</h2>

                            {/* Filter Tabs */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === cat
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {categoryProjects
                                .filter(p => activeCategory === "All" || p.category === activeCategory)
                                .map((project, index) => (
                                    <div key={index} className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1">
                                        <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <span className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.scope.map((item, idx) => (
                                                <div key={idx} className="flex items-center text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                                    <CheckCircle size={10} className="text-blue-500 mr-1" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-sm text-gray-400 italic">
                                            "{project.highlight}"
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 4. PROJECTS SUMMARY STRIP */}
            <section className="py-16 border-y border-white/5 bg-blue-950/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="p-4">
                            <span className="block text-5xl font-bold text-white mb-2">100+</span>
                            <span className="text-blue-300 font-medium tracking-wide uppercase text-sm">Projects Delivered</span>
                        </div>
                        <div className="p-4">
                            <span className="block text-5xl font-bold text-white mb-2">12+</span>
                            <span className="text-blue-300 font-medium tracking-wide uppercase text-sm">Years Experience</span>
                        </div>
                        <div className="p-4">
                            <span className="block text-5xl font-bold text-white mb-2">500+</span>
                            <span className="text-blue-300 font-medium tracking-wide uppercase text-sm">Satisfied Clients</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA SECTION */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(20,20,50,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 leading-tight">
                        Build Your Project With a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Trusted Partner.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-6">
                                Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center backdrop-blur-sm">
                            View More Services <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Projects;
