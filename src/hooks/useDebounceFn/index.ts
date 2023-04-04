import { debounce, isFunction } from 'lodash'
import { onUnmounted } from 'vue'

type noop = (...args: any[]) => any
interface DebounceOptions {
  wait?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}
function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (isFunction(fn)) {
    console.error(`useDebounceFn第一个参数应该是函数, 却得到一个${typeof fn}`)
  }
  const wait = options?.wait ?? 1000
  const debounced = debounce(
    (...args: Parameters<T>): ReturnType<T> => fn(...args),
    wait,
    options
  )
  onUnmounted(() => {
    debounced.cancel()
  })
  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

export default useDebounceFn
