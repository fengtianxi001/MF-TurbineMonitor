import type { App } from 'vue'
import { createPinia } from 'pinia'

export const store = createPinia()

export const setupStore = (app: App<Element>) => app.use(store)

export default store
