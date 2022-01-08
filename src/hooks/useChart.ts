/*
 * @Description:
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 23:08:41
 * @LastEditTime: 2022-01-08 00:08:41
 */
 /*eslint-disable*/
import * as echarts from 'echarts'
import { onMounted, Ref } from 'vue'
type EChartsOption = echarts.EChartsOption

const useChart = (chart: Ref<HTMLElement | null>, option: EChartsOption) => {
	onMounted(() => {
		const mychart = echarts.init(chart.value as HTMLElement)
		mychart.setOption(option as EChartsOption)
	})
}

export default useChart
