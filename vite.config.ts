import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js built-in modules for Renderer process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: {},
    }),
  ],
  resolve: {
    alias: [
      { 
        find: '@components', replacement: path.resolve(__dirname, 'src/components/') 
      }, 
      {
        find: '@hooks', replacement: path.resolve(__dirname, 'src/lib/hooks/')
      },
      {
        find: '@helpers', replacement: path.resolve(__dirname, 'src/lib/helpers/')
      },
      {
        find: '@enums', replacement: path.resolve(__dirname, 'src/lib/constants/enums/')
      }
    ],
  },
})
