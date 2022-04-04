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
        // 'https://news-backend-g.herokuapp.com/'
        // 'http://127.0.0.1:8080/'
        target: 'https://news-backend-g.herokuapp.com:28019/', // 打到目標網址（訪問的接口網域名稱）
        changeOrigin: true, // 開啟代理，會在本地端創建一個虛擬server，同時接收請求數據，這樣服務端之間進行傳輸不會有跨域問題
        rewrite: (path) => path.replace(/^\/api/, ''), // 可以想成要將target換成什麼樣子
        // 範例：
        // http://127.0.0.1:4000/ + axios 的baseURL = http://127.0.0.1:4000/api
        // 而rewrite會把其改成 http://127.0.0.1:4000/api => http://127.0.0.1:4000/
        ws: true, // 是否啟用websocket
      },
    },
  },
})
