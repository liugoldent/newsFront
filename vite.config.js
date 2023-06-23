import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      host: '0.0.0.0',
      '/api': {
        target: import.meta.VITE_BASE_URL,  // 打到目標網址（訪問的接口網域名稱）
        changeOrigin: true, // 開啟代理，會在本地端創建一個虛擬server，同時接收請求數據，這樣服務端之間進行傳輸不會有跨域問題
        rewrite: (path) => path.replace(/^\/api/, ''), // 可以想成要將target換成什麼樣子
        ws: false, // 是否啟用websocket
      },
    },
  },
})
