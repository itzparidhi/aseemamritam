import useLenis from './hooks/useLenis'
import TopBar from './components/TopBar'
import Hero from './components/Hero'
import About from './components/About'
import VideoGallery from './components/VideoGallery'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import FloatingSidebar, { MobileQuickBar } from './components/FloatingSidebar'
import Marquee from './components/Marquee'

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grain opacity-[0.35]" aria-hidden />
      <CustomCursor />
      <TopBar />
      <FloatingSidebar />
      <MobileQuickBar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <VideoGallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
