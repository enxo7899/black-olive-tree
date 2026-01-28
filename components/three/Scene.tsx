'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { OliveModel } from './OliveModel'

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Ambient foundation */}
      <ambientLight intensity={0.15} />

      {/* Rim Light (Backlight) - Creates halo/separation from dark background */}
      <spotLight
        position={[0, 0, -5]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.5}
        color="#ffffff"
        distance={15}
      />

      {/* Key Light - Warm top-left, catches specular highlights */}
      <spotLight
        position={[-4, 6, 3]}
        angle={0.6}
        penumbra={0.6}
        intensity={0.8}
        color="#C2A878"
        castShadow
      />

      {/* Fill Light - Subtle right side */}
      <pointLight
        position={[3, 2, 2]}
        intensity={0.3}
        color="#F2F0E9"
      />

      {/* The Art Piece - Centered */}
      <OliveModel />

      {/* Environment for realistic reflections on glossy surfaces */}
      <Environment
        preset="city"
        background={false}
        blur={1}
      />
    </Canvas>
  )
}
