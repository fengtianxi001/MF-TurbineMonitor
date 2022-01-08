<template>
	<div>
		<base-title></base-title>
		<div class="chart" ref="chart"></div>
	</div>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent, onMounted, ref } from 'vue'
import BaseTitle from '../base/base-title.vue'
import * as echarts from 'echarts'
export default defineComponent({
	setup() {
		const chart = ref<null | HTMLElement>(null)
		onMounted(() => {
			const mychart = echarts.init(chart.value as HTMLElement)
			const option = {
				grid: {
					top: '4%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				series: [
					{
						type: 'gauge',
						startAngle: 180,
						endAngle: 0,
						min: 0,
						max: 500,
						splitNumber: 12,
						itemStyle: {
							color: '#15c5e8',
							shadowColor: 'rgba(18, 62, 89,0.45)',
							shadowBlur: 10,
							shadowOffsetX: 2,
							shadowOffsetY: 2,
						},

						progress: {
							show: true,
							roundCap: true,
							width: 10,
						},
						pointer: {
							icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
							length: '75%',
							width: 8,
							offsetCenter: [0, '5%'],
						},
						axisLine: {
							roundCap: true,
							lineStyle: {
								width: 10,
							},
						},
						axisTick: {
							splitNumber: 2,
							lineStyle: {
								width: 2,
								color: '#999',
							},
						},
						splitLine: {
							length: 12,
							lineStyle: {
								width: 3,
								color: '#999',
							},
						},
						axisLabel: {
							distance: 15,
							color: '#999',
							fontSize: 12,
							formatter: (params: number) => {
								if (params % 50 === 0) return params
							},
						},
						title: {
							show: false,
						},
						detail: {
							show: false,
						},
						data: [
							{
								value: 100,
							},
						],
						center:['40%','40%'],  //边距
					},
				],
			}
			mychart.setOption(option)
		})
		return {
			chart,
		}
	},
	components: {
		BaseTitle,
	},
})
</script>
<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 300px;
	/* background-color: red; */
}
</style>
