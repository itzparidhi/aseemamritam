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

const promises = [
  { title: 'Relaxing time', body: 'Thorough, unhurried support until every question has been resolved.' },
  { title: 'Easy-to-understand explanation', body: 'Plain language, illustrations, and photographs — never jargon.' },
  { title: 'Multiple options', body: 'Treatment paths tailored to your life, not the other way around.' },
  { title: 'No pressure, ever', body: 'Honest advice that prioritises your wishes — never a hard sell.' },
]

export default function About() {
  return (
    <section id="about" className="relative text-navy-950">
      <div className="container-x pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          {/* LEFT — pinned doctor image (stays sticky for BOTH right panels) */}
          <div className="lg:col-span-7 lg:h-full">
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
              <img
                src="/dr-samar.png"
                alt="Dr. Aseem Samar — Medical Oncologist, Jaipur"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent via-transparent to-white" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-l from-transparent via-transparent to-white" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-transparent to-white" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>

          {/* RIGHT — TWO stacked sticky panels, panel 2 scrolls up over panel 1 */}
          <div className="lg:col-span-5">
            {/* PANEL 1 — Director / intro / checklist / buttons */}
            <div className="bg-white lg:sticky lg:top-24 lg:flex lg:min-h-[calc(100vh-7rem)] lg:flex-col lg:justify-center lg:py-8">
              <DirectorHeader />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 text-[15px] leading-[1.95] tracking-[0.005em] text-navy-800/90 sm:text-base"
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
                  href="#contact"
                  label="What kind of doctor is he? See the full profile here."
                />
                <PillButton
                  href="#gallery"
                  label="Read educational articles on cancer care here!"
                />
              </div>
            </div>

            {/* PANEL 2 — Promise — bg-white covers PANEL 1 as it slides up */}
            <div className="mt-16 bg-white lg:mt-0 lg:sticky lg:top-24 lg:flex lg:min-h-[calc(100vh-7rem)] lg:flex-col lg:justify-center lg:py-8">
              <PromiseSection />
            </div>
          </div>
        </div>
      </div>

      {/* Divider with 4-point star — outside the sticky grid */}
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
          className="inline-flex items-center gap-2 rounded-full border bg-peri-50/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em]"
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
          className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: PERI_TEXT }}
        >
          Medical Oncology · Jaipur
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        {/* <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-navy-950">SNS</div> */}
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
      <p className="text-[15px] leading-[1.75] text-navy-800/90">{text}</p>
    </motion.li>
  )
}

function PillButton({ href, label }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between gap-4 rounded-full border bg-white px-6 py-4 text-sm font-semibold text-navy-900 transition"
      style={{ borderColor: PERI_BORDER }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PERI_HOVER_BG)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
    >
      <span className="text-[13.5px] sm:text-sm">{label}</span>
      <ChevronRight
        size={18}
        className="flex-none transition group-hover:translate-x-1"
        style={{ color: PERI_TEXT }}
      />
    </a>
  )
}

function PromiseSection() {
  return (
    <div className="pt-6">
      {/* Promise label with underline bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-navy-950">
          Promise
        </span>
        <span className="h-px w-10 bg-navy-950" />
      </motion.div>

      {/* Heading — slides in from right */}
      <motion.h3
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 font-display text-[1.7rem] font-bold leading-[1.15] text-navy-950 sm:text-3xl lg:text-[2rem]"
      >
        Things we promise during consultation
      </motion.h3>

      {/* 2x2 grid of cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {promises.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white p-7 text-center shadow-[0_20px_50px_-28px_rgba(28,40,73,0.18)] ring-1 ring-navy-100/60 sm:p-8"
          >
            <h4 className="relative inline-block pb-1 font-display text-[15px] font-bold text-navy-950 sm:text-base">
              {p.title}
              <SquiggleUnderline />
            </h4>
            <p className="mt-4 text-[12.5px] leading-[1.75] text-navy-800/75 sm:text-[13px]">
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SquiggleUnderline() {
  return (
    <svg
      className="absolute -bottom-0.5 left-0 w-full"
      height="4"
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,2 Q12.5,0 25,2 T50,2 T75,2 T100,2"
        stroke={PERI_BORDER}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FourPointStar() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-navy-950" aria-hidden>
      <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" />
    </svg>
  )
}
