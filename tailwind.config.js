/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/routes/**',
      './src/lib/ui/components/**',
      './src/lib/ui/layout/**',
      './src/lib/dui/**/**',
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

