import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Microscope, ClipboardCheck, FileText,
    AlertCircle, PackageCheck, Flag, Shield, Activity, AlertTriangle,
    Layers, CheckCircle, Zap, ClipboardList, Beaker, Hammer,
    ListChecks, FileCog, ShieldCheck, CheckCircle2, AlertOctagon,
    BookOpen, LayoutGrid, FileBarChart, RotateCcw, ListX, SearchX,
    Target, Stamp, Factory, FileCheck, Package, ListTodo, Wrench,
    Award, TrendingUp, BarChart2
} from 'lucide-react';
import RainbowButton from '../../components/RainbowButton';
import ContactForm from '../../components/ContactForm';

const RevealOnScroll = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                let startTime = null;
                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const easeOut = 1 - Math.pow(2, -10 * progress);
                    setCount(Math.floor(easeOut * end));

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(end);
                    }
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.5 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}</span>;
};

const RadarChart = () => {
    const metrics = ["Compliance", "Defect-Free", "Speed", "Cost Efficiency", "Safety"];
    const radius = 120;
    const center = 150;

    // Helper to calculate points
    const getPoint = (value, index, total) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        const x = center + (radius * (value / 100)) * Math.cos(angle);
        const y = center + (radius * (value / 100)) * Math.sin(angle);
        return `${x},${y}`;
    };

    // Data Points
    const badData = [40, 30, 50, 20, 40]; // Without Planning
    const goodData = [100, 100, 95, 100, 100]; // With Mano

    const badPoints = badData.map((val, i) => getPoint(val, i, 5)).join(" ");
    const goodPoints = goodData.map((val, i) => getPoint(val, i, 5)).join(" ");

    // Grid Levels
    const levels = [25, 50, 75, 100];

    return (
        <div className="relative w-full max-w-md mx-auto aspect-square text-xs md:text-sm">
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl overflow-visible">
                {/* Grid Background */}
                {levels.map((level, i) => (
                    <polygon
                        key={i}
                        points={Array(5).fill(0).map((_, idx) => getPoint(level, idx, 5)).join(" ")}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                        className="transition-all duration-500"
                    />
                ))}

                {/* Axes */}
                {Array(5).fill(0).map((_, i) => {
                    const pt = getPoint(100, i, 5);
                    return <line key={i} x1={center} y1={center} x2={pt.split(',')[0]} y2={pt.split(',')[1]} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                })}

                {/* Bad Data (Red) */}
                <polygon points={badPoints} fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" />

                {/* Good Data (Blue) */}
                <polygon points={goodPoints} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                {/* Labels */}
                {metrics.map((metric, i) => {
                    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                    // Slightly offset label radius
                    const labelRadius = radius + 30;
                    const x = center + labelRadius * Math.cos(angle);
                    const y = center + labelRadius * Math.sin(angle);

                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            className="font-semibold tracking-wide text-[10px] md:text-xs uppercase fill-gray-400"
                        >
                            {metric}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

const QualityControl = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Inspection & Testing",
            desc: "Comprehensive inspections to verify workmanship, materials, and processes at every stage of execution.",
            icon: Microscope,
            items: [
                { text: "Site Check Lists", icon: ClipboardList },
                { text: "Material testing & verification", icon: Beaker },
                { text: "Workmanship evaluation", icon: Hammer },
                { text: "Stage-wise quality checks", icon: ListChecks }
            ]
        },
        {
            title: "Process Compliance Monitoring",
            desc: "Ensuring all construction activities adhere strictly to approved methods, standards, and specifications.",
            icon: Activity,
            items: [
                { text: "Methodology Control", icon: FileCog },
                { text: "Compliance audits", icon: ShieldCheck },
                { text: "Work approval tracking", icon: CheckCircle2 },
                { text: "Deviation identification", icon: AlertOctagon }
            ]
        },
        {
            title: "Quality Documentation",
            desc: "Structured documentation to support audits, certifications, and dispute prevention.",
            icon: FileText,
            items: [
                { text: "QA QC Assurance Plan", icon: BookOpen },
                { text: "QA QC Matrix", icon: LayoutGrid },
                { text: "Inspection reports", icon: FileBarChart },
                { text: "Corrective action tracking", icon: RotateCcw }
            ]
        },
        {
            title: "Defect & Snagging Management",
            desc: "Early detection and resolution of quality issues to prevent rework and cost escalation.",
            icon: AlertCircle,
            items: [
                { text: "Check List and Snagging", icon: ListX },
                { text: "Defect analysis", icon: SearchX },
                { text: "Root cause identification", icon: Target },
                { text: "Closure certification", icon: Stamp }
            ]
        }
    ];

    const specializedServices = [
        {
            title: "Material Quality Assurance",
            desc: "Ensuring only approved materials are used, meeting technical and regulatory standards.",
            items: [
                { text: "Material approvals", icon: Stamp },
                { text: "Vendor quality checks", icon: Factory },
                { text: "Test certificate verification", icon: FileCheck },
                { text: "Storage & handling audits", icon: Package }
            ],
            icon: PackageCheck
        },
        {
            title: "Final Inspection & Handover",
            desc: "Guaranteeing quality compliance prior to project completion and handover.",
            items: [
                { text: "Final quality audits", icon: ClipboardCheck },
                { text: "Punch list preparation", icon: ListTodo },
                { text: "Snag resolution tracking", icon: Wrench },
                { text: "Completion certification", icon: Award }
            ],
            icon: Flag
        },
        {
            title: "Quality Risk Management",
            desc: "Identifying and mitigating quality-related risks before they impact project performance.",
            items: [
                { text: "Risk identification", icon: AlertTriangle },
                { text: "Preventive measures", icon: ShieldCheck },
                { text: "Continuous improvement plans", icon: TrendingUp },
                { text: "Performance benchmarking", icon: BarChart2 }
            ],
            icon: Shield
        }
    ];

    const deliveryModel = [
        { step: "01", title: "Quality Planning", icon: Layers },
        { step: "02", title: "Methodology Control", icon: Activity },
        { step: "03", title: "Inspection & Checks", icon: Microscope },
        { step: "04", title: "Snagging & Rectification", icon: AlertCircle },
        { step: "05", title: "Documentation", icon: FileText },
        { step: "06", title: "Final Certification", icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-24 px-12 text-center overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(180deg, rgba(10, 20, 100, 0.9) 0%, rgba(10, 20, 80, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
                    height: '100%',
                    width: '100%'
                }}></div>

                <RevealOnScroll>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-xl tracking-tight leading-tight">
                                Quality Control
                            </h1>
                        </div>
                        <h2 className="text-2xl md:text-3xl text-blue-200 font-light max-w-4xl mx-auto leading-relaxed">
                            Ensuring uncompromised quality through structured inspections, compliance checks, and performance-driven systems.
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                            At Mano Project Consultants Pvt. Ltd., our Quality Control services ensure that every phase of your project meets defined standards, specifications, and regulatory requirements. Through systematic inspections, Check Lists, and continuous monitoring, we help deliver projects that are reliable, compliant, and built to last.
                        </p>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 2. STATS STRIP */}
            <section className="py-24 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={12} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Years Excellence</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={500} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Quality Audits</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={100} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Projects Certified</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={98} />%</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Compliance Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE SERVICES */}
            <section className="py-24 px-12">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-2 block">Our Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Core Quality Control Services</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {coreServices.map((service, index) => (
                                <div key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                                    {/* Large Background Icon */}
                                    <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                        <service.icon size={180} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                            <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed h-20">{service.desc}</p>

                                        <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/5 group-hover:border-white/10 transition-colors">
                                            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Includes:</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {service.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-400">
                                                        <item.icon className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 4. SPECIALIZED SERVICES */}
            <section className="py-24 px-12 bg-white/[0.02]">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-12 mb-8 border-b border-white/10">Specialized Quality Services</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {specializedServices.map((service, index) => (
                                <div key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
                                    <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                        <service.icon size={180} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                            <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed h-14">{service.desc}</p>

                                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Key Focus Areas:</h4>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {service.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-400">
                                                        <item.icon className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
                                                        {item.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 5. COMPARISON SECTION - RADAR CHART */}
            <section className="py-24 px-12 bg-white/5 backdrop-blur-sm border-y border-white/5">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">The Quality Advantage</h2>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">

                            {/* CHART */}
                            <div className="w-full lg:w-1/2 flex justify-center py-8">
                                <RadarChart />
                            </div>

                            {/* LEGEND & CONTEXT */}
                            <div className="w-full lg:w-1/2 space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-red-950/20 border border-red-500/20">
                                        <div className="w-4 h-4 rounded-full bg-red-500 mt-1 shadow-[0_0_10px_rgba(239,68,68,0.5)] shrink-0"></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-red-400 mb-2">Without Quality Control</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Inconsistent results, frequent defects, and high non-compliance risks leads to increased costs and dangerous safety hazards. The project suffers from "shrinkage" in value and performance.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-950/20 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                                        <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 shadow-[0_0_10px_rgba(59,130,246,0.5)] shrink-0"></div>
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-400 mb-2">With Mano Quality Control</h3>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                Optimized performance across all dimensions. We ensure <span className="text-white font-semibold">100% compliance</span>, zero defects, maximum cost efficiency, and total safety. The project achieves its full potential area.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 5. WHY CHOOSE MANO */}
            {/* 5. WHY CHOOSE MANO */}
            <section className="py-24 px-12 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-16">
                            <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Our Advantage</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Why Mano For <span className="text-blue-500">Quality Control?</span>
                            </h2>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Standard-Driven Approach", text: "Strict adherence to national and international quality standards.", icon: BookOpen },
                            { title: "Proactive Issue Detection", text: "Quality risks identified early through rigorous checks to avoid rework.", icon: AlertTriangle },
                            { title: "Transparent Reporting", text: "Clear, audit-ready documentation and traceable quality records.", icon: FileCheck },
                            { title: "Cross-Disciplinary Expertise", text: "Quality control integrated with cost, contract, and schedule management.", icon: Layers },
                        ].map((item, index) => (
                            <RevealOnScroll key={index}>
                                <div className="p-8 h-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-start gap-6 group">
                                    <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                        <item.icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. INDUSTRIES SERVED */}
            <section className="py-24 px-12 border-y border-white/5 bg-black/50">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-16">Project Types We Support</h2>

                        <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] md:h-[400px] w-full max-w-7xl mx-auto group/accordion">
                            {[
                                {
                                    name: "Residential Developments",
                                    desc: "High-rise apartments, townships, and luxury villas.",
                                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Commercial & Corporate",
                                    desc: "Office parks, IT campuses, and retail complexes.",
                                    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Industrial Facilities",
                                    desc: "Factories, warehouses, and logistic hubs.",
                                    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Hospitality Projects",
                                    desc: "Hotels, resorts, and integrated developments.",
                                    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Infrastructure",
                                    desc: "Roads, bridges, and public infrastructure.",
                                    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                            ].map((ind, index) => (
                                <div key={index} className="relative group flex-grow transition-all duration-500 w-full md:w-28 hover:w-full md:hover:w-[300%] h-[140px] md:h-[400px] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 backdrop-blur-md">
                                    <img
                                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                                        src={ind.image}
                                        alt={ind.name}
                                    />
                                    <div className="absolute inset-0 flex flex-col justify-end items-center text-center group-hover:items-start group-hover:text-left p-6 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 opacity-100 group-hover/accordion:opacity-0 group-hover:!opacity-100">
                                        <h3 className="text-xl md:text-2xl font-bold leading-tight">{ind.name}</h3>
                                        <p className="text-xs md:text-sm text-gray-200 mt-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 line-clamp-2 overflow-hidden">{ind.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 7. QUALITY CONTROL PROCESS FLOW - Horizontal Glowing Timeline */}
            <section className="py-24 px-12 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-24">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Quality Control Process Flow</h2>
                        </div>
                    </RevealOnScroll>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30"></div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
                            {deliveryModel.map((step, i) => (
                                <RevealOnScroll key={i}>
                                    <div className="flex flex-col items-center text-center group">
                                        {/* Number Node */}
                                        <div className="w-20 h-20 rounded-full bg-black border-2 border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-500 mb-8 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 relative z-10 box-content">
                                            {i + 1}
                                            <div className="absolute inset-2 rounded-full border border-white/10"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 w-full backdrop-blur-md group-hover:to-blue-600/10 group-hover:border-blue-500/30 transition-all duration-300 min-h-[140px] flex items-center justify-center">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white/10"></div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">{step.title}</h3>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. TRUST STATEMENT */}
            <section className="py-24 px-12 text-center">
                <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                    <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                        "Mano Project Consultants is trusted for delivering structured, transparent, and results-oriented quality control systems that ensure long-term project performance and client confidence."
                    </p>
                </div>
            </section>

            {/* 9. CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="max-w-4xl mx-auto px-12 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Build with Confidence. <br /> Deliver with Quality.</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Let Mano Project Consultants safeguard your project quality through expert control and compliance.
                    </p>
                    <div className="flex justify-center flex-wrap gap-4">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-4">
                                Request a Quality Audit <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all text-white font-semibold flex items-center">
                            Consult Our Experts <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QualityControl;
