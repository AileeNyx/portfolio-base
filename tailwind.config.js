/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'artist-black': '#121212',
        'artist-white': '#F8F8F8',
        'artist-accent': '#D4AF37', // Gold accent
        'artist-gray': '#2A2A2A',
        'artist-light': '#E0E0E0',
        'artist-text-dark': '#0F0F0F',       // Texte foncé presque noir
        'artist-text-light': '#FFFFFF',      // Blanc pur pour un meilleur contraste
        'artist-accent-dark': '#B38D1D',     // Version plus foncée de l'accent or
        'artist-background-light': '#F5F5F5', // Fond clair
        'artist-background-dark': '#050505',  // Fond très sombre
        'artist-overlay-dark': 'rgba(0, 0, 0, 0.85)', // Overlay foncé plus opaque
        'artist-overlay-light': 'rgba(255, 255, 255, 0.95)', // Overlay clair plus opaque
        'artist-card-overlay': 'rgba(0, 0, 0, 0.75)', // Overlay foncé pour les cartes
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'first': 'first 15s infinite ease-in-out',
        'second': 'second 18s infinite ease-in-out',
        'third': 'third 21s infinite ease-in-out',
        'fourth': 'fourth 24s infinite ease-in-out',
        'fifth': 'fifth 20s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        first: {
          '0%': { transform: 'translateY(-40%) translateX(0%) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(-40%) translateX(10%) rotate(60deg) scale(1.1)' },
          '66%': { transform: 'translateY(-40%) translateX(-10%) rotate(120deg) scale(0.9)' },
          '100%': { transform: 'translateY(-40%) translateX(0%) rotate(0deg) scale(1)' },
        },
        second: {
          '0%': { transform: 'translateY(0%) translateX(0%) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(-20%) translateX(-15%) rotate(-60deg) scale(1.1)' },
          '66%': { transform: 'translateY(20%) translateX(15%) rotate(-120deg) scale(0.9)' },
          '100%': { transform: 'translateY(0%) translateX(0%) rotate(0deg) scale(1)' },
        },
        third: {
          '0%': { transform: 'translateY(40%) translateX(0%) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(40%) translateX(-10%) rotate(60deg) scale(1.1)' },
          '66%': { transform: 'translateY(40%) translateX(10%) rotate(120deg) scale(0.9)' },
          '100%': { transform: 'translateY(40%) translateX(0%) rotate(0deg) scale(1)' },
        },
        fourth: {
          '0%': { transform: 'translateY(0%) translateX(0%) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(20%) translateX(15%) rotate(60deg) scale(1.1)' },
          '66%': { transform: 'translateY(-20%) translateX(-15%) rotate(120deg) scale(0.9)' },
          '100%': { transform: 'translateY(0%) translateX(0%) rotate(0deg) scale(1)' },
        },
        fifth: {
          '0%': { transform: 'translateY(0%) translateX(0%) rotate(0deg) scale(1)' },
          '33%': { transform: 'translateY(-15%) translateX(15%) rotate(60deg) scale(1.1)' },
          '66%': { transform: 'translateY(15%) translateX(-15%) rotate(120deg) scale(0.9)' },
          '100%': { transform: 'translateY(0%) translateX(0%) rotate(0deg) scale(1)' },
        },
      },
    },
  },
  plugins: [],
} 