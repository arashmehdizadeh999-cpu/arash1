import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
    // Allow the preview proxy host in sandbox mode
    ...(process.env.BASE44_PREVIEW_MODE === '1' ? { allowedHosts: true } : {}),
  },
})
