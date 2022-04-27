import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationClip } from "three";

class Three {
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  CSSRender: CSS2DRenderer;
  control: null | OrbitControls;
  render: () => void;
  mixers: THREE.AnimationMixer[];
  clock: THREE.Clock;
  compose: any;
  group: THREE.Group;
  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.CSSRender = new CSS2DRenderer();
    this.control = null;
    this.render = () => {};
    this.mixers = [];
    this.clock = new THREE.Clock();
    this.compose = null;
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.initialize();
  }
  initialize() {
    this.createCamera();
    this.createRenderer();
    this.createCSSRender();
    this.createControl();
    this.createRender();
    this.createLights();
  }
  createCamera() {
    this.camera.position.set(-2, 2, 2);
    this.camera.lookAt(this.scene.position);
  }
  createRenderer() {
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);
  }
  createCSSRender() {
    this.CSSRender.setSize(window.innerWidth, window.innerHeight);
    this.CSSRender.domElement.style.position = "absolute";
    this.CSSRender.domElement.style.top = "0px";
    this.container.appendChild(this.CSSRender.domElement);
  }
  createControl() {
    this.control = new OrbitControls(this.camera, this.CSSRender.domElement);
  }
  createRender() {
    this.render = () => {
      const delta = new THREE.Clock().getDelta();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render as () => void);
      const mixerUpdateDelta = this.clock.getDelta();
      this.mixers.map((mixer) => {
        mixer.update(mixerUpdateDelta);
      });
      this.compose && this.compose.render(delta);
      TWEEN.update();
    };
  }
  createLights() {
    const lights = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
    ];
    lights.map(([x, y, z]) => {
      var spotLight = new THREE.DirectionalLight(0xffffff, 3);
      spotLight.position.set(x, y, z);
      this.scene.add(spotLight);
    });
  }
  addObject(object: THREE.Object3D) {
    this.scene.add(object);
    return this
  }
  addToGroup(object: THREE.Object3D) {
    this.group.add(object);
    return this
  }
  loadGLTF(src: string, onProgress = (progress: number) => {}) {
    const loader = new GLTFLoader();
    const url = `http://192.168.3.45:3000/model/${src}`;
    return new Promise<GLTF>((resolve) => {
      loader.load(
        url,
        (object) => resolve(object) as unknown as Promise<GLTF>,
        (xhr) => onProgress(Number((xhr.loaded / xhr.total) * 100))
      );
    });
  }
  animation(
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
  addCompose(compose: any) {
    this.compose = compose;
    return this
  }
  createHelper(size: number = 500) {
    const axesHelper = new THREE.AxesHelper(500);
    this.scene.add(axesHelper);
    return this
  }
}
export default Three;
