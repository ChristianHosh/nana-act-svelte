/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/routes/**',
      './src/lib/ui/components/**',
      './src/lib/ui/layout/**',
      './src/lib/editors/**',
      './src/lib/dui/action/**',
      './src/lib/dui/data-display/**',
      './src/lib/dui/data-input/**',
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
      require("daisyui")
  ],
    daisyui: {
        themes: ["cupcake"],
    },
}

