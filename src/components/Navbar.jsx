import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ArrowUpRight, Clock } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Stories' },
  { href: '#contact', label: 'Visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'backdrop-blur-md bg-cream/85 border-b border-teal-900/8 shadow-soft'
          : 'bg-cream/40 backdrop-blur-sm'
      }`}
    >
      {/* Top utility strip — collapses on scroll */}
      <div
        className={`hidden md:block border-b border-teal-900/8 overflow-hidden transition-all duration-500 ${
          scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'
        }`}
      >
        <div className="container-x flex h-9 items-center justify-between text-[14.5px] uppercase tracking-[0.2em] text-teal-900/65">
          <div className="flex items-center gap-2">
            <Clock size={10} className="text-gold-500" />
            <span>Centre · Open 24 Hours</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+919257596655"
              className="inline-flex items-center gap-1.5 hover:text-teal-900 transition"
            >
              <Phone size={10} />
              <span className="tracking-[0.16em]">+91 92575 96655</span>
            </a>
            <span className="text-teal-900/25">/</span>
            <span>Vaishali Nagar · Jaipur</span>
          </div>
        </div>
      </div>

      <nav className="container-x flex h-[76px] items-center justify-between md:h-[96px]">
        {/* Logo + wordmark */}
        <a href="#top" className="group flex items-center gap-3.5">
          <img
            src="/logo.svg"
            alt="Aseem Amritam Cancer Centre"
            className="h-14 w-14 md:h-[68px] md:w-[68px] transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <div className="leading-tight">
            <div className="font-display text-[25px] md:text-[28px] text-teal-950 tracking-tight">
              Aseem Amritam
            </div>
            <div className="text-[14px] uppercase tracking-[0.26em] text-teal-700/65">
              Cancer Centre
            </div>
          </div>
        </a>

        {/* Center nav */}
        <ul className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block text-[15.5px] uppercase tracking-[0.2em] font-medium text-teal-900/70 transition hover:text-teal-950"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-teal-900 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-teal-900 px-5 py-2.5 text-[15px] font-semibold uppercase tracking-[0.18em] text-cream shadow-soft transition hover:bg-teal-950 hover:shadow-glow"
          >
            Book Appointment
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:rotate-45"
            />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-teal-900/10 bg-cream/70 text-teal-900 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-teal-900/5 bg-cream/95 backdrop-blur"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm uppercase tracking-[0.18em] font-medium text-teal-900 hover:bg-teal-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="px-3 pt-3">
                <a
                  href="tel:+919257596655"
                  className="mb-3 flex items-center gap-2 text-sm text-teal-900/75"
                >
                  <Phone size={14} />
                  +91 92575 96655
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Book Appointment <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
