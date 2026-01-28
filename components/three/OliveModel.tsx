'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OliveModel() {
  const groupRef = useRef<THREE.Group>(null)
  const leaf1Ref = useRef<THREE.Mesh>(null)
  const leaf2Ref = useRef<THREE.Mesh>(null)

  // PARAMETRIC CURVE - The Branch "Spine"
  const { branchCurve, branchGeometry, centeredOffset } = useMemo(() => {
    // Define curve points for elegant S-curve
    const rawPoints = [
      new THREE.Vector3(-1.2, -0.4, 0),
      new THREE.Vector3(-0.6, -0.1, 0),
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(0.6, 0.3, 0),
      new THREE.Vector3(1.2, 0.5, 0),
    ]
    
    const curve = new THREE.CatmullRomCurve3(rawPoints)
    
    // Calculate center point of curve and offset to origin
    const centerPoint = curve.getPointAt(0.5)
    const offset = new THREE.Vector3(-centerPoint.x, -centerPoint.y, -centerPoint.z)
    
    // Apply offset to all points
    const centeredPoints = rawPoints.map(p => p.clone().add(offset))
    const centeredCurve = new THREE.CatmullRomCurve3(centeredPoints)
    
    const geometry = new THREE.TubeGeometry(centeredCurve, 32, 0.06, 8, false)
    
    return {
      branchCurve: centeredCurve,
      branchGeometry: geometry,
      centeredOffset: offset
    }
  }, [])

  // Organic leaf shape - almond/teardrop
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    
    // Smooth organic leaf
    shape.moveTo(0, 0)
    shape.quadraticCurveTo(0.3, 0.2, 0.35, 0.5)
    shape.quadraticCurveTo(0.32, 0.8, 0.15, 1.0)
    shape.quadraticCurveTo(0, 1.15, 0, 1.2)
    shape.quadraticCurveTo(0, 1.15, -0.15, 1.0)
    shape.quadraticCurveTo(-0.32, 0.8, -0.35, 0.5)
    shape.quadraticCurveTo(-0.3, 0.2, 0, 0)
    
    return new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 5,
    })
  }, [])

  // Calculate positions and rotations from curve
  const attachmentPoints = useMemo(() => {
    // Leaf 1 at t=0.9 (near tip)
    const leaf1Pos = branchCurve.getPointAt(0.9)
    const leaf1Tangent = branchCurve.getTangentAt(0.9)
    const leaf1Angle = Math.atan2(leaf1Tangent.y, leaf1Tangent.x)
    
    // Leaf 2 at t=0.6
    const leaf2Pos = branchCurve.getPointAt(0.6)
    const leaf2Tangent = branchCurve.getTangentAt(0.6)
    const leaf2Angle = Math.atan2(leaf2Tangent.y, leaf2Tangent.x)
    
    // Olive 1 at t=0.4
    const olive1Pos = branchCurve.getPointAt(0.4)
    
    // Olive 2 at t=0.7
    const olive2Pos = branchCurve.getPointAt(0.7)
    
    return {
      leaf1: { position: leaf1Pos, angle: leaf1Angle },
      leaf2: { position: leaf2Pos, angle: leaf2Angle },
      olive1: { position: olive1Pos },
      olive2: { position: olive2Pos },
    }
  }, [branchCurve])

  // Oscillating animation (no drift)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1
      // Oscillating rotation (not continuous)
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2
      groupRef.current.rotation.z = Math.sin(time * 0.25) * 0.05
    }

    // Leaf sway
    if (leaf1Ref.current) {
      leaf1Ref.current.rotation.z = Math.sin(time * 1.1) * 0.1
    }
    if (leaf2Ref.current) {
      leaf2Ref.current.rotation.z = Math.sin(time * 1.3 + 1) * 0.08
    }
  })

  return (
    <group ref={groupRef} scale={[2.2, 2.2, 2.2]}>
      {/* The Branch - Centered at origin */}
      <mesh geometry={branchGeometry} castShadow>
        <meshStandardMaterial
          color="#5a4a3a"
          roughness={0.8}
        />
      </mesh>

      {/* Leaf 1 - Attached at t=0.9 */}
      <mesh
        ref={leaf1Ref}
        position={[
          attachmentPoints.leaf1.position.x,
          attachmentPoints.leaf1.position.y,
          attachmentPoints.leaf1.position.z + 0.05
        ]}
        rotation={[
          -0.3,
          attachmentPoints.leaf1.angle - Math.PI / 2,
          0.4
        ]}
        scale={[0.5, 0.5, 1]}
        geometry={leafGeometry}
        castShadow
      >
        <meshPhysicalMaterial
          color="#c4d92e"
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Leaf 2 - Attached at t=0.6 */}
      <mesh
        ref={leaf2Ref}
        position={[
          attachmentPoints.leaf2.position.x,
          attachmentPoints.leaf2.position.y,
          attachmentPoints.leaf2.position.z - 0.08
        ]}
        rotation={[
          -0.4,
          attachmentPoints.leaf2.angle + Math.PI / 2,
          -0.3
        ]}
        scale={[0.52, 0.52, 1]}
        geometry={leafGeometry}
        castShadow
      >
        <meshPhysicalMaterial
          color="#b8c930"
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Olive 1 - Hanging below branch at t=0.4 */}
      <group 
        position={[
          attachmentPoints.olive1.position.x,
          attachmentPoints.olive1.position.y,
          attachmentPoints.olive1.position.z
        ]}
      >
        {/* Stem connecting branch to olive */}
        <mesh position={[0, -0.25, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.022, 0.5, 8]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
        </mesh>
        {/* Olive fruit hanging below */}
        <mesh position={[0, -0.55, 0]} scale={[1, 1.35, 1]} castShadow receiveShadow>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial
            color="#5a6e4a"
            roughness={0.2}
            metalness={0}
            clearcoat={0.9}
            clearcoatRoughness={0.15}
          />
        </mesh>
      </group>

      {/* Olive 2 - Hanging below branch at t=0.7 */}
      <group 
        position={[
          attachmentPoints.olive2.position.x,
          attachmentPoints.olive2.position.y,
          attachmentPoints.olive2.position.z + 0.1
        ]}
      >
        {/* Stem connecting branch to olive */}
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.016, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
        </mesh>
        {/* Olive fruit hanging below */}
        <mesh position={[0, -0.45, 0]} scale={[1, 1.3, 1]} castShadow receiveShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshPhysicalMaterial
            color="#5a6e4a"
            roughness={0.2}
            metalness={0}
            clearcoat={0.9}
            clearcoatRoughness={0.15}
          />
        </mesh>
      </group>
    </group>
  )
}
