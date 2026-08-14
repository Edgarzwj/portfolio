import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * ResponsiveCamera
 *
 * Adjusts the camera Field of View (vertical FOV) based on viewport width so the
 * 3D scenes are not clipped on small / portrait screens.
 *
 * IMPORTANT: this component ONLY touches `camera.fov`. The camera position (x/y/z)
 * and lookAt are owned by `useInfiniteCamera`, which rewrites them every frame.
 * Changing fov is the only safe, conflict-free way to improve mobile framing.
 */

// Vertical FOV per breakpoint (R3F PerspectiveCamera.fov is vertical).
// Narrower / portrait viewports get a wider FOV so scenes stop being cropped.
const getFovForWidth = (w) => {
  if (w < 500) return 78;
  if (w < 820) return 70;
  if (w < 1100) return 64;
  return 60;
};

const ResponsiveCamera = () => {
  const { camera } = useThree();

  useEffect(() => {
    const apply = () => {
      const next = getFovForWidth(window.innerWidth);
      if (Math.abs(camera.fov - next) > 0.01) {
        camera.fov = next;
        camera.updateProjectionMatrix();
      }
    };

    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [camera]);

  return null;
};

export default ResponsiveCamera;
