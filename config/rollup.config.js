export default {
  entry: './implements.js',
  dest: './implements.min.js',
  format: 'umd',
  plugins: [],
  external: [
      '@ampersarnie/implements'
  ],
  globals: {
      '@ampersarnie/implements': '@ampersarnie/implements'
  },
  moduleName: 'Implements'
};
