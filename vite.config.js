/// <reference types="vitest" />
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  test: {

  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'svelte-domain',
      fileName: (format) => `index.${format}.js`
    }
  }
});