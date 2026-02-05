import React, { useState } from 'react';
import { useCompany } from '../context/CompanyContext';
import { Send, Briefcase, MessageSquare, ChevronDown, Loader2 } from 'lucide-react';

const ContactForm = () => {
    const { isPPL } = useCompany();
    const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        contact_whatsapp: '',
        email: '',
        project_details: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !selectedService) {
            alert("Please fill in all required fields (Name, Email, Service).");
            return;
        }

        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    service_required: selectedService
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Enquiry submitted successfully!");
                setFormData({
                    name: '',
                    company_name: '',
                    contact_whatsapp: '',
                    email: '',
                    project_details: ''
                });
                setSelectedService('');
            } else {
                alert("Failed to submit enquiry: " + result.message);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />
                <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />
                <input
                    type="text"
                    name="contact_whatsapp"
                    value={formData.contact_whatsapp}
                    onChange={handleChange}
                    placeholder="Contact / WhatsApp"
                    className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all shadow-lg"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
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
                    name="project_details"
                    value={formData.project_details}
                    onChange={handleChange}
                    placeholder="Project Details..."
                    rows={3}
                    className="w-full md:col-span-2 px-6 py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none hover:border-blue-500/30 focus:border-blue-500/50 transition-all resize-none shadow-lg"
                />

                <div className="md:col-span-2">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-4 rounded-xl backdrop-blur-xl bg-gradient-to-r from-transparent to-white/5 border border-white/10 hover:border-blue-500/30 hover:to-blue-600/10 transition-all font-medium text-white shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Sending...' : 'Submit Request'}
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
