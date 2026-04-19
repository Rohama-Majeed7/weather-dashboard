import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // allows PWA in dev mode (optional but useful)
      },
      manifest: {
        id: '/',
        name: 'Weather App',
        short_name: 'App',
        description: 'My awesome PWA app',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})