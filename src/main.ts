import { createApp } from 'vue'
import { setupStore } from '@/stores'
import { setupDirectives } from '@/directives'
import App from './App.vue'
import '@/assets/styles/global.scss'
import '@arco-design/web-vue/dist/arco.less'
// import 'animate.css'
import 'animate.css/animate.min.css'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupDirectives(app)
  app.mount('#app')
}

bootstrap()
