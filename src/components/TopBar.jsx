import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Search, ChevronDown } from 'lucide-react'
import SearchPalette from './SearchPalette'

const navLinks = [
  { label1: 'About', label2: 'Dr. Samar', href: '#about' },
  { label1: 'Hear', label2: 'from Us', href: '#gallery' },
  { label1: 'Why', label2: 'Choose Us', href: '#why' },
  { label1: 'Visit', label2: '& Contact', href: '#contact' },
]

const DEVANAGARI_FONT = "'Noto Serif Devanagari', 'Tiro Devanagari Sanskrit', 'Fraunces', serif"

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ⌘K / Ctrl+K opens the search palette from anywhere
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-peri-100/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-28 max-w-[1500px] items-center justify-between gap-4 px-3 sm:px-5 md:h-36 md:gap-8 lg:px-6">
          {/* LEFT — Hindi brand name */}
          <a href="#top" className="flex flex-none items-center">
            <div className="leading-tight">
              <div
                className="text-9xl font-bold text-navy-950 sm:text-[50px] md:text-[56px]"
                style={{ fontFamily: DEVANAGARI_FONT, letterSpacing: '0.01em' }}
              >
                असीम अमृतम
              </div>
              <div className="mt-1.5 text-[22px] font-bold uppercase tracking-[0.26em] text-peri-500 md:text-[24px]">
                Cancer Centre
              </div>
            </div>
          </a>

          {/* CENTER — Two-line nav links (lg+ only) */}
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label1}
                href={link.href}
                className="group inline-flex flex-col items-center text-center text-[23px] font-semibold leading-[1.25] text-navy-900 transition hover:text-navy-950"
              >
                <span className="flex items-center gap-1">
                  {link.label1}
                  {link.dropdown && (
                    <ChevronDown size={11} className="text-peri-500" strokeWidth={2} />
                  )}
                </span>
                <span className="text-navy-900/85 transition group-hover:text-navy-950">
                  {link.label2}
                </span>
                <span className="mt-1 h-px w-0 bg-peri-500 transition-all duration-300 group-hover:w-6" />
              </a>
            ))}
          </nav>

          {/* RIGHT — Search + Tel + Hours (lg+ only) */}
          <div className="hidden flex-none items-center gap-5 lg:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="group flex items-center gap-2.5 rounded-full bg-peri-50 px-4 py-2 text-[16.5px] text-navy-500 transition hover:bg-peri-100"
            >
              <span>search...</span>
              <kbd className="hidden rounded border border-peri-200 bg-white/80 px-1.5 py-0.5 text-[13px] font-bold uppercase tracking-wider text-navy-700 xl:inline-block">
                ⌘K
              </kbd>
              <Search size={13} className="text-navy-700" strokeWidth={2} />
            </button>
            <a href="tel:+919257596655" className="block text-right leading-tight">
              <div className="text-[23px] font-bold text-navy-950">
                Tel. <span className="font-num">+91 92575 96655</span>
              </div>
              <div className="mt-1 text-[18px] font-semibold uppercase tracking-[0.14em] text-navy-700/70">
                Open 24 Hours · Vaishali Nagar
              </div>
            </a>
          </div>

          {/* Mobile/tablet — search + hamburger */}
          <div className="flex flex-none items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-11 w-11 place-items-center rounded-full border border-peri-200 text-navy-900 transition hover:bg-peri-50"
            >
              <Search size={17} strokeWidth={2} />
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-peri-200 text-navy-900 transition hover:bg-peri-50"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-teal-950 text-cream"
          >
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />

            <div className="container-x flex h-16 flex-none items-center justify-between md:h-20">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="" className="h-10 w-10" />
                <div className="leading-tight">
                  <div
                    className="text-lg font-bold text-cream"
                    style={{ fontFamily: DEVANAGARI_FONT, letterSpacing: '0.01em' }}
                  >
                    असीम अमृतम
                  </div>
                  <div className="text-[13px] font-bold uppercase tracking-[0.22em] text-cream/65">
                    Cancer Centre
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/15 text-cream transition hover:bg-cream/5"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="container-x relative flex flex-1 min-h-0 flex-col overflow-y-auto pt-6 md:pt-10">
              <div className="mb-5 text-[14px] font-bold uppercase tracking-[0.32em] text-cream/50">
                Menu
              </div>
              <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.label1}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group inline-flex items-baseline gap-4 font-display text-3xl font-bold leading-[1.05] tracking-[0.02em] text-cream transition hover:text-gold-300 sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                      <span className="text-[14px] font-bold uppercase tracking-widest text-cream/45">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="uppercase">
                        {l.label1} {l.label2}
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="container-x flex-none border-t border-cream/10 py-5 text-xs text-cream/65">
              <a href="tel:+919257596655" className="font-num hover:text-cream">
                +91 92575 96655 · 24/7
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command-bar style search */}
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
