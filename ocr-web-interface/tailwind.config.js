/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Configuration responsive personnalisée
      screens: {
        'xs': '375px',    // Petit mobile
        'sm': '640px',    // Mobile standard
        'md': '768px',    // Tablette
        'lg': '1024px',   // Desktop
        'xl': '1280px',   // Grand écran
        '2xl': '1536px',  // Très grand écran
      },
      fontSize: {
        // Tailles de police adaptatives
        'xs-mobile': ['0.75rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['1rem', { lineHeight: '1.5rem' }],
      },
      padding: {
        // Espacements spécifiques pour mobile
        'mobile-container': '1rem',
      },
      borderRadius: {
        // Coins arrondis adaptés
        'mobile-lg': '0.75rem',
        'mobile-md': '0.5rem',
      },
    },
  },
  plugins: [
    // Plugin pour gérer le responsive et l'accessibilité
    function ({ addBase, theme }) {
      addBase({
        'html': {
          fontSize: '16px',
          '@media (max-width: 640px)': {
            fontSize: '14px'
          }
        }
      })
    }
  ],
}