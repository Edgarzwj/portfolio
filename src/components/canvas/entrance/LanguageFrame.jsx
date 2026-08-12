import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLanguage } from '../../../i18n/LanguageContext';

/**
 * LanguageFrame
 *
 * A clickable "picture frame" hung on the entrance wall. Tapping it toggles
 * the site language between English and Chinese. The face is drawn to a canvas
 * (system fonts) so both "EN" and "中文" render correctly, and the active
 * language is highlighted.
 *
 * Rendered only before the user enters (when !hasEntered), matching the
 * requested "刚开始进入的界面" placement.
 */

const FONT_STACK = '"PingFang SC","Microsoft YaHei","Noto Sans SC",sans-serif';

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

const LanguageFrame = ({ position = [0, 0, 22] }) => {
    const { language, toggleLanguage } = useLanguage();
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Build the framed face canvas (rebuilds when language changes)
    const texture = useMemo(() => {
        const W = 512;
        const H = 640;
        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d');

        // Paper background
        ctx.fillStyle = '#f7f3ea';
        ctx.fillRect(0, 0, W, H);

        // Inner border
        ctx.strokeStyle = '#d8cdb8';
        ctx.lineWidth = 8;
        ctx.strokeRect(10, 10, W - 20, H - 20);

        // Top caption
        ctx.fillStyle = '#8a7f6a';
        ctx.font = `600 30px ${FONT_STACK}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('语言 / LANGUAGE', W / 2, 62);

        const drawRow = (label, y, active) => {
            if (active) {
                ctx.fillStyle = 'rgba(31,111,235,0.12)';
                roundRect(ctx, 64, y - 46, W - 128, 92, 18);
                ctx.fill();
                ctx.fillStyle = '#1f6feb';
            } else {
                ctx.fillStyle = '#9a9a9a';
            }
            ctx.font = `700 54px ${FONT_STACK}`;
            ctx.fillText(label, W / 2, y);

            if (active) {
                ctx.fillStyle = '#1f6feb';
                ctx.beginPath();
                ctx.arc(W - 96, y, 12, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        drawRow('EN', 262, language === 'en');
        drawRow('中文', 444, language === 'zh');

        // Bottom hint in the *other* language
        ctx.fillStyle = '#b0a890';
        ctx.font = `400 26px ${FONT_STACK}`;
        ctx.fillText(language === 'zh' ? '点击切换' : 'Tap to switch', W / 2, H - 52);

        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        tex.needsUpdate = true;
        return tex;
    }, [language]);

    useEffect(() => {
        return () => {
            if (texture) texture.dispose();
        };
    }, [texture]);

    // Gentle hover scale
    useFrame(() => {
        if (!groupRef.current) return;
        const target = hovered ? 1.08 : 1.0;
        const s = THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.15);
        groupRef.current.scale.set(s, s, s);
    });

    const stop = (e) => e.stopPropagation();

    return (
        <group ref={groupRef} position={position}>
            {/* Outer wooden frame */}
            <mesh>
                <boxGeometry args={[1.5, 1.9, 0.06]} />
                <meshBasicMaterial color="#5b4636" />
            </mesh>

            {/* Canvas face (paper) */}
            <mesh position={[0, 0, 0.04]}>
                <planeGeometry args={[1.3, 1.62]} />
                <meshBasicMaterial map={texture} transparent toneMapped={false} />
            </mesh>

            {/* Invisible hitbox for clicks/hover */}
            <mesh
                position={[0, 0, 0.12]}
                onClick={(e) => {
                    stop(e);
                    toggleLanguage();
                }}
                onPointerOver={(e) => {
                    stop(e);
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    stop(e);
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <planeGeometry args={[1.5, 1.9]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
        </group>
    );
};

export default LanguageFrame;
