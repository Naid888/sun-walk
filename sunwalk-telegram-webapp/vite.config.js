export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist'
  },
  server: {
    host: true
  }
})
