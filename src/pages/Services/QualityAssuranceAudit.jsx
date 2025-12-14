import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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

const QualityAssuranceAudit = () => {
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

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="absolute top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
                <div
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-8 py-3 flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto"
                    style={{ width: '86%', maxWidth: '780px' }}
                >
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Home</Link>
                    <Link to="/about-us" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">About Us</Link>
                    <Link to="/services/qa-audit" className="text-white font-bold flex-1 text-center drop-shadow-md">Services</Link>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Projects</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Careers</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden min-h-screen flex flex-col justify-center items-center">
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(180deg, rgba(10, 20, 100, 0.9) 0%, rgba(10, 20, 80, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
                    height: '100%',
                    width: '100%'
                }}></div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-xl tracking-tight leading-tight">
                        Quality Assurance & Audit Services
                    </h1>
                    <p className="text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                        Ensuring excellence in every process through precision-driven quality assurance, compliance audits, and continuous process improvement.
                    </p>

                    <button className="group flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all text-white text-lg font-medium shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                        Get Started
                        <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-24 px-6 relative z-10">
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">
                            Our Core Services
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Service Card 1 */}
                            <div className="group relative p-10 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4 text-white">QA Plan Development</h3>
                                        <p className="text-gray-400 leading-relaxed mb-8">
                                            Tailored quality assurance plans crafted to your project needs, guiding every stage with precise documentation and defect analysis.
                                        </p>
                                    </div>
                                    <div className="flex items-center text-blue-500 group-hover:text-blue-400 transition-colors cursor-pointer font-medium">
                                        Explore More
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>

                            {/* Service Card 2 */}
                            <div className="group relative p-10 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4 text-white">Inspection & Compliance</h3>
                                        <p className="text-gray-400 leading-relaxed mb-8">
                                            Comprehensive inspections, compliance evaluations, and regulatory audits to ensure operational excellence and eliminate costly deviations.
                                        </p>
                                    </div>
                                    <div className="flex items-center text-blue-500 group-hover:text-blue-400 transition-colors cursor-pointer font-medium">
                                        Explore More
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Specialized Expertise Section */}
            <section className="py-24 px-6 relative z-10 bg-black/20">
                <RevealOnScroll>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">
                            Specialized Expertise
                        </h2>

                        <div className="space-y-6">
                            {[
                                {
                                    title: 'QA/QC Matrices',
                                    text: 'Advanced matrices for monitoring quality throughout project workflows.'
                                },
                                {
                                    title: 'Client Support',
                                    text: 'Complete guidance for audits, compliance, and corrective action plans.'
                                },
                                {
                                    title: 'Process Optimization',
                                    text: 'Streamlined workflows to enhance performance and reduce operational risks.'
                                },
                                {
                                    title: 'Risk Management',
                                    text: 'Proactive identification, analysis, and mitigation of quality-related risks.'
                                }
                            ].map((item, index) => (
                                <div key={index} className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors pointer-events-none"></div>
                                    <div className="relative z-10 flex items-start gap-6">
                                        <div className="flex flex-col items-center mt-1">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                                <div className="animate-pulse">
                                                    <ChevronRight className="w-5 h-5 text-blue-400 rotate-90" />
                                                </div>
                                            </div>
                                            {/* Vertical glow line effect */}
                                            <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded-full"></div>
                                        </div>

                                        <div className="flex-1 pt-1">
                                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed font-light">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Why Quality Audits Matter Section */}
            <section className="py-24 px-6 relative z-10">
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto relative">
                        {/* Blue Circular Gradient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                        <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">
                            Why Quality Audits Matter
                        </h2>

                        <div className="group relative p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl overflow-hidden">
                            <div className="absolute inset-0 bg-blue-900/5 transition-colors pointer-events-none"></div>

                            <h3 className="text-3xl md:text-4xl font-bold mb-10 pb-2 relative z-10 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-gray-100">Project Efficiency Comparison</h3>

                            <div ref={chartRef} className="space-y-4 relative z-10">
                                {/* Negative Row */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <AnimatedBar
                                        isVisible={chartVisible}
                                        widthClass="w-full md:w-[55%]"
                                        className="p-4 rounded-xl bg-gradient-to-r from-red-500/30 to-red-900/10 border border-red-500/20 text-center md:text-left shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-md flex items-center overflow-hidden"
                                    >
                                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-red-500 to-red-200 whitespace-nowrap truncate">
                                            High error rate, rework, delays
                                        </span>
                                    </AnimatedBar>
                                    <div className="font-bold whitespace-nowrap text-2xl bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-gray-200">
                                        Without Quality Control
                                    </div>
                                </div>

                                {/* Positive Row */}
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <AnimatedBar
                                        isVisible={chartVisible}
                                        widthClass="w-full"
                                        className="p-4 rounded-xl bg-gradient-to-r from-blue-500/30 to-blue-900/10 border border-blue-500/30 text-center md:text-left shadow-[0_0_15px_rgba(37,99,235,0.2)] backdrop-blur-md flex items-center overflow-hidden"
                                    >
                                        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-200 to-white whitespace-nowrap truncate">
                                            Compliance, precision, zero defects
                                        </span>
                                    </AnimatedBar>
                                    <div className="font-bold whitespace-nowrap text-2xl bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-white">
                                        With Mano Consultants
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Contact Form */}
            <section className="px-12 py-16 relative z-10">
                <RevealOnScroll>
                    <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Ready to Start Your Project?</h2>
                    <div className="max-w-2xl mx-auto space-y-6">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                        />
                        <textarea
                            placeholder="Description"
                            rows={6}
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                        />
                        <button className="w-full py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 hover:to-white/10 transition-all font-medium">
                            Submit
                        </button>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
};

export default QualityAssuranceAudit;
