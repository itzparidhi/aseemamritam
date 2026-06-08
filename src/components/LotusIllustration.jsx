export default function LotusIllustration({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        fill="none"
        strokeLinecap="round"
      >
        <defs>
          <linearGradient id="lotusGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f1d27a" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a87f3a" />
          </linearGradient>
          <linearGradient id="lotusPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fce7f3" />
            <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Center top petal */}
        <path
          d="M 100 38 C 88 65 84 100 96 130 L 100 138 L 104 130 C 116 100 112 65 100 38 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />

        {/* Inner left + right petals */}
        <path
          d="M 100 138 C 78 122 64 96 76 60 C 88 90 96 118 100 138 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />
        <path
          d="M 100 138 C 122 122 136 96 124 60 C 112 90 104 118 100 138 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />

        {/* Outer left + right petals */}
        <path
          d="M 100 142 C 58 134 36 110 38 80 C 60 102 84 128 100 142 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />
        <path
          d="M 100 142 C 142 134 164 110 162 80 C 140 102 116 128 100 142 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />

        {/* Widest left + right petals */}
        <path
          d="M 100 148 C 52 156 22 144 22 124 C 50 144 78 154 100 148 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />
        <path
          d="M 100 148 C 148 156 178 144 178 124 C 150 144 122 154 100 148 Z"
          fill="url(#lotusPink)"
          stroke="url(#lotusGold)"
          strokeWidth="1.6"
        />

        {/* Pink ribbon — crossed tails only */}
        <path d="M 96 92 L 90 160 L 99 153 Z" fill="#ec4899" stroke="#be185d" strokeWidth="0.4" />
        <path d="M 104 92 L 110 160 L 101 153 Z" fill="#ec4899" stroke="#be185d" strokeWidth="0.4" />
      </svg> 

      {/* Sparkles */}
      <Sparkle x="14%" y="22%" delay="0s" size={9} />
      <Sparkle x="84%" y="18%" delay="1s" size={7} />
      <Sparkle x="6%" y="58%" delay="2s" size={6} />
      <Sparkle x="90%" y="62%" delay="0.6s" size={8} />
      <Sparkle x="50%" y="6%" delay="1.4s" size={10} />
    </div>
  )
}

function Sparkle({ x, y, delay, size = 8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ left: x, top: y, width: size, height: size, animationDelay: delay }}
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 animate-twinkle fill-gold-500"
    >
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  )
}
