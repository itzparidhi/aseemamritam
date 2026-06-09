import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      syncTouch: false,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Anchor click → smooth scroll via Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el, { offset: -80, duration: 1.6 })
      }
    }
    document.addEventListener('click', onClick)

    // Native keyboard scrolling fights with Lenis's virtual scroll position —
    // the browser would scroll, Lenis's internal cursor would stay stale, and
    // the next wheel tick would snap back. Route the common scroll keys
    // through Lenis so they Just Work.
    const onKey = (e) => {
      // Don't hijack typing in inputs, textareas, or contenteditable surfaces.
      const t = e.target
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.tagName === 'SELECT' ||
          t.isContentEditable)
      ) return
      // Let the browser handle its own shortcuts (Cmd+R, Cmd+F, etc.)
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const line = 80
      const page = window.innerHeight * 0.9
      let delta = null
      let absolute = null

      if (e.key === 'ArrowDown') delta = line
      else if (e.key === 'ArrowUp') delta = -line
      else if (e.key === 'PageDown') delta = page
      else if (e.key === 'PageUp') delta = -page
      else if (e.key === ' ') delta = e.shiftKey ? -page : page
      else if (e.key === 'Home') absolute = 0
      else if (e.key === 'End') absolute = document.documentElement.scrollHeight
      else return

      e.preventDefault()
      if (absolute !== null) {
        lenis.scrollTo(absolute, { duration: 1.2 })
      } else {
        lenis.scrollTo(lenis.scroll + delta, { duration: 0.6 })
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}
