/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import animations from '@midudev/tailwind-animations'

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
        'bg1': "url('/images/bg/bg1.webp')",
        'bg2': "url('/images/bg/bg2.png')",
        'bg3': "url('/images/bg/bg3.png')",
        'bg4': "url('/images/bg/bg4.webp')",
        'bg5': "url('/images/bg/bg5.webp')",
        'bg6': "url('/images/bg/bg6.webp')",
        'bg7': "url('/images/bg/bg7.png')",
        'bg8': "url('/images/bg/bg8.png')",
        'bg1-clear': "url('/images/bg/bg1_clear.webp')",
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
        hithere: 'hithere 1.5s ease infinite;',
        shake: 'shake 2s ease infinite;',
        blink: 'blink 1s ease infinite;',
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
        },
        hithere: {
          '30%': {transform: 'scale(1.1);'},
          '40%': {transform: 'rotate(-20deg) scale(1.1);'},
          '50%': {transform: 'rotate(20deg) scale(1.1);'},
          '60%': {transform: 'rotate(-20deg) scale(1.1);'},
          '70%': {transform: 'rotate(0deg) scale(1.1);'},
          '100%': {transform: 'scale(1);'},
        },
        blink: {
          '0%' : {opacity: 0},
          '5%' : {opacity: 1},
          '100%' : {opacity: 0},
        },
        shake: {
          '0%': {transform: 'translate(0);'},
          '10%': {transform: 'translateX(-10px);'},
          '20%': {transform: 'translateX(10px);'},
          '30%': {transform: 'translateX(-10px);'},
          '40%': {transform: 'translateX(10px);'},
          '50%': {transform: 'translateX(-10px);'},
          '60%': {transform: 'translateX(10px);'},
          '70%': {transform: 'translateX(-10px);'},
          '80%': {transform: 'translateX(10px);'},
          '90%': {transform: 'translateX(-10px);'},
          '100%': {transform: 'translate(0);'},
        }
      }
    }
  },
  plugins: [
    animations
  ],
}

