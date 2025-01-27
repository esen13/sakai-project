import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    // 	xxsm: { max: '340px' },
    // 	xsm: { min: '640px' },
    // 	md: { min: '768px' },
    // 	sm: { max: '845px' },
    // 	lg: { min: '1024px' },
    // 	'2lg': { min: '1100px' },
    // 	xl: { min: '1280px' },
    // 	'1xl': { min: '1470px' },
    // 	'2xl': { min: '1536px' }
    // },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        // md: { min: '868px' },
        // sm: { min: '945px' },
        // lg: { min: '1124px' },
        xl: { min: "1200px" },
        "2xl": { min: "1400px" },
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // primary: {
        //   DEFAULT: "var(--primary)",
        //   foreground: "var(--primary-foreground)",
        // },
        // secondary: {
        //   DEFAULT: "var(--secondary)",
        //   foreground: "var(--secondary-foreground)",
        // },
        // destructive: {
        //   DEFAULT: "var(--destructive)",
        //   foreground: "var(--destructive-foreground)",
        // },
        // muted: {
        //   DEFAULT: "var(--muted)",
        //   foreground: "var(--muted-foreground)",
        // },
        // border: {
        //   DEFAULT: "var(--border)",
        // },
        // error: {
        //   DEFAULT: "var(--primary-red)",
        //   foreground: "var(--foreground-red)",
        // },
        // success: {
        //   DEFAULT: "var(--primary-success)",
        //   foreground: "var(--foreground-success)",
        // },
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      // keyframes: {
      // 	'caret-blink': {
      // 		'0%,70%,100%': { opacity: '1' },
      // 		'20%,50%': { opacity: '0' }
      // 	},
      // 	'accordion-down': {
      // 		from: { height: '0' },
      // 		to: { height: 'var(--radix-accordion-content-height)' }
      // 	},
      // 	'accordion-up': {
      // 		from: { height: 'var(--radix-accordion-content-height)' },
      // 		to: { height: '0' }
      // 	},
      // 	'height-down-up': {
      // 		from: { height: '106px' },
      // 		to: { height: 'auto' }
      // 	},
      // 	shimmer: {
      // 		'0%': {
      // 			transform: 'translateX(-100%)'
      // 		},
      // 		'100%': {
      // 			transform: 'translateX(100%)'
      // 		}
      // 	},
      // 	scroll: {
      // 		to: {
      // 			transform: 'translate(calc(-50% - 0.5rem)'
      // 		}
      // 	}
      // },
      // animation: {
      // 	'accordion-down': 'accordion-down 0.2s ease-out',
      // 	'accordion-up': 'accordion-up 0.2s ease-out',
      // 	shimmer: 'shimmer 5s ease infinite',
      // 	'height-down-up': 'height-down-up 15s linear ',
      // 	scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      // 	'caret-blink': 'caret-blink 1.25s ease-out infinite'
      // },
      // backgroundImage: {
      // 	'custom-gradient': 'linear-gradient(252.44deg, #56454D 0%, #1B3B6A 54%, #1F4355 100%)',
      // 	'gradient-radial': 'radial-gradient(var(--tw-gradient-stops)'
      // }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
