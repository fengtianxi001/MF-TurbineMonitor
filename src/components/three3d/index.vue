<template>
    <div class="wrape">
        <t-renderer :size="size">
            <t-camera></t-camera>
            <t-scene></t-scene>
            <t-controls></t-controls>
            <t-light></t-light>
            <t-light></t-light>
            <t-raycaster></t-raycaster>
            <TTurebine></TTurebine>
        </t-renderer>
    </div>
</template>
<script>
import * as THREE from "three";
// import { EventBus } from "@/api/EventBus";
// import { collector_circuit } from "@/api/tb_login";
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
// console.log(window.innerWidth,window.innerHeight);
export default {
    data() {
        return {
            statsDom: this.$refs.stats,
            size: {
                w: window.innerWidth,
                h: window.innerHeight,
            },
            eleRoutes: [],
            tower: [],
            mapLoaded: false,
            turbineLoaded: false,
            loadingText: "正在加载地图资源, 请耐心等待"
        };
    },
    props: {
        turbineMsg: Array,
    },
    computed:{
    },
    methods: {
    },
    mounted() {
    },
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
}
#stats {
    display: flex;
}
#stats canvas:not(:last-child) {
    display: block !important;
    margin-top: 8px;
    margin-left: 8px;
}
#stats canvas:last-child {
    display: none !important;
}
</style>
<style lang='scss' scoped>
#container {
    width: 100%;
    height: 100%;
    background-color: #212121;
}
</style>