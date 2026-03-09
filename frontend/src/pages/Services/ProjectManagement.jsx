import { useEffect, useState } from 'react';
import ProjectManagementDesktop from './ProjectManagementDesktop';
import ProjectManagementMobile from './ProjectManagementMobile';

const MOBILE_BREAKPOINT = '(max-width: 767px)';

const ProjectManagement = () => {
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

    return isMobile ? <ProjectManagementMobile /> : <ProjectManagementDesktop />;
};

export default ProjectManagement;
