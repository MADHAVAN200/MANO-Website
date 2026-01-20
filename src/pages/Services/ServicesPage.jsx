import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronRight, Briefcase, Calculator, TrendingUp, ShieldCheck,
    FileText, Shield, Hammer, Map, Layout, Zap, Users, BarChart,
    CheckCircle, Truck, Factory, Building, HardHat, ClipboardCheck,
    Calendar, Activity, GitPullRequest, LineChart, CheckSquare, Layers, Clock, ClipboardList,
    Ruler, AlertTriangle, Package, Settings, Scale, ScrollText, Microscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '../../components/RainbowButton';

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
        }, { threshold: 0.5 }); // Higher threshold for stats to ensure visibility

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}</span>;
};

const ServicesPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Project Planning",
            desc: "Strategic planning services that establish a strong foundation for project success.",
            icon: Map,
            items: [
                { text: "Master project scheduling", icon: Calendar },
                { text: "Resource & manpower planning", icon: Users },
                { text: "Methodology planning", icon: FileText },
                { text: "Risk & feasibility analysis", icon: TrendingUp }
            ],
            link: "/services/project-planning"
        },
        {
            title: "Project Management",
            desc: "End-to-end project management ensuring alignment between design, cost, quality, and timelines.",
            icon: Briefcase,
            items: [
                { text: "Execution monitoring & control", icon: Activity },
                { text: "Coordination with stakeholders", icon: Users },
                { text: "Progress tracking & reporting", icon: BarChart },
                { text: "Change management", icon: GitPullRequest }
            ],
            link: "/services/project-management"
        },
        {
            title: "Cost Consultancy",
            desc: "Accurate cost planning and financial control to ensure projects remain within budget.",
            icon: Calculator,
            items: [
                { text: "Cost estimation & budgeting", icon: Calculator },
                { text: "BOQ preparation & verification", icon: ClipboardList },
                { text: "Cost monitoring & value engineering", icon: LineChart },
                { text: "Billing certification", icon: CheckSquare }
            ],
            link: "/services/cost-consultancy"
        },
        {
            title: "Project Execution",
            desc: "Structured execution strategies that translate plans into action with precision.",
            icon: Hammer,
            items: [
                { text: "Execution planning & coordination", icon: Layers },
                { text: "Schedule adherence monitoring", icon: Clock },
                { text: "Contractor coordination", icon: HardHat },
                { text: "Quality & timeline control", icon: ShieldCheck }
            ],
            link: "/services/project-execution"
        }
    ];

    const specializedServices = [
        {
            title: "Contract Management",
            desc: "Protecting project interests through structured contracts and risk mitigation.",
            items: [
                { text: "Contract strategy", icon: ScrollText },
                { text: "Tender evaluation", icon: Scale },
                { text: "Claims management", icon: AlertTriangle },
                { text: "Dispute avoidance", icon: ShieldCheck }
            ],
            icon: Scale,
            link: "/services/contract-management"
        },
        {
            title: "Quality Control",
            desc: "Ensuring uncompromised quality through structured inspections and matrix control.",
            items: [
                { text: "Inspection checklists", icon: Microscope },
                { text: "QA/QC Matrix", icon: Activity },
                { text: "Snagging lists", icon: ClipboardCheck },
                { text: "Methodology control", icon: Layers }
            ],
            icon: Microscope,
            link: "/services/quality-control"
        },
        {
            title: "Quantity Survey & Billing Service / Audit",
            desc: "Ensuring transparency, accuracy, and compliance in all financial aspects.",
            items: [
                { text: "Quantity verification", icon: Ruler },
                { text: "Billing audits", icon: FileText },
                { text: "Contractual compliance", icon: ShieldCheck },
                { text: "Cost reconciliation", icon: Calculator }
            ],
            icon: FileText,
            link: "/services/qs-billing-audit"
        },
        {
            title: "Planning with CPM & PERT Technique",
            desc: "Advanced scheduling methodologies for time-sensitive and complex projects.",
            items: [
                { text: "Critical path analysis", icon: TrendingUp },
                { text: "Delay impact analysis", icon: AlertTriangle },
                { text: "Schedule optimization", icon: Zap },
                { text: "Progress forecasting", icon: BarChart }
            ],
            icon: TrendingUp,
            link: "/services/cpm-pert"
        },
        {
            title: "Quality Assurance/Quality Control Service / Audit",
            desc: "Robust quality frameworks to maintain compliance and consistency.",
            items: [
                { text: "QA/QC audits", icon: ClipboardCheck },
                { text: "Process compliance checks", icon: CheckCircle },
                { text: "Quality documentation", icon: FileText },
                { text: "Risk mitigation", icon: Shield }
            ],
            icon: ShieldCheck,
            link: "/services/qa-audit"
        },
        {
            title: "EHS Service / Audit",
            desc: "Ensuring environmental, health, and safety compliance for secure environments.",
            items: [
                { text: "Safety audits & assessments", icon: HardHat },
                { text: "Regulatory compliance", icon: FileText },
                { text: "Risk assessment", icon: AlertTriangle },
                { text: "Safety management systems", icon: Shield }
            ],
            icon: Shield,
            link: "/services/ehs-audit"
        }
    ];

    const deliveryModel = [
        { step: "01", title: "Requirement Analysis", icon: Layout },
        { step: "02", title: "Planning & Strategy", icon: Map },
        { step: "03", title: "Execution & Monitoring", icon: Briefcase },
        { step: "04", title: "Quality & Audits", icon: ShieldCheck },
        { step: "05", title: "Reporting & Optimization", icon: BarChart },
        { step: "06", title: "Successful Closure", icon: CheckCircle }
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
                                Comprehensive Project <br /> Consulting Solutions
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                            At Mano Project Consultants Pvt. Ltd., we provide end-to-end project consulting services <br className="hidden md:block" /> that help organizations plan smarter, execute faster, control costs, and maintain uncompromising quality.
                        </p>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 2. STATS STRIP */}
            <section className="py-24 border-y border-white/5 bg-white/5 backdrop-blur-sm animate-in fade-in duration-1000">
                <div className="max-w-7xl mx-auto px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={12} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={500} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Clients Served</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={100} />+</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Projects Delivered</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={98} />%</h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Client Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {isLoaded && (
                <>
                    {/* 3. CORE SERVICES */}
                    <section className="py-24 px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-100">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-16">

                                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Our Core Services</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {coreServices.map((service, index) => (
                                        <Link to={service.link} key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden block">
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

                                                <div className="bg-black/20 rounded-xl p-6 mb-8 border border-white/5 group-hover:border-white/10 transition-colors">
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

                                                <div className="inline-flex items-center text-blue-400 hover:text-white font-medium transition-colors group/link">
                                                    Explore Solution
                                                    <ChevronRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 4. SPECIALIZED SERVICES */}
                    <section className="py-24 px-12 bg-white/[0.02] animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-200">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-12 mb-8 border-b border-white/10">Specialized Services</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {specializedServices.map((service, index) => (
                                        <Link to={service.link} key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden block">
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
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 5. WHY CHOOSE MANO */}
                    <section className="py-24 px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-300">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Service Philosophy</span>
                                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8">
                                        Why Choose <span className="text-blue-500 block">Mano Consultants?</span>
                                    </h2>
                                    <div className="space-y-8">
                                        {[
                                            { title: "End-to-End Expertise", text: "From concept to completion, our services cover every project phase under one roof." },
                                            { title: "Data-Driven Decisions", text: "We rely on analytics, structured methodologies, and proven frameworks to deliver predictable outcomes." },
                                            { title: "Transparency & Accountability", text: "Clear reporting, cost clarity, and measurable progress tracking at every stage." },
                                            { title: "Quality-Focused Delivery", text: "Strict quality controls and audits ensure excellence without compromise." },
                                        ].map((item, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400 font-bold">
                                                    {index + 1}
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
                                                <span className="text-4xl font-bold text-white mb-2">100%</span>
                                                <span className="text-sm text-gray-400">Process Adherence</span>
                                            </div>
                                            <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                                <span className="text-white text-lg font-bold">Industry<br />Leaders</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                                <ShieldCheck className="w-10 h-10 text-blue-500 mb-4" />
                                                <span className="text-gray-300 font-medium">ISO Certified Processes</span>
                                            </div>
                                            <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                                <span className="text-4xl font-bold text-white mb-2">24/7</span>
                                                <span className="text-sm text-gray-400">Project Monitoring</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </section>

                    {/* 6. INDUSTRIES SERVED */}
                    <section className="py-24 px-12 border-y border-white/5 bg-black/50 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-400">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto text-center">
                                <h2 className="text-3xl font-bold text-white mb-16">Industries We Serve</h2>

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
                                            name: "Industrial Projects",
                                            desc: "Factories, warehouses, and logistic hubs.",
                                            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                                        },
                                        {
                                            name: "Hospitality & Mixed-Use",
                                            desc: "Hotels, resorts, and integrated developments.",
                                            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                                        },
                                        {
                                            name: "Infrastructure",
                                            desc: "Roads, bridges, and public infrastructure.",
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

                    {/* 7. SERVICE DELIVERY MODEL */}
                    <section className="py-24 px-12 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-500">
                        <RevealOnScroll>
                            <div className="max-w-7xl mx-auto">
                                <div className="text-center mb-20">
                                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 leading-normal">Service Delivery Model</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {deliveryModel.map((step, index) => (
                                        <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
                                            <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                                                {step.step}
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
                    <section className="py-24 px-12 text-center animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-600">
                        <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                            <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                                "Trusted by developers, corporations, and institutions across India for delivering reliable, transparent, and results-driven consulting services."
                            </p>
                        </div>
                    </section>

                    {/* 9. CTA */}
                    <section className="py-24 relative overflow-hidden animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-700">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <div className="max-w-4xl mx-auto px-12 text-center relative z-10">
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Elevate Your Project?</h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Partner with Mano Project Consultants to plan smarter, execute better, and achieve guaranteed project success.
                            </p>
                            <div className="flex justify-center">
                                <RainbowButton>
                                    <span className="flex items-center text-lg font-semibold px-4">
                                        Start Your Project <ChevronRight className="ml-2 w-5 h-5" />
                                    </span>
                                </RainbowButton>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default ServicesPage;
