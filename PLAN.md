# Black Olive Tree - Master Implementation Plan

## Executive Summary
A portfolio-grade, high-performance restaurant website showcasing "dual character" day/night modes, fluid animations, and 3D elements. Target: Awwwards/FWA-level execution with 100/100 Lighthouse scores.

---

## 1. FOLDER STRUCTURE

```
black-olive-tree/
├── .cursorrules                    # AI development guidelines
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero-day.jpg
│   │   │   ├── hero-night.jpg
│   │   │   ├── story-morning.jpg
│   │   │   └── story-evening.jpg
│   │   ├── videos/
│   │   │   └── olive-leaves.mp4
│   │   ├── textures/
│   │   │   ├── grain.png
│   │   │   └── noise.png
│   │   └── models/
│   │       └── olive-branch.glb
│   └── fonts/                      # Local font files (if needed)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with Lenis wrapper
│   │   ├── page.tsx                # Home page orchestrator
│   │   ├── globals.css             # Tailwind directives + custom CSS
│   │   └── api/                    # Optional API routes
│   │       └── menu/
│   │           └── route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Main navigation with magnetic button
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx     # Sun/Moon switcher
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Split-screen hero with R3F
│   │   │   ├── StorySection.tsx    # Scrollytelling with clip-path reveal
│   │   │   ├── MenuSection.tsx     # Smart menu with filtering
│   │   │   ├── AboutSection.tsx
│   │   │   ├── LocationSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/
│   │   │   ├── MagneticButton.tsx  # Custom magnetic CTA
│   │   │   ├── MenuItem.tsx        # Individual menu card
│   │   │   ├── MenuFilter.tsx      # Diet/category filter chips
│   │   │   ├── SearchBar.tsx       # Fuzzy search input
│   │   │   └── GrainOverlay.tsx    # Film grain texture
│   │   └── three/
│   │       ├── OliveBranch.tsx     # R3F 3D model component
│   │       └── Scene.tsx           # R3F canvas wrapper
│   ├── context/
│   │   └── ThemeContext.tsx        # Global day/night state management
│   ├── providers/
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   └── SmoothScrollProvider.tsx # Lenis integration
│   ├── hooks/
│   │   ├── useTheme.ts             # Theme context hook
│   │   ├── useMagneticEffect.ts    # Mouse tracking for magnetic button
│   │   ├── useScrollProgress.ts    # Scroll position tracker
│   │   └── useMediaQuery.ts        # Responsive breakpoint detection
│   ├── lib/
│   │   ├── utils.ts                # clsx + tailwind-merge helper
│   │   ├── animations.ts           # Framer Motion variants library
│   │   ├── constants.ts            # Design tokens, breakpoints
│   │   └── fuzzy-search.ts         # Fuse.js configuration
│   ├── data/
│   │   └── menu.json               # Menu items database
│   └── types/
│       ├── menu.ts                 # MenuItem interface
│       └── theme.ts                # Theme-related types
├── tailwind.config.ts              # Design system tokens
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 2. COMPONENT HIERARCHY

```
app/layout.tsx
├── ThemeProvider (Context)
│   └── SmoothScrollProvider (Lenis)
│       ├── Navbar
│       │   ├── Logo
│       │   ├── Navigation Links
│       │   ├── ThemeToggle
│       │   └── MagneticButton ("Book Table")
│       ├── app/page.tsx
│       │   ├── HeroSection
│       │   │   ├── GrainOverlay
│       │   │   ├── Video/WebGL Background
│       │   │   ├── MaskRevealText ("Black Olive Tree")
│       │   │   └── Scene (R3F Canvas)
│       │   │       └── OliveBranch (3D Model)
│       │   ├── StorySection (Scrollytelling)
│       │   │   ├── StickyContainer
│       │   │   ├── ImageReveal (clip-path animation)
│       │   │   └── TextSync (fade in/out)
│       │   ├── MenuSection
│       │   │   ├── SearchBar (Fuse.js)
│       │   │   ├── MenuFilter (LayoutGroup)
│       │   │   └── MenuGrid
│       │   │       └── MenuItem[] (animated layout)
│       │   ├── AboutSection
│       │   ├── LocationSection
│       │   └── ContactSection
│       └── Footer
```

---

## 3. DATA SCHEMA

### MenuItem Interface (TypeScript)

```typescript
interface MenuItem {
  id: string;                        // Unique identifier (e.g., "item-001")
  name: string;                      // Dish name
  description: string;               // Short description (max 150 chars)
  price: number;                     // Price in GBP
  category: MenuCategory;            // "starters" | "mains" | "desserts" | "drinks"
  dietTags: DietTag[];               // ["vegetarian", "vegan", "gluten-free", "dairy-free"]
  allergens?: string[];              // Optional allergen warnings
  spiceLevel?: 0 | 1 | 2 | 3;       // Optional spice indicator
  image?: string;                    // Optional image path
  availability: "day" | "night" | "all-day"; // Time-based availability
  featured?: boolean;                // Highlight flag
  metaTags: string[];                // Hidden tags for fuzzy search (e.g., "healthy", "comfort-food", "spicy")
}

type MenuCategory = "starters" | "mains" | "desserts" | "drinks" | "cocktails";
type DietTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "pescatarian";

interface MenuData {
  version: string;                   // Schema version
  lastUpdated: string;               // ISO date string
  items: MenuItem[];
}
```

### Example Menu Item

```json
{
  "id": "item-001",
  "name": "Grilled Octopus",
  "description": "Charred Mediterranean octopus with lemon, capers, and olive tapenade",
  "price": 18.50,
  "category": "starters",
  "dietTags": ["gluten-free", "dairy-free"],
  "allergens": ["seafood"],
  "spiceLevel": 1,
  "image": "/assets/images/menu/octopus.jpg",
  "availability": "night",
  "featured": true,
  "metaTags": ["seafood", "mediterranean", "grilled", "healthy", "protein-rich"]
}
```

---

## 4. TECHNICAL IMPLEMENTATION DETAILS

### A. Design System Tokens (Tailwind Config)

```javascript
// tailwind.config.ts
colors: {
  'night-base': '#1A1F18',      // Deep Olive Charcoal
  'day-base': '#F2F0E9',        // Limestone Cream
  'accent-gold': '#C2A878',     // Burnished Gold
  'action-terra': '#BC5D41',    // Terracotta Clay
}

fontFamily: {
  heading: ['Playfair Display', 'serif'],
  body: ['Inter', 'sans-serif'],
}
```

### B. Animation Strategy

| Component | Library | Technique | Purpose |
|-----------|---------|-----------|---------|
| Page Transitions | Framer Motion | `AnimatePresence` | Route changes |
| Menu Filtering | Framer Motion | `LayoutGroup` + `layout` prop | Smooth reflow |
| Hero Text | Framer Motion | `background-clip: text` mask | Gradient reveal |
| Scroll Stories | Framer Motion | `useScroll` + `useTransform` | Progress-driven |
| 3D Branch | R3F | `useFrame` + scroll velocity | Reactive rotation |
| Magnetic Button | Custom Hook | Spring physics (damping) | Mouse tracking |
| Smooth Scroll | Lenis | Global instance | Normalized momentum |

### C. Performance Optimizations

1. **Images**: Use `next/image` with `priority` for above-fold, `loading="lazy"` below
2. **Fonts**: `next/font` with `display: swap` and subset for Latin only
3. **3D Models**: Low-poly (<5k vertices), Draco compression, lazy load R3F canvas
4. **Code Splitting**: Dynamic imports for MenuSection, StorySection
5. **Server Components**: Default to RSC; only `"use client"` for interactive leaves
6. **Video**: Compress to <2MB WebM with HEVC fallback, muted autoplay

### D. Accessibility Checklist

- [ ] ARIA labels on ThemeToggle ("Switch to Night Mode")
- [ ] Keyboard navigation for menu filters (Tab + Enter)
- [ ] Focus indicators (2px gold outline)
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] Semantic HTML (`<nav>`, `<section>`, `<article>`)
- [ ] Alt text for all images
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)

---

## 5. STATE MANAGEMENT ARCHITECTURE

### Theme State Flow

```
User Action → ThemeToggle → ThemeContext.setTheme()
                ↓
        localStorage.setItem('theme')
                ↓
        document.documentElement.setAttribute('data-theme')
                ↓
        Tailwind dark: selectors trigger
                ↓
        Framer Motion animates colors (300ms cubic-bezier)
```

### Menu Filter State

```
User Clicks "Vegetarian" → MenuSection local state
                ↓
        items.filter(item => item.dietTags.includes('vegetarian'))
                ↓
        Framer Motion LayoutGroup detects DOM changes
                ↓
        Auto-animates positions (spring physics)
```

---

## 6. DEVELOPMENT PHASES

### Phase 1: Foundation (Step 2)
- Initialize Next.js 15 + TypeScript
- Install dependencies: `framer-motion`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `fuse.js`, `clsx`, `tailwind-merge`
- Configure Tailwind with design tokens
- Setup `app/layout.tsx` with font optimization

### Phase 2: Theme Engine (Step 3)
- Create `ThemeContext` with localStorage persistence
- Build `ThemeProvider` wrapper
- Implement `ThemeToggle` component with Sun/Moon icons (Lucide)
- Test theme switching with color transitions

### Phase 3: Core Components (Step 4A)
- **Navbar** with sticky positioning and backdrop blur
- **MagneticButton** with spring physics hook
- **Footer** with restaurant details

### Phase 4: Hero Section (Step 4B)
- Video background with fallback image
- GrainOverlay component (pointer-events: none)
- MaskRevealText with gradient animation
- R3F Canvas with OliveBranch 3D model

### Phase 5: Scrollytelling (Step 4C)
- StorySection with 300vh parent container
- useScrollProgress hook (0 to 1 mapping)
- Clip-path circular reveal animation
- Synchronized text fade transitions

### Phase 6: Smart Menu (Step 4D)
- Menu data JSON creation (20+ items)
- Fuse.js integration with metaTags search
- MenuFilter with LayoutGroup
- MenuItem cards with hover states

### Phase 7: Polish (Step 5)
- Lighthouse audit (target: 100/100)
- Add loading states and error boundaries
- Implement prefers-reduced-motion fallbacks
- Final accessibility pass

---

## 7. DEPENDENCY LIST

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "lenis": "^1.1.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.96.0",
    "three": "^0.160.0",
    "fuse.js": "^7.0.0",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.160.0",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "15.1.0"
  }
}
```

---

## 8. .CURSORRULES SPECIFICATIONS

The `.cursorrules` file will enforce:

1. **Architectural Patterns**
   - Server Components by default
   - `"use client"` only for interactivity (hooks, event handlers, R3F)
   - No inline styles; Tailwind utility classes only

2. **Image Handling**
   - ALWAYS use `next/image` (never `<img>`)
   - Specify width, height, and alt text
   - Use `priority` for hero images

3. **Design System Adherence**
   - Colors: Only use defined tokens (`night-base`, `day-base`, `accent-gold`, `action-terra`)
   - Typography: `font-heading` for h1-h3, `font-body` for paragraphs
   - Spacing: Tailwind scale (4, 8, 16, 24, 32, 48, 64, 96, 128px)

4. **Performance Rules**
   - Lazy load components below fold
   - Memoize expensive calculations
   - Use React.memo for pure presentational components

5. **Code Style**
   - Functional components with TypeScript
   - Named exports for components
   - Absolute imports using `@/` alias

---

## 9. RISK MITIGATION

| Risk | Mitigation Strategy |
|------|---------------------|
| R3F bundle size | Lazy load canvas with `next/dynamic`, use Draco compression |
| Lenis conflicts with R3F | Wrap R3F in `<div style={{ touchAction: 'none' }}>` |
| Theme flash on load | Check localStorage in `<script>` tag before hydration |
| Fuzzy search performance | Debounce input (300ms), limit dataset to 100 items |
| Magnetic button on mobile | Disable effect below `md:` breakpoint (use CSS hover query) |

---

## 10. SUCCESS CRITERIA

### Technical Metrics
- ✅ Lighthouse Performance: 100
- ✅ Lighthouse Accessibility: 100
- ✅ Lighthouse Best Practices: 100
- ✅ Lighthouse SEO: 100
- ✅ First Contentful Paint: <1.2s
- ✅ Time to Interactive: <2.5s
- ✅ Cumulative Layout Shift: <0.1

### Design Validation
- ✅ Smooth 60fps animations (no jank)
- ✅ Theme transition feels seamless (300ms)
- ✅ Magnetic button responds within 16ms
- ✅ Menu filter animations complete in <400ms
- ✅ Scrollytelling feels "weighted" (Lenis effect)

### Business Goals
- ✅ Mobile-first responsive (320px to 4K)
- ✅ Cross-browser tested (Chrome, Safari, Firefox, Edge)
- ✅ Booking CTA visible in viewport at all times
- ✅ Menu searchable and filterable intuitively

---

## NEXT STEPS

**AWAITING APPROVAL** before proceeding to implementation.

Upon approval, the development sequence will be:
1. Create `.cursorrules` configuration
2. Initialize Next.js 15 project
3. Install all dependencies
4. Build ThemeProvider and global context
5. Implement components in order: Navbar → Hero → Story → Menu
6. Add 3D elements and advanced animations
7. Performance optimization pass
8. Accessibility audit and fixes

**Estimated Timeline**: 6-8 development phases (iterative implementation)

---

*This plan is a living document and will be updated as implementation reveals technical constraints or opportunities for enhancement.*
