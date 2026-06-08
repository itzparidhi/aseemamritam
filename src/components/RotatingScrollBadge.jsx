export default function RotatingScrollBadge({ label = 'Aseem Amritam' }) {
  return (
    <a
      href="#about"
      aria-label={`Scroll to about — current slide: ${label}`}
      className="group inline-flex items-center"
    >
      <span
        key={label}
        className="rounded-full border border-teal-800/25 bg-cream/70 px-5 py-2.5 text-center font-display text-[13px] italic text-teal-900/80 backdrop-blur-md transition-all duration-700 ease-out group-hover:border-teal-800/50 group-hover:bg-cream/90 group-hover:text-teal-950 md:text-sm"
        style={{ animation: 'fadeUp 0.7s ease-out both' }}
      >
        {label}
      </span>
    </a>
  )
}
