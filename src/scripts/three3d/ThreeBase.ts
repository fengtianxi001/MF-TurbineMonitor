import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module.js"
import { BaseOptionsType } from "./types";
import { AnimationClip } from "three";
class Base {
    camera: THREE.PerspectiveCamera
    element: HTMLElement;
    CSSRender: CSS2DRenderer;
    renderer: THREE.WebGLRenderer;
    control: OrbitControls;
    scene: THREE.Scene;
    clock: THREE.Clock;
    mixers: THREE.AnimationMixer[];
    composers: Array<EffectComposer>
    groups: Map<string, THREE.Group>;
    options: BaseOptionsType | undefined;
    renderMixins: Array<Function>
    state: any;
    constructor(element: HTMLElement, options?: BaseOptionsType) {
        this.element = element
        this.options = options
        this.scene = new THREE.Scene()
        this.camera = this.initCamera()
        this.CSSRender = this.initCSSRender()
        this.renderer = this.initRenderer()
        this.control = this.initControl()
        this.clock = new THREE.Clock();
        this.mixers = [];
        this.composers = []
        this.renderMixins = []
        this.groups = new Map()
        this.state = this.initStats()
        this.initHelp()
        this.render()
    }
    initCamera() {
        const { offsetWidth, offsetHeight } = this.element
        const camera = new THREE.PerspectiveCamera(20, offsetWidth / offsetHeight, 0.1, 2000)
        camera.position.set(2, 2, 2)
        camera.lookAt(this.scene.position)
        return camera
    }
    initCSSRender() {
        const { element } = this
        const CSSRender = new CSS2DRenderer()
        CSSRender.setSize(element.offsetWidth, element.offsetHeight);
        CSSRender.domElement.style.position = "absolute";
        CSSRender.domElement.style.top = "0px";
        element.appendChild(CSSRender.domElement)
        return CSSRender
    }
    initRenderer() {
        const { element } = this
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setClearColor(this.options?.clearColor || "#000")
        renderer.shadowMap.enabled = true;
        renderer.setSize(element.offsetWidth, element.offsetHeight);
        // renderer.clippingPlanes = Object.freeze([]);
        renderer.localClippingEnabled = true;
        element.appendChild(renderer.domElement);
        return renderer
    }
    initControl() {
        const control = new OrbitControls(this.camera, this.CSSRender.domElement);
        control.target = new THREE.Vector3(0, 0, 0)
        control.update()
        return control
    }
    initHelp() {
        if (this.options?.needHelp) {
            const axesHelper = new THREE.AxesHelper(500000);
            this.scene.add(axesHelper)
        }
        return this
    }
    initStats() {
        if (this.options?.needStats) {
            const stats = new Stats();
            this.element.appendChild(stats.dom);
            return stats
        }
        return null
    }
    createGroup(name: string) {
        const group = new THREE.Group()
        group.name = name
        this.groups.set(name, group)
        this.scene.add(group)
        return group
    }
    loadGLTF(src: string, onProgress = (progress: number) => { }): Promise<GLTF> {
        const loader = new GLTFLoader();
        const url = `${import.meta.env.VITE_API_DOMAIN}/model/${src}`;
        return new Promise<GLTF>((resolve) => {
            loader.load(
                url,
                (object) => resolve(object),
                (xhr) => onProgress(Number((xhr.loaded / xhr.total) * 100))
            );
        });
    }
    palyAnimation(
        mesh: THREE.Object3D | THREE.AnimationObjectGroup,
        animations: AnimationClip[],
        animationName: string
    ) {
        const mixer = new THREE.AnimationMixer(mesh);
        const clip = THREE.AnimationClip.findByName(animations, animationName);
        if (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            this.mixers.push(mixer);
        }
        return this
    }
    render() {
        const delta = new THREE.Clock().getDelta();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => { this.render() });
        const mixerUpdateDelta = this.clock.getDelta();
        this.mixers.forEach((mixer) => mixer.update(mixerUpdateDelta));
        this.composers.forEach((composer) => composer.render(delta))
        this.renderMixins.forEach(mixin => mixin())
        TWEEN.update();
        this.state && this.state.update()

    }
}

export default Base