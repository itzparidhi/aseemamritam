import { isValidElement } from 'react'
import { motion } from 'framer-motion'

const wordMask = 'inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]'
const wordVariants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}
const containerVariants = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

function tokenize(node, acc = []) {
  if (node == null || node === false) return acc
  if (typeof node === 'string') {
    node.split(/(\s+)/).forEach((p) => {
      if (!p) return
      acc.push(/^\s+$/.test(p) ? { kind: 'space' } : { kind: 'word', value: p })
    })
    return acc
  }
  if (Array.isArray(node)) {
    node.forEach((c) => tokenize(c, acc))
    return acc
  }
  if (isValidElement(node)) {
    if (node.type === 'br') acc.push({ kind: 'break' })
    else acc.push({ kind: 'element', value: node })
    return acc
  }
  acc.push({ kind: 'word', value: String(node) })
  return acc
}

export default function WordReveal({
  children,
  as: Tag = 'h2',
  className = '',
  stagger = 0.05,
  delay = 0,
  once = true,
}) {
  const tokens = tokenize(children)
  const MotionTag = motion[Tag] || motion.span

  return (
    <MotionTag
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
    >
      {tokens.map((t, i) => {
        if (t.kind === 'break') return <br key={`br-${i}`} />
        if (t.kind === 'space') return <span key={`sp-${i}`}> </span>
        return (
          <span key={`m-${i}`} className={wordMask}>
            <motion.span variants={wordVariants} className="inline-block">
              {t.kind === 'element' ? t.value : t.value}
            </motion.span>
          </span>
        )
      })}
    </MotionTag>
  )
}
