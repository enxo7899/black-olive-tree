import { HeroSection } from '@/components/sections/HeroSection'
import { StorySection } from '@/components/sections/StorySection'
import { MenuSection } from '@/components/sections/MenuSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { Footer } from '@/components/layout/Footer'
import { GrainOverlay } from '@/components/ui/GrainOverlay'

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main className="min-h-screen">
        <HeroSection />
        <StorySection />
        <MenuSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
