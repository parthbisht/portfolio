import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

/**
 * A single skill sphere that orbits around the origin.
 * `angle` = starting angle, `radius` = orbit radius, `speed` = orbit speed.
 */
export default function SkillOrb({ name, angle, radius, speed, color, yOffset = 0 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = angle + t * speed;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(a) * radius;
      groupRef.current.position.z = Math.sin(a) * radius;
      groupRef.current.position.y = yOffset + Math.sin(t * 0.5 + angle) * 0.2;
      // Always face camera
      groupRef.current.rotation.y = -a;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.85}
        />
      </mesh>
      <Text
        position={[0, 0.45, 0]}
        fontSize={0.18}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Medium.woff"
      >
        {name}
      </Text>
      <pointLight color={color} intensity={0.5} distance={2} decay={2} />
    </group>
  );
}
