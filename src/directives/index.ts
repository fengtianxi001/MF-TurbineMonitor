import type { App } from 'vue'
// import { setupLoadingDirective } from './modules/loading'
// import { setupEmptyDirective } from './modules/empty'
// import { setupDateDirective } from './modules/date'
import { setupAutoscrollDirective } from './modules/autoscroll'

export const setupDirectives = (app: App<Element>) => {
  // setupLoadingDirective(app)
  // setupEmptyDirective(app)
  // setupDateDirective(app)
  setupAutoscrollDirective(app)
}
