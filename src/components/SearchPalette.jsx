import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Calendar as CalIcon,
  Phone,
  MessageCircle,
  MapPin,
  Map,
  User,
  Star,
  Play,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Instagram, Youtube, Facebook } from './BrandIcons'

const WHATSAPP_NUMBER = '919257596655'
const CLINIC_ADDRESS =
  'Aseem Amritam Cancer Centre, Plot No. 123-124, Ganga Sagar-B, Nemi Nagar Extension, Vaishali Nagar, Jaipur'
const RBH_ADDRESS =
  'Rukmani Birla Hospital (CK Birla Hospitals), Gopalpura Bypass Road, Near Durgapura Station, Jaipur'

// Scrolls the matching section into view (Lenis still drives the smooth scroll)
const scrollTo = (hash) => {
  window.location.hash = hash
}

const openExternal = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const actions = [
  {
    id: 'book',
    title: 'Book a consultation',
    description: 'Open the booking calendar — pick a date & time',
    category: 'Action',
    keywords: ['book', 'appointment', 'schedule', 'consultation', 'visit', 'meet', 'doctor'],
    icon: CalIcon,
    run: () => window.dispatchEvent(new CustomEvent('open-booking')),
  },
  {
    id: 'call',
    title: 'Call Dr. Samar',
    description: '+91 92575 96655 · Open 24 hours',
    descriptionFont: 'num',
    category: 'Contact',
    keywords: ['call', 'phone', 'number', 'dr samar', 'doctor', 'contact', 'ring'],
    icon: Phone,
    run: () => {
      window.location.href = 'tel:+919257596655'
    },
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Dr. Samar',
    description: 'Send a message on WhatsApp',
    category: 'Contact',
    keywords: ['whatsapp', 'wa', 'message', 'chat', 'text', 'dr samar'],
    icon: MessageCircle,
    run: () => {
      const msg = encodeURIComponent(
        "Hello Dr. Samar, I'd like to know more about Aseem Amritam Cancer Centre.",
      )
      openExternal(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`)
    },
  },
  {
    id: 'directions-centre',
    title: 'Get directions — Aseem Amritam',
    description: 'Open Google Maps · Vaishali Nagar, Jaipur',
    category: 'Visit',
    keywords: ['directions', 'maps', 'google', 'location', 'address', 'where', 'navigate', 'centre', 'vaishali'],
    icon: Map,
    run: () =>
      openExternal(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          CLINIC_ADDRESS,
        )}`,
      ),
  },
  {
    id: 'directions-rbh',
    title: 'Get directions — CK Birla / RBH',
    description: 'OPD location · Gopalpura Bypass',
    category: 'Visit',
    keywords: ['directions', 'rbh', 'rukmani birla', 'ck birla', 'opd', 'hospital', 'gopalpura'],
    icon: Map,
    run: () =>
      openExternal(
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          RBH_ADDRESS,
        )}`,
      ),
  },
  {
    id: 'about',
    title: 'About Dr. Samar',
    description: 'Tata Memorial training · DM in Medical Oncology',
    category: 'Page',
    keywords: ['about', 'dr', 'samar', 'doctor', 'who', 'credentials', 'tata memorial', 'training', 'qualifications'],
    icon: User,
    run: () => scrollTo('#about'),
  },
  {
    id: 'why',
    title: 'Why choose Aseem Amritam',
    description: 'Read the three reasons',
    category: 'Page',
    keywords: ['why', 'choose', 'reasons', 'best', 'better', 'compare'],
    icon: Star,
    run: () => scrollTo('#why'),
  },
  {
    id: 'message',
    title: 'A message from Dr. Samar',
    description: 'Watch his video introduction',
    category: 'Page',
    keywords: ['message', 'video', 'watch', 'hear', 'voice', 'introduction', 'speak', 'play'],
    icon: Play,
    run: () => scrollTo('#gallery'),
  },
  {
    id: 'contact',
    title: 'Visit & contact',
    description: 'Locations, hours, phone',
    category: 'Page',
    keywords: ['contact', 'visit', 'location', 'address', 'hours', 'reach', 'find'],
    icon: MapPin,
    run: () => scrollTo('#contact'),
  },
  {
    id: 'hours',
    title: 'Opening hours',
    description: 'Centre: 24 hours · RBH OPD: 10am – 4pm',
    category: 'Info',
    keywords: ['hours', 'open', 'time', 'when', 'opening', 'opd', 'schedule', 'timings'],
    icon: Clock,
    run: () => scrollTo('#contact'),
  },
  {
    id: 'instagram',
    title: 'Follow on Instagram',
    description: '@aseemamritam',
    category: 'Social',
    keywords: ['instagram', 'ig', 'social', 'follow', 'aseemamritam'],
    icon: Instagram,
    run: () =>
      openExternal(
        'https://www.instagram.com/aseemamritam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      ),
  },
  {
    id: 'youtube',
    title: 'YouTube channel',
    category: 'Social',
    keywords: ['youtube', 'yt', 'video', 'channel'],
    icon: Youtube,
    run: () => openExternal('https://youtube.com/'),
  },
  {
    id: 'facebook',
    title: 'Facebook page',
    category: 'Social',
    keywords: ['facebook', 'fb', 'social'],
    icon: Facebook,
    run: () => openExternal('https://facebook.com/'),
  },
]

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // Filter actions by query — checks title, description, and keywords
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        a.keywords.some((k) => k.includes(q)),
    )
  }, [query])

  // Reset on open + focus the input
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keep activeIdx in bounds when results shrink
  useEffect(() => {
    if (activeIdx >= filtered.length) setActiveIdx(0)
  }, [filtered, activeIdx])

  // Scroll the highlighted item into view as you arrow-key through
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  const runAction = (action) => {
    if (!action) return
    action.run()
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runAction(filtered[activeIdx])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] grid place-items-start bg-navy-950/60 p-3 pt-4 backdrop-blur-sm sm:p-4 sm:pt-[10vh] md:pt-[12vh] lg:pt-[15vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -8, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-glow"
            style={{ maxHeight: 'calc(100dvh - 1.5rem)' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search"
          >
            {/* Input */}
            <div className="flex flex-none items-center gap-3 border-b border-peri-100 px-4 py-3 sm:px-5 sm:py-4">
              <Search size={18} className="flex-none text-peri-500" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search…"
                className="flex-1 bg-transparent text-base font-medium text-navy-950 outline-none placeholder:text-navy-400 sm:text-sm"
                aria-label="Search the site"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                enterKeyHint="go"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="grid h-8 w-8 flex-none place-items-center rounded-full border border-peri-200 text-peri-600 transition hover:bg-peri-50 sm:hidden"
              >
                <span className="text-lg leading-none">×</span>
              </button>
              <kbd className="hidden flex-none rounded-md border border-peri-200 bg-peri-50 px-2 py-0.5 text-[14px] font-bold uppercase tracking-wider text-navy-700 sm:inline-block">
                Esc
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain p-2">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-navy-700/70">
                  No results for <span className="font-semibold">"{query}"</span>
                </div>
              ) : (
                filtered.map((a, i) => (
                  <button
                    key={a.id}
                    data-idx={i}
                    onClick={() => runAction(a)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition sm:px-3 ${
                      i === activeIdx ? 'bg-peri-50' : 'active:bg-peri-50'
                    }`}
                  >
                    <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-peri-50 text-peri-600 sm:h-9 sm:w-9">
                      <a.icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[18px] font-semibold text-navy-950 sm:text-sm">
                        {a.title}
                      </div>
                      {a.description && (
                        <div
                          className={`truncate text-[16px] text-navy-700/70 ${
                            a.descriptionFont === 'num' ? 'font-num' : ''
                          }`}
                        >
                          {a.description}
                        </div>
                      )}
                    </div>
                    <div className="hidden flex-none text-[13px] font-bold uppercase tracking-[0.18em] text-peri-500 sm:block">
                      {a.category}
                    </div>
                    <ChevronRight size={14} className="flex-none text-peri-400" />
                  </button>
                ))
              )}
            </div>

            {/* Footer hints — hidden on phones where there's no keyboard */}
            <div className="hidden flex-none items-center justify-between gap-2 border-t border-peri-100 px-5 py-3 text-[14px] font-bold uppercase tracking-[0.16em] text-navy-700/60 sm:flex">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-peri-200 bg-peri-50 px-1.5 py-0.5">
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-peri-200 bg-peri-50 px-1.5 py-0.5">
                    ↵
                  </kbd>
                  select
                </span>
              </div>
              <span className="tabular-nums">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {/* Mobile result count + close hint */}
            <div className="flex flex-none items-center justify-between border-t border-peri-100 px-4 py-2.5 text-[15px] font-bold uppercase tracking-wider text-navy-700/60 sm:hidden">
              <span>Tap a result</span>
              <span className="tabular-nums">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
