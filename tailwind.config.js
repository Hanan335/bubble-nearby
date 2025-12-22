/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        float: 'float 4s cubic-bezier(0.25, 1, 0.5, 1) infinite',
        auroraWave: 'auroraWave 12s ease-in-out infinite',
        auroraPulse: 'auroraPulse 10s ease-in-out infinite',
        breatheIn: 'breatheIn 5s cubic-bezier(0.42, 0, 0.58, 1) infinite',
        breatheOut: 'breatheOut 5s cubic-bezier(0.42, 0, 0.58, 1) infinite',
        shimmer: 'shimmer 3s linear infinite',
        spin: 'spin 1.5s linear infinite',
        fadeInOut: 'fadeInOut 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)', opacity: 0.9 },
          '50%': { transform: 'translateY(-20px)', opacity: 1 },
        },
        auroraWave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '25%': { transform: 'translateX(-10%) translateY(-10%) scale(1.1)' },
          '50%': { transform: 'translateX(-25%) translateY(-20%) scale(1.2)' },
          '75%': { transform: 'translateX(-15%) translateY(-15%) scale(1.1)' },
        },
        auroraPulse: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        breatheIn: {
          '0%': { transform: 'scale(1)', opacity: 0.5 },
          '50%': { transform: 'scale(1.4)', opacity: 1 },
          '100%': { transform: 'scale(1.6)', opacity: 0.7 },
        },
        breatheOut: {
          '0%': { transform: 'scale(1.6)', opacity: 0.7 },
          '50%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 0.5 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-300px 0' },
          '100%': { backgroundPosition: '300px 0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
