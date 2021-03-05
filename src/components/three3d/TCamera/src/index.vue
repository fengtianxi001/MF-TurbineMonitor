<script>
import { PerspectiveCamera } from "three";
export default {
    name: "TCamera",
    inject: ["global"],
    mounted() {
        const { w, h } = this.global.rendererSize;
        const camera = new PerspectiveCamera(20, w / h, 0.1, 500);
        camera.position.set(-2, 2, 2);
        camera.name = "camera";
        this.global.camera = camera;
    },
    render(){
        return null
    }
};
</script>