import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  theme: {
    colors: {},
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        // @ts-ignore
        heroicons: import('@iconify-json/heroicons/icons.json').then((i) => i.default),
        // @ts-ignore
        'svg-spinners': import('@iconify-json/svg-spinners/icons.json').then((i) => i.default),
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
