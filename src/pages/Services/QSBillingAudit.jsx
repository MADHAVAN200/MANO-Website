
import React, { useState, useEffect, useRef } from 'react';
import {
    Calculator, FileCheck, CreditCard, TrendingUp,
    CheckCircle, AlertTriangle, FileText, Layers, ShieldCheck, Users,
    ClipboardCheck, BadgeCheck, Scale, Briefcase, Building, Factory, Landmark, ScanLine, Target,
    ArrowRight, ChevronRight
} from 'lucide-react';
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

const QSBillingAudit = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coreServices = [
        {
            title: "Quantity Take-Off & Verification",
            description: "Accurate measurement and verification of executed quantities based on drawings, specifications, and site progress.",
            icon: Calculator,
            details: ["Quantity extraction from drawings", "Cross-site verification", "Variation quantity checks", "Joint measurement records"]
        },
        {
            title: "Billing Audit & Verification",
            description: "Ensuring contractor bills are accurate, justified, and aligned with actual work done.",
            icon: FileCheck,
            details: ["RA bill verification", "Final bill certification", "Material reconciliation", "Rate compliance checks"]
        },
        {
            title: "BOQ Review & Cost Cross-Checks",
            description: "Ensuring contractual BOQs are complete, accurate, and aligned with market & project requirements.",
            icon: ClipboardCheck,
            details: ["BOQ audit", "Item validation", "Rate analysis", "Value engineering review"]
        },
        {
            title: "Financial Compliance & Documentation",
            description: "Maintaining audit-ready billing and cost records.",
            icon: FileText,
            details: ["Billing documentation", "Audit report preparation", "Compliance mapping", "Payment recommendations"]
        }
    ];

    const specializedServices = [
        {
            title: "Variation & Change Order Validation",
            description: "Independent verification of cost and quantity impact for variations to prevent scope creep.",
            keyFocus: [
                { text: "VO quantity checks", icon: Calculator },
                { text: "Cost impact evaluations", icon: TrendingUp },
                { text: "Change approval documentation", icon: FileText },
                { text: "Commercial justification reports", icon: FileCheck }
            ],
            icon: Target
        },
        {
            title: "Cost Reconciliation & Financial Closure",
            description: "Ensuring financial alignment between contractors, consultants, and clients at project closeout.",
            keyFocus: [
                { text: "Material reconciliation", icon: Layers },
                { text: "Debit-credit note verification", icon: CreditCard },
                { text: "Final cost summary", icon: TrendingUp },
                { text: "Closeout compliance", icon: CheckCircle }
            ],
            icon: Scale
        },
        {
            title: "Contract & Billing Compliance Support",
            description: "Ensuring bills follow all contractual, technical, and statutory conditions.",
            keyFocus: [
                { text: "Specification compliance", icon: FileCheck },
                { text: "Rate appropriateness", icon: Calculator },
                { text: "Tax & statutory compliance", icon: Landmark },
                { text: "Payment certification alignment", icon: BadgeCheck }
            ],
            icon: ShieldCheck
        }
    ];

    const timelineSteps = [
        "Drawing & Document Review",
        "Site Measurement & Verification",
        "Billing Audit",
        "Variation & Rate Validation",
        "Compliance & Reconciliation Reports",
        "Final Certification & Financial Closure"
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden min-h-[85vh] flex flex-col justify-center items-center">

                {/* Abstract Background - Enhanced Glass Feel */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(180deg, rgba(10, 20, 100, 0.9) 0%, rgba(10, 20, 80, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
                    height: '100%',
                    width: '100%'
                }}></div>

                <RevealOnScroll>
                    <div className="relative z-10 max-w-5xl mx-auto space-y-10">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500 pb-2 leading-tight tracking-tight">
                            Quantity Survey & <br /> Billing Audit Services
                        </h1>

                        <h2 className="text-2xl md:text-3xl text-blue-200 font-light max-w-4xl mx-auto leading-relaxed">
                            Ensuring accuracy, transparency, and financial accountability through expert quantity verification and billing audits.
                        </h2>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            At Mano Project Consultants Pvt. Ltd., our Quantity Survey & Billing Audit services safeguard your project’s financial integrity by verifying quantities, auditing contractor bills, and ensuring complete compliance with contractual, technical, and commercial requirements. We help clients prevent overpayment, eliminate discrepancies, and maintain full cost transparency.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 pt-8">
                            {/* CTA Buttons */}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 2. VALUE METRICS STRIP - Neon Horizontal Cards */}
            <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: 98, suffix: "%", label: "Billing Accuracy After Audit" },
                            { value: 70, suffix: "%", label: "Reduction in Overbilling & Discrepancies" },
                            { value: 400, suffix: "+", label: "Billing Audits Completed Successfully" },
                            { value: 95, suffix: "%", label: "Accuracy in Quantity Verification" },
                        ].map((stat, index) => (
                            <RevealOnScroll key={index}>
                                <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 text-center group h-full flex flex-col justify-center">
                                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                        <CountUp end={stat.value} suffix={stat.suffix} />
                                    </h3>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-200 transition-colors">{stat.label}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CORE SERVICES - 2x2 Grid */}
            <section className="py-24 px-6 relative">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Comprehensive Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">Core QS & Billing Services</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {coreServices.map((service, index) => (
                                <div key={index} className="group relative p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
                                    {/* Large Background Icon */}
                                    <div className="absolute -bottom-10 -right-10 text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 pointer-events-none transform rotate-12">
                                        <service.icon size={180} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl mb-8 bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                                            <service.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{service.title}</h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed text-lg">{service.description}</p>

                                        <div className="bg-black/30 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                                            <h4 className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wide">Includes:</h4>
                                            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                                {service.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-gray-300">
                                                        <CheckCircle className="w-4 h-4 mr-3 text-blue-500 shrink-0 mt-0.5" />
                                                        {detail}
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

            {/* 4. SPECIALIZED SERVICES - Grid Layout (QA Design) */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Specialized QS & Billing Audit Services</h2>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {specializedServices.map((service, index) => (
                            <div key={index} className="group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                                    <service.icon size={120} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                        <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>

                                    <div className="bg-black/20 rounded-xl p-6 border border-white/5 group-hover:border-white/10 transition-colors mt-auto">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">Focus Areas:</h4>
                                        <ul className="grid grid-cols-1 gap-3">
                                            {service.keyFocus.map((item, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-400">
                                                    <item.icon className="w-4 h-4 mr-3 text-blue-500 shrink-0" />
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
            </section>

            {/* 5. COMPARISON BAR - Mandatory Dual Bar Layout */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Why Quantity Survey & Billing Audits Are Essential</h2>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                        {/* LEFT: RED BAR (Without QS) */}
                        <RevealOnScroll>
                            <div className="h-full bg-gradient-to-b from-red-950/30 to-black p-10 rounded-[2.5rem] border border-red-500/20 text-center relative overflow-hidden group hover:border-red-500/50 transition-all duration-500 flex flex-col">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-8 p-4 bg-red-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-red-500/20">
                                        <AlertTriangle className="w-10 h-10 text-red-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-red-500 mb-8">Without Proper QS & Billing Audit</h3>

                                    <ul className="space-y-5 text-left w-full pl-4 grow">
                                        <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Overbilling & inflated quantities</li>
                                        <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Financial leakages & hidden costs</li>
                                        <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Incorrect measurement records</li>
                                        <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> Hidden discrepancies in bills</li>
                                        <li className="flex items-start text-gray-300 text-lg"><span className="text-red-500 mr-3 text-xl">✕</span> No commercial transparency</li>
                                    </ul>

                                    <div className="mt-8 pt-8 border-t border-red-500/20">
                                        <p className="text-red-400 font-bold text-xl uppercase tracking-wide">Result: Uncontrolled costs and inaccurate project financials.</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* RIGHT: BLUE BAR (With QS) */}
                        <RevealOnScroll>
                            <div className="h-full bg-gradient-to-b from-blue-950/30 to-black p-10 rounded-[2.5rem] border border-blue-500/30 text-center relative overflow-hidden group hover:border-blue-400 transition-all duration-500 flex flex-col shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-8 p-4 bg-blue-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                        <CheckCircle className="w-10 h-10 text-blue-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-blue-400 mb-8">With Mano QS & Billing Audit Services</h3>

                                    <ul className="space-y-5 text-left w-full pl-4 grow">
                                        <li className="flex items-start text-gray-100 text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Verified quantities</li>
                                        <li className="flex items-start text-gray-100 text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Transparent payments</li>
                                        <li className="flex items-start text-gray-100 text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Error-free documentation</li>
                                        <li className="flex items-start text-gray-100 text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Dispute prevention</li>
                                        <li className="flex items-start text-gray-100 text-lg"><BadgeCheck className="w-6 h-6 text-blue-400 mr-3 shrink-0" /> Total financial clarity</li>
                                    </ul>

                                    <div className="mt-8 pt-8 border-t border-blue-500/30 bg-blue-500/5 -mx-10 -mb-10 p-10">
                                        <p className="text-blue-300 font-bold text-xl uppercase tracking-wide">Result: Accurate, controlled, transparent project finances.</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* 6. WHY MANO - Glass Cards */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white">Why Mano for <span className="text-blue-500">QS & Billing Audit?</span></h2>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "High Accuracy Measurement Standards", icon: Target },
                            { title: "Strong Commercial Understanding", icon: TrendingUp },
                            { title: "Transparent Documentation", icon: FileText },
                            { title: "Integrated with Cost & Contract Teams", icon: Users },
                        ].map((item, index) => (
                            <RevealOnScroll key={index}>
                                <div className="p-8 h-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-md hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-start gap-6 group">
                                    <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                                        <item.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. INDUSTRIES SUPPORTED - Icon Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Industries We Serve</h2>
                        </div>
                    </RevealOnScroll>

                    <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] md:h-[400px] w-full max-w-7xl mx-auto group/accordion">
                        {[
                            {
                                name: "Residential",
                                desc: "High-end apartments & townships.",
                                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Commercial",
                                desc: "Offices, malls & business parks.",
                                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "IT Parks",
                                desc: "Tech campuses & data centers.",
                                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Industrial",
                                desc: "Factories & warehouses.",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Hospitality",
                                desc: "Hotels & resorts.",
                                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&h=600&auto=format&fit=crop"
                            },
                            {
                                name: "Infrastructure",
                                desc: "Roads & heavy infra.",
                                image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&h=600&auto=format&fit=crop"
                            }
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
            </section>

            {/* 8. PROCESS FLOW - Horizontal Glowing Timeline */}
            <section className="py-24 px-6 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-24">

                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">QS & Billing Audit Process Flow</h2>
                        </div>
                    </RevealOnScroll>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 opacity-30"></div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
                            {timelineSteps.map((step, i) => (
                                <RevealOnScroll key={i}>
                                    <div className="flex flex-col items-center text-center group">
                                        {/* Number Node */}
                                        <div className="w-20 h-20 rounded-full bg-black border-2 border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-500 mb-8 group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 relative z-10 box-content">
                                            {i + 1}
                                            <div className="absolute inset-2 rounded-full border border-white/10"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 group w-full min-h-[140px] flex items-center justify-center">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white/10"></div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">{step}</h3>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. TRUST STATEMENT */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:to-blue-600/10 hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md group">
                    <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed group-hover:text-blue-100 transition-colors">
                        "Top developers and contractors rely on Mano Project Consultants for precise, transparent, and dispute-free quantity and billing verification systems."
                    </p>
                </div>
            </section>

            {/* 10. CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500">Verify Quantities.</span> <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500">Validate Bills.</span> <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500">Protect Your Investment.</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with Mano Project Consultants for transparent, accurate, and reliable QS & Billing Audit services.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-4">
                                Request a Billing Audit <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center">
                            Talk to Our QS Experts <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default QSBillingAudit;
