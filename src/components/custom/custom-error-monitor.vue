<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 19:25:17
 * @LastEditTime: 2022-01-06 00:33:37
-->
<template>
	<div class="custom-error-monitor">
		<base-title :option="titleOption"></base-title>
		<div class="container">
			<ul class="message">
				<li v-for="item in 10" :key="item">
					<span>偏航系统精准</span>
					<span>11:17:42</span>
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
	sequence: 5,
	en: 'error monitor',
	cn: '异常监测',
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
.custom-error-monitor {
	width: 100%;
	.container {
		width: 100%;
		height: 300px;
		margin-top: 20px;
		/* background-color: red; */
		.header {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-column-gap: 20px;
			height: 30px;
			color: #fff;
			line-height: 30px;
			text-align: center;
			font-size: 14px;
			user-select: none;
			li {
				background-color: #1ac2e3;
				box-shadow: 0 0 10px 0 rgba(108, 231, 255, 0.71), 0 2px 0 #000;
				cursor: pointer;
			}
		}
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
					background-color: rgba(9, 28, 70, 0.27);
				}
				&:nth-child(even) {
					background-color: rgba(4, 102, 158, 0.45);
				}
			}
		}
	}
}
</style>
