<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 19:25:17
 * @LastEditTime: 2022-01-06 22:18:11
-->
<template>
	<div class="home">
		<div class="left">
			<custom-logo></custom-logo>
			<custom-en-monitor></custom-en-monitor>
			<custom-energy-monitor></custom-energy-monitor>
			<custom-total-monitor></custom-total-monitor>
		</div>
		<div class="right">
			<custom-params-monitor></custom-params-monitor>
			<custom-active-monitor></custom-active-monitor>
			<custom-error-monitor></custom-error-monitor>
		</div>
		<base-three></base-three>
	</div>
</template>

<script lang="ts">
/*eslint-disable*/
import { defineComponent, onMounted, ref } from 'vue'
import CustomLogo from '../components/custom/custom-logo.vue'
import CustomEnMonitor from '../components/custom/custom-en-monitor.vue'
import CustomErrorMonitor from '../components/custom/custom-error-monitor.vue'
import CustomSpeedMonitor from '../components/custom/custom-speed-monitor.vue'
import CustomParamsMonitor from '../components/custom/custom-params-monitor.vue'
import CustomActiveMonitor from '../components/custom/custom-active-monitor.vue'
import CustomTotalMonitor from '../components/custom/custom-total-monitor.vue'
import CustomEnergyMonitor from '../components/custom/custom-energy-monitor.vue'
import BaseThree from "../components/base/base-three.vue";

// import Emulation, { emulationType } from '../utils/Emulation'



export default defineComponent({
	name: 'Home',
	setup() {
		const threeDom = ref<null | HTMLElement>(null)
		onMounted(() => {
			// console.log(threeDom.value)

			


			// const emulation = new Emulation(threeDom) as emulationType
			// const render = emulation.render as () => void
			// render()
			// const scene = emulation.scene as THREE.Scene
			// var axesHelper = new THREE.AxesHelper(50000)
			// scene.add(axesHelper)

			// var geometry = new THREE.BoxGeometry(100, 100, 100) //创建一个立方体几何对象Geometry
			// var material = new THREE.MeshLambertMaterial({
			// 	color: 0x0000ff,
			// }) //材质对象Material
			// var mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
			// console.log(scene)
			// scene.add(mesh) //网格模型添加到场景中
		})
		return {
			threeDom,
		}
	},
	components: {
		CustomLogo,
		CustomEnMonitor,
		CustomErrorMonitor,
		CustomSpeedMonitor,
		CustomParamsMonitor,
		CustomTotalMonitor,
		CustomEnergyMonitor,
		CustomActiveMonitor,
		BaseThree
	},
})
</script>
<style lang="scss" scoped>
.home {
	width: 100vw;
	height: 100vh;
	position: relative;
	.left {
		width: 300px;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.right {
		width: 300px;
		height: 100vh;
		position: absolute;
		top: 0;
		right: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}
</style>
