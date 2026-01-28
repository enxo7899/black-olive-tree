'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OliveModel() {
  const groupRef = useRef<THREE.Group>(null)
  const leafRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Create organic leaf shape using curves
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    
    // Start at bottom center of leaf
    shape.moveTo(0, 0)
    
    // Right side of leaf - smooth curve to tip
    shape.quadraticCurveTo(0.15, 0.3, 0.05, 0.6)  // Control point, end point
    shape.quadraticCurveTo(0, 0.7, 0, 0.75)       // Tip of leaf
    
    // Left side of leaf - mirror curve back down
    shape.quadraticCurveTo(0, 0.7, -0.05, 0.6)
    shape.quadraticCurveTo(-0.15, 0.3, 0, 0)      // Back to start
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 3,
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  // Create organic stem curve
  const stemGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.05, 0.1, 0),
      new THREE.Vector3(-0.02, 0.2, 0),
      new THREE.Vector3(0, 0.3, 0),
    ])
    
    return new THREE.TubeGeometry(curve, 12, 0.03, 8, false)
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const baseRotationSpeed = 0.2
      const hoverMultiplier = hovered ? 2.5 : 1
      groupRef.current.rotation.y += 0.01 * baseRotationSpeed * hoverMultiplier

      if (hovered) {
        groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.3 + 0.3
      } else {
        groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
      }
    }

    // Gentle wind effect on leaf
    if (leafRef.current) {
      leafRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.5) * 0.08
      leafRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 1.2) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main Olive Body - High poly smooth sphere */}
      <mesh scale={[1, 1.4, 1]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a0f0f"
          roughness={0.2}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Organic Stem - Curved tube */}
      <mesh position={[0, 1.4, 0]} geometry={stemGeometry}>
        <meshStandardMaterial
          color="#3d2f1f"
          roughness={0.7}
        />
      </mesh>

      {/* Organic Leaf - Extruded shape with curves */}
      <mesh
        ref={leafRef}
        position={[0.1, 1.7, 0]}
        rotation={[0.3, 0.4, 0.2]}
        scale={[1.2, 1.2, 1]}
        geometry={leafGeometry}
      >
        <meshStandardMaterial
          color="#2D382B"
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rembrandt Lighting - Dramatic spotlight on olive */}
      <spotLight
        position={[3, 4, 2]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#C2A878"
        castShadow
        target-position={[0, 0, 0]}
      />
      
      {/* Fill light - subtle */}
      <pointLight position={[-2, 1, -1]} intensity={0.3} color="#F2F0E9" />
    </group>
  )
}
