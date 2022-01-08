<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 16:51:55
 * @LastEditTime: 2022-01-06 00:29:27
-->
<template>
	<div class="base-title">
		<div class="sequence">0{{ option.sequence }}</div>
		<ul>
			<li class="en">{{ option.en }}</li>
			<li class="cn">{{ option.cn }}</li>
		</ul>
	</div>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent, PropType } from 'vue'
export interface optionProps {
	sequence: number
	en: string
	cn: string
}
export default defineComponent({
	name: 'base-title',
	props: {
		option: {
			type: Object as PropType<optionProps>,
		},
	},
	setup() {},
})
</script>
<style lang="scss" scoped>
.base-title {
	width: 100%;
	display: flex;
	align-items: center;
	user-select: none;
	.sequence {
		color: $color;
		font-size: 28px;
		font-weight: bold;
		padding: 0 16px;
		border-left: 4px solid $blue;
	}
	.en {
		color: $grey;
		font-size: 0.8rem;
	}
	.cn {
		color: $color;
		font-size: 1.1rem;
	}
}
</style>
