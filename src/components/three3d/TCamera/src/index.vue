<template>
    <div></div>
</template>

<script>
import {PerspectiveCamera} from "three"
export default {
    name: "TCamera",
    inject: ["global"],
    mounted(){
        const {w, h} = this.global.rendererSize
        const camera = new PerspectiveCamera(20, w / h, 0.1, 500);
        camera.position.set(-2, 2, 2);
        // camera.lookAt(0, 10, 10);
        camera.name = "camera"
        this.global.camera = camera
    }
}
</script>