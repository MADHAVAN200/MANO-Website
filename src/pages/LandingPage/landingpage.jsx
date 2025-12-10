import React, { useState, useEffect } from 'react';
import { ChevronRight, Circle } from 'lucide-react';

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, section: null });

  const projects = [
    { name: 'Ariana Residency', image: '/image.webp' },
    { name: 'Ariana Residency', image: '/image.webp' },
    { name: 'Ariana Residency', image: '/image.webp' },
    { name: 'Ariana Residency', image: '/image.webp' },
    { name: 'Ariana Residency', image: '/image.webp' },
    { name: 'Ariana Residency', image: '/image.webp' },
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
      image: '/image.webp',
      text: 'Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address. Stalkers and disgruntled acquaintances use the Internet to find addresses, phone numbers and other personal details about their targets. Identity thieves use personal information numbers and other personal details.'
    },
    {
      name: 'Sarah Johnson',
      role: 'CEO 2 days ago',
      image: '/image.webp',
      text: 'Outstanding service and professionalism. The team delivered beyond our expectations and helped us achieve our project goals efficiently.'
    },
    {
      name: 'Michael Chen',
      role: 'Project Manager 3 days ago',
      image: '/image.webp',
      text: 'Excellent project management and communication throughout. Would highly recommend their services to anyone looking for quality work.'
    }
  ];

  const faqs = [
    'Project Management Consultants',
    'Project Management Consultants',
    'Project Management Consultants',
    'Project Management Consultants',
    'Project Management Consultants',
    'Project Management Consultants'
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section with Navigation */}
      <section className="relative px-12 pt-6 pb-32 text-center">
        {/* Blue Gradient Background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(79, 18, 253, 0.5) 0%, rgba(79, 18, 253, 0.3) 30%, rgba(79, 18, 253, 0.1) 50%, transparent 80%)'
        }}></div>
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-center mb-24">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-8 py-3 flex gap-12 items-center">
            <a href="#" className="text-white font-medium text-sm">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Services</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Projects</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10">
          <h1 className="text-7xl font-bold mb-8 leading-tight">
            Transforming Projects Into<br />Success Stories
          </h1>
          <p className="text-gray-300 text-lg mb-12 max-w-4xl mx-auto">
            Delivering expert project management, cost consultancy, quality assurance, and<br />
            execution excellence backed by 12+ years of industry trust.
          </p>
          <div className="flex gap-6 justify-center">
            <button className="group relative px-8 py-4 rounded-full overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
              <span className="relative z-10 flex items-center gap-2 text-white font-medium">
                Start Your Project <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <button className="group relative px-8 py-4 rounded-full overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <span className="relative z-10 flex items-center gap-2 text-white font-medium">
                View Our Services <ChevronRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-12 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="text-5xl font-bold">12 Years Experience</h3>
          </div>
          <div>
            <h3 className="text-5xl font-bold">500+ clients</h3>
          </div>
          <div>
            <h3 className="text-5xl font-bold">100+ Projects Completed</h3>
          </div>
          <div>
            <h3 className="text-5xl font-bold">98% Client Satisfaction Rate</h3>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="px-12 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Businesses <span className="text-blue-500">Choose</span> Mano Consultants
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          With 12 years of excellence, we blend deep industry knowledge with client-centric<br />
          approach to deliver measurable results in every project.
        </p>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">End-to-End Project Expertise</h3>
                <p className="text-gray-400">
                  From inception to completion, we handle every phase with precision, ensuring seamless
                  project delivery.
                </p>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Cost Efficiency & Transparency</h3>
                <p className="text-gray-400">
                  Accurate cost estimations, budgeting, and regular audits ensure that your projects stay on
                  track and within budget.
                </p>
              </div>
            </div>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quality-Focused Delivery</h3>
                <p className="text-gray-400">
                  Strict QA/QC processes, quality, and compliance requirements for flawless execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-12 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">Our Core Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Project Planning</h3>
            <p className="text-gray-400 text-sm">
              Strategic blueprints, feasibility studies, and project scoping to set the foundation for
              success.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Project Management</h3>
            <p className="text-gray-400 text-sm">
              Comprehensive scheduling, budgeting, and team coordination for seamless project delivery.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Cost Consultancy</h3>
            <p className="text-gray-400 text-sm">
              Budgeting & ROC calculations, cost control & forecasting, and contract administration.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Project Execution</h3>
            <p className="text-gray-400 text-sm">
              On-site monitoring, resource planning & quality assurance ensuring timely completion.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">QUANTITY SURVEY & Audit</h3>
            <p className="text-gray-400 text-sm">
              Accurate cost estimations, material take-offs, and variance analysis for informed financial
              decisions.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">EHS & Safety Audits</h3>
            <p className="text-gray-400 text-sm">
              Safety compliance, risk assessment, and health & safety training for secure project
              environments.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-2">Quality Assurance & Audit</h3>
            <p className="text-gray-400 text-sm">
              Rigorous inspections, compliance checks, audit reports, ensuring highest quality standards
              throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section 
        className="py-24 overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="text-4xl font-bold text-center mb-20">Featured Projects</h2>
        <div className="relative h-[500px] flex items-center justify-center">
          <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center">
            {projects.map((project, index) => {
              const position = (index - currentProjectIndex + projects.length) % projects.length;
              const isCenter = position === 0;
              const isLeft1 = position === projects.length - 1;
              const isLeft2 = position === projects.length - 2;
              const isRight1 = position === 1;
              const isRight2 = position === 2;
              
              let transform = 'translateX(-50%) scale(0.6) translateZ(-200px)';
              let zIndex = 1;
              let opacity = 0.3;
              
              if (isCenter) {
                transform = 'translateX(-50%) scale(1) translateZ(0px)';
                zIndex = 50;
                opacity = 1;
              } else if (isLeft1) {
                transform = 'translateX(-130%) scale(0.75) translateZ(-100px)';
                zIndex = 40;
                opacity = 0.6;
              } else if (isLeft2) {
                transform = 'translateX(-180%) scale(0.6) translateZ(-200px)';
                zIndex = 30;
                opacity = 0.4;
              } else if (isRight1) {
                transform = 'translateX(30%) scale(0.75) translateZ(-100px)';
                zIndex = 40;
                opacity = 0.6;
              } else if (isRight2) {
                transform = 'translateX(80%) scale(0.6) translateZ(-200px)';
                zIndex = 30;
                opacity = 0.4;
              }
              
              return (
                <div
                  key={index}
                  className="absolute left-1/2 transition-all duration-700 ease-out"
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    filter: isCenter ? 'blur(0px)' : 'blur(1px)'
                  }}
                >
                  <div className="w-[600px] h-[400px] relative group">
                    <div className="relative h-full rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-8 left-8">
                        <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-12 py-24">
        <h2 className="text-4xl font-bold text-center mb-20">Testimonials</h2>
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

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 relative">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                <img 
                  src={testimonials[currentTestimonial].image} 
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
                  className={`transition-all ${
                    index === currentTestimonial 
                      ? 'w-8 h-2 rounded-full bg-white' 
                      : 'w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-12 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions (FAQs)</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer"
            >
              <span className="text-sm">{faq}</span>
              <ChevronRight className="w-5 h-5 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-12 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">Ready to Start Your Project?</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
          />
          <textarea
            placeholder="Description"
            rows={6}
            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all resize-none"
          />
          <button className="w-full py-4 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all font-medium">
            Submit
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>Ready for real <span className="underline cursor-pointer">innovation?</span></p>
      </footer>
    </div>
  );
}