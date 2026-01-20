import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

export function InfiniteSlider({
    children,
    gap = 20,
    reverse = false,
    speed = 20,
    className = ""
}) {
    const [contentWidth, setContentWidth] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            setContentWidth(contentRef.current.scrollWidth);
        }
    }, [children]);

    return (
        <div className={`overflow-hidden flex w-full ${className}`}>
            <motion.div
                className="flex shrink-0"
                style={{ gap: `${gap}px` }}
                animate={{
                    x: reverse ? [0, -contentWidth / 2] : [-contentWidth / 2, 0]
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                <div ref={contentRef} className="flex shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
                <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
