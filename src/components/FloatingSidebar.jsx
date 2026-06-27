import { useEffect, useState } from 'react'
import { MessageCircle, CalendarDays, Clock } from 'lucide-react'
import { Instagram, Youtube, Facebook } from './BrandIcons'

const WHATSAPP_NUMBER = '919257596655'
const WHATSAPP_MSG = encodeURIComponent(
  "Hello, I'd like to book a consultation at Aseem Amritam Cancer Centre."
)

const actions = [
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`,
    external: true,
  },
  {
    Icon: CalendarDays,
    label: 'Book',
    href: '#contact',
  },
  {
    Icon: Clock,
    label: 'Hours',
    href: '#contact',
    tooltip: 'Centre · 24 Hours · RBH OPD 10am–4pm',
  },
]

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aseemamritam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com/' },
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/' },
]

export default function FloatingSidebar() {
  return (
    <aside
      className="pointer-events-auto fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Quick contact"
    >
      <div className="glass flex flex-col items-center gap-1 rounded-full px-2.5 py-4">
        {actions.map(({ Icon, label, href, external, tooltip }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            title={tooltip}
            className="group relative grid h-14 w-14 place-items-center rounded-full text-teal-800 transition hover:bg-teal-50 hover:text-teal-950"
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="mt-0.5 text-[12px] uppercase tracking-[0.18em] text-teal-900/70 group-hover:text-teal-950">
              {label}
            </span>
          </a>
        ))}

        <div className="my-2 h-px w-7 bg-teal-900/15" />

        {socials.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-9 w-9 place-items-center rounded-full border border-teal-800/15 text-teal-800/80 transition hover:border-teal-800/40 hover:text-teal-950"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </aside>
  )
}

// Mobile sticky bottom — separate export
export function MobileQuickBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '120px 0px 0px 0px' }
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-5 z-40 mx-3 transition-all duration-500 ease-out lg:hidden ${
        hidden ? 'pointer-events-none translate-y-24 opacity-0' : 'opacity-100'
      }`}
    >
      <div className="glass flex items-center justify-around rounded-full px-2 py-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-teal-900 hover:bg-teal-50"
        >
          <MessageCircle size={14} /> WhatsApp
        </a>
        <span className="text-teal-900/20">·</span>
        <a
          href="tel:+919257596655"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-teal-900 hover:bg-teal-50"
        >
          Call
        </a>
        <span className="text-teal-900/20">·</span>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-teal-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cream"
        >
          Book
        </a>
      </div>
    </div>
  )
}
