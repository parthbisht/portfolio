import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

/**
 * Animated distorted icosahedron — the central hero orb.
 * Reacts to mouse position via passed-in normX / normY props.
 */
export default function FloatingCrystal({ mouseX = 0, mouseY = 0 }) {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (meshRef.current) {
      // Gentle float + subtle mouse parallax
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.3;
      meshRef.current.rotation.y = t * 0.2 + mouseX * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + mouseY * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4;
      innerRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      {/* Outer distorted sphere */}
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.2, 4]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Inner wireframe crystal */}
      <mesh ref={innerRef} scale={0.7}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Core glow sphere */}
      <mesh scale={0.3}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e0aaff" transparent opacity={0.9} />
      </mesh>

      {/* Point light inside for glow effect */}
      <pointLight color="#7c3aed" intensity={2} distance={6} decay={2} />
    </group>
  );
}
