import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { Send, Briefcase, MessageSquare, ChevronDown } from 'lucide-react';

const ContactForm = () => {
    const { isPPL } = useCompany();
    const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');

    const pcplServices = [
        "Project Management", "Project Execution", "Project Planning",
        "Contract Management", "QA/QC and Auditing", "Cost Consultancy",
        "QS and Auditing", "EHS Audit", "Enquiry"
    ];
    const pplServices = ["EPC Solution", "Enquiry"];
    const services = isPPL ? pplServices : pcplServices;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />
                <input
                    type="text"
                    placeholder="Contact / WhatsApp"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />

                {/* Service Dropdown */}
                <div className="relative md:col-span-2">
                    <button
                        type="button"
                        onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                        className="w-full px-6 py-4 text-left rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg flex justify-between items-center group"
                    >
                        <span className={selectedService ? "text-white" : "text-gray-500"}>{selectedService || "Service Required"}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {serviceDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-30 max-h-60 overflow-y-auto">
                            {services.map((service, index) => (
                                <button key={index} type="button" onClick={() => { setSelectedService(service); setServiceDropdownOpen(false); }} className="w-full text-left px-6 py-3 text-gray-300 hover:bg-blue-600/20 hover:text-white transition-colors">
                                    {service}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <textarea
                    placeholder="Project Details..."
                    rows={3}
                    className="w-full md:col-span-2 px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all resize-none shadow-lg"
                />

                <div className="md:col-span-2">
                    <button className="w-full py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 hover:border-blue-500/30 hover:to-blue-600/10 transition-all font-medium text-white shadow-lg flex items-center justify-center gap-2 group">
                        Submit Request
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
