import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated particle field — thousands of tiny points drifting in 3D space.
 * Uses instanced BufferGeometry for maximum performance.
 */
export default function ParticleField({ count = 3000 }) {
  const meshRef = useRef();

  // Generate random positions once
  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;  // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;  // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;  // z
      rnd[i] = Math.random();
    }
    return [pos, rnd];
  }, [count]);

  // Animate: slowly rotate the whole cloud + individual drift via shader
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.03;
    meshRef.current.rotation.x = t * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          array={randoms}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a855f7"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
