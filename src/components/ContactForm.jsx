import React from 'react';
import RainbowButton from './RainbowButton';

const ContactForm = () => {
    return (
        <section className="relative z-10">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-white/5 to-white/0 hover:to-blue-600/10 border border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500 p-8 md:p-12 rounded-3xl backdrop-blur-xl group">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">Ready to Start Your Project?</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                        <textarea
                            placeholder="Tell us about your project..."
                            rows={4}
                            className="w-full px-6 py-4 rounded-xl backdrop-blur-xl bg-black/50 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-all resize-none"
                        />
                    </div>
                    <div className="mt-6">
                        <RainbowButton className="w-full">
                            Submit
                        </RainbowButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
