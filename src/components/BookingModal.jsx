import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, Check,
  Calendar as CalIcon, Clock, User, Phone,
} from 'lucide-react'

// Dr. Samar's RBH OPD ends at 4 PM → centre consultation slots start at 4:30 PM.
const TIME_SLOTS = [
  '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM',
  '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
]

const DR_WHATSAPP = '919257596655'

const fmtDate = (d) =>
  d
    ? d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : ''

const STEPS = ['Date', 'Time', 'Details', 'Confirm', 'Done']

export default function BookingModal({ open, onClose }) {
  const [step, setStep] = useState(0)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Reset state shortly after the modal closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(0)
        setDate(null)
        setTime(null)
        setName('')
        setPhone('')
      }, 350)
      return () => clearTimeout(t)
    }
  }, [open])

  const canProceed = () => {
    if (step === 0) return !!date
    if (step === 1) return !!time
    if (step === 2) return name.trim().length >= 2 && /^[0-9]{10}$/.test(phone)
    return true
  }

  const next = () => setStep((s) => Math.min(4, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  /**
   * Opens WhatsApp click-to-chat in a new tab, addressed to Dr. Samar's number,
   * with the full booking details pre-filled. The patient just hits send.
   *
   * TODO (backend): when WhatsApp Business API is wired up, replace this with:
   *   await fetch('/api/booking', { method: 'POST', body: JSON.stringify({ name, phone, date, time }) })
   * which can server-side send approved-template messages to BOTH the patient
   * and Dr. Samar automatically — without the manual "press send" step.
   */
  const sendToDoctor = () => {
    const message = [
      '🙏 Namaste Dr. Samar,',
      '',
      "I'd like to book a consultation at Aseem Amritam Cancer Centre.",
      '',
      '📋 Booking Details',
      `• Name: ${name}`,
      `• Phone: +91 ${phone}`,
      `• Date: ${fmtDate(date)}`,
      `• Time: ${time}`,
      '',
      'Thank you. Looking forward to confirming this appointment.',
    ].join('\n')

    const url = `https://wa.me/${DR_WHATSAPP}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-navy-950/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-peri-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-peri-50 text-peri-600">
                  <CalIcon size={15} />
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-peri-500">
                    Book a Consultation
                  </div>
                  <div className="text-sm font-bold text-navy-950">
                    Step {Math.min(step + 1, 4)} of 4 · {STEPS[step]}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full text-navy-900 transition hover:bg-peri-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 w-full bg-peri-100">
              <div
                className="h-full bg-navy-900 transition-all duration-500 ease-out"
                style={{ width: `${((Math.min(step + 1, 4)) / 4) * 100}%` }}
              />
            </div>

            {/* Step content */}
            <div className="min-h-[440px] px-6 py-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <StepWrap key="date">
                    <h3 className="font-display text-xl font-bold text-navy-950">Pick a date</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy-700/70">
                      Consultations are evening slots after Dr. Samar's RBH OPD hours
                      (10 AM – 4 PM). Sundays are closed.
                    </p>
                    <div className="mt-4 rounded-2xl border border-peri-200 p-3">
                      <MiniCalendar value={date} onChange={setDate} />
                    </div>
                    {date && (
                      <div className="mt-3 text-center text-sm font-semibold text-navy-900">
                        Selected · {fmtDate(date)}
                      </div>
                    )}
                  </StepWrap>
                )}

                {step === 1 && (
                  <StepWrap key="time">
                    <h3 className="font-display text-xl font-bold text-navy-950">Pick a time</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy-700/70">
                      Evening slots, 30 minutes each. {fmtDate(date)}.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                            time === slot
                              ? 'border-navy-900 bg-navy-900 text-cream'
                              : 'border-peri-200 text-navy-900 hover:border-peri-300 hover:bg-peri-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </StepWrap>
                )}

                {step === 2 && (
                  <StepWrap key="details">
                    <h3 className="font-display text-xl font-bold text-navy-950">Your details</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy-700/70">
                      We'll use your WhatsApp number to confirm the booking and send any updates.
                    </p>

                    <div className="mt-6 space-y-4">
                      <label className="block">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-peri-500">
                          Full Name
                        </span>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Aarav Sharma"
                          autoFocus
                          className="mt-1.5 w-full rounded-xl border border-peri-200 bg-white px-4 py-3 text-sm font-semibold text-navy-950 outline-none transition focus:border-navy-900"
                        />
                      </label>

                      <label className="block">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-peri-500">
                          WhatsApp Number
                        </span>
                        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-peri-200 bg-white px-4 transition focus-within:border-navy-900">
                          <span className="text-sm font-bold text-navy-700">+91</span>
                          <input
                            type="tel"
                            inputMode="numeric"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="10-digit mobile"
                            className="flex-1 bg-transparent py-3 text-sm font-semibold text-navy-950 outline-none placeholder:text-navy-400"
                          />
                        </div>
                      </label>
                    </div>
                  </StepWrap>
                )}

                {step === 3 && (
                  <StepWrap key="confirm">
                    <h3 className="font-display text-xl font-bold text-navy-950">Confirm your booking</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy-700/70">
                      Review the details below. When you confirm, WhatsApp will open with a
                      pre-filled booking message to Dr. Samar — just press send.
                    </p>

                    <div className="mt-6 space-y-4 rounded-2xl border border-peri-200 bg-peri-50/40 p-5">
                      <Row icon={CalIcon} label="Date" value={fmtDate(date)} />
                      <Row icon={Clock} label="Time" value={time} />
                      <Row icon={User} label="Name" value={name} />
                      <Row icon={Phone} label="WhatsApp" value={`+91 ${phone}`} />
                    </div>
                  </StepWrap>
                )}

                {step === 4 && (
                  <StepWrap key="success">
                    <div className="grid place-items-center py-6 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="grid h-16 w-16 place-items-center rounded-full bg-navy-900 text-cream"
                      >
                        <Check size={32} strokeWidth={3} />
                      </motion.div>
                      <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                        Booking message sent to Dr. Samar
                      </h3>
                      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-navy-700/80">
                        Your WhatsApp opened with the booking details. Once Dr. Samar's team
                        receives it, they'll confirm directly on WhatsApp at{' '}
                        <span className="font-bold text-navy-950">+91 {phone}</span>.
                      </p>

                      <div className="mt-6 w-full max-w-xs rounded-2xl border border-peri-200 bg-peri-50/40 p-4 text-left">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-peri-500">
                          Booking Reference
                        </div>
                        <div className="mt-1 font-display text-base font-bold leading-tight text-navy-950">
                          {fmtDate(date)} · {time}
                        </div>
                        <div className="mt-1 text-xs text-navy-700/70">{name}</div>
                      </div>
                    </div>
                  </StepWrap>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / nav buttons */}
            {step < 4 ? (
              <div className="flex items-center justify-between border-t border-peri-100 px-6 py-4">
                {step > 0 ? (
                  <button
                    onClick={back}
                    className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.16em] text-navy-700 transition hover:text-navy-950"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => {
                    if (step === 3) sendToDoctor()
                    next()
                  }}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition hover:bg-navy-950 disabled:cursor-not-allowed disabled:bg-navy-300"
                >
                  {step === 3 ? 'Confirm & Open WhatsApp' : 'Next'}
                  <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <div className="border-t border-peri-100 px-6 py-4">
                <button
                  onClick={onClose}
                  className="w-full rounded-full bg-navy-900 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition hover:bg-navy-950"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StepWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white text-peri-600">
        <Icon size={14} />
      </div>
      <div className="flex-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-peri-500">
          {label}
        </div>
        <div className="text-sm font-bold text-navy-950">{value}</div>
      </div>
    </div>
  )
}

function MiniCalendar({ value, onChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewMonth, setViewMonth] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }))

  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewMonth.year, viewMonth.month, 1).getDay()
  const monthName = new Date(viewMonth.year, viewMonth.month, 1).toLocaleString('en-US', {
    month: 'long',
  })

  const prev = () =>
    setViewMonth((m) =>
      m.month === 0 ? { year: m.year - 1, month: 11 } : { year: m.year, month: m.month - 1 }
    )
  const next = () =>
    setViewMonth((m) =>
      m.month === 11 ? { year: m.year + 1, month: 0 } : { year: m.year, month: m.month + 1 }
    )

  // Don't allow navigating to past months
  const atCurrentMonth =
    viewMonth.year === today.getFullYear() && viewMonth.month === today.getMonth()

  const cells = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<span key={`empty-${i}`} />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(viewMonth.year, viewMonth.month, day)
    const isPast = d < today
    const isSunday = d.getDay() === 0
    const isToday = d.getTime() === today.getTime()
    const isSelected = value && d.getTime() === value.getTime()
    const isDisabled = isPast || isSunday

    cells.push(
      <button
        key={day}
        disabled={isDisabled}
        onClick={() => onChange(d)}
        className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
          isDisabled
            ? 'cursor-not-allowed text-navy-300'
            : isSelected
            ? 'bg-navy-900 text-cream shadow-soft'
            : isToday
            ? 'bg-peri-100 text-navy-950 hover:bg-peri-200'
            : 'text-navy-900 hover:bg-peri-50'
        }`}
      >
        {day}
      </button>
    )
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-1">
        <button
          onClick={prev}
          disabled={atCurrentMonth}
          aria-label="Previous month"
          className="grid h-8 w-8 place-items-center rounded-full text-navy-900 transition hover:bg-peri-50 disabled:cursor-not-allowed disabled:text-navy-300 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-navy-900">
          {monthName} {viewMonth.year}
        </div>
        <button
          onClick={next}
          aria-label="Next month"
          className="grid h-8 w-8 place-items-center rounded-full text-navy-900 transition hover:bg-peri-50"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 px-1 pb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div
            key={i}
            className="grid h-7 place-items-center text-[10px] font-bold uppercase tracking-wider text-navy-400"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 px-1">{cells}</div>
    </div>
  )
}
