import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingCrystal from './FloatingCrystal';

/**
 * Full-screen Three.js canvas for the hero section.
 * Canvas is absolutely positioned behind the hero text.
 */
export default function HeroScene({ mouseX = 0, mouseY = 0 }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Ambient + directional lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#a855f7" />
          <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#06b6d4" />

          {/* Deep space stars */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

          {/* Floating particle cloud */}
          <ParticleField count={2500} />

          {/* Main hero crystal */}
          <FloatingCrystal mouseX={mouseX} mouseY={mouseY} />

          {/* Orbit controls — disabled for auto animation, enabled on mobile drag */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
