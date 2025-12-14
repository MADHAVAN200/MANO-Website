import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Clock, Users, Target, CheckCircle, ArrowRight, Leaf, Linkedin } from 'lucide-react';

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
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}</span>;
};

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

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-blue-500/30">

            {/* Navbar (Duplicated for consistency, ideally should be a reuseable component) */}
            <nav className="absolute top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
                <div
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-8 py-3 flex items-center shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto"
                    style={{ width: '86%', maxWidth: '780px' }}
                >
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Home</Link>
                    <Link to="/about-us" className="text-white font-bold flex-1 text-center drop-shadow-md">About Us</Link>
                    <Link to="/services/qa-audit" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Services</Link>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Projects</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex-1 text-center font-medium">Careers</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden min-h-screen flex flex-col justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(180deg, rgba(10, 20, 100, 0.9) 0%, rgba(10, 20, 80, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
                    height: '100%',
                    width: '100%'
                }}></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Who We Are
                    </h1>
                    <p className="text-2xl text-gray-400 mb-12 leading-relaxed max-w-4xl mx-auto">
                        Mano Project Consultancy Private Limited is a multidisciplinary engineering and construction management firm dedicated to building a better world through innovation and excellence.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        <button className="px-12 py-4 text-xl rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3 group min-w-[280px] justify-center backdrop-blur-xl">
                            Start Your Project
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-12 py-4 text-xl rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3 group min-w-[280px] justify-center backdrop-blur-xl">
                            View Our Services
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* About The Company Section */}
            <section className="py-24 px-6 relative">
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">About The Company</h2>

                        <div className="space-y-6">
                            {[
                                "Our company is a young firm of qualified, committed, and sensitive professionals offering project management consulting services like scheduling, budgeting, cost consultancy, quality control, and assurance.",
                                "MANO has provided project management, evaluation of projects, scheduling through critical path method (CPM) & program evaluation review technique (PERT), facilities management consulting, and services to investors, seminars, and training.",
                                "Our staff includes engineers, project managers, project schedulers, estimators, and other experienced project professionals. Engagement terms are flexible and agreed upon prior to project initiation (Cost Plus, Fixed Rate, Job Work)."
                            ].map((text, index) => (
                                <div key={index} className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                    <div className="flex gap-6 items-start relative z-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                                <Leaf className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="w-[2px] h-full min-h-[60px] bg-gradient-to-b from-blue-600 to-transparent opacity-50"></div>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-gray-300 leading-relaxed text-lg font-light">
                                                {text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Why Mano Project Consultancy? */}
            <section className="py-24 px-6 relative overflow-hidden">
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto relative z-10">
                        <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Why Mano Project Consultancy Private Limited?</h2>

                        <div className="grid md:grid-cols-1 gap-6">
                            {[
                                {
                                    title: "End-to-End Project Expertise",
                                    desc: "From feasibility to final handover, we ensure comprehensive management, evaluation, and control at every step."
                                },
                                {
                                    title: "Efficient Scheduling & Budgeting",
                                    desc: "We specialize in scheduling using CPM & PERT, ensuring cost-effective and timely completion."
                                },
                                {
                                    title: "Quality Assurance & Transparency",
                                    desc: "We follow strict QA/QC procedures to maintain consistency and transparency across all stages of execution."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-semibold mb-3 text-gray-200">{feature.title}</h3>
                                        <p className="text-gray-400 font-light text-lg mb-6">{feature.desc}</p>
                                        <div className="flex items-center text-sm font-medium text-blue-500 group-hover:text-blue-400 transition-colors">
                                            Explore More
                                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Punctual in Time */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <RevealOnScroll>
                    <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-4">
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Punctual in Time</h2>
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Particular in Commitment</h2>
                        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2 whitespace-nowrap">
                            <CountUp end={90} />%+ Success Rate in Timely Project Completion
                        </h2>

                        <h2 className="mt-48 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-8">CORE VALUES</h2>
                        <div className="group relative w-full max-w-5xl p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Discipline', 'Punctuality', 'Accountability', 'Integrity', 'Collaboration', 'Responsibility', 'Feedback', 'Innovation'].map((tag) => (
                                    <div key={tag} className="px-6 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-gray-300 font-medium text-sm tracking-wide shadow-md hover:border-white/20 cursor-default">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Vision & Mission */}
            {/* Vision & Mission */}
            <section className="py-24 px-6">
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Vision Card */}
                        <div className="group relative p-10 rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 blur-[80px] rounded-full pointer-events-none"></div>
                            <div className="flex gap-8 items-start relative z-10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                        <Leaf className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="w-[2px] h-full min-h-[80px] bg-gradient-to-b from-blue-600 to-transparent opacity-50"></div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-3xl font-bold mb-6 text-white">Vision</h3>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4 items-start group/item">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/50 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-colors">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-300 text-lg leading-relaxed">
                                                Industry shall be counted with the Reputed best constructions by an average 2019-20 financial year
                                            </span>
                                        </li>
                                        <li className="flex gap-4 items-start group/item">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/50 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-colors">
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-300 text-lg leading-relaxed">
                                                Will start business in Hospitality by 2019-20 financial years
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="group relative p-10 rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 blur-[80px] rounded-full pointer-events-none"></div>
                            <div className="flex gap-8 items-start relative z-10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                        <Leaf className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="w-[2px] h-full min-h-[80px] bg-gradient-to-b from-blue-600 to-transparent opacity-50"></div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-3xl font-bold mb-6 text-white">Mission</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Most challenging job",
                                            "Learning Orientation",
                                            "Utilization of youth from tier 2/3 youngsters"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start group/item">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-500/50 group-hover/item:bg-blue-600 group-hover/item:border-blue-600 transition-colors">
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-gray-300 text-lg leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Team Section */}
            <section className="py-24 px-6">
                <RevealOnScroll>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">About The Team</h2>

                        <div className="space-y-20">
                            {/* Team Member 1 */}
                            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                                {/* Profile Stack Card */}
                                <div className="w-full md:w-1/3 relative z-10 group">
                                    {/* Stack Effects */}
                                    <div className="absolute top-[-12px] left-4 right-4 h-full bg-[#1a1a1a] border border-white/5 rounded-2xl -z-10 scale-95 opacity-60 transition-transform duration-300 group-hover:-translate-y-2"></div>
                                    <div className="absolute top-[-24px] left-8 right-8 h-full bg-[#111] border border-white/5 rounded-2xl -z-20 scale-90 opacity-30 transition-transform duration-500 group-hover:-translate-y-4"></div>

                                    {/* Main Card */}
                                    <div className="h-full p-6 rounded-2xl border border-white/10 flex flex-col gap-6 shadow-xl backdrop-blur-md overflow-hidden relative group bg-gradient-to-r from-transparent to-white/5 hover:border-blue-500/30 transition-all">
                                        <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden border-2 border-white/10">
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-700 to-gray-900">
                                                            <Users className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white">Raghu</h3>
                                                        <p className="text-gray-400 text-xs">Managing Director</p>
                                                    </div>
                                                </div>
                                                <a href="#" className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 transition-colors">
                                                    <Linkedin className="w-5 h-5 text-blue-500" />
                                                </a>
                                            </div>

                                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mt-auto">
                                                <h4 className="text-sm font-semibold text-gray-300 mb-3">Expertise</h4>
                                                <ul className="space-y-2 text-xs text-gray-400">
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                                        Project Planning & Scheduling
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                                        Cost Consultancy
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                                        Budget Control
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content/Bio Card */}
                                <div className="w-full md:w-2/3 p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-center min-h-[280px] group hover:border-blue-500/30 transition-all backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="flex gap-2 mb-6">
                                            <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono font-medium tracking-wide">
                                                {"{ name: 'Raghu' }"}
                                            </span>
                                            <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-mono font-medium tracking-wide">
                                                {"{ role: 'Managing_Director' }"}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                                            "With over a decade of experience in <span className="text-blue-200 font-normal">Project Management</span>, I ensure that every milestone is met with precision. My focus on <span className="text-purple-200 font-normal">Cost Consultancy</span> helps clients optimize their budgets without compromising on quality."
                                        </p>
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <p className="text-xs text-gray-500 font-mono">
                                                PS: Committed to delivering excellence in every construction phase.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Team Member 2 */}
                            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                                {/* Profile Stack Card */}
                                <div className="w-full md:w-1/3 relative z-10 group">
                                    {/* Stack Effects */}
                                    <div className="absolute top-[-12px] left-4 right-4 h-full bg-[#1a1a1a] border border-white/5 rounded-2xl -z-10 scale-95 opacity-60 transition-transform duration-300 group-hover:-translate-y-2"></div>
                                    <div className="absolute top-[-24px] left-8 right-8 h-full bg-[#111] border border-white/5 rounded-2xl -z-20 scale-90 opacity-30 transition-transform duration-500 group-hover:-translate-y-4"></div>

                                    {/* Main Card */}
                                    <div className="h-full p-6 rounded-2xl border border-white/10 flex flex-col gap-6 shadow-xl backdrop-blur-md overflow-hidden relative group bg-gradient-to-r from-transparent to-white/5 hover:border-blue-500/30 transition-all">
                                        <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden border-2 border-white/10">
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-700 to-gray-900">
                                                            <Users className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white">Raghu</h3>
                                                        <p className="text-gray-400 text-xs">Project Lead</p>
                                                    </div>
                                                </div>
                                                <a href="#" className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 transition-colors">
                                                    <Linkedin className="w-5 h-5 text-blue-500" />
                                                </a>
                                            </div>

                                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mt-auto">
                                                <h4 className="text-sm font-semibold text-gray-300 mb-3">Expertise</h4>
                                                <ul className="space-y-2 text-xs text-gray-400">
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                                        Site Execution
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                                        Team Management
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                                        Quality Control
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content/Bio Card */}
                                <div className="w-full md:w-2/3 p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-center min-h-[280px] group hover:border-blue-500/30 transition-all backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5">
                                    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/20 transition-colors pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="flex gap-2 mb-6">
                                            <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono font-medium tracking-wide">
                                                {"{ name: 'Raghu' }"}
                                            </span>
                                            <span className="px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono font-medium tracking-wide">
                                                {"{ role: 'Project_Lead' }"}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-lg font-light">
                                            "Operational efficiency is my priority. From <span className="text-blue-200 font-normal">Site Execution</span> to team management, I ensure seamless workflows. Strict <span className="text-blue-200 font-normal">Quality Control</span> protocols are applied to maintain our high standards."
                                        </p>
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <p className="text-xs text-gray-500 font-mono">
                                                PS: Driving projects forward with hands-on leadership.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Contact Form */}
            <section className="px-12 py-16">
                <RevealOnScroll>
                    <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-2">Ready to Start Your Project?</h2>
                    <div className="max-w-2xl mx-auto space-y-6">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                        />
                        <textarea
                            placeholder="Description"
                            rows={6}
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all resize-none shadow-lg"
                        />
                        <button className="w-full py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-900/10 transition-all font-medium text-white shadow-lg">
                            Submit
                        </button>
                    </div>
                </RevealOnScroll>
            </section>

            {/* Simple Footer */}
            <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
                <p>&copy; {new Date().getFullYear()} Mano Project Consultancy Pvt. Ltd. All rights reserved.</p>
            </footer>
        </div >
    );
};

export default AboutUs;
