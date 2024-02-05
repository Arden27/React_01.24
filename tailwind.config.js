/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '315px': '315px',
        '380px': '380px',
        '330px': '330px',
        '430px': '430px'
      },

      colors: {
        primary: 'var(--color--Primary)',
        secondary: 'var(--color--Secondary)',
        text: 'var(--color--Text)',
        accent: 'var(--color--Accent)',
        accent2: 'var(--color--Accent2)',
        warning: 'var(--color--Warning)',
        bg: 'var(--color--Bg)',
        bg2: 'var(--color--Bg2)',
        bg3: 'var(--color--Bg3)',
        header: 'var(--color--Header)',
        bar: 'var(--color--Menu)',
        'about-box': 'var(--color--AboutBox)',
        footer: 'var(--color--Footer)'
      },

      spacing: {
        '3xs': 'var(--spacing--xxxs)',
        '2xs': 'var(--spacing--xxs)',
        xs: 'var(--spacing--xs)',
        sm: 'var(--spacing--sm)',
        md: 'var(--spacing--md)',
        lg: 'var(--spacing--lg)',
        xl: 'var(--spacing--xl)',
        '2xl': 'var(--spacing--xxl)',
        '3xl': 'var(--spacing--xxxl)'
      },

      fontFamily: {
        btn: ['Satoshi Bold'],
        sans: ['Satoshi'],
        serif: ['Nunito']
      },

      fontSize: {
        xs: 'var(--fontSize--xs)',
        sm: 'var(--fontSize--sm)',
        md: 'var(--fontSize--md)',
        lg: 'var(--fontSize--lg)',
        xl: 'var(--fontSize--xl)',
        '2xl': 'var(--fontSize--xxl)',
        '3xl': 'var(--fontSize--xxxl)'
      },

      boxShadow: {
        DEFAULT: '0px 4px 6px 0px rgb(0 0 0 / 0.2)'
      }
    }
  },
  plugins: []
}
