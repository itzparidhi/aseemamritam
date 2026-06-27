import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Instagram, Youtube, Facebook, Linkedin } from './BrandIcons'
import WordReveal from './WordReveal'

const CLINIC_EMAIL = 'hello@aseemamritam.in'

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aseemamritam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com/' },
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/' },
  // { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/' },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-teal-950 pb-28 text-cream/80 lg:pb-0">
      {/* Soft gradient halo */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-50">
        <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-teal-500/15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-400/10 blur-3xl" />
      </div>

      <div className="container-x relative z-10 py-20">
        {/* Big serif statement + newsletter */}
        <div className="grid gap-12 border-b border-cream/10 pb-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <WordReveal
              as="h2"
              className="h-display text-4xl font-bold leading-[1.06] text-cream sm:text-5xl lg:text-[3.5rem]"
              stagger={0.06}
            >
              Healing <em className="text-gold-400">hearts</em>,<br />
              restoring <em className="text-gold-400">hope</em> — together.
            </WordReveal>
          </div>

          <div className="lg:col-span-5">
            <div className="text-[14px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Stay connected
            </div>
            <p className="mt-3 max-w-md text-sm text-cream/65">
              Receive awareness updates, patient education resources, and centre news.
            </p>

            <NewsletterForm />
          </div>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Aseem Amritam Cancer Centre"
                className="h-16 w-16"
              />
              <div>
                <div className="font-display text-xl font-bold tracking-tight text-cream">Aseem Amritam</div>
                <div className="text-[14px] font-bold uppercase tracking-[0.22em] text-cream/65">
                  Cancer Centre
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
              A medical oncology practice led by Dr. Aseem Kumar Samar — combining advanced
              evidence-based therapies with compassionate, patient-first care.
            </p>
          </div>

          <Column
            heading="Location"
            items={[
              '123, Ganga Path, B Block',
              'Nemi Nagar Ext., Vaishali Nagar',
              'Jaipur, Rajasthan 302021',
            ]}
          />
          <Column
            heading="Call Us"
            items={[
              { text: '+91 92575 96655', href: 'tel:+919257596655', mono: true },
              // { text: 'hello@aseemamritam.in', href: 'mailto:hello@aseemamritam.in' },
            ]}
          />
          <Column
            heading="Open Time"
            items={['Centre · 24 Hours', 'RBH OPD · 10am – 4pm', 'Emergency · 24/7']}
          />
        </div>

        {/* Bottom strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Aseem Amritam Cancer Centre. All rights reserved.</div>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition hover:border-gold-400 hover:text-gold-400"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'error' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault()

    // Lightweight email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      return
    }

    /**
     * Opens the visitor's email app with a pre-filled subscribe request to
     * the clinic. They press send; the clinic receives a real email and can
     * add the address to their mailing list manually.
     *
     * TODO (upgrade path): swap this for a real form service so submissions
     * are captured directly without the user pressing send. Example with
     * Formspree (no backend needed, free tier covers most clinics):
     *
     *   await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
     *     body: JSON.stringify({ email }),
     *   })
     *
     * Other options: ConvertKit, Mailchimp, Resend, Buttondown, Netlify Forms.
     */
    const subject = encodeURIComponent('Subscribe to Aseem Amritam updates')
    const body = encodeURIComponent(
      `Hello Aseem Amritam team,\n\nPlease add me to your awareness updates and centre news.\n\nMy email: ${email}\n\nThank you.`,
    )
    window.location.href = `mailto:${CLINIC_EMAIL}?subject=${subject}&body=${body}`

    setStatus('success')
    setEmail('')

    // Re-arm the form after a moment so it can be used again
    setTimeout(() => setStatus('idle'), 7000)
  }

  if (status === 'success') {
    return (
      <div className="mt-5 flex items-center gap-3 border-b border-gold-400/50 pb-3">
        <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gold-400 text-teal-950">
          <Check size={16} strokeWidth={3} />
        </div>
        <p className="text-sm leading-snug text-cream/85">
          Thanks! Your email app should have opened — just press <b>send</b> to confirm.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`mt-5 flex items-center gap-2 border-b pb-2 transition-colors ${
        status === 'error' ? 'border-rose-400/70' : 'border-cream/25'
      }`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
        required
        placeholder={status === 'error' ? 'Please enter a valid email' : 'your@email.com'}
        className={`flex-1 bg-transparent text-sm outline-none ${
          status === 'error'
            ? 'text-rose-200 placeholder-rose-300/70'
            : 'text-cream placeholder-cream/40'
        }`}
        aria-label="Email address"
        aria-invalid={status === 'error'}
      />
      <button
        type="submit"
        className="grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-teal-950 transition hover:rotate-45"
        aria-label="Subscribe"
      >
        <ArrowUpRight size={16} />
      </button>
    </form>
  )
}

function Column({ heading, items }) {
  return (
    <div className="md:col-span-3 lg:col-span-2">
      <div className="text-[14px] font-bold uppercase tracking-[0.22em] text-gold-400">{heading}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it, i) => {
          if (typeof it === 'string') {
            return <li key={i} className="text-cream/75">{it}</li>
          }
          return (
            <li key={i}>
              <a
                href={it.href}
                className={`text-cream/75 hover:text-cream ${it.mono ? 'font-num' : ''}`}
              >
                {it.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
