
import React, { useState } from 'react';
import {
    Building, Briefcase, Factory, Hexagon, GraduationCap,
    MapPin, CheckCircle, ArrowRight, ChevronRight, Layout, Minimize2, Activity,
    ShieldCheck, DollarSign, FileText, Award
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';
import ProjectsHero from '../../components/HeroSections/ProjectsHero';
import ContactModal from '../../components/ContactModal';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isContactOpen, setIsContactOpen] = useState(false);

    const featuredProjects = [
        {
            id: 1,
            title: "SkyCity Hotel Project – Rappture Projects",
            location: "Andheri, Mumbai",
            scope: ["PMC", "Project Management", "Construction"],
            highlight: "A massive 3,76,000 Sft hospitality development delivered with excellence in Mumbai.",
            image: `${import.meta.env.BASE_URL}projects/skycity_hotel.png`
        },
        {
            id: 2,
            title: "115 Rooms Hotel – Cube Construction SARL",
            location: "Kinshasa, Congo",
            scope: ["Project Management", "QA/QC", "Consultancy"],
            highlight: "International project management for a premier hotel development in Congo.",
            image: `${import.meta.env.BASE_URL}projects/hotel_interior.png`
        },
        {
            id: 3,
            title: "Ananda Residency - Paradigm Ambit Buildcon",
            location: "Borivali (West), Mumbai",
            scope: ["PMC", "Quality Control", "Audit"],
            highlight: "Massive 3,10,230 sq. ft. residential development completed successfully.",
            image: `${import.meta.env.BASE_URL}projects/ananda_residency.png`
        },
        {
            id: 4,
            title: "Westside – Tata Trent Ltd.",
            location: "Gachibowli, Hyderabad",
            scope: ["PMC", "Interior Fit-out", "Audit"],
            highlight: "21,255 sq.ft. retail project delivered for Tata Trent.",
            image: `${import.meta.env.BASE_URL}projects/westside_retail.png`
        },
        {
            id: 5,
            title: "Prima Plastics Limited",
            location: "Pithampur, Indore",
            scope: ["PMC", "Safety Audit", "Construction"],
            highlight: "1,79,533 sq.ft. industrial facility managed from design to execution.",
            image: `${import.meta.env.BASE_URL}projects/prima_plastics.png`
        }
    ];

    const categoryProjects = [
        // Residential
        {
            category: "Residential",
            title: "Sati Darshan - Goyal Group",
            scope: ["PMC", "QA/QC", "Audit"],
            highlight: "1,39,749 sq.ft. residential project in Malad, Mumbai.",
            image: `${import.meta.env.BASE_URL}projects/residential_complex.png`
        },
        {
            category: "Residential",
            title: "G+11 Residential Apartment - Cube Construction",
            scope: ["PMC", "Monitoring"],
            highlight: "Large scale residential development in Lubumbashi, Congo.",
            image: `${import.meta.env.BASE_URL}projects/residential_complex.png`
        },
        {
            category: "Residential",
            title: "Celestia - Shree Ram Samarth",
            scope: ["PMC", "Quality Assurance"],
            highlight: "1,00,000 sq.ft. residential development in Mulund, Mumbai.",
            image: `${import.meta.env.BASE_URL}projects/ananda_residency.png`
        },
        {
            category: "Residential",
            title: "Shubharambh Residency",
            scope: ["PMC", "Billing Support"],
            highlight: "59,000 sq.ft. housing project in Solapur.",
            image: `${import.meta.env.BASE_URL}projects/residential_complex.png`
        },
        {
            category: "Residential",
            title: "Ariana Residency",
            scope: ["PMC", "Project Audit"],
            highlight: "Quality management and execution oversight for premium residential units.",
            image: `${import.meta.env.BASE_URL}projects/ananda_residency.png`
        },
        {
            category: "Residential",
            title: "PMAY-Charohli",
            scope: ["Audit", "QS"],
            highlight: "Cost and quality auditing for affordable housing developments.",
            image: `${import.meta.env.BASE_URL}projects/residential_complex.png`
        },
        {
            category: "Residential",
            title: "Amara (Lodha)",
            scope: ["PMC", "Execution"],
            highlight: "Engagement in large-scale residential township development.",
            image: `${import.meta.env.BASE_URL}projects/residential_complex.png`
        },
        {
            category: "Residential",
            title: "Legacy Apartment",
            scope: ["PMC", "Audit"],
            highlight: "Comprehensive project management for high-end residential spaces.",
            image: `${import.meta.env.BASE_URL}projects/ananda_residency.png`
        },
        {
            category: "Residential",
            title: "Unity Heights / Ocean Park",
            scope: ["PMC", "QA/QC"],
            highlight: "Project execution and quality assurance for multi-storey residential projects.",
            image: `${import.meta.env.BASE_URL}projects/residential_complex.png`
        },
        // Hospitality
        {
            category: "Hospitality",
            title: "30 JUIN HOTEL – Glowmex Group",
            scope: ["PMC", "Execution"],
            highlight: "63,122 Sq.ft. luxury hotel project in Lubumbashi, Congo.",
            image: `${import.meta.env.BASE_URL}projects/skycity_hotel.png`
        },
        {
            category: "Hospitality",
            title: "102 Rooms Hotel - Cube Construction",
            scope: ["PMC", "Consultancy"],
            highlight: "International hotel project in Lubumbashi, Congo.",
            image: `${import.meta.env.BASE_URL}projects/hotel_interior.png`
        },
        {
            category: "Hospitality",
            title: "53 Rooms Hotel - Clowmex Processing",
            scope: ["PMC", "Audit"],
            highlight: "63,000 Sft hospital project in Lubumbashi.",
            image: `${import.meta.env.BASE_URL}projects/skycity_hotel.png`
        },
        {
            category: "Hospitality",
            title: "Citrus Hotel - Phase I & II",
            scope: ["PMC", "Interior Audit"],
            highlight: "Phased development and management for a premium hotel chain.",
            image: `${import.meta.env.BASE_URL}projects/hotel_interior.png`
        },
        {
            category: "Hospitality",
            title: "Premier Inn / Graviss Hotels",
            scope: ["PMC", "Cost Consultancy"],
            highlight: "Comprehensive hospitality consultancy for leading brands.",
            image: `${import.meta.env.BASE_URL}projects/skycity_hotel.png`
        },
        {
            category: "Hospitality",
            title: "KAPCO Banquets & Catering",
            scope: ["PMC", "Design Coordination"],
            highlight: "15,698 sq.ft. hospitality project in New Delhi.",
            image: `${import.meta.env.BASE_URL}projects/hotel_interior.png`
        },
        // Commercial
        {
            category: "Commercial",
            title: "Office Space – Anand Rathi Wealth Ltd.",
            scope: ["Execution", "Interior PMC"],
            highlight: "11,000 Sq.ft. modern office space in Gachibowli & Powai.",
            image: `${import.meta.env.BASE_URL}projects/office_interior.png`
        },
        {
            category: "Commercial",
            title: "Asian Paints Experience Centre",
            scope: ["Interior PMC", "Execution"],
            highlight: "Specialized retail experience centre in Borivali, Mumbai.",
            image: `${import.meta.env.BASE_URL}projects/westside_retail.png`
        },
        {
            category: "Commercial",
            title: "Zudio / Tata Trent Projects",
            scope: ["PMC", "Billing Audit"],
            highlight: "Rollout management for multiple retail outlets across Bengaluru & Baroda.",
            image: `${import.meta.env.BASE_URL}projects/westside_retail.png`
        },
        {
            category: "Commercial",
            title: "NSCI Dome – Worli",
            scope: ["PMC", "Audit"],
            highlight: "5,150 sq.ft. institutional-scale project in Mumbai.",
            image: `${import.meta.env.BASE_URL}projects/office_interior.png`
        },
        {
            category: "Commercial",
            title: "Hexaware Techno Park / Cipla R&D",
            scope: ["PMC", "Audit"],
            highlight: "Technical and administrative project management for complex R&D and IT parks.",
            image: `${import.meta.env.BASE_URL}projects/office_interior.png`
        },
        {
            category: "Commercial",
            title: "D'Mart Shopping Malls",
            scope: ["QS", "Audit"],
            highlight: "Quantity surveying and billing audits for multiple D'Mart locations.",
            image: `${import.meta.env.BASE_URL}projects/westside_retail.png`
        },
        // Industrial
        {
            category: "Industrial",
            title: "Prima Plastics Limited - Phase II",
            scope: ["PMC", "Safety Audit"],
            highlight: "1,69,000 Sft plastic manufacturing facility in Pithambur.",
            image: `${import.meta.env.BASE_URL}projects/prima_plastics.png`
        },
        {
            category: "Industrial",
            title: "Textile Factory - Micro Interlinings",
            scope: ["PMC", "Audit"],
            highlight: "52,532 sq.ft. industrial facility in Tarapur.",
            image: `${import.meta.env.BASE_URL}projects/prima_plastics.png`
        },
        {
            category: "Industrial",
            title: "JNPC Infra Development",
            scope: ["Infrastructure Audit"],
            highlight: "Infrastructure development oversight in Andhra Pradesh.",
            image: `${import.meta.env.BASE_URL}projects/prima_plastics.png`
        }
    ];

    const categories = ["All", "Residential", "Commercial", "Industrial", "Hospitality"];

    return (
        <div className="min-h-screen bg-blue-pattern text-white font-sans selection:bg-blue-500/30">

            {/* HERO SECTION */}
            {/* HERO SECTION */}
            <ProjectsHero />

            <div id="featured-projects"></div>

            {/* 2. FEATURED PROJECTS SHOWCASE */}
            <section id="featured-projects" className="py-16 sm:py-24 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-12 sm:mb-20">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Featured Masterpieces</h2>
                            <p className="text-gray-400 max-w-2xl text-sm sm:text-base">A selection of our most complex and successfully delivered projects.</p>
                        </div>
                    </RevealOnScroll>

                    <div className="space-y-16 sm:space-y-32">
                        {featuredProjects.map((project, index) => (
                            <RevealOnScroll key={index}>
                                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-16 items-center`}>
                                    <div className="w-full lg:w-1/2 group">
                                        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animated-white-border">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                                        <div className="inline-flex px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                                            {project.location}
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{project.title}</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Layout size={20} /></div>
                                                <div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Scope of Work</div>
                                                    <div className="text-gray-300 font-medium text-sm sm:text-base">{Array.isArray(project.scope) ? project.scope.join(", ") : project.scope}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Award size={20} /></div>
                                                <div>
                                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Impact</div>
                                                    <div className="text-gray-300 font-medium text-sm sm:text-base">{project.highlight}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CATEGORIZED PROJECT GRID */}
            <section className="py-16 sm:py-24 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Our Diverse Portfolio</h2>
                            <p className="text-gray-400 text-sm sm:text-base">Explore our work across different sectors.</p>
                        </div>
                    </RevealOnScroll>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 sm:mb-16 overflow-x-auto pb-4 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${activeCategory === cat
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {categoryProjects
                            .filter(p => activeCategory === "All" || p.category === activeCategory)
                            .map((project, index) => (
                                <div key={index} className="group p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 animated-white-border">
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
            </section>

            {/* 4. PROJECTS SUMMARY STRIP */}


            {/* 5. CTA SECTION */}
            <section className="py-20 sm:py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(20,20,50,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-10 leading-tight">
                        Build Your Project With a <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Trusted Partner.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <div onClick={() => setIsContactOpen(true)}>
                            <RainbowButton>
                                <span className="flex items-center text-lg font-semibold px-6">
                                    Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                                </span>
                            </RainbowButton>
                        </div>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center backdrop-blur-sm">
                            View More Services <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div >
    );
};

export default Projects;
