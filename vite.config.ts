import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.COIN_API_URL': JSON.stringify(env.COIN_API_URL),
      'process.env.ECONOMIA_API_URL': JSON.stringify(env.ECONOMIA_API_URL)
    },
    plugins: [react()],
    preview: {
      port: 3000,
      strictPort: true,
     },
     server: {
      port: 3000,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:3000",
     }
  }
})
