<template>
    <div class="custom-three" ref="threeRef"></div>
</template>
<script setup lang="ts">
import Three from "utils/Three"
import * as THREE from "three"
import Equipment from "utils/Equipment"
import Turbine from "utils/Turbine"
import { onMounted, ref } from "vue";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
const threeRef = ref()
onMounted(() => {
    const threeInstance = new Three(threeRef.value)
    threeInstance.render()
    // threeInstance.createHelper()
    new Turbine(threeInstance)
    new Equipment(threeInstance)
    const mTLLoader = new MTLLoader()
    const objLoader = new OBJLoader()
    threeInstance.loadGLTF('plane.glb').then(object => {

        const texture = object.scene.children[0].material.map
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;



        threeInstance.addRenderCallback(() => {
            const count = texture.repeat.y
            if (count <= 10) {
                texture.repeat.x += 0.01;
                texture.repeat.y += 0.02;
                // texture.offset.x += 10;
            } else {
                texture.repeat.x = 0
                texture.repeat.y = 0
            }

        })
        let mesh = object.scene
        let scale = 0.0003 * 1
        mesh.scale.set(scale, scale, scale)
        mesh.position.set(0, 0, 0);
        threeInstance.addObject(mesh)
    })
})

</script>