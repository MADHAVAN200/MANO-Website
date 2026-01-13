import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Circle, Briefcase, Calculator, TrendingUp, ShieldCheck, FileText, Shield, Hammer, Map, Clock, Handshake } from 'lucide-react';
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
          // Ease out expose
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

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, section: null });

  const projects = [
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },
    { name: 'Ariana Residency', image: 'image.webp' },

  ];

  const handleMouseMove = (e) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const sectionWidth = rect.width;

    setMousePosition({ x, section: 'projects' });

    if (x < sectionWidth * 0.3) {
      // Left side - move right (show previous)
      setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else if (x > sectionWidth * 0.7) {
      // Right side - move left (show next)
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, section: null });
  };

  const testimonials = [
    {
      name: 'David J. Karem',
      role: 'Businessmen 1 day ago',
      image: 'image.webp',
      text: 'Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address. Stalkers and disgruntled acquaintances use the Internet to find addresses, phone numbers and other personal details about their targets. Identity thieves use personal information numbers and other personal details.'
    },
    {
      name: 'Sarah Johnson',
      role: 'CEO 2 days ago',
      image: 'image.webp',
      text: 'Outstanding service and professionalism. The team delivered beyond our expectations and helped us achieve our project goals efficiently.'
    },
    {
      name: 'Michael Chen',
      role: 'Project Manager 3 days ago',
      image: 'image.webp',
      text: 'Excellent project management and communication throughout. Would highly recommend their services to anyone looking for quality work.'
    }
  ];

  const faqs = [
    { question: 'What services does Mano Consultants provide?', answer: 'We offer comprehensive project management, construction management, quantity surveying, and cost consultancy services tailored to your specific project needs.' },
    { question: 'How do you ensure project quality?', answer: 'Our rigorous quality assurance processes involves regular audits, compliance checks, and adherence to international standards to ensure the highest quality deliverables.' },
    { question: 'Do you handle residential projects?', answer: 'Yes, we handle a wide range of projects including residential complexes, commercial buildings, and industrial facilities with equal expertise.' },
    { question: 'What is your project management methodology?', answer: 'We employ a hybrid approach combining agile flexibility with structured waterfall milestones to ensure timely delivery while adapting to project changes.' },
    { question: ' How can we get a quote?', answer: 'You can contact us through our form below or email us directly. We will schedule a consultation to understand your requirements and provide a detailed proposal.' },
    { question: 'Do you work internationally?', answer: 'Yes, while we are based locally, we have the capability and experience to manage and consult on projects across various international locations.' }
  ];

  // --- Smooth carousel animation refs ---
  const currentIndexRef = useRef(0); // float value
  const targetIndexRef = useRef(0);  // fractional target

  // initialize target to middle on mount
  useEffect(() => {
    targetIndexRef.current = Math.round(projects.length / 2);
  }, []);

  // animation loop: ease currentIndexRef toward targetIndexRef and update state
  useEffect(() => {
    let rafId = null;
    const step = () => {
      // simple easing
      currentIndexRef.current += (targetIndexRef.current - currentIndexRef.current) * 0.08;
      const rounded = Math.round(currentIndexRef.current) % projects.length;
      // keep in bounds positive
      const idx = ((rounded % projects.length) + projects.length) % projects.length;
      setCurrentProjectIndex(idx);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [projects.length]);

  // --- Auto-play effect ---
  useEffect(() => {
    const interval = setInterval(() => {
      targetIndexRef.current += 1;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section with Navigation */}
      {/* Hero Section with Navigation */}
      <section className="relative px-4 md:px-16 lg:px-24 xl:px-32 pt-32 pb-24 overflow-hidden min-h-screen flex flex-col md:flex-row items-center justify-center gap-24">

        {/* Blue Gradient Background (Restored) */}
        <div className="absolute inset-0 pointer-events-none -z-20" style={{
          background: 'linear-gradient(180deg, rgba(10, 20, 100, 0.9) 0%, rgba(10, 20, 80, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
          height: '100%',
          width: '100%'
        }}></div>

        {/* SVG Background Pattern (Snippet Style) */}
        <svg className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none opacity-[0.15]" width="1440" height="720" viewBox="0 0 1440 720" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="white" strokeOpacity=".7" d="M-15.227 702.342H1439.7" />
          <circle cx="711.819" cy="372.562" r="308.334" stroke="white" strokeOpacity=".7" />
          <circle cx="16.942" cy="20.834" r="308.334" stroke="white" strokeOpacity=".7" />
          <path stroke="white" strokeOpacity=".7" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
          <circle cx="782.595" cy="411.166" r="308.334" stroke="white" strokeOpacity=".7" />
        </svg>

        {/* Hero Content (Left) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
          {/* Avatar Pill */}
          <div className="flex flex-wrap items-center justify-center p-1.5 pl-2 pr-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-gray-400 text-xs mb-8">
            <div className="flex items-center -space-x-2 mr-3">
              <img className="w-7 h-7 rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50" alt="user1" />
              <img className="w-7 h-7 rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50" alt="user2" />
              <img className="w-7 h-7 rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50" alt="user3" />
            </div>
            <span>Trusted by 500+ Clients</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-medium leading-tight text-white mb-6 max-w-xl">
            Building Excellence Through Precision.
          </h1>

          <p className="text-sm md:text-base text-gray-400 mb-10 max-w-lg leading-relaxed">
            Mano Project Consultants delivers end-to-end consulting solutions for reliable, high-performance project delivery.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-md px-7 h-11 transition-colors font-medium">
              Get started
            </button>
            <button className="flex items-center gap-2 border border-white/20 hover:bg-white/10 active:scale-95 transition-all text-gray-300 rounded-md px-6 h-11 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
              <span>Watch demo</span>
            </button>
          </div>
        </div>

        {/* Hero Image (Right) */}
        <img
          src={`${import.meta.env.BASE_URL}image.webp`}
          alt="Hero Showcase"
          className="w-full max-w-md md:max-w-lg rounded-2xl border border-white/10 shadow-2xl z-10"
        />
      </section>

      {/* Stats Section */}
      <section className="px-12 py-24 text-center">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h3 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4">
                <CountUp end={12} /> Years Experience
              </h3>
            </div>
            <div>
              <h3 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4">
                <CountUp end={500} />+ clients
              </h3>
            </div>
            <div>
              <h3 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4">
                <CountUp end={100} />+ Projects Completed
              </h3>
            </div>
            <div>
              <h3 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-4">
                <CountUp end={98} />% Client Satisfaction Rate
              </h3>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Why Choose Section */}
      <section className="px-12 py-24">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6 text-center mb-12">
            Why Businesses <span className="text-blue-500">Choose</span> Mano Consultants
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            With 12 years of excellence, we blend deep industry knowledge with client-centric<br />
            approach to deliver measurable results in every project.
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Card 1 */}
            <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center -ml-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                      <path d="M6 8C7.10457 8 8 8.89543 8 10V16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8Z" fill="#60A5FA" opacity="0.95" />
                    </svg>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">End-to-End Project Expertise</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-gray-300 leading-relaxed">From feasibility to final handover — complete lifecycle management under one roof.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center -ml-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                      <path d="M6 8C7.10457 8 8 8.89543 8 10V16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8Z" fill="#60A5FA" opacity="0.95" />
                    </svg>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Cost Efficiency & Transparency</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-gray-300 leading-relaxed">Accurate estimations, budgeting, and specialist cost control ensure optimal financial performance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center -ml-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1046 2 14 2.89543 14 4V10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10V4C10 2.89543 10.8954 2 12 2Z" fill="white" opacity="0.95" />
                      <path d="M6 8C7.10457 8 8 8.89543 8 10V16C8 17.1046 7.10457 18 6 18C4.89543 18 4 17.1046 4 16V10C4 8.89543 4.89543 8 6 8Z" fill="#60A5FA" opacity="0.95" />
                    </svg>
                  </div>
                  <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 to-transparent mt-2 rounded"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">Quality-Focused Delivery</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-gray-300 leading-relaxed">Strict QA/QC processes, audits, and compliance frameworks for flawless execution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* WHY CLIENTS TRUST US STRIP */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white leading-tight">
              Why <span className="text-blue-500">Clients Trust</span> Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Predictable Delivery", text: "Timely execution backed by strong planning and monitoring.", icon: Clock },
                { title: "Transparent Processes", text: "Fully documented, audit-ready systems at every step.", icon: FileText },
                { title: "Cost & Risk Control", text: "Data-driven decisions ensure optimized cost and minimized risk.", icon: ShieldCheck },
                { title: "End-to-End Support", text: "From drawings to handover — we manage everything.", icon: Handshake },
              ].map((item, index) => (
                <div key={index} className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10 flex flex-col items-start h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Services Section */}
      <section className="px-12 py-24">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Our Core Services</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Project Management", desc: "Seamless execution, monitoring, and milestone-driven progress tracking.", path: "/services/project-management", icon: Briefcase },
              { title: "Cost Consultancy", desc: "Expert budgeting, BOQs, and material cost verification services.", path: "/services/cost-consultancy", icon: Calculator },
              { title: "CPM & PERT Technique", desc: "Advanced scheduling and critical path analysis for project timelines.", path: "/services/cpm-pert", icon: TrendingUp },
              { title: "Quality Assurance & Audit", desc: "Comprehensive process audits ensuring compliance and excellence.", path: "/services/qa-audit", icon: ShieldCheck },
              { title: "QS & Billing Audit", desc: "Detailed quantity surveying and billing verification for transparency.", path: "/services/qs-billing-audit", icon: FileText },
              { title: "EHS Audit", desc: "Environmental, Health, and Safety audits to ensure rigorous standards.", path: "/services/ehs-audit", icon: Shield },
              { title: "Project Execution", desc: "On-ground leadership and coordination for flawless project delivery.", path: "/services/project-execution", icon: Hammer },
              { title: "Project Planning", desc: "Strategic resource planning and roadmap design for success.", path: "/services/project-planning", icon: Map }
            ].map((service, index) => (
              <div key={index} className="group relative p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all shadow-lg overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 hover:to-blue-600/10">
                <div className="w-14 h-14 rounded-xl mb-6 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                  <service.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{service.desc}</p>
                <Link to={service.path} className="inline-flex items-center text-sm text-blue-400 hover:text-white transition-colors">
                  Explore More <span className="ml-2"><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </Link>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Featured Projects Carousel */}
      {/* Featured Projects Carousel */}
      <section className="py-24 overflow-hidden relative">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Featured Projects</h2>
          <div className="relative h-[520px] flex items-center justify-center">
            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
              {projects.map((project, index) => {
                // compute positions based on the current (rounded) index
                const position = (index - currentProjectIndex + projects.length) % projects.length;
                const isCenter = position === 0;
                const isLeft1 = position === projects.length - 1;
                const isLeft2 = position === projects.length - 2;
                const isRight1 = position === 1;
                const isRight2 = position === 2;

                let transform = 'translateX(-50%) scale(0.6) translateZ(-160px)';
                let zIndex = 1;
                let opacity = 0.22;
                let blur = 'blur(1px)';

                if (isCenter) {
                  transform = 'translateX(-50%) scale(1) translateZ(0px)';
                  zIndex = 60;
                  opacity = 1;
                  blur = 'blur(0px)';
                } else if (isLeft1) {
                  transform = 'translateX(-110%) scale(0.88) translateZ(-60px)';
                  zIndex = 50;
                  opacity = 0.75;
                } else if (isLeft2) {
                  transform = 'translateX(-170%) scale(0.72) translateZ(-120px)';
                  zIndex = 40;
                  opacity = 0.55;
                } else if (isRight1) {
                  transform = 'translateX(-10%) scale(0.88) translateZ(-60px)';
                  zIndex = 50;
                  opacity = 0.75;
                } else if (isRight2) {
                  transform = 'translateX(60%) scale(0.72) translateZ(-120px)';
                  zIndex = 40;
                  opacity = 0.55;
                }

                return (
                  <div
                    key={index}
                    className="absolute left-1/2 transition-all duration-500 ease-out"
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      filter: blur
                    }}
                  >
                    <div className="w-[560px] h-[520px] relative group">
                      {/* Liquid glass card */}
                      <div className="relative h-full rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                        {/* Project title */}
                        <div className="absolute top-6 left-6 z-20">
                          <h3 className="text-3xl font-bold text-white">{project.name}</h3>
                        </div>

                        {/* Image area with padding and inner frame */}
                        <div className="absolute left-6 right-6 bottom-6 top-20 z-10 rounded-lg overflow-hidden bg-black">
                          <img src={`${import.meta.env.BASE_URL}${project.image}`} alt={project.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                      </div>

                      {/* soft outer stroke */}
                      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6) inset' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Testimonials */}
      <section className="px-12 py-24">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Testimonials</h2>
          <div className="max-w-6xl mx-auto relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6 text-black rotate-180" />
            </button>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 w-14 h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-12 relative shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}${testimonials[currentTestimonial].image}`}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-8 text-base">
                {testimonials[currentTestimonial].text}
              </p>
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`transition-all ${index === currentTestimonial
                      ? 'w-8 h-2 rounded-full bg-white'
                      : 'w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-500'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQs */}
      <section className="px-12 py-24">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Frequently Asked Questions (FAQs)</h2>
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className={`bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-6 hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer ${expandedFaq === index ? 'bg-white/10' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-90' : ''}`} />
                </div>
                {expandedFaq === index && (
                  <div className="mt-4 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Contact Form */}
      <section className="px-12 py-24">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-t from-gray-500 to-white pb-6">Ready to Start Your Project?</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 hover:border-blue-500/30 transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 hover:border-blue-500/30 transition-all"
            />
            <textarea
              placeholder="Description"
              rows={6}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 hover:border-blue-500/30 transition-all resize-none"
            />
            <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-blue-500/30 transition-all font-medium">
              Submit
            </button>
          </div>
        </RevealOnScroll>
      </section>


    </div>
  );
}