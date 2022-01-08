<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 21:10:10
 * @LastEditTime: 2022-01-06 00:44:24
-->
<template>
	<div class="custom-params-monitor">
		<base-title :option="titleOption"></base-title>
		<div class="container">
			<ul class="message">
				<li>
					<span>总发电量:</span>
					<span>38419.41MWh</span>
				</li>
				<li>
					<span>有功功率:</span>
					<span>1601kW</span>
				</li>
				<li>
					<span>无功功率:</span>
					<span>1049.09KVar</span>
				</li>
				<li>
					<span>功率因素:</span>
					<span>6.05</span>
				</li>
				<li>
					<span>日累计发电量:</span>
					<span>1682.82MWh</span>
				</li>
				<li>
					<span>总消耗电量</span>
					<span>876.19kWh</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent, onMounted, ref } from 'vue'
import BaseTitle from '../base/base-title.vue'
import { optionProps } from '../base/base-title.vue'

const titleOption: optionProps = {
	sequence: 4,
	en: 'params monitor',
	cn: '参数监测',
}
export default defineComponent({
	setup() {
		const chart = ref<null | HTMLElement>(null)
		onMounted(() => {})
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
.custom-params-monitor {
	width: 100%;
}
.container {
	width: 100%;
	margin-top: 10px;
	.message {
		height: calc(100% - 40px);
		overflow: auto;
		margin-top: 10px;
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: #15c4e7;
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
}
</style>
