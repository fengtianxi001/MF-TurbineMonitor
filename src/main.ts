import { createApp } from 'vue'
import App from './App.vue'
import autofit from 'autofit.js'
import 'animate.css'
import * as a from '@/assets/fonts/SarasaMonoSC.ttf'
import '@/assets/fonts/DouyuFont.ttf'
console.log('a', a)
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
