import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { isElement } from 'lodash-es'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  LabelLayout,
  CanvasRenderer,
  LineChart,
])

/**
 * 用法如下
 * - 函数执行后导出`container`、`setOption`、`resize`方法
 * - 将`container`通过`ref`绑定到模板容器中
 * - 获取数据后通过`setOption`设置图表数据
 * - 如果需要重新渲染图表，调用`resize`方法
 */
export function useEcharts() {
  let cache = {}
  const container = ref()
  const chart = shallowRef()

  const resize = () => chart.value?.resize()
  const clear = () => chart.value?.clear()
  const boostrap = (theme = 'light') => {
    if (chart.value) chart.value?.dispose()
    if (isElement(container.value)) {
      chart.value = echarts.init(container.value, theme)
    } else {
      console.warn('容器还未初始化')
    }
    window.removeEventListener('resize', resize)
    window.addEventListener('resize', resize)
  }
  const setOption = (option: any) => {
    cache = option
    if (!chart.value) boostrap()
    chart.value?.setOption(option)
  }
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })
  onMounted(() => {
    window.addEventListener('resize', resize)
  })

  return { container, chart, setOption, resize, clear, echarts }
}

export default useEcharts
