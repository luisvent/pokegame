/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './pages/**/*.{js,jsx,vue}',
    './components/**/*.{js,jsx,vue}',
    './app/**/*.{js,jsx,vue}',
    './src/**/*.{js,jsx,vue}',
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      backgroundImage: {
        'bg1': "url('/images/bg/bg1.png')",
        'bg2': "url('/images/bg/bg2.png')",
        'bg3': "url('/images/bg/bg3.png')",
        'bg4': "url('/images/bg/bg4.jpeg')",
        'bg1-clear': "url('/images/bg/bg1_clear.png')",
        'bg2-clear': "url('/images/bg/bg2_clear.png')",
        'bg3-clear': "url('/images/bg/bg3_clear.png')",
        'bg4-clear': "url('/images/bg/bg4_clear.png')",
        'bg5-clear': "url('/images/bg/intro_bg.jpg')",
      },
      fontFamily: {
        round: ["Base Round", ...defaultTheme.fontFamily.sans],
        uround: ["Base Ultra Round", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'retro': '3px 3px 0px black',
      },
      animation: {
        fadein: 'fadein 1000ms ease-in-out',
        steam: 'steam 2000ms linear infinite',
        fadeinout: 'fadeinout 3000ms linear infinite',
        scalein: 'scalein 700ms ease-in-out',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scalein: {
          '0%': { scale: '0.5', opacity: '0' },
          '100%': { scale: '1', opacity: '1' },
        },
        steam: {
          '0%': {transform: 'skewX(0deg)', opacity: 1},
          '25%': {transform: 'skewX(5deg)', opacity: 0.8},
          '75%': {transform: 'skewX(-5deg)', opacity: 0.8},
          '100%': {transform: 'skewX(0deg)', opacity: 1},
        },
        fadeinout: {
          '0%': {opacity: 0},
          '50%': {opacity: 1},
          '100%': {opacity: 0},
        }
      }
    }
  },
  plugins: [
  ],
}

