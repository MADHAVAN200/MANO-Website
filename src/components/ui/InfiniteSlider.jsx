
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

export function InfiniteSlider({
    children,
    gap = 20,
    reverse = false,
    duration = 20,
    className = ""
}) {
    const [ref, { width }] = useMeasure();

    return (
        <div className={`overflow-hidden flex w-full ${className}`}>
            <motion.div
                className="flex shrink-0"
                style={{
                    gap: `${gap}px`,
                }}
                animate={{
                    x: reverse ? [-width - gap, 0] : [0, -width - gap]
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                <div ref={ref} className="flex shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
                <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
