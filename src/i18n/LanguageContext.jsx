import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

const STORAGE_KEY = 'portfolio-language';

export const LanguageProvider = ({ children }) => {
    // Default to English to keep the original experience intact.
    const [language, setLanguage] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'en' || saved === 'zh') return saved;
        } catch (e) {
            /* localStorage unavailable — fall through to default */
        }
        return 'en';
    });

    // Persist + reflect on <html lang>
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, language);
        } catch (e) {
            /* ignore */
        }
        if (typeof document !== 'undefined') {
            document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
        }
    }, [language]);

    const toggleLanguage = useCallback(() => {
        setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'));
    }, []);

    const setLanguageSafe = useCallback((lang) => {
        if (lang === 'en' || lang === 'zh') setLanguage(lang);
    }, []);

    // Translation helper. Falls back to English, then to the key itself.
    const t = useCallback((key) => {
        const dict = translations[language] || translations.en;
        if (dict[key] !== undefined) return dict[key];
        return translations.en[key] !== undefined ? translations.en[key] : key;
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage: setLanguageSafe,
        toggleLanguage,
        t,
    }), [language, setLanguageSafe, toggleLanguage, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
