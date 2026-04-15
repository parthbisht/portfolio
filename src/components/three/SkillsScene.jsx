import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';

// Central glowing core
function CoreSphere() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <pointLight color="#a855f7" intensity={3} distance={8} decay={2} />
    </group>
  );
}

// An orbit ring
function OrbitRing({ radius, color, opacity = 0.15, rotation = [Math.PI / 2, 0, 0] }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.01, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// Sphere on orbit path
function OrbitSphere({ radius, speed, angle, color, yTilt = 0 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const a = angle + t * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(a) * radius;
      ref.current.position.z = Math.sin(a) * radius * Math.cos(yTilt);
      ref.current.position.y = Math.sin(a) * radius * Math.sin(yTilt);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      <pointLight color={color} intensity={0.4} distance={1.5} decay={2} />
    </mesh>
  );
}

const ORBITS = [
  { radius: 1.5, color: '#7c3aed', speed: 0.8, count: 6, yTilt: 0 },
  { radius: 2.5, color: '#06b6d4', speed: 0.5, count: 8, yTilt: 0.4 },
  { radius: 3.5, color: '#ec4899', speed: 0.3, count: 10, yTilt: -0.3 },
];

export default function SkillsScene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 2, 7], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <Stars radius={80} depth={40} count={2000} factor={3} fade speed={0.3} />
          <ParticleField count={800} />
          <CoreSphere />
          {ORBITS.map((orbit, oi) => (
            <group key={oi}>
              <OrbitRing radius={orbit.radius} color={orbit.color} rotation={[Math.PI / 2 - orbit.yTilt, 0, 0]} />
              {Array.from({ length: orbit.count }).map((_, i) => (
                <OrbitSphere
                  key={i}
                  radius={orbit.radius}
                  speed={orbit.speed}
                  angle={(i / orbit.count) * Math.PI * 2}
                  color={orbit.color}
                  yTilt={orbit.yTilt}
                />
              ))}
            </group>
          ))}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
