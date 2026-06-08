import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion'
import SectionLabel from './SectionLabel'
import WordReveal from './WordReveal'

const reasons = [
  {
    image: '/why/why1.jpg',
    // placeholder: 'Reason 01',
    title: 'Trained at Tata Memorial',
    role: 'DM in Medical Oncology · Mumbai',
    body: "Dr. Samar holds a DM in Medical Oncology from Tata Memorial Hospital, Mumbai — India's foremost cancer institute. Every protocol is grounded in the precision training of the country's leading oncology faculty.",
  },
  {
    image: '/why/why2.jpg',
    // placeholder: 'Reason 02',
    title: 'Patient-first consultation',
    role: 'Plain language · Unhurried · Attentive',
    body: 'Plain language, illustrations, and the time to ask. Dr. Samar explains every step of treatment so families walk out clearer than they walked in — multiple options, never a hard sell.',
  },
  {
    image: '/why/why3.png',
    // placeholder: 'Reason 03',
    title: 'Care around the clock',
    role: 'Open 24 hours · Vaishali Nagar',
    body: 'Our centre is open 24 hours for chemotherapy, follow-up, and emergency care. Dr. Samar also consults at CK Birla Hospitals (Rukmani Birla Hospital) during OPD hours, 10:00 AM – 4:00 PM.',
  },
]

const Sparkle = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={`h-5 w-5 fill-gold-400 ${className}`}>
    <path d="M12 2 L13.2 9.2 L20.5 10.5 L13.2 11.8 L12 19 L10.8 11.8 L3.5 10.5 L10.8 9.2 Z" />
  </svg>
)

export default function Testimonials() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(reasons.length - 1, Math.floor(v * reasons.length))
    setActive((prev) => (prev !== idx ? idx : prev))
  })

  const t = reasons[active]
  const nextIdx = (active + 1) % reasons.length
  const nextT = reasons[nextIdx]

  return (
    <section ref={sectionRef} id="why" className="relative h-[300vh] bg-peri-50/30">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Vertical pagination dots (viewport right edge) */}
        <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          {reasons.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                i === active ? 'h-3 w-3 bg-navy-900' : 'h-2 w-2 bg-navy-900/25'
              }`}
            />
          ))}
        </div>

        <div className="container-x w-full">
          <SectionLabel index={3} label="Why Choose Us" />

          <div className="relative mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-0">
            {/* Center vertical divider */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-navy-900/15 lg:block" />

            {/* LEFT — constant heading + intro + "Also" preview card */}
            <div className="relative lg:pr-14 xl:pr-20">
              <WordReveal
                as="h2"
                className="text-3xl font-bold leading-[1.12] text-navy-950 sm:text-4xl lg:text-[2.6rem]"
                stagger={0.06}
              >
                Why choose<br />Aseem Amritam?
              </WordReveal>

              <div className="mt-7 max-w-md border-l-2 border-navy-900/25 pl-5 text-sm leading-[1.85] text-navy-800/85 sm:text-base">
                A specialised oncology practice rooted in evidence-based medicine,
                gentle counsel, and round-the-clock access.
              </div>

              {/* Floating preview card — shows previous reason */}
              <motion.div
                key={`mini-${active}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass mt-10 hidden max-w-sm rounded-2xl p-4 lg:block"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-full border border-peri-300 bg-gradient-to-br from-peri-100 to-peri-50">
                    <span className="font-display text-[11px] font-bold text-peri-600">
                      0{nextIdx + 1}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-peri-500">
                      Up next
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs font-semibold leading-relaxed text-navy-900/85">
                      {nextT.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — dynamic reason slide */}
            <div className="relative lg:pl-14 xl:pl-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Arched image — placeholder until images are provided */}
                  <div className="relative mx-auto h-60 w-48 overflow-hidden rounded-t-full border border-navy-900/10 bg-gradient-to-br from-peri-100 via-peri-50 to-white shadow-soft sm:h-72 sm:w-56">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/35 via-transparent to-transparent" />
                  </div>

                  {/* Title + role (was: name + role) */}
                  <div className="mt-8 text-center">
                    <h3 className="font-display text-lg font-bold leading-tight text-navy-950 sm:text-xl">
                      {t.title}
                    </h3>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-peri-500">
                      {t.role}
                    </div>
                  </div>

                  {/* Body */}
                  <p className="mx-auto mt-6 max-w-md text-center text-sm leading-[1.75] text-navy-800/80 sm:text-[15px]">
                    {t.body}
                  </p>

                  {/* Sparkle accent + divider */}
                  <div className="mx-auto mt-10 flex max-w-md items-center gap-3">
                    <Sparkle />
                    <div className="h-px flex-1 bg-navy-900/20" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Big faded numeral that changes per slide */}
              <div className="pointer-events-none absolute -bottom-20 right-0 hidden select-none font-display text-[11rem] font-bold leading-none text-navy-900/[0.05] lg:block xl:text-[14rem]">
                0{active + 1}
              </div>
            </div>
          </div>

          {/* Mobile pagination */}
          <div className="mt-12 flex items-center justify-center gap-2 lg:hidden">
            {reasons.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-navy-900' : 'w-2 bg-navy-900/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
