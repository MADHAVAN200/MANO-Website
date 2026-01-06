import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, FileText, Gavel, ShieldCheck, AlertTriangle, Scale,
    Briefcase, GitPullRequest, Search, CheckCircle, TrendingUp,
    FileSignature, ClipboardCheck, ScrollText, BadgeCheck, Users
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

const AnimatedBar = ({ width, color = "bg-blue-500", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setIsVisible(true), delay);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`} style={{ width: isVisible ? `${width}%` : '0%' }} />
    );
};

const ContractManagement = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Contract Strategy & Structuring",
            desc: "Developing robust contract structures that balance risk, responsibility, and commercial objectives.",
            items: [
                { text: "Contract type selection", icon: FileSignature },
                { text: "Risk allocation strategy", icon: ShieldCheck },
                { text: "Scope and responsibility definition", icon: FileText },
                { text: "Commercial terms formulation", icon: Scale }
            ],
            icon: FileText
        },
        {
            title: "Tendering & Bid Evaluation",
            desc: "Ensuring objective, transparent, and technically sound tender evaluation processes.",
            items: [
                { text: "Technical bid evaluation", icon: Search },
                { text: "Commercial bid analysis", icon: TrendingUp },
                { text: "Vendor comparison and benchmarking", icon: Users },
                { text: "Recommendation and award support", icon: CheckCircle }
            ],
            icon: Scale
        },
        {
            title: "Contract Administration",
            desc: "Active administration to ensure contractual obligations are met during execution.",
            items: [
                { text: "Contract compliance monitoring", icon: ClipboardCheck },
                { text: "Progress certification", icon: BadgeCheck },
                { text: "Payment administration", icon: FileText },
                { text: "Contract correspondence management", icon: ScrollText }
            ],
            icon: ClipboardCheck
        },
        {
            title: "Variation & Change Control",
            desc: "Managing scope changes systematically to avoid cost escalation and disputes.",
            items: [
                { text: "Variation identification and assessment", icon: Search },
                { text: "Cost and time impact analysis", icon: TrendingUp },
                { text: "Change approval coordination", icon: CheckCircle },
                { text: "Contract amendment documentation", icon: FileSignature }
            ],
            icon: GitPullRequest
        }
    ];

    const specializedServices = [
        {
            title: "Claims Management",
            desc: "Professional handling of claims to protect client interests and ensure fair outcomes.",
            items: [
                { text: "Claim identification and documentation", icon: Search },
                { text: "Delay and disruption analysis", icon: AlertTriangle },
                { text: "Claim negotiation support", icon: Users },
                { text: "Settlement assistance", icon: CheckCircle }
            ],
            icon: AlertTriangle
        },
        {
            title: "Dispute Avoidance & Resolution Support",
            desc: "Reducing disputes through proactive documentation and structured resolution methods.",
            items: [
                { text: "Dispute prevention strategies", icon: ShieldCheck },
                { text: "Contractual interpretation", icon: FileText },
                { text: "Mediation and arbitration support", icon: Gavel },
                { text: "Expert advisory services", icon: Briefcase }
            ],
            icon: Gavel
        },
        {
            title: "Compliance & Documentation Control",
            desc: "Maintaining accurate, audit-ready contractual documentation.",
            items: [
                { text: "Contract document control", icon: FileText },
                { text: "Regulatory and statutory compliance", icon: Scale },
                { text: "Audit preparation and support", icon: ClipboardCheck },
                { text: "Record management systems", icon: ScrollText }
            ],
            icon: ShieldCheck
        }
    ];

    const processFlow = [
        { title: "Contract Review & Strategy Development", icon: Search },
        { title: "Tendering & Award Support", icon: Scale },
        { title: "Contract Administration & Monitoring", icon: ClipboardCheck },
        { title: "Variation & Claims Management", icon: GitPullRequest },
        { title: "Dispute Resolution Support", icon: Gavel },
        { title: "Contract Closure & Final Settlement", icon: CheckCircle }
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
                            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-4 leading-tight">
                                Contract Management
                            </h1>
                        </div>
                        <h2 className="text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-normal">
                            Ensuring clarity, compliance, and control across every contractual stage of your project.
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            At Mano Project Consultants Pvt. Ltd., our Contract Management services are designed to safeguard project interests by establishing clear contractual frameworks, managing risks, and ensuring transparent compliance throughout the project lifecycle. We help clients minimize disputes, control variations, and maintain strong commercial discipline from contract award to closure.
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
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Years of Contract Expertise</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={500} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Contracts Reviewed & Administered</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={100} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Projects Commercially Managed</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={95} />%</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Dispute Avoidance Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE SERVICES */}
            <section className="py-24 px-12">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Core Contract Management Services</h2>
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
                                        <p className="text-gray-400 mb-8 leading-relaxed h-14">{service.desc}</p>

                                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors">
                                            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Includes:</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {service.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center text-sm text-gray-400">
                                                        <item.icon className="w-4 h-4 mr-2 text-blue-500" />
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
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-12 mb-8 border-b border-white/10">Specialized Contract Management Services</h2>

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
                                                        <item.icon className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
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

            {/* 5. WHY MANO */}
            <section className="py-24 px-12">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8">
                                Why Mano for <span className="text-blue-500 block">Contract Management?</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Risk-Focused Commercial Control", text: "Early identification and mitigation of contractual and commercial risks.", icon: ShieldCheck },
                                    { title: "Transparent Cost & Scope Management", text: "Clear visibility into costs, variations, and contractual obligations.", icon: Search },
                                    { title: "Strong Documentation Discipline", text: "Structured records that strengthen contractual positions and reduce disputes.", icon: FileText },
                                    { title: "Integrated Project Expertise", text: "Contract management aligned with planning, cost, quality, and execution services.", icon: Briefcase },
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-4 group rounded-xl p-4 transition-all hover:bg-white/5 border border-transparent hover:border-white/10">
                                        <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-400">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="space-y-4 mt-8">
                                    <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                        <span className="text-4xl font-bold text-white mb-2">95%</span>
                                        <span className="text-sm text-gray-400">Dispute Avoidance</span>
                                    </div>
                                    <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                        <span className="text-white text-lg font-bold">Clear<br />Contracts</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                        <Scale className="w-10 h-10 text-blue-500 mb-4" />
                                        <span className="text-gray-300 font-medium">Compliance</span>
                                    </div>
                                    <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                        <span className="text-4xl font-bold text-white mb-2">100%</span>
                                        <span className="text-sm text-gray-400">Protection</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* COMPARISON SECTION */}
            <section className="py-24 px-12 bg-white/5 backdrop-blur-sm border-y border-white/5">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 leading-tight">Impact of Professional Management</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {/* WITHOUT MANO */}
                            <div className="space-y-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-red-400 mb-2">Without Professional Management</h3>
                                    <p className="text-gray-400 text-sm">Increased Risk & Financial Exposure</p>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { label: "Risk of Disputes", percentage: 85, color: "bg-red-500" },
                                        { label: "Uncontrolled Variations", percentage: 70, color: "bg-red-500" },
                                        { label: "Compliance Gaps", percentage: 60, color: "bg-red-500" },
                                        { label: "Delayed Payments", percentage: 75, color: "bg-red-500" }
                                    ].map((item, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                                                <span>{item.label}</span>
                                                <span className="text-red-400">High Risk</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <AnimatedBar width={item.percentage} color={item.color} delay={index * 200} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mt-8">
                                    <p className="text-red-200 text-center font-medium whitespace-nowrap text-xs md:text-sm">
                                        "Result: High possibility of financial loss, delays, and legal complications."
                                    </p>
                                </div>
                            </div>

                            {/* WITH MANO */}
                            <div className="space-y-8 relative">
                                <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-blue-400 mb-2">With Mano Services</h3>
                                    <p className="text-gray-400 text-sm">Secure, Compliant & Controlled</p>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { label: "Clear, Enforceable Contracts", percentage: 100, color: "bg-blue-500" },
                                        { label: "Controlled Variations", percentage: 95, color: "bg-blue-500" },
                                        { label: "Document Discipline", percentage: 100, color: "bg-blue-500" },
                                        { label: "Proactive Dispute Avoidance", percentage: 90, color: "bg-blue-500" }
                                    ].map((item, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                                                <span>{item.label}</span>
                                                <span className="text-blue-400">Optimized</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <AnimatedBar width={item.percentage} color={item.color} delay={index * 200} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 mt-8">
                                    <p className="text-blue-200 text-center font-medium whitespace-nowrap text-xs md:text-sm">
                                        "Result: Legally secure, financially protected, and smoothly managed projects."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 6. PROJECT TYPES */}
            <section className="py-24 px-12 border-y border-white/5 bg-black/50">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-16">Project Types We Support</h2>

                        <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] md:h-[400px] w-full max-w-7xl mx-auto group/accordion">
                            {[
                                {
                                    name: "Residential & Mixed-Use",
                                    desc: "High-rise apartments, townships, and integrated developments.",
                                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
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
                                    desc: "Hotels, resorts, and leisure destinations.",
                                    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Infrastructure & Institutional",
                                    desc: "Roads, bridges, public infrastructure, and institutions.",
                                    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                            ].map((ind, index) => (
                                <div key={index} className="relative group flex-grow transition-all duration-500 w-full md:w-28 hover:w-full md:hover:w-[300%] h-[140px] md:h-[400px] overflow-hidden rounded-lg border border-white/10">
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

            {/* 7. PROCESS FLOW */}
            <section className="py-24 px-12">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 leading-normal">Contract Management Process Flow</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {processFlow.map((step, index) => (
                                <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
                                    <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all">
                                        <step.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{step.title}</h3>
                                    <div className="h-1 w-12 bg-gray-800 rounded group-hover:w-full group-hover:bg-blue-500 transition-all duration-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 8. TRUST STATEMENT */}
            <section className="py-24 px-12 text-center">
                <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                    <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                        "Mano Project Consultants is trusted by developers, contractors, and institutions for delivering disciplined, transparent, and enforceable contract management solutions that safeguard project success."
                    </p>
                </div>
            </section>

            {/* 9. CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="max-w-4xl mx-auto px-12 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Protect Your Contracts. <br /> Protect Your Projects.</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with Mano Project Consultants for structured, transparent, and risk-controlled contract management.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-4">
                                Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center">
                            Consult Our Contract Experts <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContractManagement;
