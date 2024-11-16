import { transform } from 'next/dist/build/swc/generated-native';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        bounce: 'bounce 0.8s ease-in-out 1',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)'
          }
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
