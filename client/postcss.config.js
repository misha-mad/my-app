const plugins = {
  'tailwindcss/nesting': 'postcss-nesting',
  tailwindcss: {},
  'postcss-preset-env': {browsers: ['defaults']},
  'postcss-easing-gradients': {},
}

if (process.env.NODE_ENV === 'production') {
  plugins.cssnano = {}
}

export default {plugins}
