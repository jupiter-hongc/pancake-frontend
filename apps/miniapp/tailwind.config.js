import defaultTheme from "tailwindcss/defaultTheme";
import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      t: {
        primary: "rgb(var(--colors-t-primary) / <alpha-value>)",
        secondary: "rgb(var(--colors-t-secondary) / <alpha-value>)",
        fillSecondary: "rgb(var(--colors-t-fill-secondary) / <alpha-value>)",
        third: "rgb(var(--colors-t-third) / <alpha-value>)",
        disabled: "rgb(var(--colors-t-disabled) / <alpha-value>)",
        placeholder: "rgb(var(--colors-t-placeholder) / <alpha-value>)",
        onColor: "rgb(var(--colors-t-onColor) / <alpha-value>)",
        consistent: "rgb(var(--colors-t-consistent) / <alpha-value>)",
        inverse: "rgb(var(--colors-t-inverse) / <alpha-value>)",
        error: "rgb(var(--colors-t-error) / <alpha-value>)",
        buy: "rgb(var(--colors-t-buy) / <alpha-value>)",
        sell: "rgb(var(--colors-t-sell) / <alpha-value>)",
        link: "rgb(var(--colors-t-link) / <alpha-value>)",
        linkHover: "rgb(var(--colors-t-linkHover) / <alpha-value>)",
        white: "rgb(var(--colors-t-white) / <alpha-value>)",
        emphasize: "rgb(var(--colors-t-emphasize) / <alpha-value>)",
      },
      border: {
        line: "rgb(var(--colors-border-line) / <alpha-value>)",
        lineSubtle: "rgb(var(--colors-border-lineSubtle) / <alpha-value>)",
        lineStrong: "rgb(var(--colors-border-lineStrong) / <alpha-value>)",
        newLine: "rgb(var(--colors-border-new-line) / <alpha-value>)",
        inputSecondary:
          "rgb(var(--colors-border-inputSecondary) / <alpha-value>)",
      },
      background: {
        bg1: "rgb(var(--colors-background-bg1) / <alpha-value>)",
        bg2: "rgb(var(--colors-background-bg2) / <alpha-value>)",
        bg1Accent01:
          "rgb(var(--colors-background-bg1Accent01) / <alpha-value>)",
        bg1Accent02:
          "rgb(var(--colors-background-bg1Accent02) / <alpha-value>)",
      },
      interactive: {
        disabled: "rgb(var(--colors-interactive-disabled) / <alpha-value>)",
        fillDisabled:
          "rgb(var(--colors-interactive-fillDisabled) / <alpha-value>)",
        primary: "rgb(var(--colors-interactive-primary) / <alpha-value>)",
        borderGradientStart:
          "rgb(var(--colors-interactive-borderGradientStart) / <alpha-value>)",
        borderGradientEnd:
          "rgb(var(--colors-interactive-borderGradientEnd) / <alpha-value>)",
        cardGradientStart:
          "rgb(var(--colors-interactive-cardGradientStart) / <alpha-value>)",
        cardGradientEnd:
          "rgb(var(--colors-interactive-cardGradientEnd) / <alpha-value>)",
        primaryHover:
          "rgb(var(--colors-interactive-primaryHover) / <alpha-value>)",
        primaryActive:
          "rgb(var(--colors-interactive-primaryActive) / <alpha-value>)",
        primaryGradient:
          "rgb(var(--colors-interactive-primaryGradient) / <alpha-value>)",
        primaryAccent01:
          "rgb(var(--colors-interactive-primaryAccent01) / <alpha-value>)",
        primaryAccent02:
          "rgb(var(--colors-interactive-primaryAccent02) / <alpha-value>)",
        buy: "rgb(var(--colors-interactive-buy) / <alpha-value>)",
        buyHover: "rgb(var(--colors-interactive-buyHover) / <alpha-value>)",
        buyActive: "rgb(var(--colors-interactive-buyActive) / <alpha-value>)",
        sell: "rgb(var(--colors-interactive-sell) / <alpha-value>)",
        sellHover: "rgb(var(--colors-interactive-sellHover) / <alpha-value>)",
        sellActive: "rgb(var(--colors-interactive-sellActive) / <alpha-value>)",
        sellGradient:
          "rgb(var(--colors-interactive-sellGradient) / <alpha-value>)",
        sellAccent01:
          "rgb(var(--colors-interactive-sellAccent01) / <alpha-value>)",
        interactiveBg:
          "rgb(var(--colors-interactive-interactiveBg) / <alpha-value>)",
        interactiveBgHover:
          "rgb(var(--colors-interactive-interactiveBgHover) / <alpha-value>)",
        interactiveBgActive:
          "rgb(var(--colors-interactive-interactiveBgActive) / <alpha-value>)",
        interactiveBgSelected:
          "rgb(var(--colors-interactive-interactiveBgSelected) / <alpha-value>)",
        interactive01:
          "rgb(var(--colors-interactive-interactive01) / <alpha-value>)",
        interactive01Hover:
          "rgb(var(--colors-interactive-interactive01Hover) / <alpha-value>)",
        interactive01Active:
          "rgb(var(--colors-interactive-interactive01Active) / <alpha-value>)",
        interactive01Selected:
          "rgb(var(--colors-interactive-interactive01Selected) / <alpha-value>)",
        interactive02:
          "rgb(var(--colors-interactive-interactive02) / <alpha-value>)",
        interactive02Hover:
          "rgb(var(--colors-interactive-interactive02Hover) / <alpha-value>)",
        interactive02Active:
          "rgb(var(--colors-interactive-interactive02Active) / <alpha-value>)",
        interactive02Selected:
          "rgb(var(--colors-interactive-interactive02Selected) / <alpha-value>)",
        interactivePopup:
          "rgb(var(--colors-interactive-interactivePopup) / <alpha-value>)",
        interactiveTertiary:
          "rgb(var(--colors-interactive-tertiary) / <alpha-value>)",
        interactiveTertiary20:
          "rgb(var(--colors-interactive-tertiary20) / <alpha-value>)",
        interactiveExpandPositive:
          "rgb(var(--colors-interactive-expandPositive) / <alpha-value>)",
        interactiveExpandDestructive:
          "rgb(var(--colors-interactive-expandDestructive) / <alpha-value>)",
      },
      support: {
        success: "rgb(var(--colors-support-success) / <alpha-value>)",
        error: "rgb(var(--colors-support-error) / <alpha-value>)",
        warning: "rgb(var(--colors-support-warning) / <alpha-value>)",
        info: "rgb(var(--colors-support-info) / <alpha-value>)",
      },
      highLight: "rgb(var(--colors-highLight) / <alpha-value>)",
      overlay: "var(--colors-overlay)",
    },
    extend: {
      fontFamily: {
        kanit: ['"Kanit"', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        extraSmall: [
          "0.75rem", // 12px
          {
            lineHeight: "1.125rem", // 18px
            fontWeight: "400",
            letterSpacing: "0.01em",
          },
        ],
        extraSmallBold: [
          "0.75rem", // 12px
          {
            lineHeight: "1.125rem", // 18px
            fontWeight: "600",
            letterSpacing: "0.01em",
          },
        ],
        preTitle: [
          "0.75rem", // 12px
          {
            lineHeight: "1.125rem", // 18px
            fontWeight: "600",
            letterSpacing: "0.02em",
          },
        ],
        small: [
          "0.875rem", // 14px
          {
            lineHeight: "1.25rem", // 20px
            fontWeight: "400",
          },
        ],
        smallBold: [
          "0.875rem", // 14px
          {
            lineHeight: "1.25rem", // 20px
            fontWeight: "600",
          },
        ],
        body: [
          "1rem", // 16px
          {
            lineHeight: "1.5rem", // 24px
            fontWeight: "400",
          },
        ],
        bold: [
          "1rem", // 16px
          {
            lineHeight: "1.5rem", // 14px
            fontWeight: "600",
          },
        ],
        h1Mobile: [
          "2.5rem", // 40px,
          {
            lineHeight: "3rem", // 48px
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],

        h2Mobile: [
          "2rem", // 32px,
          {
            lineHeight: "2.375rem", // 38px
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h3: [
          "1.5rem", // 20px
          {
            lineHeight: "2.25rem", // 30px
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
        h4: [
          "1.25rem", // 20px
          {
            lineHeight: "1.875rem", // 30px
            fontWeight: "600",
            letterSpacing: "-0.01em",
          },
        ],
      },
      boxShadow: {
        elevation1:
          "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 3px 6px 0px rgba(0, 0, 0, 0.04), 0px 0px 1px 0px rgba(90, 92, 116, 0.8) inset",
        elevation2:
          "0px 0px 1px 0px rgba(90, 92, 116, 0.9) inset, 0px 7px 14px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px 0px rgba(0, 0, 0, 0.08)",
        elevation3:
          "0px 0px 1px 0px rgba(90, 92, 116, 0.9) inset, 0px 16px 32px 0px rgba(0, 0, 0, 0.16), 0px 8px 16px 0px rgba(0, 0, 0, 0.16)",
      },
      backgroundColor: {
        "primary-gradient":
          "rgb(var(--colors-interactive-primary) / <alpha-value>)",
      },
      keyframes: {
        flashingProgress: {
          "0%": {
            width: 0,
            left: 0,
          },
          "40%": {
            width: "100%",
            left: 0,
          },
          "60%": {
            width: "100%",
            left: 0,
          },
          "100%": {
            width: 0,
            left: "100%",
          },
        },
        progress: {
          from: {
            width: "100%",
          },
          to: {
            width: "0%",
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pules-spinner": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        spinner: {
          "0%, 100%": { height: "100%" },
          "50%": { height: "50%" },
        },
        reverseSpin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      backgroundImage: {
        "spinner-radial":
          "radial-gradient(rgba(0, 0, 0, 0.05) 30%, transparent)",
        "gradient-141": "linear-gradient(141deg, var(--tw-gradient-stops))",
      },
      animation: {
        flashProgress: "flashingProgress 1.8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spinner: "spinner 1s ease-in-out infinite",
        reverseSpin: "reverseSpin 1s ease 0s infinite",
        "pules-spinner": "pules-spinner linear 1.2s infinite",
      },
    },
    screens: {
      sm: "768px",
      md: "1024px",
      lg: "1300px",
      xl: "1400px",
      smh: {
        raw: "(min-height: 668px)",
      },
      mdh: {
        raw: "(min-height: 770px)",
      },
      smw: {
        raw: "(min-width: 430px)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
