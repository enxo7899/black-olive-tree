import { HeroSection } from '@/components/sections/HeroSection'
import { BentoStory } from '@/components/sections/BentoStory'
import { MenuSection } from '@/components/sections/MenuSection'
import { ReviewMarquee } from '@/components/sections/ReviewMarquee'
import { ContactSection } from '@/components/sections/ContactSection'
import { MapSection } from '@/components/sections/MapSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BentoStory />
      <MenuSection />
      <ReviewMarquee />
      <ContactSection />
      <MapSection />
      <Footer />
    </main>
  )
}
