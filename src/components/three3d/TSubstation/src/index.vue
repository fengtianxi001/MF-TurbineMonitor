<template>
    <div></div>
</template>
<script>
// eslint-disable-next-line
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
export default {
    name: "TSubstation",
    inject: ["global"],
    data() {
        return {};
    },
    methods: {
        loadSubstation() {
            let loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("/draco/");
            dracoLoader.preload();
            loader.setDRACOLoader(dracoLoader);
            loader.load(
                "/model/ substation.glb",
                (obj) => {
                    let mesh = obj.scene;
                    let scale = 0.00015 * 1;
                    mesh.scale.set(scale, scale, scale);
                    let height = 140 * this.unitsPerMeter
                    mesh.rotateX(Math.PI / 2);
                    mesh.rotateY(Math.PI / 1.3);
                    // mesh.rotateZ(Math.PI / 2);
                    const normal = new THREE.MeshPhongMaterial({
                        color: new THREE.Color(0xd9dde2),
                        name: "normal",
                    });
                    mesh.traverse((child) => {
                        child.material = normal
                    });
                    mesh.position.set(0, 0, height);
                    this.global.scene.add(mesh);
                },
                (xhr) => {
                    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                (error) => {
                    console.error("An error happened", error);
                }
            );
        },
    },
    mounted() {
        this.$eventBus.$on("mapInitCompleted", ({ proj, unitsPerMeter }) => {
            (this.proj = proj), (this.unitsPerMeter = unitsPerMeter);
            // this.global.scene.add(this.turbineGroup);
            this.loadSubstation();
        });
    },
};
</script>
<style lang='scss' scoped>
</style>