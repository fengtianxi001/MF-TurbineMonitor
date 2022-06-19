import App from './App.vue'
import '@/styles/global.scss'
import { setupPlugins } from './plugins'
import { App as AppType, createApp } from 'vue'

class Main {
  public async bootstrap() {
    const app = this.app()
    app.mount('#app')
  }
  private app(): AppType {
    const app = createApp(App)
    setupPlugins(app)
    return app
  }
}

new Main().bootstrap()
