import React from 'react';

export function ProgressiveBlur({
    direction = 'left',
    className = "",
    blurIntensity = 1
}) {
    const getGradient = () => {
        switch (direction) {
            case 'left':
                return 'linear-gradient(to right, black, transparent)';
            case 'right':
                return 'linear-gradient(to left, black, transparent)';
            case 'top':
                return 'linear-gradient(to bottom, black, transparent)';
            case 'bottom':
                return 'linear-gradient(to top, black, transparent)';
            default:
                return 'linear-gradient(to right, black, transparent)';
        }
    };

    return (
        <div
            className={`${className} pointer-events-none`}
            style={{
                backdropFilter: `blur(${blurIntensity * 8}px)`,
                WebkitBackdropFilter: `blur(${blurIntensity * 8}px)`,
                maskImage: getGradient(),
                WebkitMaskImage: getGradient(),
            }}
        />
    );
}
