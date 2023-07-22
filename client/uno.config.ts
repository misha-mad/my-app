import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],

  theme: {
    borderWidth: {
      0.5: '0.5px',
    },

    fontSize: {
      12: 'calc(12 * 1rem / 16)',
      14: 'calc(14 * 1rem / 16)',
      16: 'calc(16 * 1rem / 16)',
      20: 'calc(20 * 1rem / 16)',
      24: 'calc(24 * 1rem / 16)',
      42: 'calc(42 * 1rem / 16)',
      64: 'calc(64 * 1rem / 16)',
    },

    gridTemplateColumns: {
      '1fr/auto': '1fr auto',
      '1fr/minmax(0/360)/1fr': '1fr minmax(0, calc(360 * .25rem)) 1fr',
      'auto/1fr': 'auto 1fr',
      'auto/1fr/auto': 'auto 1fr auto',
    },

    gridTemplateRows: {
      '1fr/auto': '1fr auto',
      'auto/1fr': 'auto 1fr',
      'auto/1fr/auto': 'auto 1fr auto',
    },

    maxWidth: {
      100: 'calc(100 * .25rem)',
      140: 'calc(140 * .25rem)',
      207: 'calc(207 * .25rem)',
      63: 'calc(63 * .25rem)',
      85: 'calc(85 * .25rem)',
      90: 'calc(90 * .25rem)',
      95: 'calc(95 * .25rem)',
    },

    minHeight: {
      54: 'calc(54 * .25rem)',
    },

    spacing: {
      13: 'calc(13 * .25rem)',
      15: 'calc(15 * .25rem)',
      17: 'calc(17 * .25rem)',
      18: 'calc(18 * .25rem)',
      19: 'calc(19 * .25rem)',
      21: 'calc(21 * .25rem)',
      22: 'calc(22 * .25rem)',
      23: 'calc(23 * .25rem)',
      25: 'calc(25 * .25rem)',
      27: 'calc(27 * .25rem)',
      30: 'calc(30 * .25rem)',
      35: 'calc(35 * .25rem)',
      42: 'calc(42 * .25rem)',
      45: 'calc(45 * .25rem)',
      50: 'calc(50 * .25rem)',
      51: 'calc(51 * .25rem)',
      55: 'calc(55 * .25rem)',
      71: 'calc(71 * .25rem)',
      74: 'calc(74 * .25rem)',
      75: 'calc(75 * .25rem)',
      78: 'calc(78 * .25rem)',
      '9/16': 'calc(9 * 100% / 16)',
      full: '100%',
      'screen-x': '100vw',
      'screen-y': '100vh',
    },

    transitionDuration: {
      DEFAULT: '200ms',
    },

    transitionProperty: {
      'background-color': 'background-color',
      'transform/opacity': 'transform, opacity',
      'visibility/opacity': 'visibility, opacity',
    },

    width: {
      'max-content': 'max-content',
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      '2lg': '1194px',
      xl: '1280px',
      '2xl': '1536px',
      '4xl': '2560px',
    },
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Roboto',
      },
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
