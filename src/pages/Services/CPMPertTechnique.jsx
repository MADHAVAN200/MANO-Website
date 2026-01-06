import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, GitMerge, Activity, CalendarClock, TrendingUp,
    BarChart2, ShieldAlert, Users, Layers, Clock, AlertTriangle,
    CheckCircle, FileText, Target, Layout, Network, Timer,
    PieChart, LineChart, Briefcase, Building, Factory, Hotel
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

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
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

    return <span ref={ref}>{count}{suffix}</span>;
};

const AnimatedBar = ({ children, className, widthClass, isVisible }) => {
    return (
        <div
            className={`${className} transition-all duration-[3000ms] ease-out ${isVisible ? widthClass : 'w-[0px]'}`}
        >
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

const CPMPertTechnique = () => {
    const [chartVisible, setChartVisible] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setChartVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (chartRef.current) observer.observe(chartRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Critical Path Identification",
            desc: "Determining activities that directly influence project duration to ensure focused and efficient execution.",
            items: [
                { text: "Activity dependency mapping", icon: Network },
                { text: "Logic sequencing", icon: Layers },
                { text: "Critical vs. non-critical task analysis", icon: Activity },
                { text: "Float & slack calculations", icon: Timer }
            ],
            icon: GitMerge
        },
        {
            title: "PERT Time Estimation",
            desc: "Using probabilistic time models to forecast best-case, normal, and worst-case timelines.",
            items: [
                { text: "Optimistic–pessimistic–most likely analysis", icon: PieChart },
                { text: "Time variance calculations", icon: TrendingUp },
                { text: "Confidence-level forecasting", icon: Target },
                { text: "Scenario-based schedule modeling", icon: Layout }
            ],
            icon: CalendarClock
        },
        {
            title: "Schedule Optimization & Monitoring",
            desc: "Ensuring project timelines remain efficient, achievable, and aligned with execution capabilities.",
            items: [
                { text: "Compression techniques (fast-tracking, crashing)", icon: Clock },
                { text: "Shortest project timeline modeling", icon: LineChart },
                { text: "Schedule reliability checks", icon: CheckCircle },
                { text: "Continuous monitoring & revisions", icon: Activity }
            ],
            icon: BarChart2
        },
        {
            title: "Delay Impact & Recovery Planning",
            desc: "Assessing delays and restoring schedules without compromising quality or cost efficiency.",
            items: [
                { text: "Delay cause analysis", icon: AlertTriangle },
                { text: "Revised critical path planning", icon: GitMerge },
                { text: "Recovery schedule design", icon: Layers },
                { text: "Time-impact studies", icon: Clock }
            ],
            icon: ShieldAlert
        }
    ];

    const specializedSolutions = [
        {
            title: "Resource-Loaded CPM Scheduling",
            desc: "Integrating manpower, equipment, and materials into the CPM network.",
            items: [
                { text: "Resource leveling", icon: Users },
                { text: "Productivity-based scheduling", icon: Activity },
                { text: "Manpower histogram development", icon: BarChart2 },
                { text: "Resource vs. timeline correlation", icon: GitMerge }
            ],
            icon: Users
        },
        {
            title: "Contract-Linked Scheduling",
            desc: "Creating schedules that align project timelines with contractual obligations.",
            items: [
                { text: "Milestone-linked planning", icon: Target },
                { text: "Contractual deliverable mapping", icon: FileText },
                { text: "Extension of Time (EoT) modeling", icon: Clock },
                { text: "Compliance-ready schedules", icon: CheckCircle }
            ],
            icon: FileText
        },
        {
            title: "Dashboard & Reporting Integration",
            desc: "Visualizing CPM & PERT data for crystal-clear stakeholder understanding.",
            items: [
                { text: "Gantt charts", icon: Layout },
                { text: "Activity network diagrams", icon: Network },
                { text: "Progress dashboards", icon: PieChart },
                { text: "Forecasting reports", icon: TrendingUp }
            ],
            icon: BarChart2
        }
    ];

    const processFlow = [
        { title: "Define Activities & Dependencies", icon: Layers },
        { title: "Sequence Activities (Network Diagram)", icon: Network },
        { title: "Estimate Durations (PERT Analysis)", icon: Timer },
        { title: "Identify Critical Path (CPM)", icon: GitMerge },
        { title: "Develop Optimized Schedule", icon: CalendarClock },
        { title: "Monitor, Update & Forecast", icon: Activity }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(180deg, rgba(10, 20, 100, 0.9) 0%, rgba(10, 20, 80, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
                    height: '100%',
                    width: '100%'
                }}></div>

                <RevealOnScroll>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-4 leading-tight">
                            CPM & PERT Technique
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-normal">
                            Optimizing project timelines and performance using analytical planning and time-management methodologies.
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            At Mano Project Consultants Pvt. Ltd., we use CPM (Critical Path Method) and PERT (Program Evaluation & Review Technique) to deliver accurate, predictable planning outcomes. These advanced scheduling tools help us identify critical activities, eliminate delays, improve resource utilization, and create realistic time-based projections for complex projects.
                        </p>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 2. VALUE METRICS STRIP */}
            <section className="py-24 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={40} suffix="%" /></h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Improvement in Predictability</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={95} suffix="%" /></h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Accuracy in Sequencing</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={50} suffix="%" /></h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Faster Optimization</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2"><CountUp end={60} suffix="%" /></h3>
                            <p className="text-gray-400 text-sm uppercase tracking-wider">Reduced Delay Risk</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE SERVICES */}
            <section className="py-24 px-6">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Core CPM & PERT Services</h2>
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

            {/* 4. SPECIALIZED SOLUTIONS */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-12 mb-8 border-b border-white/10">Specialized CPM & PERT Solutions</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {specializedSolutions.map((service, index) => (
                                <div key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden h-full flex flex-col">
                                    <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                        <service.icon size={180} />
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                            <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed">{service.desc}</p>

                                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors mt-auto">
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

            {/* 5. COMPARISON SECTION (PRESERVED) */}
            <section className="py-16 px-6 relative z-10">
                <div className="max-w-5xl mx-auto relative">
                    {/* Blue Circular Gradient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                    <RevealOnScroll>
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">
                            Why CPM + PERT Improves Efficiency
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <div className="group relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl overflow-hidden hover:to-blue-600/10 transition-all duration-500">

                            <h3 className="text-3xl md:text-4xl font-bold mb-10 pb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white text-left">Project Efficiency Comparison</h3>

                            <div ref={chartRef} className="space-y-6 relative z-10">
                                {/* Red Bar */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <AnimatedBar
                                        isVisible={chartVisible}
                                        widthClass="w-[85%]"
                                        className="p-4 rounded-xl bg-gradient-to-r from-red-500/30 to-red-900/10 border border-red-500/20 text-center md:text-left shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-md flex items-center overflow-hidden h-16"
                                    >
                                        <span className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-red-500 to-red-200 whitespace-nowrap truncate px-2">
                                            Without Professional Management
                                        </span>
                                    </AnimatedBar>
                                    <div className="font-bold whitespace-nowrap text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-gray-200">
                                        60 days
                                    </div>
                                </div>

                                {/* Blue Bar */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <AnimatedBar
                                        isVisible={chartVisible}
                                        widthClass="w-[55%]"
                                        className="p-4 rounded-xl bg-gradient-to-r from-blue-500/30 to-blue-900/10 border border-blue-500/30 text-center md:text-left shadow-[0_0_15px_rgba(37,99,235,0.2)] backdrop-blur-md flex items-center overflow-hidden h-20"
                                    >
                                        <span className="text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-200 to-white whitespace-nowrap truncate px-2">
                                            With Mano Consultants
                                        </span>
                                    </AnimatedBar>
                                    <div className="font-bold whitespace-nowrap text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-white">
                                        40 days
                                    </div>
                                </div>

                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* 6. WHY MANO */}
            <section className="py-24 px-6">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 mb-8">
                                Why Mano for <span className="text-blue-500 block">CPM & PERT?</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Predictive Planning Accuracy", text: "Our methodologies minimize uncertainties and improve timeline confidence.", icon: Target },
                                    { title: "Deep Technical Expertise", text: "Planning and scheduling executed by trained CPM/PERT specialists.", icon: Users },
                                    { title: "Real-Time Adjustability", text: "Schedules evolve with project conditions, ensuring constant accuracy.", icon: Clock },
                                    { title: "Integrated Approach", text: "Scheduling aligns seamlessly with cost, design, contracts, and execution.", icon: GitMerge },
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
                                        <span className="text-sm text-gray-400">Planning Accuracy</span>
                                    </div>
                                    <div className="h-40 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col justify-center">
                                        <span className="text-white text-lg font-bold">Total<br />Control</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-40 rounded-2xl bg-[#111] border border-white/10 p-6 flex flex-col justify-center">
                                        <Activity className="w-10 h-10 text-blue-500 mb-4" />
                                        <span className="text-gray-300 font-medium">Critical Path</span>
                                    </div>
                                    <div className="h-64 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-end">
                                        <span className="text-4xl font-bold text-white mb-2">30%</span>
                                        <span className="text-sm text-gray-400">Faster Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 7. PROJECT TYPES */}
            <section className="py-24 px-6 border-y border-white/5 bg-black/50">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-16">Project Types Requiring CPM & PERT</h2>

                        <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] md:h-[400px] w-full max-w-7xl mx-auto group/accordion">
                            {[
                                {
                                    name: "High-Rise Developments",
                                    desc: "Complex vertical structures needing precise sequencing.",
                                    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Commercial & Corporate",
                                    desc: "Fast-tracked office and retail projects.",
                                    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Industrial & Factory Units",
                                    desc: "Large-scale plants with heavy machinery coordination.",
                                    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Hospitality & Mixed-Use",
                                    desc: "Multi-functional spaces with overlapping timelines.",
                                    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                                },
                                {
                                    name: "Infrastructure & Institutional",
                                    desc: "Public infrastructure and large campuses.",
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

            {/* 8. PROCESS FLOW */}
            <section className="py-24 px-6">
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4 leading-normal">CPM & PERT Process Flow</h2>
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

            {/* 9. TRUST STATEMENT */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                    <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                        "Top developers and organizations rely on Mano Project Consultants for accurate, scientific, and execution-ready scheduling using CPM and PERT methodologies."
                    </p>
                </div>
            </section>

            {/* 10. CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Plan Smarter. Predict Better.</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Harness the power of CPM & PERT to ensure your project stays on time — every time.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-4">
                                Get a CPM/PERT Analysis <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center">
                            Talk to a Scheduling Expert <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CPMPertTechnique;
