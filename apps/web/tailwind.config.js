// tailwind config is required for editor support

const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  presets: [sharedConfig],
  plugins: [require("daisyui")],
  theme: {
    colors: {
      cat: {
        rosewater: '#f5e0dc',
        flamingo: '#f2cdcd',
        pink: '#f5c2e7',
        mauve: '#cba6f7',
        red: '#f38ba8',
        red600: '#d32b66',
        maroon: '#eba0ac',
        peach300: '#fab387',
        peach400: '#f67c41',
        yellow: '#f9e2af',
        green: '#a6e3a1',
        teal: '#94e2d5',
        sky: '#89dceb',
        sapphire: '#74c7ec',
        blue: '#89b4fa',
        lavender: '#b4befe',
        text: '#cdd6f4',
        subtext: '#bac2de',
        overlay: '#9399b2',
        surface: '#45475a',
        base: '#1e1e2e',
        mantle: '#181825',
        crust: '#11111b',
        neutral: '#404040',
        neutral700: '#d4d4d4',
        neutral500: '#737373',
        orange500: '#ea580c',
        slate700: '#334155',
        white: '#ffffff'
      },
    },
    styles: {
      global: {
        body: {
          bg: 'cat.base',
          color: 'cat.text',
        },
      },
    },
  }
};
