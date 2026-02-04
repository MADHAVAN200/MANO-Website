import React from 'react';
import { Zap, BarChart3, Activity, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const DigitalERPSection = ({
    title = `Specialized <span class="text-blue-500">Digital ERP</span> <br /> Management Systems`,
    description = "Technology-Driven Execution Monitoring. We leverage a modern, specialized ERP for tracking and making the flow of work efficient across all our services, from engineering approvals to site progress.",
    features = [
        { title: "Specialized ERP Dashboards", icon: BarChart3 },
        { title: "Procurement & Workflow Trackers", icon: Activity },
        { title: "Work-flow Performance Analytics", icon: ShieldCheck },
        { title: "Real-time Efficiency Models", icon: Clock },
    ]
}) => {

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative group p-8 md:p-12 rounded-[2rem] border border-white/10 bg-[#0a0a0c] overflow-hidden shadow-2xl">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
                                {description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-all duration-300"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <Zap size={16} fill="currentColor" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-200">{feature.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Graphic/Dashboard Illustration */}
                        <div className="relative h-[300px] md:h-[400px] w-full bg-[#111114] rounded-2xl border border-white/5 shadow-inner p-6 overflow-hidden">
                            {/* Browser/Dashboard Frame UI */}
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>

                            <div className="space-y-6">
                                <div className="h-8 w-1/3 bg-white/5 rounded-md mb-8 animate-pulse" />

                                <div className="grid grid-cols-4 gap-4 items-end h-40">
                                    {[60, 85, 45, 100].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="bg-blue-500 rounded-t-lg shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                        />
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="h-20 bg-white/5 rounded-xl border border-white/5 animate-pulse" />
                                    <div className="h-20 bg-white/5 rounded-xl border border-white/5 animate-pulse" />
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalERPSection;
