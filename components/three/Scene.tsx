'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { OliveModel } from './OliveModel'
import { useEffect, useState } from 'react'

function ResponsiveOliveModel() {
  const { viewport } = useThree()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(viewport.width < 7)
  }, [viewport.width])

  return (
    <group position={[0, isMobile ? 1 : 0, 0]}>
      <OliveModel />
    </group>
  )
}

function ResponsiveCamera() {
  const { camera, viewport } = useThree()
  
  useEffect(() => {
    const isMobile = viewport.width < 7
    camera.position.z = isMobile ? 7 : 5
    camera.updateProjectionMatrix()
  }, [camera, viewport.width])

  return null
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      shadows
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ResponsiveCamera />
      
      {/* Ambient base */}
      <ambientLight intensity={0.2} />

      {/* Key Light - Warm from top-left */}
      <directionalLight
        position={[-5, 8, 4]}
        intensity={1.2}
        color="#C2A878"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Rim Light - Creates separation from background */}
      <spotLight
        position={[0, 4, -6]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        distance={20}
      />

      {/* Fill Light - Subtle from right */}
      <pointLight
        position={[4, 2, 3]}
        intensity={0.6}
        color="#F2F0E9"
      />

      {/* Responsive Olive Model */}
      <ResponsiveOliveModel />

      {/* Environment for natural reflections */}
      <Environment
        preset="sunset"
        background={false}
      />
    </Canvas>
  )
}
