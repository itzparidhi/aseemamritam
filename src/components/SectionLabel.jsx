import { motion } from 'framer-motion'

export default function SectionLabel({ index, label, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className={`flex items-baseline justify-between gap-6 border-b pb-3 ${
        light ? 'border-cream/15' : 'border-teal-900/15'
      }`}
    >
      <span
        className={`text-xs font-bold uppercase tracking-[0.22em] ${
          light ? 'text-cream/90' : 'text-teal-900/85'
        }`}
      >
        {label}
      </span>
      <span
        className={`text-[15px] font-semibold tabular-nums tracking-[0.18em] ${
          light ? 'text-cream/55' : 'text-teal-900/50'
        }`}
      >
        ({String(index).padStart(2, '0')})
      </span>
    </motion.div>
  )
}
