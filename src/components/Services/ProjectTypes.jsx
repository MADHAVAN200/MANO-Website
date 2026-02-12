import React from 'react';

const ProjectTypes = ({ title, description, items }) => {
    return (
        <section className="py-16 md:py-24 px-6 md:px-12 border-y border-white/5 bg-black/50 animate-in fade-in duration-1000 slide-in-from-bottom-10 delay-800">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            `}</style>

            <div className="max-w-7xl mx-auto text-center font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <h1 className="text-3xl font-semibold text-center mx-auto text-white mb-2">{title}</h1>
                {description && (
                    <p className="text-sm text-slate-400 text-center mt-2 max-w-lg mx-auto mb-10">{description}</p>
                )}

                <div className="flex flex-col md:flex-row items-center gap-2 h-[600px] md:h-[400px] w-full max-w-7xl mx-auto group/accordion mt-10">
                    {items.map((item, index) => (
                        <div key={index} className="relative group flex-grow transition-all duration-500 w-full md:w-28 hover:w-full md:hover:w-[300%] h-[140px] md:h-[400px] overflow-hidden rounded-lg border border-white/10">
                            <img
                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                                src={item.image}
                                alt={item.name}
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-center text-center group-hover:items-start group-hover:text-left p-6 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-300 opacity-100 group-hover/accordion:opacity-0 group-hover:!opacity-100">
                                <h3 className="text-xl md:text-2xl font-bold leading-tight">{item.name}</h3>
                                <p className="text-xs md:text-sm text-gray-200 mt-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 line-clamp-2 overflow-hidden">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectTypes;
