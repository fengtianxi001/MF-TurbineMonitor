<template>
    <div class="custom-three" ref="threeRef"></div>
</template>
<script setup lang="ts">
import Three from "utils/Three"
import Equipment from "utils/Equipment"
import Turbine from "utils/Turbine"
import { onMounted, ref } from "vue";

const threeRef = ref()
onMounted(() => {
    const threeInstance = new Three(threeRef.value)
    threeInstance.render()
    // threeInstance.createHelper()
    new Turbine(threeInstance)
    new Equipment(threeInstance)
    threeInstance.loadGLTF('plane.glb').then(object => {
        let mesh = object.scene
        let scale = 0.0003 * 1
        mesh.scale.set(scale, scale, scale)
        mesh.rotateX(Math.PI / 2)
        mesh.rotateY(-Math.PI / 2)
        mesh.position.set(0, 0, -2.42)
        threeInstance.addObject(mesh)
    })

})
</script>