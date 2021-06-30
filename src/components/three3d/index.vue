<template>
    <div class="wrape">
        <div class="loading-container" v-if="loadingVisible">
            <loading></loading>
            <div class="tips">
                <div>模型加载中,请耐心等待</div>
                <div>已加载{{ percent.toFixed(2) }}%</div>
            </div>
        </div>
        <t-renderer :size="size">
            <t-camera></t-camera>
            <t-scene></t-scene>
            <t-controls></t-controls>
            <t-light></t-light>
            <t-light></t-light>
            <!-- <t-raycaster></t-raycaster> -->
            <TTurebine @progress="progress"></TTurebine>
        </t-renderer>
    </div>
</template>
<script>
import * as THREE from "three";
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
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
            percent: 0,
            loadingVisible: true
        };
    },
    props: {
        turbineMsg: Array,
    },
    computed: {},
    methods: {
        progress(percent) {
            this.percent = percent;
            if(percent === 100){
                this.loadingVisible = false
            }
        },
    },
    mounted() {},
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
.loading-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 999999;
    background-color: #0000007a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .tips {
        margin-top: 10px;
        div {
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            line-height: 40px;
        }
    }
}
</style>