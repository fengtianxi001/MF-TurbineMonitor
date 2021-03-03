<template>
	<div></div>
</template>
<script>
import * as THREE from "three";
export default {
	name: "TLight",
	props: {
		type: {
			type: String,
			default: "DirectionalLight",
		},
	},
	inject: ["global"],
	methods: {
		loadLight([x, y, z]) {
			const scene = this.global.scene;
			// var light = new THREE.DirectionalLight( 0xFFFFFF );

			// console.log(x, y, z);
			// let light = new THREE.DirectionalLight(0xffffff, 10);
			// var helper = new THREE.DirectionalLightHelper( light, 5 );
			// light.position.set(x, y, z);
			// this.global.scene.add(light);
			// this.global.scene.add( helper );
			// var directionalLight = new THREE.RectAreaLight(0xffffff, 0.5);
			// scene.add(directionalLight);

			// var helper = new THREE.RectAreaLightHelper(directionalLight, 5);
			// scene.add(helper);

			var spotLight = new THREE.DirectionalLight(0xffffff,3);
			spotLight.position.set(x, y, z);

			// spotLight.castShadow = true;

			// spotLight.shadow.mapSize.width = 1024;
			// spotLight.shadow.mapSize.height = 1024;

			// spotLight.shadow.camera.near = 500;
			// spotLight.shadow.camera.far = 4000;
			// spotLight.shadow.camera.fov = 30;

			scene.add(spotLight);
		},
	},
	mounted() {
		const arr = [
			// [0, 0, 100],
			// [100, 0, 0],
			// [0, 100, 0],

			[100, 100, 100],
			[-100, 100, 100],
			[100, -100, 100],
			// [100, 100, 100],
		];
		arr.forEach((_) => {
			this.loadLight(_);
		});
	},
};
</script>
<style lang="scss" scoped></style>
