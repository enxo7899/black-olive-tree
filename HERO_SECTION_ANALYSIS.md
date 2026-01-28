# Hero Section Animation Analysis & Issues

## Project Context
**Restaurant**: Black Olive Tree  
**Location**: Southgate, London  
**Tech Stack**: Next.js 16.1.6, React Three Fiber, @react-three/drei, Framer Motion  
**Design Goal**: Luxury Mediterranean restaurant website with 3D olive branch matching logo aesthetic

---

## Current Implementation Overview

### File Structure
1. **`/components/sections/HeroSection.tsx`** - Main hero container with text and 3D scene
2. **`/components/three/Scene.tsx`** - R3F Canvas setup with camera and lighting
3. **`/components/three/OliveModel.tsx`** - 3D olive branch geometry and animations

---

## HeroSection.tsx Architecture

### Layout System
```
<section> (full viewport height with gradient background)
  └── LAYER 1: 3D Canvas (z-0, pointer-events-none)
  └── LAYER 2: Vignette Overlay (z-5, radial gradient)
  └── LAYER 3: Typography (z-10, centered text)
  └── Scroll Indicator (bottom fixed)
```

### Key CSS Properties
- Container: `h-[100dvh]` with gradient `from-[#1A1F18] via-[#1A1F18] to-[#0f120e]`
- 3D Canvas: Absolute positioned, full size, `pointer-events-none`
- Text: Centered with Framer Motion blur-to-focus animation
- Vignette: `radial-gradient(circle at center, transparent 0%, #1A1F18 90%)`

### Text Layout
Three separate lines with staggered animations:
1. **"Black Olive Tree"** - Main heading (text-5xl to text-8xl)
2. **"Restaurant"** - Gold accent (text-accent-gold, text-lg to text-xl)
3. **"Southgate, London"** - Location (text-[#F2F0E9]/70, text-xs to text-sm)

---

## Scene.tsx Architecture

### Camera Setup
```javascript
camera={{ position: [0, 0, 6], fov: 45 }}
```
- **Position**: 6 units away on Z-axis
- **FOV**: 45 degrees
- **Issue**: Camera distance may not properly frame the olive branch composition

### Lighting System
1. **Ambient Light**: `intensity: 0.2` - base illumination
2. **Directional Light** (Key): Position `[-5, 8, 4]`, intensity `1.2`, color `#C2A878` (warm gold)
3. **Spot Light** (Rim): Position `[0, 4, -6]`, intensity `2`, creates separation from background
4. **Point Light** (Fill): Position `[4, 2, 3]`, intensity `0.6`, color `#F2F0E9`
5. **Environment**: Preset `"sunset"` for natural reflections

---

## OliveModel.tsx Architecture

### Component Structure
The olive branch is composed of:
1. Curved branch (TubeGeometry along CatmullRomCurve3)
2. Three bright green leaves (ExtrudeGeometry from custom Shape)
3. Two olives with stems (SphereGeometry + CylinderGeometry)

### Current Positioning
```javascript
<group ref={groupRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
```

#### Branch Curve Points
```javascript
new THREE.Vector3(-0.7, -0.1, 0),  // Start (bottom left)
new THREE.Vector3(-0.3, 0.05, 0),  // Control point 1
new THREE.Vector3(0.1, 0.15, 0),   // Control point 2
new THREE.Vector3(0.5, 0.25, 0),   // End (top right)
```

#### Leaf Positions
- **Leaf 1**: `[0.5, 0.4, 0]` - Top right
- **Leaf 2**: `[-0.3, 0.15, 0.08]` - Middle left (with z-depth)
- **Leaf 3**: `[-0.6, -0.05, -0.05]` - Bottom left (with z-depth)

#### Olive Positions
- **Olive 1**: Group at `[0.2, 0.1, 0]`
  - Stem: `[0, 0, 0]`
  - Fruit: `[0, -0.2, 0]` (sphere radius 0.35, scaled 1x1.35x1)
- **Olive 2**: Group at `[-0.35, 0, 0.1]`
  - Stem: `[0, 0, 0]`
  - Fruit: `[0, -0.18, 0]` (sphere radius 0.32, scaled 1x1.3x1)

### Animation System
```javascript
useFrame(({ clock }) => {
  const time = clock.getElapsedTime()
  
  // Group animation
  groupRef.current.position.y = Math.sin(time * 0.4) * 0.12
  groupRef.current.rotation.y = time * 0.06
  groupRef.current.rotation.z = Math.sin(time * 0.25) * 0.02
  
  // Individual leaf sway
  leaf1Ref.current.rotation.z = Math.sin(time * 1.0) * 0.08
  leaf2Ref.current.rotation.z = Math.sin(time * 1.2 + 1) * 0.07
  leaf3Ref.current.rotation.z = Math.sin(time * 0.9 + 2) * 0.09
})
```

### Color Palette (from Logo)
- **Leaves**: `#c4d92e` and `#b8c930` (bright chartreuse/lime green)
- **Olives**: `#5a6e4a` (dark olive green)
- **Branch/Stems**: `#5a4a3a` (brown)

---

## Current Problems & Misalignment Issues

### 1. **Olives Not Properly Attached to Branch**
**Problem**: The olive group positions (`[0.2, 0.1, 0]` and `[-0.35, 0, 0.1]`) are independent of the branch curve. They don't follow the actual branch path.

**Expected**: Olives should hang from specific points along the branch curve, not floating in arbitrary positions.

**Technical Issue**: The branch is a TubeGeometry along a curve, but olives are positioned in world space rather than along the curve's parametric points.

### 2. **Leaves Not Aligned with Branch**
**Problem**: Leaf positions are hardcoded coordinates that don't necessarily align with the branch curve points.

**Expected**: Leaves should grow from the branch at specific t-values along the curve (e.g., t=0.3, t=0.6, t=0.9).

**Technical Issue**: Leaves are positioned independently rather than calculated from `curve.getPointAt(t)`.

### 3. **Overall Composition Centering**
**Problem**: The branch flows from `[-0.7, -0.1, 0]` to `[0.5, 0.25, 0]`, but the visual center of mass doesn't align with the viewport center `[0, 0, 0]`.

**Expected**: The branch composition should be centered in the viewport so it sits behind the text naturally.

**Technical Issue**: The branch curve's midpoint is not at the origin, causing off-center appearance.

### 4. **Scale vs Camera Distance Mismatch**
**Problem**: The model is scaled 2x, camera is at z=6 with FOV 45. This may not provide optimal framing.

**Expected**: The olive branch should fill approximately 60-70% of the viewport height and be perfectly centered.

**Technical Issue**: Scale and camera distance need to be calculated based on the branch's bounding box.

### 5. **Animation Causing Drift**
**Problem**: The rotation animation `rotation.y = time * 0.06` causes continuous rotation. Combined with the floating animation, the composition may drift visually off-center over time.

**Expected**: Animations should be subtle and keep the composition centered.

**Technical Issue**: Continuous rotation without bounds checking can cause visual drift.

### 6. **Depth (Z-axis) Distribution**
**Problem**: Most elements are at z=0, with only minor z-offsets for leaves. This creates a flat appearance.

**Expected**: Better depth distribution for 3D effect, especially for leaves.

**Technical Issue**: Need more pronounced z-axis positioning for spatial depth.

---

## Design Reference (Logo)

The logo shows:
- **Curved branch forming a circle/arc**
- **3 elongated pointed leaves** (bright yellow-green)
- **2 olives** hanging from branch (dark olive-green)
- **Clean, elegant composition** with clear spatial relationships
- **All elements connected** - nothing floating independently

---

## Recommended Fix Approach

### 1. Calculate Branch Curve Center
```javascript
const branchCurve = new THREE.CatmullRomCurve3([...points])
const centerPoint = branchCurve.getPointAt(0.5)
// Offset entire group to center this point at origin
```

### 2. Position Elements Along Curve
```javascript
// Get points along curve
const leaf1Point = branchCurve.getPointAt(0.7)  // 70% along curve
const leaf2Point = branchCurve.getPointAt(0.4)  // 40% along curve
const olive1Point = branchCurve.getPointAt(0.5) // 50% along curve
```

### 3. Get Curve Tangents for Rotation
```javascript
const tangent = branchCurve.getTangentAt(t)
// Use tangent to orient leaves/stems naturally
```

### 4. Calculate Optimal Scale
```javascript
// Get bounding box of entire composition
// Calculate scale to fit 70% viewport height
// Adjust camera or scale accordingly
```

### 5. Bounded Animation
```javascript
// Use oscillating animations instead of continuous rotation
groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2 // Oscillate ±0.2 rad
```

---

## Expected Final Result

1. **Centered composition**: Branch midpoint at viewport center
2. **Connected elements**: Leaves and olives positioned along curve, not floating
3. **Proper scale**: Branch fills ~70% viewport height
4. **Natural orientation**: Elements use curve tangents for realistic angles
5. **Smooth animations**: Gentle floating and subtle rotation that doesn't drift
6. **Depth**: Proper z-spacing for 3D effect
7. **Logo alignment**: Visual style matches the restaurant's logo

---

## Technical Constraints

- Must maintain logo colors (`#c4d92e` leaves, `#5a6e4a` olives)
- Must work responsively (mobile to desktop)
- Must maintain 60fps animation performance
- Must keep existing text layout and animations in HeroSection
- Camera position at z=6, FOV=45 (or adjust as needed for proper framing)

---

## Files to Modify

### Priority 1: Fix Positioning
**File**: `/components/three/OliveModel.tsx`
- Recalculate all positions relative to curve
- Center the branch composition
- Attach olives and leaves to curve points

### Priority 2: Adjust Camera/Scale
**File**: `/components/three/Scene.tsx`
- May need to adjust camera position or FOV
- Verify lighting still works with new positioning

### Priority 3: Verify Layout
**File**: `/components/sections/HeroSection.tsx`
- Ensure 3D scene still layers correctly behind text
- No changes needed unless z-index issues arise

---

## Current State Summary

The hero section has a beautiful design intent but suffers from spatial misalignment. The 3D elements (branch, leaves, olives) are positioned with hardcoded coordinates rather than being mathematically derived from the branch curve. This causes a disconnected, floating appearance rather than the cohesive, natural composition shown in the logo.

The fix requires recalculating all positions using the curve's parametric functions (`getPointAt()`, `getTangentAt()`) and centering the entire composition around the viewport origin.
