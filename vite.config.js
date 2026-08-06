import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables desde .env sin exigir el prefijo VITE_
  // (así la API key no se filtra al bundle del cliente)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // Ruta base cuando se despliega en GitHub Pages como sitio de proyecto:
    // https://TU_USUARIO.github.io/panel-openaq/
    // Si tu repositorio se llama distinto a "panel-openaq", cambia este valor.
    base: mode === 'production' ? '/panel-openaq/' : '/',
    plugins: [react()],
    server: {
      proxy: {
        // Todas las llamadas del front a /api/... se reenvían a la API real de OpenAQ.
        // El servidor de desarrollo de Vite agrega la cabecera X-API-Key,
        // así la key nunca viaja en el código del navegador.
        '/api': {
          target: 'https://api.openaq.org/v3',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('X-API-Key', env.OPENAQ_API_KEY || '')
            })
          },
        },
      },
    },
  }
})
