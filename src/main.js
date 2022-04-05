import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'
console.log(process.env.NODE_ENV);
const app = createApp(App)

app.config.globalProperties.axios = axios
app.config.globalProperties.envURL =
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080' : 'https://news-backend-g.herokuapp.com';


axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 定義內容類型為application....
axios.defaults.baseURL = '/api' // 打api的基本URL，打任何網址都會加上這個

app.use(createPinia())
app.use(router)

app.mount('#app')
