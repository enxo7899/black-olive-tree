'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { OliveModel } from './OliveModel'

export function Scene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Responsive 3D positioning
  const olivePosition: [number, number, number] = isMobile 
    ? [0, -0.5, 0]      // Center, slightly down on mobile
    : [3, 0, 0]         // Right side on desktop

  const cameraPosition: [number, number, number] = isMobile
    ? [0, 0, 6]         // Pulled back on mobile for full view
    : [0, 0, 7]         // Further back on desktop for wide composition

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 45 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#BC5D41" />
      
      {/* Position olive responsively in 3D space */}
      <group position={olivePosition}>
        <OliveModel />
      </group>
      
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  )
}
