import { forwardRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

/**
 * CanvasText3D
 *
 * Renders text to a 2D <canvas> using the BROWSER's system fonts and maps it
 * onto a transparent plane. This is CJK-safe: unlike troika <Text> (which needs
 * a dedicated font file), it uses whatever fonts the OS provides, so Chinese,
 * Japanese, etc. render correctly without bundling a multi-MB font.
 *
 * Use this for Chinese (zh) variants of 3D text. English variants keep the
 * hand-drawn sketch fonts via the I18nText3D wrapper.
 */

// System font stack with good CJK coverage across OSes.
const CJK_FONT_STACK =
    '"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC","Source Han Sans SC","WenQuanYi Micro Hei",sans-serif';

const CanvasText3D = forwardRef(({
    text = '',
    fontSize = 0.3,          // world-space height of the text
    color = '#1a1a1a',
    position = [0, 0, 0],
    italic = false,
    bold = false,
    opacity = 1,
    anchorX = 'center',      // 'left' | 'center' | 'right'
    anchorY = 'middle',      // 'top' | 'middle' | 'bottom'
}, ref) => {
    const texture = useMemo(() => {
        if (!text) return null;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // px size for crisp rasterization (scales with world size)
        const px = Math.max(32, Math.round(fontSize * 220));
        const weight = bold ? 700 : 400;
        const style = italic ? 'italic' : 'normal';
        const font = `${style} ${weight} ${px}px ${CJK_FONT_STACK}`;

        ctx.font = font;
        const metrics = ctx.measureText(text);
        const padX = Math.round(px * 0.22);
        const padY = Math.round(px * 0.3);
        const w = Math.ceil(metrics.width + padX * 2);
        const h = Math.ceil(px * 1.35 + padY * 2);

        canvas.width = w;
        canvas.height = h;

        // Re-apply font + clear after resize (resizing resets context state)
        ctx.font = font;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, w / 2, h / 2);

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        tex.needsUpdate = true;
        tex.userData.aspect = w / h;

        return tex;
    }, [text, fontSize, color, italic, bold]);

    useEffect(() => {
        return () => {
            if (texture) texture.dispose();
        };
    }, [texture]);

    if (!texture) return null;

    const aspect = texture.userData.aspect;
    const planeH = fontSize;
    const planeW = planeH * aspect;

    // Mimic troika anchorX/anchorY by shifting the plane so its box edge lands
    // on `position`.
    let ox = 0;
    let oy = 0;
    if (anchorX === 'left') ox = -planeW / 2;
    else if (anchorX === 'right') ox = planeW / 2;
    if (anchorY === 'top') oy = -planeH / 2;
    else if (anchorY === 'bottom') oy = planeH / 2;

    return (
        <mesh
            ref={ref}
            position={[position[0] + ox, position[1] + oy, position[2]]}
        >
            <planeGeometry args={[planeW, planeH]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={opacity}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    );
});

CanvasText3D.displayName = 'CanvasText3D';

export default CanvasText3D;
