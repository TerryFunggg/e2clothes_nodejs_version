module.exports = {
  mode: 'jit',
  purge: [
    './src/*.html',
   './src/*.js',
    'views/**/*.pug'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
