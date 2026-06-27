import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowUpRight, Navigation } from 'lucide-react'
import SectionLabel from './SectionLabel'
import WordReveal from './WordReveal'

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-teal-100/60 blur-3xl" />
      </div>

      <div className="container-x">
        <SectionLabel index={4} label="Visit & Contact" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <WordReveal
            as="h2"
            className="h-display text-4xl font-bold leading-[1.08] text-teal-950 sm:text-5xl lg:text-6xl"
            stagger={0.06}
          >
            Two places to find <em className="text-teal-700">Dr. Samar</em>.
          </WordReveal>
          <p className="mt-6 text-teal-900/70">
            Walk-in at our Vaishali Nagar centre (open 24 hours) or visit during OPD hours at
            CK Birla Hospitals.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <LocationCard
            tag="Primary Centre"
            name="Aseem Amritam Cancer Centre"
            address="Plot No. 123–124, Ganga Sagar-B, Nemi Nagar Extension, Vaishali Nagar, Jaipur"
            hours="Open 24 Hours"
            phone="+91 92575 96655"
            highlight
          />
          <LocationCard
            tag="Hospital Consultation"
            name="Rukmani Birla Hospital (CK Birla Hospitals)"
            address="Gopalpura Bypass Road, Near Durgapura Station, Jaipur"
            hours="OPD · 10:00 AM – 4:00 PM"
            phone="+91 92575 96655"
          />
        </div>

        {/* Embedded Google Map — Aseem Amritam Cancer Centre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="glass relative mt-10 overflow-hidden rounded-2xl"
        >
          <iframe
            title="Aseem Amritam Cancer Centre — Vaishali Nagar, Jaipur"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              'Aseem Amritam Cancer Centre, Plot No. 123-124, Ganga Sagar-B, Nemi Nagar Extension, Vaishali Nagar, Jaipur'
            )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 md:h-[420px]"
            allowFullScreen
          />
          {/* Caption strip with directions CTA */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="glass pointer-events-auto inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[15px] font-bold uppercase tracking-[0.18em] text-teal-900">
              <MapPin size={13} className="text-teal-700" />
              Aseem Amritam · Vaishali Nagar
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                'Aseem Amritam Cancer Centre, Plot No. 123-124, Ganga Sagar-B, Nemi Nagar Extension, Vaishali Nagar, Jaipur'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-teal-900 px-4 py-2 text-[15px] font-bold uppercase tracking-[0.18em] text-cream shadow-soft transition hover:bg-teal-950"
            >
              Open in Google Maps <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LocationCard({ tag, name, address, hours, phone, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
      className={`group relative overflow-hidden rounded-2xl p-8 transition duration-500 hover:-translate-y-1.5 ${
        highlight
          ? 'glass-dark shadow-[0_30px_70px_-25px_rgba(14,22,35,0.55),0_10px_25px_-12px_rgba(14,22,35,0.35)] hover:shadow-[0_45px_90px_-25px_rgba(14,22,35,0.65),0_15px_30px_-12px_rgba(14,22,35,0.45)]'
          : 'glass shadow-[0_30px_60px_-25px_rgba(28,40,73,0.25),0_10px_22px_-12px_rgba(28,40,73,0.15)] hover:shadow-[0_45px_80px_-25px_rgba(28,40,73,0.35),0_15px_28px_-12px_rgba(28,40,73,0.2)]'
      }`}
    >
      {highlight && (
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-400/20 blur-2xl" />
      )}
      <div className="relative">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[14px] font-bold uppercase tracking-widest ${
            highlight ? 'bg-cream/15 text-cream' : 'bg-teal-50 text-teal-800'
          }`}
        >
          {tag}
        </span>
        <h3 className={`mt-5 font-display text-2xl font-bold leading-tight ${highlight ? 'text-cream' : 'text-teal-900'}`}>
          {name}
        </h3>

        <ul className="mt-6 space-y-4 text-sm">
          <li className="flex gap-3">
            <MapPin size={18} className={highlight ? 'text-gold-400' : 'text-teal-700'} />
            <span className={highlight ? 'text-cream/85' : 'text-teal-900/80'}>{address}</span>
          </li>
          <li className="flex gap-3">
            <Clock size={18} className={highlight ? 'text-gold-400' : 'text-teal-700'} />
            <span className={highlight ? 'text-cream/85' : 'text-teal-900/80'}>{hours}</span>
          </li>
          <li className="flex gap-3">
            <Phone size={18} className={highlight ? 'text-gold-400' : 'text-teal-700'} />
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className={`font-num ${highlight ? 'text-cream hover:underline' : 'text-teal-900 hover:underline'}`}
            >
              {phone}
            </a>
          </li>
        </ul>

        <div className="mt-8 flex flex-col items-start gap-3">
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              highlight
                ? 'bg-gold-400 text-teal-950 hover:bg-gold-300'
                : 'bg-teal-700 text-cream hover:bg-teal-800'
            }`}
          >
            Call now <ArrowUpRight size={16} />
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${name}, ${address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              highlight
                ? 'border-gold-400/60 text-gold-300 hover:bg-gold-400/10 hover:text-gold-200'
                : 'border-teal-700/40 text-teal-800 hover:bg-teal-50 hover:text-teal-950'
            }`}
          >
            <Navigation size={15} strokeWidth={1.8} /> Get directions
          </a>
        </div>
      </div>
    </motion.div>
  )
}
