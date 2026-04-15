import { useState, useEffect } from 'react';

/**
 * Track mouse/pointer position for custom cursor and parallax effects.
 * Returns normalized [-1, 1] coordinates as well as raw pixel values.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, normX: 0, normY: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({
        x,
        y,
        normX: (x / window.innerWidth) * 2 - 1,
        normY: -(y / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}
