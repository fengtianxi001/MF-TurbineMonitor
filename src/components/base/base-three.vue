<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-06 22:12:39
 * @LastEditTime: 2022-01-07 23:52:48
-->
<template>
	<div class="base-three" ref="baseThree"></div>
</template>
<script lang="ts">
/*eslint-disable*/
import { onMounted, ref } from 'vue'
// import * as THREE from 'three'
import ThreeOperate from '../../utils/ThreeOperate'
import Equipment from "../../utils/Equipment";
import Turbine from "../../utils/Turbine"
export default {
	name: 'base-three',
	setup() {
		const baseThree = ref<HTMLElement | null>(null)
		const loadPlane = (threeOperate: ThreeOperate) => {
			threeOperate.loadeGLTF('plane.glb').then(object => {
				let mesh = object.scene
				let scale = 0.0003 * 1
				mesh.scale.set(scale, scale, scale)
				mesh.rotateX(Math.PI / 2)
				mesh.rotateY(-Math.PI / 2)
				mesh.position.set(0, 0, -2.42)
				threeOperate.add(mesh)
			})
		}

		onMounted(() => {
			if (baseThree.value) {
				const threeOperate = new ThreeOperate(baseThree.value)
				const render = threeOperate.render as () => void
				render()
				// var axesHelper = new THREE.AxesHelper(500)
				// threeOperate.add(axesHelper)
				new Turbine(threeOperate)
				new Equipment(threeOperate)
				loadPlane(threeOperate)
			}
		})
		return {
			baseThree,
		}
	},
}
</script>
<style lang="scss" scoped></style>
