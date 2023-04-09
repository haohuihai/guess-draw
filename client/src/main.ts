import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/plugins/windi.css'
import * as echarts from 'echarts';
import router from './routes/index'
import { setupStore } from '@/stores'
// 引入vueknova
import { setupVueKonva } from '@/plugins/konva'
const app = createApp(App);
app.use(router)
app.use(setupVueKonva)
setupStore(app)
app.mount('#app')
