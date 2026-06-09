import { Phone } from 'lucide-react'

export default function EmergencyStrip() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 bg-teal-950 text-cream">
      <div className="container-x flex h-9 items-center justify-between text-[10.5px] uppercase tracking-[0.2em]">
        <a
          href="tel:+919257596655"
          className="inline-flex items-center gap-2 text-cream/90 transition hover:text-cream"
        >
          <Phone size={11} className="text-gold-400" />
          <span className="font-num font-semibold">24×7 Emergency · +91 92575 96655</span>
        </a>
        <span className="hidden text-cream/55 md:inline">Aseem Amritam · Vaishali Nagar · Jaipur</span>
      </div>
    </div>
  )
}

export function HeroDivider() {
  return (
    <div className="relative">
      <div className="h-px w-full bg-teal-900/15" />
      {/* Four-point star at left end */}
      <svg
        viewBox="0 0 16 16"
        className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 fill-teal-800"
      >
        <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" />
      </svg>
    </div>
  )
}
