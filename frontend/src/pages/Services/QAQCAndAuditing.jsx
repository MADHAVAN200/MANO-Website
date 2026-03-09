import { useEffect, useState } from 'react';
import QAQCAndAuditingDesktop from './QAQCAndAuditingDesktop';
import QAQCAndAuditingMobile from './QAQCAndAuditingMobile';

const MOBILE_BREAKPOINT = '(max-width: 767px)';

const QAQCAndAuditing = () => {
    const getIsMobile = () => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return false;
        }
        return window.matchMedia(MOBILE_BREAKPOINT).matches;
    };

    const [isMobile, setIsMobile] = useState(getIsMobile);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) {
            return undefined;
        }

        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
        const handleChange = (event) => {
            setIsMobile(event.matches);
        };

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return isMobile ? <QAQCAndAuditingMobile /> : <QAQCAndAuditingDesktop />;
};

export default QAQCAndAuditing;
