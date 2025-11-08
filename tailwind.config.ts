import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        "heading-xs": [
          "1.25rem",
          { lineHeight: "1.75rem", letterSpacing: "0.025em" },
        ],
        "heading-sm": [
          "1.5rem",
          { lineHeight: "2rem", letterSpacing: "0.025em" },
        ],
        "heading-base": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "0.025em" },
        ],
        "heading-lg": [
          "2.25rem",
          { lineHeight: "2.5rem", letterSpacing: "0.025em" },
        ],
        "heading-xl": ["3rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "heading-2xl": [
          "3.75rem",
          { lineHeight: "1", letterSpacing: "0.025em" },
        ],
        "heading-3xl": [
          "4.5rem",
          { lineHeight: "1", letterSpacing: "0.025em" },
        ],
        "heading-4xl": ["6rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "heading-5xl": ["8rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "heading-6xl": ["9rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "heading-7xl": ["10rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "heading-8xl": ["12rem", { lineHeight: "1", letterSpacing: "0.025em" }],
        "heading-9xl": ["14rem", { lineHeight: "1", letterSpacing: "0.025em" }],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      colors: {
        // Nirvana Chai Brand Colors
        sage: {
          DEFAULT: "#9CA68C",
          50: "#F5F6F3",
          100: "#EBEEE7",
          200: "#D7DDCF",
          300: "#C3CCB7",
          400: "#AFB99F",
          500: "#9CA68C",
          600: "#7D8570",
          700: "#5E6454",
          800: "#3F4338",
          900: "#20221C",
        },
        chai: {
          DEFAULT: "#B29370",
          50: "#F9F6F3",
          100: "#F3EDE7",
          200: "#E7DBCF",
          300: "#DBC9B7",
          400: "#CFB79F",
          500: "#B29370",
          600: "#8E755A",
          700: "#6A5743",
          800: "#46392D",
          900: "#231C16",
        },
        "off-white": "#F9F7F3",
        forest: {
          DEFAULT: "#22402F",
          50: "#E9F0EB",
          100: "#D3E1D7",
          200: "#A7C3AF",
          300: "#7BA587",
          400: "#4F875F",
          500: "#22402F",
          600: "#1B3326",
          700: "#14261D",
          800: "#0D1A13",
          900: "#070D0A",
          950: "#030504",
        },
        emerald: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        teal: {
          DEFAULT: "#557D77",
          50: "#F2F6F5",
          100: "#E5EDEB",
          200: "#CBDBD7",
          300: "#B1C9C3",
          400: "#97B7AF",
          500: "#557D77",
          600: "#44645F",
          700: "#334B47",
          800: "#22322F",
          900: "#111918",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        luxury:
          "0 25px 50px -12px rgba(156, 166, 140, 0.25), 0 0 0 1px rgba(156, 166, 140, 0.1)",
        "luxury-lg":
          "0 35px 60px -12px rgba(156, 166, 140, 0.3), 0 0 0 1px rgba(156, 166, 140, 0.15)",
        "luxury-xl":
          "0 45px 70px -12px rgba(156, 166, 140, 0.35), 0 0 0 1px rgba(156, 166, 140, 0.2)",
        emerald:
          "0 10px 25px -5px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.2)",
        "emerald-lg":
          "0 20px 40px -10px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "luxury-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
          },
        },
        "float-luxury": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translateY(-20px) rotate(180deg)",
            opacity: "0.6",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "luxury-glow": "luxury-glow 3s ease-in-out infinite",
        "float-luxury": "float-luxury 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
