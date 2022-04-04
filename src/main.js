import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.axios = axios
axios.defaults.timeout = 5000;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api'

app.use(createPinia())
app.use(router)

app.mount('#app')
