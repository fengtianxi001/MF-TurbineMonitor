import { App } from 'vue'
import setupDayjs from './dayjs'

export function setupPlugins(app: App) {
  setupDayjs()
}
