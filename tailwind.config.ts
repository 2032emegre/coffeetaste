import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'coffee': {
          50: '#f8f5f2',
          100: '#f1ebe5',
          200: '#e3d7cc',
          300: '#d5c3b3',
          400: '#c7af9a',
          500: '#b99b81',
          600: '#947c67',
          700: '#6f5d4d',
          800: '#4a3e33',
          900: '#251f1a',
        },
      },
    },
  },
  plugins: [],
}
export default config 