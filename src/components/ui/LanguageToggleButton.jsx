import { useLanguage } from '../../i18n/LanguageContext';
import { useScene } from '../../context/SceneContext';

/**
 * LanguageToggleButton
 *
 * Always-visible (during the entrance) HTML control for switching the site
 * language between English and 中文. Acts as a reliable fallback for the 3D
 * "picture frame" on the entrance wall, which can fall outside the viewport on
 * narrow / portrait screens. Both controls share the same LanguageContext, so
 * the active language stays in sync everywhere.
 *
 * Visible only before the user enters the corridor (matching the requested
 * "刚开始进入的界面" placement).
 */
const LanguageToggleButton = () => {
    const { language, setLanguage } = useLanguage();
    const { hasEntered } = useScene();

    if (hasEntered) return null;

    const containerStyle = {
        position: 'fixed',
        top: '14px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '4px',
        background: '#f7f3ea',
        border: '2px solid #5b4636',
        borderRadius: '14px 12px 15px 11px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
        fontFamily: '"Inter","PingFang SC","Microsoft YaHei",sans-serif',
        userSelect: 'none'
    };

    const segmentStyle = (active) => ({
        border: 'none',
        background: active ? '#1f6feb' : 'transparent',
        color: active ? '#ffffff' : '#5b4636',
        fontWeight: 700,
        fontSize: '14px',
        padding: '6px 13px',
        borderRadius: '10px 9px 11px 8px',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'background 0.15s ease, color 0.15s ease'
    });

    return (
        <div style={containerStyle} role="group" aria-label="Language switch">
            <button
                type="button"
                style={segmentStyle(language === 'en')}
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
            <button
                type="button"
                style={segmentStyle(language === 'zh')}
                onClick={() => setLanguage('zh')}
                aria-pressed={language === 'zh'}
            >
                中文
            </button>
        </div>
    );
};

export default LanguageToggleButton;
