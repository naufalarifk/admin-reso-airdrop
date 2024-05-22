/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            white2: '#F3F5F7',
            white1: '#F4F7FE',
            yellow: '#FFBE00',
            green: '#1DAB87',
            gray2: '#596780',
            gray3: '#90A3BF',
            lightGray: '#A3AED0',
            smokeGray: '#F0F0F0',
            primary: '#F23F5D',
            soft: '#90A3BF',
            darkSoft: '#6B6B6B',
            dark: '#0E0F19',
            dark2: '#181924',
            dark3: '#20212B',
            secondary: '#FE9F00',
            success: '#33D49D',
         },
         fontFamily: {
            dm: ['DM Sans', 'sans-serif'],
         },
         fontSize: {
            xxs: '10px',
            xxxs: '8px',
         },
         zIndex: {
            1: 1,
            2: 2,
            half: '9999',
            full: '99999',
         },
         spacing: {
            12.5: '3.125rem',
            6.5: '1.625rem',
         },
         keyframes: {
            'shimmer': {
               '100%': {
                  transform: 'translateX(100%)',
               },
            },
            'border-spin': {
               '100%': {
                  transform: 'rotate(-360deg)',
               },
            },
            'backgroundMove': {
               '0%, 100%': { transform: 'translateX(0%)' },
               '50%': { transform: 'translateX(-10px)' },
            },
         },
         animation: {
            'border-spin': 'border-spin 5s linear infinite',
            'backgroundMove': 'backgroundMove 2s ease-in-out infinite',
         },
         backgroundImage: {
            'card-background': 'linear-gradient(to right, var(--tw-gradient-stops))',
         },
      },
   },
   plugins: [],
};
