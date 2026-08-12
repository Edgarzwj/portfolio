import { forwardRef } from 'react';
import { Text } from '@react-three/drei';
import { useLanguage } from '../../../i18n/LanguageContext';
import CanvasText3D from './CanvasText3D';

/**
 * I18nText3D
 *
 * Dual-path 3D text:
 *  - English (en): renders with the original hand-drawn sketch font via troika
 *    <Text>, preserving the portfolio's visual tone.
 *  - Chinese (zh): renders via CanvasText3D (system fonts) so CJK glyphs show
 *    correctly without bundling a large font file.
 *
 * Both branches expose the underlying mesh/object through `ref`, so existing
 * per-frame animation code (position / opacity / scale) keeps working.
 */
const I18nText3D = forwardRef(({
    en,
    zh,
    sketchFont = '/fonts/CabinSketch-Regular.ttf',
    position = [0, 0, 0],
    fontSize = 0.3,
    color = '#1a1a1a',
    anchorX = 'center',
    anchorY = 'middle',
    italic = false,
    bold = false,
    letterSpacing,
    ...rest
}, ref) => {
    const { language } = useLanguage();

    if (language === 'zh') {
        return (
            <CanvasText3D
                ref={ref}
                text={zh}
                fontSize={fontSize}
                color={color}
                position={position}
                anchorX={anchorX}
                anchorY={anchorY}
                italic={italic}
                bold={bold}
                {...rest}
            />
        );
    }

    return (
        <Text
            ref={ref}
            font={sketchFont}
            fontSize={fontSize}
            color={color}
            anchorX={anchorX}
            anchorY={anchorY}
            position={position}
            fontStyle={italic ? 'italic' : 'normal'}
            letterSpacing={letterSpacing}
            {...rest}
        >
            {en}
        </Text>
    );
});

I18nText3D.displayName = 'I18nText3D';

export default I18nText3D;
