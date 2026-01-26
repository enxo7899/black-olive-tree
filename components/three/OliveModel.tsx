'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OliveModel() {
  const groupRef = useRef<THREE.Group>(null)
  const leafRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

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

    if (leafRef.current) {
      leafRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main Olive Body - Oval shaped */}
      <mesh scale={[1, 1.4, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#1a0f0f"
          roughness={0.2}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Stem - Small cylinder at top */}
      <mesh position={[0, 1.5, 0]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
        <meshPhysicalMaterial
          color="#2d1f0f"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Leaf - Curved plane */}
      <mesh
        ref={leafRef}
        position={[0.3, 1.6, 0]}
        rotation={[0.2, 0.5, 0.3]}
        scale={[0.6, 0.3, 1]}
      >
        <planeGeometry args={[1, 0.4, 8, 4]} />
        <meshPhysicalMaterial
          color="#4a5d3f"
          roughness={0.4}
          metalness={0.2}
          side={THREE.DoubleSide}
          clearcoat={0.3}
        />
      </mesh>

      {/* Additional ambient light for the olive */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#C2A878" />
    </group>
  )
}
