import { createVNode, defineComponent, h, render } from 'vue'
import TWEEN from '@tweenjs/tween.js'
import { isFunction } from 'lodash'

export const instantiatedComponent = (component: any, props: any) => {
  const newComponent = defineComponent({
    render() {
      return h(component, props)
    },
  })
  const instance = createVNode(newComponent)
  render(instance, document.createElement('div'))
  return instance
}

export const animation = (props: {
  from: Record<string, any>
  to: Record<string, any>
  duration: number
  easing?: any
  onUpdate: (params: Record<string, any>) => void
  onComplete?: (params: Record<string, any>) => void
}) => {
  const {
    from,
    to,
    duration,
    easing = TWEEN.Easing.Quadratic.Out,
    onUpdate,
    onComplete,
  } = props
  return new TWEEN.Tween(from)
    .to(to, duration)
    .easing(easing)
    .onUpdate((object) => isFunction(onUpdate) && onUpdate(object))
    .onComplete((object) => isFunction(onComplete) && onComplete(object))
    .start()
}
