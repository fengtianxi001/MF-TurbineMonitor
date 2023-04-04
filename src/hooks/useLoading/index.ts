import { ref } from 'vue'
import useBoolean from '@/hooks/useBoolean'

function useLoading(defaultValue = false, delay = 0) {
  const { boolean, setFalse, setTrue } = useBoolean(defaultValue)
  const timer = ref(0)
  const openLoading = () => {
    setTrue()
    timer.value = new Date().getTime()
  }
  const closeLoading = () => {
    const now = new Date().getTime()
    const diff = now - timer.value
    if (diff < delay) return setTimeout(setFalse, delay - diff)
    return setFalse()
  }

  return {
    loading: boolean,
    openLoading,
    closeLoading,
  }
}
export default useLoading
