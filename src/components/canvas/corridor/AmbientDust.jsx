import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '../../../context/PerformanceContext';

/**
 * AmbientDust
 *
 * Subtle floating dust motes distributed through the corridor volume. Purely
 * decorative "alive" detail (TODO #13: "pyłki w korytarzu").
 *
 * - Count scales with the active performance tier (settings.particleCount).
 * - Disabled entirely when the user prefers reduced motion.
 * - Uses a procedurally generated soft radial sprite (no external asset).
 */

const CORRIDOR_MIN_Z = -70;
const CORRIDOR_MAX_Z = 30;
const X_SPREAD = 7;
const Y_SPREAD = 5;
const BASE_COUNT = 140;

// Generate a soft radial sprite so points read as dust, not hard squares.
const makeDustTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const AmbientDust = () => {
  const { settings } = usePerformance();
  const pointsRef = useRef(null);
  const texture = useMemo(() => makeDustTexture(), []);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const count = Math.max(20, Math.round(BASE_COUNT * (settings.particleCount ?? 1)));

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * X_SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * Y_SPREAD;
      positions[i * 3 + 2] =
        CORRIDOR_MIN_Z + Math.random() * (CORRIDOR_MAX_Z - CORRIDOR_MIN_Z);
      speeds[i] = 0.15 + Math.random() * 0.45;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.userData.speeds = speeds;
    return geo;
  }, [count]);

  useFrame((state, delta) => {
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position;
    const speeds = geo.userData.speeds;
    const clampedDelta = Math.min(delta, 0.05); // Guard against tab-switch jumps
    const t = state.clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      // Drift gently toward the camera (+Z), wrap around at the far end.
      let z = pos.getZ(i) + speeds[i] * clampedDelta * 0.4;
      if (z > CORRIDOR_MAX_Z) z = CORRIDOR_MIN_Z;
      pos.setZ(i, z);

      // Tiny horizontal bob so the field feels alive, not linear.
      const x = pos.getX(i) + Math.sin(t * 0.3 + i) * 0.0006;
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  if (reduced) return null;

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={texture}
        size={0.35}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default AmbientDust;
