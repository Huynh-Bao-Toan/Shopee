import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    port: 3000
  },

  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      // Cấu hình cho Rollup
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor' // Tạo tệp mã riêng cho các module node_modules
          }
        }
      }
    }
  }
})
