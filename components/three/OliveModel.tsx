'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OliveModel() {
  const groupRef = useRef<THREE.Group>(null)
  const leaf1Ref = useRef<THREE.Mesh>(null)
  const leaf2Ref = useRef<THREE.Mesh>(null)
  const leaf3Ref = useRef<THREE.Mesh>(null)

  // Create elegant S-curve branch flowing vertically
  const branchGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0.3, -1.5, 0.1),
      new THREE.Vector3(-0.2, 0, -0.1),
      new THREE.Vector3(0.1, 1.5, 0),
      new THREE.Vector3(0, 3, 0),
    ])
    
    return new THREE.TubeGeometry(curve, 32, 0.06, 12, false)
  }, [])

  // Create teardrop leaf shape
  const createLeafGeometry = () => {
    const shape = new THREE.Shape()
    
    shape.moveTo(0, 0)
    shape.quadraticCurveTo(0.2, 0.4, 0.08, 0.8)
    shape.quadraticCurveTo(0, 1, 0, 1.1)
    shape.quadraticCurveTo(0, 1, -0.08, 0.8)
    shape.quadraticCurveTo(-0.2, 0.4, 0, 0)
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 4,
    }
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }

  const leafGeometry = useMemo(() => createLeafGeometry(), [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Gentle floating animation for entire branch
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.15
      groupRef.current.rotation.y += 0.003
    }

    // Subtle wind effect on leaves - different phases for natural feel
    if (leaf1Ref.current) {
      leaf1Ref.current.rotation.z = Math.sin(time * 1.2) * 0.08
      leaf1Ref.current.rotation.x = Math.cos(time * 0.9) * 0.05
    }
    if (leaf2Ref.current) {
      leaf2Ref.current.rotation.z = Math.sin(time * 1.4 + 1) * 0.1
      leaf2Ref.current.rotation.x = Math.cos(time * 1.1 + 1) * 0.06
    }
    if (leaf3Ref.current) {
      leaf3Ref.current.rotation.z = Math.sin(time * 1.1 + 2) * 0.09
      leaf3Ref.current.rotation.x = Math.cos(time * 1.3 + 2) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* The Branch - Dark woody stem */}
      <mesh geometry={branchGeometry}>
        <meshStandardMaterial
          color="#1a1410"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Leaf 1 - Upper left */}
      <mesh
        ref={leaf1Ref}
        position={[0.15, 1.8, 0]}
        rotation={[0.4, 0.6, 0.3]}
        scale={[0.8, 0.8, 1]}
        geometry={leafGeometry}
      >
        <meshPhysicalMaterial
          color="#1a1f18"
          roughness={0.2}
          metalness={0.05}
          transmission={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Leaf 2 - Middle right */}
      <mesh
        ref={leaf2Ref}
        position={[-0.2, 0.5, 0.1]}
        rotation={[0.2, -0.5, -0.2]}
        scale={[0.9, 0.9, 1]}
        geometry={leafGeometry}
      >
        <meshPhysicalMaterial
          color="#1a1f18"
          roughness={0.2}
          metalness={0.05}
          transmission={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Leaf 3 - Lower left */}
      <mesh
        ref={leaf3Ref}
        position={[0.25, -0.8, -0.05]}
        rotation={[0.3, 0.7, 0.4]}
        scale={[0.85, 0.85, 1]}
        geometry={leafGeometry}
      >
        <meshPhysicalMaterial
          color="#1a1f18"
          roughness={0.2}
          metalness={0.05}
          transmission={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* The Olive - Single jewel at the tip */}
      <mesh position={[0, 3.2, 0]} scale={[0.35, 0.5, 0.35]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.1}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* Small stem connecting olive to branch */}
      <mesh position={[0, 2.95, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.15, 8]} />
        <meshStandardMaterial
          color="#2d2520"
          roughness={0.7}
        />
      </mesh>
    </group>
  )
}
