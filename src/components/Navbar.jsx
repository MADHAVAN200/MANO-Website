import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RainbowButton from './RainbowButton';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [activeService, setActiveService] = useState(0);

    const isActive = (path) => {
        if (path === '/' && currentPath === '/') return true;
        if (path !== '/' && currentPath.startsWith(path)) return true;
        return false;
    };

    const linkBaseClass = "transition-all duration-300 ease-in-out font-medium drop-shadow-md";
    const activeClass = "text-white font-bold text-[20px]";
    const inactiveClass = "text-gray-400 hover:text-white text-[18px]";

    const services = [
        { title: "Contract Management", desc: "Structured contracts, compliance control, and risk mitigation.", path: "/services/contract-management" },
        { title: "Project Planning", desc: "Strategic resource planning and roadmap design for success.", path: "/services/project-planning" },
        { title: "Project Execution", desc: "On-ground leadership and coordination for flawless project delivery.", path: "/services/project-execution" },
        { title: "Quality Control", desc: "Structured inspections, matrix control, and compliance systems.", path: "/services/quality-control" },
        { title: "Project Management", desc: "Seamless execution, monitoring, and milestone-driven progress tracking.", path: "/services/project-management" },
        { title: "Cost Consultancy", desc: "Expert budgeting, BOQs, and material cost verification services.", path: "/services/cost-consultancy" },
        { title: "CPM & PERT Technique", desc: "Advanced scheduling and critical path analysis for project timelines.", path: "/services/cpm-pert" },
        { title: "EHS Audit", desc: "Environmental, Health, and Safety audits to ensure rigorous standards.", path: "/services/ehs-audit" },
        { title: "QA/QC Audit", desc: "Comprehensive process audits ensuring compliance and excellence.", path: "/services/qa-audit" },
        { title: "QS & Billing Audit", desc: "Detailed quantity surveying and billing verification for transparency.", path: "/services/qs-billing-audit" }
    ];

    const [isServicesOpen, setIsServicesOpen] = useState(false);

    return (
        <nav className="absolute top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
            <div
                className={`backdrop-blur-md bg-white/5 border border-white/20 transition-all duration-300 ease-out flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden ${isServicesOpen ? 'rounded-[32px]' : 'rounded-full'}`}
                style={{ width: '95%', maxWidth: '1400px' }}
                onMouseLeave={() => setIsServicesOpen(false)}
            >
                {/* Top Row: Logo, Links, CTA */}
                <div className="flex items-center justify-between px-8 py-4 w-full">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
                        <img src="/mano-logo.svg" alt="Mano Logo" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-2xl font-bold text-white tracking-wide">MANO</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-14">
                        <Link to="/" className={`${linkBaseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
                            Home
                        </Link>
                        <Link to="/about-us" className={`${linkBaseClass} ${isActive('/about-us') ? activeClass : inactiveClass}`}>
                            About Us
                        </Link>

                        {/* Services Link - Trigger */}
                        <div
                            onMouseEnter={() => setIsServicesOpen(true)}
                            className="relative h-full flex items-center"
                        >
                            <Link
                                to="/services"
                                className={`${linkBaseClass} ${isActive('/services') ? activeClass : inactiveClass} flex items-center gap-1 py-2`}
                            >
                                Services
                            </Link>
                        </div>

                        <Link to="/projects" className={`${linkBaseClass} ${isActive('/projects') ? activeClass : inactiveClass}`}>
                            Projects
                        </Link>
                        <Link to="/careers" className={`${linkBaseClass} ${isActive('/careers') ? activeClass : inactiveClass}`}>
                            Careers
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link to="#">
                            <RainbowButton>
                                Get in Touch
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </RainbowButton>
                        </Link>
                    </div>
                </div>

                {/* Expanding Mega Menu Section */}
                <div
                    className={`w-full transition-all duration-300 ease-out ${isServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="px-12 pb-8 pt-2 flex gap-12 border-t border-white/10 mt-2 mx-8">
                        {/* Left Side - Dynamic Details */}
                        <div className="w-1/3 flex flex-col justify-between pt-4">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    {services[activeService].title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {services[activeService].desc}
                                </p>
                            </div>
                            <Link to={services[activeService].path} className="px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors inline-flex items-center gap-2 w-fit">
                                Explore Service <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Right Side - Services Grid */}
                        <div className="w-2/3 grid grid-cols-2 gap-x-4 gap-y-2">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={service.path}
                                    onMouseEnter={() => setActiveService(index)}
                                    className={`block px-6 py-4 text-lg rounded-xl transition-all duration-300 font-bold text-center flex items-center justify-center whitespace-nowrap ${activeService === index
                                        ? "bg-white/10 text-white scale-105"
                                        : "text-gray-200 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
