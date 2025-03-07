import App from './App.vue'
import autofit from 'autofit.js'
import { createApp } from 'vue'
import 'animate.css'
import '@/assets/fonts/DincorosBlack/result.css'
import '@/assets/fonts/DouyuFont/result.css'
import '@/assets/fonts/SarasaMonoSC/result.css'
import '@/assets/fontawesome/css/all.css'

const boostrap = async () => {
  const app = createApp(App)
  app.mount('#app')

  const ScreenSize = {
    big: [2560, 1440],
    normal: [1920, 1080],
    small: [1280, 720],
  }['normal']

  autofit.init({
    el: '#app',
    dw: ScreenSize[0],
    dh: ScreenSize[1],
    resize: true,
    // ignore: ['.main-middle', '.css2d-renderer', 'webgl-renderer'],
  })
}

boostrap()
