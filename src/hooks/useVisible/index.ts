import { isFunction } from 'lodash'
import { ref } from 'vue'

interface OptionsType {
  onBeforeShow?: () => void | boolean
  onBeforeHide?: () => void | boolean
  onAfterShow?: () => void | boolean
  onAfterHide?: () => void | boolean
}
function useVisible(defaultValue?: boolean, options?: OptionsType) {
  const visible = ref(defaultValue ?? false)

  const onBeforeShow = () => {
    if (isFunction(options?.onBeforeShow)) {
      const result = options?.onBeforeShow()
      return result !== false
    }
    return true
  }
  const onBeforeHide = () => {
    if (isFunction(options?.onBeforeHide)) {
      const result = options?.onBeforeHide()
      return result !== false
    }
    return true
  }
  const onAfterShow = () => {
    isFunction(options?.onAfterShow) && options?.onAfterShow()
  }
  const onAfterHide = () => {
    isFunction(options?.onAfterHide) && options?.onAfterHide()
  }
  const show = () => {
    const result = onBeforeShow()
    result && (visible.value = true) && onAfterShow()
  }
  const hide = () => {
    const result = onBeforeHide()
    result && (visible.value = false) && onAfterHide()
  }
  const toggleVisible = () => {
    visible.value ? hide() : show()
  }
  if (defaultValue) {
    onBeforeShow()
  } else {
    onBeforeHide()
  }
  return {
    visible,
    show,
    hide,
    toggleVisible,
  }
}

export default useVisible
