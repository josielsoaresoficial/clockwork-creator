import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { componentTagger } from 'lovable-tagger'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let build: UserConfig['build'], esbuild: UserConfig['esbuild'], define: UserConfig['define']

  if (mode === 'development') {
    build = {
      minify: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    }

    esbuild = {
      jsxDev: true,
      keepNames: true,
      minifyIdentifiers: false,
    }

    define = {
      'process.env.NODE_ENV': '"development"',
      '__DEV__': 'true',
    }
  }

  return {
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    server: {
      host: "::",
      port: 8080
    },
    build,
    esbuild,
    define,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  }
})
