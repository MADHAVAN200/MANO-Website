import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const CompanyContext = createContext('PCPL');

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentBrand, setCurrentBrand] = useState('PCPL');

    useEffect(() => {
        if (brand) {
            const normalizedBrand = brand.toUpperCase();
            if (normalizedBrand === 'PCPL' || normalizedBrand === 'PPL') {
                setCurrentBrand(normalizedBrand);
            } else {
                // Invalid brand, redirect to gateway
                navigate('/', { replace: true });
            }
        }
    }, [brand, navigate, location.pathname]);

    return (
        <CompanyContext.Provider value={{ brand: currentBrand, isPPL: currentBrand === 'PPL', isPCPL: currentBrand === 'PCPL' }}>
            {children}
        </CompanyContext.Provider>
    );
};
