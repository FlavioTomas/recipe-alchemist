/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        alchemist: {
          purple: '#6d28d9',
          gold: '#f59e0b',     
          dark: '#0f172a',     
          emerald: '#10b981',
        }
      }
    },
  },
  plugins: [],
}

