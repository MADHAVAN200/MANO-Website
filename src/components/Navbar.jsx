import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import RainbowButton from './RainbowButton';
import { useCompany } from '../context/CompanyContext';
import ContactModal from './ContactModal';
import ResumeModal from './ResumeModal';

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const { brand, isEPC } = useCompany();
    const brandPath = `/${brand.toLowerCase()}`;

    const [activeService, setActiveService] = useState(0);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const isCareersPage = currentPath === `${brandPath}/careers` || currentPath === `${brandPath}/careers/`;

    const handleContactClick = (e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const isLanding = currentPath === brandPath || currentPath === `${brandPath}/` || currentPath === '/';
        const isAbout = currentPath.includes('/about-us');

        if (isCareersPage) {
            setIsResumeOpen(true);
            return;
        }

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
        { title: "EPC Solution", desc: "End-to-end Engineering, Procurement, and Construction services.", path: "/epc/services/epc" } // Absolute path to force switch
    ];


    const services = isEPC ? pplServices : pcplServices;

    const isActive = (path) => {
        const fullPath = `${brandPath}${path === '/' ? '' : path}`;
        if (currentPath === fullPath) return true;
        if (path !== '/' && currentPath.startsWith(fullPath)) return true;
        return false;
    };

    useEffect(() => {
        const relativePath = currentPath.replace(brandPath, '') || '/';
        const foundIndex = services.findIndex(s => s.path === relativePath);
        if (foundIndex !== -1) {
            setActiveService(foundIndex);
        } else {
            setActiveService(0);
        }
    }, [currentPath, isServicesOpen, services, brandPath]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [currentPath]);

    const linkBaseClass = "transition-all duration-300 ease-in-out font-medium drop-shadow-md py-2 lg:py-0";
    const activeClass = "text-white font-bold text-[20px] lg:text-[20px]";
    const inactiveClass = "text-gray-400 hover:text-white text-[18px] lg:text-[18px]";

    const getLink = (path) => {
        if (path.startsWith('/epc') || path.startsWith('/pmc')) return path; // Return absolute brand paths as is
        return `${brandPath}${path === '/' ? '' : path}`;
    };

    return (
        <nav className="absolute top-4 lg:top-6 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
            <div
                className={`backdrop-blur-md bg-white/5 border border-white/20 transition-all duration-300 ease-out flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden rounded-2xl lg:rounded-[32px] w-[92%] sm:w-[95%] max-w-[1400px]`}
                onMouseLeave={() => setIsServicesOpen(false)}
            >
                {/* Top Row: Logo, Links (Desktop), Hamburger, CTA */}
                <div className="flex items-center justify-between px-4 sm:px-8 py-3 lg:py-4 w-full">
                    {/* Logo Section */}
                    <Link to={brandPath} className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
                        <img src={`${import.meta.env.BASE_URL}mano-logo.svg`} alt="Mano Logo" className="h-8 sm:h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                            MANO
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-10 xl:gap-14">
                        <Link to={getLink('/')} className={`${linkBaseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
                            Home
                        </Link>
                        <Link to={getLink('/about-us')} className={`${linkBaseClass} ${isActive('/about-us') ? activeClass : inactiveClass}`}>
                            About Us
                        </Link>

                        {/* Services Link - Trigger */}
                        <div
                            onMouseEnter={() => !isEPC && setIsServicesOpen(true)}
                            className="relative h-full flex items-center"
                        >
                            <Link
                                to={isEPC ? getLink('/services/epc') : getLink('/services')}
                                className={`${linkBaseClass} ${isActive(isEPC ? '/services/epc' : '/services') ? activeClass : inactiveClass} flex items-center gap-1 py-2`}
                            >
                                {isEPC ? 'Service' : 'Services'}
                            </Link>
                        </div>

                        <Link to={getLink('/projects')} className={`${linkBaseClass} ${isActive('/projects') ? activeClass : inactiveClass}`}>
                            Projects
                        </Link>
                        <Link to={getLink('/careers')} className={`${linkBaseClass} ${isActive('/careers') ? activeClass : inactiveClass}`}>
                            Careers
                        </Link>
                    </div>

                    {/* Right Side: CTA Button and Mobile Menu Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:block">
                            <div onClick={handleContactClick} className="cursor-pointer">
                                <RainbowButton borderRadius="rounded-xl">
                                    {isCareersPage ? 'Apply' : 'Get in Touch'}
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </RainbowButton>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'}`}
                >
                    <div className="flex flex-col p-6 gap-2">
                        <Link to={getLink('/')} className={`${linkBaseClass} ${isActive('/') ? activeClass : inactiveClass}`}>
                            Home
                        </Link>
                        <Link to={getLink('/about-us')} className={`${linkBaseClass} ${isActive('/about-us') ? activeClass : inactiveClass}`}>
                            About Us
                        </Link>
                        <Link to={isEPC ? getLink('/services/epc') : getLink('/services')} className={`${linkBaseClass} ${isActive(isEPC ? '/services/epc' : '/services') ? activeClass : inactiveClass}`}>
                            {isEPC ? 'Service' : 'Services'}
                        </Link>
                        <Link to={getLink('/projects')} className={`${linkBaseClass} ${isActive('/projects') ? activeClass : inactiveClass}`}>
                            Projects
                        </Link>
                        <Link to={getLink('/careers')} className={`${linkBaseClass} ${isActive('/careers') ? activeClass : inactiveClass}`}>
                            Careers
                        </Link>
                        <div className="pt-4" onClick={handleContactClick}>
                            <RainbowButton borderRadius="rounded-xl w-full">
                                {isCareersPage ? 'Apply' : 'Get in Touch'}
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </RainbowButton>
                        </div>
                    </div>
                </div>

                {/* Desktop Expanding Mega Menu Section (Existing) */}
                <div
                    className={`hidden lg:block w-full transition-all duration-300 ease-out ${isServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="px-12 pb-8 pt-2 flex gap-12 border-t border-white/10 mt-2 mx-8">
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

                        <div className={`w-2/3 grid ${isEPC ? 'grid-cols-1' : 'grid-cols-2'} gap-x-4 gap-y-2`}>
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
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} jobRole="General Application" />
        </nav >
    );
};

export default Navbar;
