<script>
import * as THREE from "three";
export default {
    name: "TLight",
    inject: ["global"],
    methods: {
        loadLight([x, y, z]) {
            const scene = this.global.scene;
            var spotLight = new THREE.DirectionalLight(0xffffff, 3);
            spotLight.position.set(x, y, z);
            scene.add(spotLight);
        }
    },
    mounted() {
        const arr = [
            [100, 100, 100],
            [-100, 100, 100],
            [100, -100, 100]
        ];
        arr.forEach(_ => {
            this.loadLight(_);
        });
    },
    render() {
        return null;
    }
};
</script>
