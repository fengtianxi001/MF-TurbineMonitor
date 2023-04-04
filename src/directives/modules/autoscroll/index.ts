import type { App, Directive } from 'vue'

enum Config {
  directiveName = 'autoscroll',
}

class AutoScroll {
  element: HTMLElement

  timer: null | number

  scrolling: boolean

  step: number

  constructor(element: HTMLElement, step: number) {
    this.element = element
    this.step = step
    this.timer = null
    this.scrolling = true
  }

  startScroll() {
    const { element, step } = this
    this.timer = setInterval(() => {
      if (element.scrollHeight - element.scrollTop - element.clientHeight < 1) {
        element.scrollTop = 0
      } else if (this.scrolling) element.scrollTop += 1
    }, step)
  }

  openScroll() {
    this.scrolling = true
  }

  closeScroll() {
    this.scrolling = false
  }

  clearScroll() {
    this.timer && clearInterval(this.timer)
  }
}

const directive: Directive = {
  mounted(el, binding) {
    const { modifiers } = binding
    const step = 1000 / binding.value
    let element
    if (modifiers.parent) {
      element = el.parentElement
    }
    element = el
    const autoScroll = new AutoScroll(element, step)
    autoScroll.startScroll()
    element.mouseenter = autoScroll.closeScroll.bind(autoScroll)
    element.mouseleave = autoScroll.openScroll.bind(autoScroll)
    element.clearScroll = autoScroll.clearScroll.bind(autoScroll)
    element.addEventListener('mouseenter', element.mouseenter)
    element.addEventListener('mouseleave', element.mouseleave)
  },
  //   updated(el, binding) {},
  unmounted(el) {
    el.removeEventListener('mouseenter', el.mouseenter)
    el.removeEventListener('mouseleave', el.mouseleave)
    el.clearScroll()
  },
}

export const setupAutoscrollDirective = (app: App) => {
  app.directive(Config.directiveName, directive)
}
