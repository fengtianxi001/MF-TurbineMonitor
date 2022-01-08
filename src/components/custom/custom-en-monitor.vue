<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 19:25:17
 * @LastEditTime: 2022-01-06 00:32:14
-->
<template>
	<div class="custom-en-monitor">
		<base-title :option="titleOption"></base-title>
		<div class="chart" ref="chart"></div>
	</div>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent, onMounted, ref } from 'vue'
import BaseTitle from '../base/base-title.vue'
import { en } from '../../utils/chart_config'
import useChart from '../../hooks/useChart'
import { optionProps } from '../base/base-title.vue'

const titleOption: optionProps = {
	sequence: 1,
	en: 'environmental monitor',
	cn: '环境监测',
}

export default defineComponent({
	setup() {
		const chart = ref<null | HTMLElement>(null)
		const options = en([19, 68, 70])
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
.custom-en-monitor {
	width: 100%;
	.chart {
		width: 100%;
		height: 90px;
	}
}
</style>
