<template>
    <div>
        <slot></slot>
        <div ref="container"></div>
    </div>
</template>
<script>
import { WebGLRenderer, Clock } from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import TWEEN from "@tweenjs/tween.js";

export default {
    name: "TRenderer",
    props: {
        size: {
            type: Object,
            default: () => {
                return {
                    w: 640,
                    h: 400
                };
            },
            validator: function(size) {
                return size.w && size.h ? true : false;
            }
        }
    },
    provide() {
        return {
            global: this.global
        };
    },
    data() {
        let renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.shadowMap.enabled = true;
        renderer.setSize(this.size.w, this.size.h);
        return {
            renderer,
            global: {
                renderer,
                rendererSize: this.size,
                rendererDom: renderer.domElement,
                scene: null,
                camera: null,
                mixers: new Map(),
                compose: null,
                CSSRender: new CSS2DRenderer()
            },
            clock: new Clock()
        };
    },
    methods: {
        render() {
            const { scene, camera, stats, compose, CSSRender } = this.global;
            if (scene && camera) {
                this.renderer.render(scene, camera);
                CSSRender.render(scene, camera);
            }
            stats && stats.update();
            var delta = new Clock().getDelta();
            // console.log(compose);
            compose && compose.render(delta);
            requestAnimationFrame(this.render);
            const mixerUpdateDelta = this.clock.getDelta();
            this.global.mixers.forEach(mixer => {
                mixer.update(mixerUpdateDelta);
            });
            TWEEN.update();
        }
    },
    mounted() {
        const { size } = this;
        const { CSSRender } = this.global;
        CSSRender.setSize(size.w, size.h);
        CSSRender.domElement.style.position = "absolute";
        CSSRender.domElement.style.top = 0;
        this.$refs.container.appendChild(CSSRender.domElement);
        this.$refs.container.appendChild(this.renderer.domElement);
        this.render();
    }
};
</script>
<style lang='scss' scoped>
</style>