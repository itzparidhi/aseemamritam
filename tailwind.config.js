/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy medical palette — inspired by GlowDent + MedSphere
        navy: {
          50: '#f4f7fb',
          100: '#e5edf5',
          200: '#c8d6e6',
          300: '#9bb3cf',
          400: '#6688af',
          500: '#466890',
          600: '#355275',
          700: '#2a405c',
          800: '#233349',
          900: '#1c2839',
          950: '#0e1623',
        },
        // Site palette — `teal` keyword kept for code-stability; values are now navy.
        teal: {
          50: '#f4f7fb',
          100: '#e5edf5',
          200: '#c8d6e6',
          300: '#9bb3cf',
          400: '#6688af',
          500: '#466890',
          600: '#355275',
          700: '#2a405c',
          800: '#233349',
          900: '#1c2839',
          950: '#0e1623',
        },
        // `rose` kept as actual pink — reserved for awareness-ribbon / brand-mark accents only.
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        // Periwinkle — lavender-blue accents borrowed from the About section.
        peri: {
          50: '#F1F3FB',
          100: '#E4E8F6',
          200: '#C9D0EE',
          300: '#B6C0EA',
          400: '#9BA8DD',
          500: '#7B8AC9',
          600: '#5D6BAA',
        },
        // Muted champagne — used sparingly (stars, soft accents).
        gold: {
          100: '#f4f0e6',
          200: '#e8dfc7',
          300: '#d7c79f',
          400: '#bda06f',
          500: '#9d8252',
        },
        cream: '#FFFFFF',
        ink: '#0e1623',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(28, 40, 73, 0.08)',
        glow: '0 0 0 1px rgba(70, 104, 144, 0.15), 0 20px 50px -20px rgba(28, 40, 73, 0.35)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        'kenburns': 'kenburns 9s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3.5s ease-in-out infinite',
        'drift': 'drift 18s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1.5%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-1.5%, 1%)' },
        },
      },
    },
  },
  plugins: [],
}
