import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // hmr:{
    //   overlay: false
    // },
    host: '0.0.0.0',
    watch: {
      usePolling: true
    },
    open: false,
    port: 3000,
  }
})
