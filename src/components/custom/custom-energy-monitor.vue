<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 19:25:17
 * @LastEditTime: 2022-01-06 00:33:23
-->
<template>
	<div>
		<base-title :option="titleOption"></base-title>
		<div class="chart" ref="chart"></div>
	</div>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent, ref } from 'vue'
import BaseTitle from '../base/base-title.vue'
import { enery } from '../../utils/chart_config'
import useChart from '../../hooks/useChart'
import { optionProps } from "../base/base-title.vue";

const titleOption:optionProps = {
	sequence: 2,
	en: "environmental monitor",
	cn: "发电监测",
}
export default defineComponent({
	setup() {
		const chart = ref<null | HTMLElement>(null)
		const options = enery([120, 200, 150, 80, 70, 110, 130])
		useChart(chart, options)
		return {
			chart,
			titleOption
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
	height: 240px;
}
</style>
