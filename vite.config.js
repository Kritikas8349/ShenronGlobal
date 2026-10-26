import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const apiTarget = env.VITE_DEV_API_ORIGIN || "http://localhost:5000"
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": { target: apiTarget, changeOrigin: true },
        "/uploads": { target: apiTarget, changeOrigin: true },
        "/sitemap.xml": { target: apiTarget, changeOrigin: true },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const modulePath = id.replaceAll("\\", "/")
            if (modulePath.includes("/node_modules/react-icons/")) return "icons-vendor"
            if (modulePath.includes("/node_modules/react-router") || modulePath.includes("/node_modules/@remix-run/") || modulePath.includes("/node_modules/history/")) return "router-vendor"
            if (modulePath.includes("/node_modules/react/") || modulePath.includes("/node_modules/react-dom/") || modulePath.includes("/node_modules/scheduler/")) return "react-vendor"
          },
        },
      },
    },
  }
})
