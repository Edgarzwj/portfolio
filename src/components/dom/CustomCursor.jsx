import { useEffect, useRef } from 'react';

/**
 * CustomCursor
 *
 * Desktop-only custom cursor built from the pre-supplied cursor sprites
 * (/cursors/cursor-default.webp, /cursors/cursor-pointer.webp).
 *
 * - Only active on devices with a fine pointer (mouse / trackpad). Touch
 *   devices keep their native behaviour (no cursor to replace).
 * - Switches to the "pointer" sprite when hovering interactive elements.
 * - Honours prefers-reduced-motion by snapping instead of trailing.
 *
 * The component injects a single scoped <style> tag; no global stylesheet edit
 * is required.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const isInteractive = (el) =>
      !!(el && el.closest &&
        el.closest('a, button, [role="button"], [data-cursor="pointer"], .interactive, input, textarea, select'));

    const onOver = (e) => {
      root.classList.toggle('cursor-pointer', isInteractive(e.target));
    };

    const render = () => {
      const ease = reduced ? 1 : 0.22;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor', 'cursor-pointer');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <style>{`
        .has-custom-cursor,
        .has-custom-cursor * {
          cursor: none !important;
        }
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          width: 30px;
          height: 30px;
          pointer-events: none;
          will-change: transform;
          background: url('/cursors/cursor-default.webp') center / contain no-repeat;
          transition: background-image 0.12s ease;
        }
        .has-custom-cursor.cursor-pointer .custom-cursor-dot {
          background-image: url('/cursors/cursor-pointer.webp');
        }
        @media (prefers-reduced-motion: reduce) {
          .custom-cursor-dot { transition: none; }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
