
import React, { useState } from 'react';
import {
    Users, TrendingUp, ShieldCheck, Award, Briefcase, MapPin,
    Clock, ChevronRight, ArrowRight, BookOpen, UserPlus, FileText,
    CheckCircle, Target, Zap, Layout
} from 'lucide-react';
import RevealOnScroll from '../../components/RevealOnScroll';
import RainbowButton from '../../components/RainbowButton';

const Careers = () => {
    const [openPosition, setOpenPosition] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const togglePosition = (index) => {
        setOpenPosition(openPosition === index ? null : index);
    };

    const testimonials = [
        {
            name: "Rajesh Kumar",
            text: "Working at Mano has helped me grow technically and professionally. The exposure to real projects and clients is unmatched.",
            role: "Senior QS Engineer",
            year: "Since 2018",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&fit=crop"
        },
        {
            name: "Priya Sharma",
            text: "The culture here values transparency, learning, and teamwork. It's a great place to build your career in a supportive environment.",
            role: "Project Coordinator",
            year: "Since 2020",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&fit=crop"
        },
        {
            name: "Amit Patel",
            text: "I appreciate the mentorship and the clear path for career advancement. Management genuinely cares about our development.",
            role: "Junior Planning Engineer",
            year: "Since 2022",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&fit=crop"
        }
    ];

    const values = [
        { title: "12+ Years", subtitle: "Industry Leadership", icon: Award },
        { title: "Culture", subtitle: "Learning & Innovation", icon: BookOpen },
        { title: "Growth", subtitle: "Cross-Domain Opportunities", icon: TrendingUp },
        { title: "Clients", subtitle: "Top Developers & Corporates", icon: Briefcase },
    ];

    const culture = [
        {
            title: "Integrity & Responsibility",
            desc: "We maintain transparency, honesty, and professionalism in everything we do.",
            icon: ShieldCheck
        },
        {
            title: "Continuous Learning",
            desc: "Regular training, workshops, and knowledge-sharing sessions to help you grow.",
            icon: BookOpen
        },
        {
            title: "Collaborative Environment",
            desc: "Work with diverse teams across planning, QA/QC, execution, cost, contracts, and safety.",
            icon: Users
        },
        {
            title: "Performance-Driven Growth",
            desc: "We reward excellence, leadership, and consistent contributions.",
            icon: TrendingUp
        }
    ];

    const positions = [
        {
            title: "Project Manager",
            location: "Mumbai / Pune",
            experience: "5+ years",
            responsibilities: [
                "Manage planning, execution, and stakeholder communication",
                "Monitor project progress and quality",
                "Prepare reports and assist in decision-making"
            ]
        },
        {
            title: "QA/QC Engineer",
            location: "Mumbai / Ahmedabad",
            experience: "3–7 years",
            responsibilities: [
                "Conduct quality inspections",
                "Prepare NCRs and audit documentation",
                "Ensure compliance with standards and specifications"
            ]
        },
        {
            title: "Quantity Surveyor / Billing Engineer",
            location: "Pune / Hyderabad",
            experience: "3–6 years",
            responsibilities: [
                "Quantity take-offs & billing audit",
                "BOQ preparation & variation checks",
                "Billing documentation and certification support"
            ]
        },
        {
            title: "Planning Engineer (CPM & PERT)",
            location: "Mumbai",
            experience: "2–5 years",
            responsibilities: [
                "Prepare project schedules",
                "Analyze delays and prepare recovery plans",
                "Assist in planning audits & reporting"
            ]
        },
        {
            title: "EHS Officer",
            location: "All Sites",
            experience: "2–5 years",
            responsibilities: [
                "Conduct safety audits",
                "Ensure compliance with EHS standards",
                "Prepare safety reports and risk assessments"
            ]
        },
        {
            title: "Contract & Tender Executive",
            location: "Mumbai",
            experience: "2–4 years",
            responsibilities: [
                "Assist in contract drafting",
                "Evaluate tenders & bid documents",
                "Support variation and claim evaluations"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">

            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,10,30,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>
                {/* Abstract Background for Careers */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-gray-500 mb-8 leading-tight">
                        Careers at Mano <br /> Project Consultants
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-200 font-medium mb-6">
                        Build your future with a company committed to excellence, innovation, and professional growth.
                    </p>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        At Mano Project Consultants Pvt. Ltd., we believe that our success is driven by the talent, expertise, and dedication of our people. We are always looking for motivated professionals who share our values of quality, transparency, and continuous improvement. If you’re passionate about delivering impactful projects and want to grow your career in a dynamic environment, we’d love to meet you.
                    </p>
                </div>
            </section>

            {/* 2. WHY WORK WITH US - VALUE STRIP */}
            <section className="py-16 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {values.map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-400 uppercase tracking-wide">{item.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. OUR WORK CULTURE */}
            <section className="py-24 px-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-white mb-16">Our Work Culture</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {culture.map((item, index) => (
                                <div key={index} className="group p-8 rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/30 transition-all shadow-lg backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 relative">
                                    <div className="flex items-start gap-6">
                                        <div className="p-4 rounded-xl bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 4. OPEN POSITIONS */}
            <section className="py-24 px-6 bg-white/5">
                <RevealOnScroll>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Open Positions</h2>
                            <p className="text-gray-400">Join our growing team of experts.</p>
                        </div>

                        <div className="space-y-4">
                            {positions.map((job, index) => (
                                <div key={index} className="rounded-2xl border border-white/10 bg-black overflow-hidden transition-all duration-300 hover:border-blue-500/30">
                                    <button
                                        onClick={() => togglePosition(index)}
                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                                    >
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={14} className="text-blue-500" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Briefcase size={14} className="text-blue-500" />
                                                    {job.experience} Experience
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 ${openPosition === index ? 'rotate-90 bg-blue-500 text-white' : 'text-gray-400'}`}>
                                            <ChevronRight size={20} />
                                        </div>
                                    </button>

                                    <div className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${openPosition === index ? 'max-h-[500px]' : 'max-h-0'}`}>
                                        <div className="p-8 pt-0 border-t border-white/5">
                                            <h4 className="text-blue-400 font-semibold mb-4 mt-6 uppercase tracking-wider text-sm">Key Responsibilities</h4>
                                            <ul className="space-y-3 mb-8">
                                                {job.responsibilities.map((res, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                                                        <CheckCircle size={18} className="text-blue-500 mt-1 shrink-0" />
                                                        <span>{res}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center gap-2">
                                                Apply for this Role <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* 5. HOW TO APPLY */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Your Career With Us?</h2>
                    <p className="text-xl text-gray-300 mb-12">
                        We’re always excited to meet skilled professionals who can bring value to our team.
                    </p>



                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-6">
                                Apply Now <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center">
                            Send Resume <FileText className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* 6. LIFE AT MANO (Optional Culture) */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative group overflow-hidden rounded-2xl h-80">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&fit=crop" alt="Team Collaboration" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-2">Team Collaboration</h3>
                                <p className="text-sm text-gray-300">Cross-functional teamwork drives our success.</p>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl h-80">
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&fit=crop" alt="Growth" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-2">Growth Opportunities</h3>
                                <p className="text-sm text-gray-300">Continuous skill development and project exposure.</p>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl h-80">
                            <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=800&fit=crop" alt="Recognition" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-2">Recognition & Rewards</h3>
                                <p className="text-sm text-gray-300">We celebrate achievements and innovation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. EMPLOYEE PERSPECTIVES (CAROUSEL) */}
            <section className="py-24 px-6 bg-black text-center">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Employee Perspectives</h2>

                    {/* Outer Glass Container */}
                    <div className="relative w-full border border-white/10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-sm min-h-[400px] flex flex-col justify-center px-4 md:px-12 py-12 md:py-16">

                        {/* Navigation Buttons (Aligned Inside Outer Container) */}
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="absolute left-6 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all z-20 shadow-lg shadow-white/5"
                        >
                            <ChevronRight className="w-6 h-6 text-black rotate-180" />
                        </button>

                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="absolute right-6 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all z-20 shadow-lg shadow-white/5"
                        >
                            <ChevronRight className="w-6 h-6 text-black" />
                        </button>

                        {/* Inner Content Content */}
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-16 text-left transition-all duration-500 w-full mx-auto">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                                    <img
                                        src={testimonials[currentTestimonial].image}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl text-white">{testimonials[currentTestimonial].name}</h4>
                                    <p className="text-gray-400 text-sm font-medium">{testimonials[currentTestimonial].role}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">{testimonials[currentTestimonial].year}</p>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed text-base md:text-lg pl-1">
                                {testimonials[currentTestimonial].text}
                            </p>

                            {/* Dots */}
                            <div className="flex justify-center gap-3 mt-10">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`transition-all duration-300 rounded-full border border-white/10 ${index === currentTestimonial
                                            ? 'w-3 h-3 bg-white/30 scale-125'
                                            : 'w-2 h-2 bg-white/10 hover:bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. CTA SECTION */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(20,20,50,0.5)_50%,rgba(0,0,0,1)_100%)]"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Take the Next Step in Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Professional Journey.</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Become part of a team that values excellence, innovation, and integrity.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <RainbowButton>
                            <span className="flex items-center text-lg font-semibold px-6">
                                Apply Today <ChevronRight className="ml-2 w-5 h-5" />
                            </span>
                        </RainbowButton>
                        <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold text-lg flex items-center justify-center backdrop-blur-sm">
                            View Open Positions <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Careers;
