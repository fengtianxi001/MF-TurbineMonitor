<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 21:16:35
 * @LastEditTime: 2022-01-06 00:30:59
-->
<template>
	<div class="custom-total-monitor">
		<base-title :option="titleOption"></base-title>
		<div class="container">
			<ul class="message">
				<li>
					<span>年发电量:</span>
					<span>38419.41MWh</span>
				</li>
				<li>
					<span>月发电量:</span>
					<span>1601kW</span>
				</li>
				<li>
					<span>日发电量:</span>
					<span>1049.09KVar</span>
				</li>
				<li>
					<span>负荷率:</span>
					<span>6.05</span>
				</li>
				<li>
					<span>平均风速:</span>
					<span>1682.82MWh</span>
				</li>
				<li>
					<span>最大风速</span>
					<span>876.19kWh</span>
				</li>
				<li>
					<span>总功率</span>
					<span>876.19kWh</span>
				</li>
			</ul>
			<div class="chart" ref="chart"></div>
		</div>
	</div>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent, onMounted, ref } from 'vue'
import BaseTitle from '../base/base-title.vue'
import { line } from '../../utils/chart_config'
import useChart from '../../hooks/useChart'
import { optionProps } from '../base/base-title.vue'

const titleOption: optionProps = {
	sequence: 3,
	en: 'statistical parameters',
	cn: '统计参数',
}

export default defineComponent({
	setup() {
		const chart = ref<null | HTMLElement>(null)

		const options = line([
			[120, 200, 150, 120, 121, 342, 312],
			[80, 70, 110, 130, 321, 543, 321],
		])
		useChart(chart, options)
		return {
			chart,
			titleOption,
		}
	},
	components: {
		BaseTitle,
	},
})
</script>
<style lang="scss" scoped>
.container {
	width: 600px;
	/* height: 180px; */
	margin-top: 10px;
	display: flex;

	padding: 0;
	.message {
		width: 300px;
		overflow: auto;
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #15c4e7ab;
		}
		&::-webkit-scrollbar {
			width: 2px;
			border-radius: 10px;
			background-color: transparet;
		}
		li {
			height: 30px;
			line-height: 30px;
			color: $active;
			font-size: 12px;
			padding: 0 20px;
			display: flex;
			justify-content: space-between;
			&:nth-child(odd) {
				background-color: rgba(4, 102, 158, 0.45);
			}
			&:nth-child(even) {
				background-color: rgba(9, 28, 70, 0.27);
			}
		}
	}
	.chart {
		width: 300px;
		height: 210px;
		background-color: #04669e73;
	}
}
</style>
