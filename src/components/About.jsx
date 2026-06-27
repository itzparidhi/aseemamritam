import { motion } from 'framer-motion'
import { ChevronRight, Check } from 'lucide-react'
import { Instagram, Youtube } from './BrandIcons'

// Periwinkle accents
const PERI_BORDER = '#B6C0EA'
const PERI_TEXT = '#7B8AC9'
const PERI_HOVER_BG = '#F1F3FB'

const checklist = [
  '15+ years treating solid tumour cancers — ovarian, oral, and beyond — with precision-driven protocols and a calm bedside manner.',
  "DM in Medical Oncology from Tata Memorial Hospital, Mumbai — India's foremost cancer institute — and MD in General Medicine.",
  'Specialises in chemotherapy, targeted therapy, immunotherapy, and long-term maintenance care — tailored to each patient.',
]

export default function About() {
  return (
    <section id="about" className="relative text-navy-950">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT — doctor image with gradient fades */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/5]">
              <img
                src="/dr-samar.jpeg"
                alt="Dr. Aseem Samar — Medical Oncologist, Jaipur"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent via-transparent to-white" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-l from-transparent via-transparent to-white" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-transparent to-white" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>

          {/* RIGHT — director / intro / checklist / buttons */}
          <div className="lg:col-span-5">
            <DirectorHeader />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 text-[19px] leading-[1.95] tracking-[0.005em] text-navy-800/90 sm:text-base"
            >
              A specialized physician who diagnoses, stages, and treats cancer using{' '}
              <span className="font-semibold text-navy-950">systemic therapies</span> —
              chemotherapy, immunotherapy, and targeted therapy.
            </motion.p>

            <ul className="mt-10 space-y-6">
              {checklist.map((text, i) => (
                <ChecklistItem key={i} text={text} delay={i * 0.1} />
              ))}
            </ul>

            <div className="mt-10 space-y-3">
              <PillButton
                href="https://arc.net/l/quote/pridbbib"
                label="What kind of doctor is he? See the full profile here."
              />
              <PillButton
                href="https://www.bwhealthcareworld.com/article/understanding-ovarian-cancer-606092"
                label="Read educational articles on cancer care here!"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider with 4-point star */}
      <div className="container-x pb-16 pt-20 md:pb-24">
        <div className="flex items-center gap-3">
          <FourPointStar />
          <div className="h-px flex-1 bg-navy-900/15" />
        </div>
      </div>
    </section>
  )
}

function DirectorHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start justify-between gap-6"
    >
      <div>
        {/* DIRECTOR eyebrow — periwinkle pill with status dot */}
        <span
          className="inline-flex items-center gap-2 rounded-full border bg-peri-50/70 px-3.5 py-1.5 text-[14px] font-bold uppercase tracking-[0.24em]"
          style={{ borderColor: PERI_BORDER, color: PERI_TEXT }}
        >
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: PERI_TEXT }}
          >
            <span
              className="absolute inset-0 animate-ping rounded-full opacity-40"
              style={{ backgroundColor: PERI_TEXT }}
            />
          </span>
          Director
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] text-navy-950 sm:text-4xl lg:text-[2.4rem]">
          Dr. Aseem Samar
        </h2>
        <div
          className="mt-2 text-[15px] font-bold uppercase tracking-[0.22em]"
          style={{ color: PERI_TEXT }}
        >
          Medical Oncology · Jaipur
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        {/* <div className="text-[14px] font-bold uppercase tracking-[0.22em] text-navy-950">SNS</div> */}
        <div className="flex gap-2">
          <SocialDot href="https://www.instagram.com/aseemamritam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" label="Instagram">
            <Instagram size={12} />
          </SocialDot>
          <SocialDot href="https://youtube.com/" label="YouTube">
            <Youtube size={12} />
          </SocialDot>
        </div>
      </div>
    </motion.div>
  )
}

function SocialDot({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-full border transition"
      style={{
        borderColor: PERI_BORDER,
        color: PERI_TEXT,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = PERI_HOVER_BG
        e.currentTarget.style.color = '#0e1623'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = PERI_TEXT
      }}
    >
      {children}
    </a>
  )
}

function ChecklistItem({ text, delay }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4"
    >
      <div
        className="grid h-7 w-7 flex-none place-items-center rounded-md border"
        style={{ borderColor: PERI_BORDER, color: PERI_TEXT }}
      >
        <Check size={14} strokeWidth={2.4} />
      </div>
      <p className="text-[19px] leading-[1.75] text-navy-800/90">{text}</p>
    </motion.li>
  )
}

function PillButton({ href, label }) {
  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center justify-between gap-4 rounded-full border bg-white px-6 py-4 text-sm font-semibold text-navy-900 transition"
      style={{ borderColor: PERI_BORDER }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PERI_HOVER_BG)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
    >
      <span className="text-[17.5px] sm:text-sm">{label}</span>
      <ChevronRight
        size={18}
        className="flex-none transition group-hover:translate-x-1"
        style={{ color: PERI_TEXT }}
      />
    </a>
  )
}

function FourPointStar() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-navy-950" aria-hidden>
      <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" />
    </svg>
  )
}
