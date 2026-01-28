import { HeroSection } from '@/components/sections/HeroSection'
import { StorySection } from '@/components/sections/StorySection'
import { MenuSection } from '@/components/sections/MenuSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { MapSection } from '@/components/sections/MapSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StorySection />
      <MenuSection />
      <AboutSection />
      <ContactSection />
      <MapSection />
      <Footer />
    </main>
  )
}
