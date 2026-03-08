import { useEffect, useState } from 'react';
import CareersDesktop from './CareersDesktop';
import CareersMobile from './CareersMobile';

const Careers = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 767px)').matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const handleChange = (event) => setIsMobile(event.matches);

        mediaQuery.addEventListener('change', handleChange);
        setIsMobile(mediaQuery.matches);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return isMobile ? <CareersMobile /> : <CareersDesktop />;
};

export default Careers;
