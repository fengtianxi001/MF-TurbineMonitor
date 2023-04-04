import { isFunction } from 'lodash'
import { ref, watch } from 'vue'

interface Options<T> {
  defaultValue?: T | (() => T)
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

function useLocalStorageState<T>(key: string, options?: Options<T>) {
  const storage = window.localStorage
  const serializer = (value: T) => {
    if (options?.serializer) {
      return options?.serializer(value)
    }
    return JSON.stringify(value)
  }
  const deserializer = (value: string) => {
    if (options?.deserializer) {
      return options?.deserializer(value)
    }
    return JSON.parse(value)
  }
  function getStoredValue() {
    try {
      const raw = storage?.getItem(key)
      if (raw) {
        return deserializer(raw)
      }
    } catch (e) {
      // console.error(e);
    }
    if (isFunction(options?.defaultValue)) {
      return options?.defaultValue()
    }
    return options?.defaultValue
  }

  const state = ref<T>(getStoredValue())
  watch(
    state,
    () => {
      // @ts-ignore
      storage?.setItem(key, serializer(state.value))
    },
    {
      deep: true,
    }
  )
  return state
}

export default useLocalStorageState
