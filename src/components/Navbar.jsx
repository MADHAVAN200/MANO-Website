import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RainbowButton from './RainbowButton';
import { useCompany } from '../context/CompanyContext';
import ContactModal from './ContactModal';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { brand, isPPL } = useCompany();
    const brandPath = `/${brand.toLowerCase()}`;

    const [activeService, setActiveService] = useState(0);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleContactClick = (e) => {
        e.preventDefault();
        // Check if we are on Landing or About page
        // currentPath might be "/pcpl", "/pcpl/", "/pcpl/about-us" etc.
        // brandPath is "/pcpl" or "/ppl"
        const isLanding = currentPath === brandPath || currentPath === `${brandPath}/` || currentPath === '/';
        const isAbout = currentPath.includes('/about-us');

        if (isLanding || isAbout) {
            const section = document.getElementById('contact-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            setIsContactOpen(true);
        }
    };

    // Initial services list
    const pcplServices = [
        { title: "Project Management", desc: "Seamless execution, monitoring, and milestone-driven progress tracking.", path: "/services/project-management" },
        { title: "Project Execution", desc: "On-ground leadership and coordination for flawless project delivery.", path: "/services/project-execution" },
        { title: "Project Planning", desc: "Strategic resource planning using CPM & PERT techniques.", path: "/services/project-planning" },
        { title: "Contract Management", desc: "QS, BOQ, Tender Preparation, and vendor finalization.", path: "/services/contract-management" },
        { title: "QA/QC and Auditing", desc: "Comprehensive quality assurance, control, and auditing services.", path: "/services/qa-audit" },
        { title: "Cost Consultancy", desc: "Expert budgeting, cash flows, and cost control measures.", path: "/services/cost-consultancy" },
        { title: "QS and Auditing", desc: "Detailed quantity surveying and billing verification.", path: "/services/qs-billing-audit" },
        { title: "EHS Audit", desc: "Environmental, Health, and Safety audits and compliance.", path: "/services/ehs-audit" }
    ];

    const pplServices = [
        { title: "EPC Solution", desc: "End-to-end Engineering, Procurement, and Construction services.", path: "/services/epc" }
    ];

    const services = isPPL ? pplServices : pcplServices;

    const isActive = (path) => {
        // Correctly check active state relative to brand connection
        const fullPath = `${brandPath}${path === '/' ? '' : path}`;
        if (currentPath === fullPath) return true;
        if (path !== '/' && currentPath.startsWith(fullPath)) return true;
        return false;
    };

    useEffect(() => {
        // Helper to match active service in dropdown to current URL if possible
        const relativePath = currentPath.replace(brandPath, '') || '/';
        const foundIndex = services.findIndex(s => s.path === relativePath);
        if (foundIndex !== -1) {
            setActiveService(foundIndex);
        } else {
            setActiveService(0);
        }
    }, [currentPath, isServicesOpen, services, brandPath]);

    const linkBaseClass = "transition-all duration-300 ease-in-out font-medium drop-shadow-md";
    const activeClass = "text-white font-bold text-[20px]";
    const inactiveClass = "text-gray-400 hover:text-white text-[18px]";

    const getLink = (path) => `${brandPath}${path === '/' ? '' : path}`;

    return (
        <nav className="absolute top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
            <div
                className={`backdrop-blur-md bg-white/5 border border-white/20 transition-all duration-300 ease-out flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden rounded-[32px]`}
                style={{ width: '95%', maxWidth: '1400px' }}
                onMouseLeave={() => setIsServicesOpen(false)}
            >
                {/* Top Row: Logo, Links, CTA */}
                <div className="flex items-center justify-between px-8 py-4 w-full">
                    {/* Logo Section */}
                    <Link to={brandPath} className="flex items-center gap-3 flex-shrink-0 group">
                        <img src={`${import.meta.env.BASE_URL}mano-logo.svg`} alt="Mano Logo" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-2xl font-bold text-white tracking-wide">
                            MANO
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-14">
                        <Link to={getLink('/')} className={`${linkBaseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
                            Home
                        </Link>
                        <Link to={getLink('/about-us')} className={`${linkBaseClass} ${isActive('/about-us') ? activeClass : inactiveClass}`}>
                            About Us
                        </Link>

                        {/* Services Link - Trigger */}
                        <div
                            onMouseEnter={() => !isPPL && setIsServicesOpen(true)}
                            className="relative h-full flex items-center"
                        >
                            <Link
                                to={isPPL ? getLink('/services/epc') : getLink('/services')}
                                className={`${linkBaseClass} ${isActive(isPPL ? '/services/epc' : '/services') ? activeClass : inactiveClass} flex items-center gap-1 py-2`}
                            >
                                {isPPL ? 'Service - EPC' : 'Services'}
                            </Link>
                        </div>

                        <Link to={getLink('/projects')} className={`${linkBaseClass} ${isActive('/projects') ? activeClass : inactiveClass}`}>
                            Projects
                        </Link>
                        <Link to={getLink('/careers')} className={`${linkBaseClass} ${isActive('/careers') ? activeClass : inactiveClass}`}>
                            Careers
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <div onClick={handleContactClick} className="cursor-pointer">
                            <RainbowButton borderRadius="rounded-xl">
                                Get in Touch
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </RainbowButton>
                        </div>
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
                                    {services[activeService]?.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {services[activeService]?.desc}
                                </p>
                            </div>
                            <Link to={getLink(services[activeService]?.path || '#')} className="px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors inline-flex items-center gap-2 w-fit">
                                Explore Service <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Right Side - Services Grid */}
                        <div className={`w-2/3 grid ${isPPL ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4 gap-y-2`}>
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    to={getLink(service.path)}
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

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </nav >
    );
};

export default Navbar;
