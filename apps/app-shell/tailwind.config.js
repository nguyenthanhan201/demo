/** @type {import('tailwindcss').Config} */
module.exports = {
  // disable reset styles of tailwind
  corePlugins: {
    preflight: false
  },
  content: ['./src/**/*.{html,tsx}', './pages/**/*.{html,tsx}'],
  variants: {
    display: [
      'children',
      'default',
      'children-first',
      'children-last',
      'children-odd',
      'children-even',
      'children-not-first',
      'children-not-last',
      'children-hover',
      'hover',
      'children-focus',
      'focus',
      'children-focus-within',
      'focus-within',
      'children-active',
      'active',
      'children-visited',
      'visited',
      'children-disabled',
      'disabled',
      'responsive'
    ]
  },
  theme: {
    screens: {}, // do not remove/adjust screen (this effect responsive)
    extend: {
      colors: {
        main: {
          light: 'var(--color-main-light)',
          DEFAULT: 'var(--color-main)',
          dark: 'var(--color-main-dark)',
          white: 'var(--color-white)'
        },
        main_vegetable: {
          DEFAULT: 'var(--color-main-vegetable)',
          dark: 'var(--color-main-vegetable-dark)',
          light: 'var(--color-main-vegetable-light)'
        },
        text_main: {
          DEFAULT: 'var(--color-text-gray-vegetable)'
        },
        background: '#F5F5F5',
        'gray-transparent': 'rgba(255, 255, 255, 0)',
        'gray-0.1': 'rgba(0, 0, 0, 0.09)',
        grey: {
          35: '#595959',
          40: '#666666',
          50: '#808080',
          60: '#999999',
          70: '#B3B3B3',
          80: '#CCCCCC',
          85: '#D9D9D9',
          90: '#E5E5E5',
          94: '#EDEDF2',
          95: '#F2F2F2',
          97: '#F5F5FA',
          100: '#FFFFFF',
          250: '#F5F5F5'
        },
        blue: {
          42: '#1829BD'
        },
        // Custom colors
        myPrimaryBrandColor: '#000000',
        myPrimaryLinkColor: '#2563eb',

        myPrimaryLightGrayColor: '#e2e8f0',
        myPrimaryMediumGrayColor: '#9ca3af',
        myPrimaryDarkGrayColor: '#111827',

        myPrimaryErrorColor: '#d60000',
        myPrimarySuccesColor: '#16a34a'
      },
      gridTemplateColumns: {},
      fontSize: {
        12: '12px',
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        40: '40px',
        48: '48px'
      },
      minWidth: {
        none: 'none',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        22: '5.5rem',
        24: '6rem',
        25: '6.25rem',
        28: '7rem',
        '4xs': '8rem',
        '3xs': '12rem',
        '2xs': '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px'
      },
      maxWidth: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        18: '4.5rem',
        20: '5rem',
        22: '5.5rem',
        24: '6rem',
        25: '6.25rem',
        28: '7rem',
        '4xs': '8rem',
        '3xs': '12rem',
        '2xs': '16rem'
      },
      height: {
        13: '3.25rem',
        15: '3.75rem',
        21: '5.25rem',
        25: '6.25rem',
        30: '7.5rem',
        50: '12.5rem'
      },
      width: {
        13: '3.25rem',
        16: '4rem',
        18: '4.5rem',
        21: '5.25rem',
        25: '6.25rem',
        30: '7.5rem',
        50: '12.5rem'
      },
      screens: {
        '2xl': { max: '1535px' },
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        md: { max: '812px' },
        sm: { max: '639px' }
      },
      boxShadow: {
        '3xl':
          'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'
      },
      borderColor: {
        DEFAULT: 'transparent'
      },
      keyframes: {
        rotateX: {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' }
        }
      },
      animation: {
        rotateX: 'rotateX 0.3s'
      }
    }
  },
  blocklist: ['container', 'btn_txt'],
  plugins: []
};
