import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { isFunction } from 'lodash-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
export class ThreeBase {
  scene: THREE.Scene
  element: HTMLElement
  camera: THREE.PerspectiveCamera
  CSSRender: CSS2DRenderer
  renderer: THREE.WebGLRenderer
  control: OrbitControls
  mixers: THREE.AnimationMixer[]
  clock: THREE.Clock
  composers: EffectComposer[]
  renderMixins: Function[]
  stats: any
  constructor(element: HTMLElement) {
    this.element = element
    this.scene = this.initScene()
    this.camera = this.initCamera()
    this.CSSRender = this.initCSSRender()
    this.renderer = this.initRenderer()
    this.control = this.initControl()
    this.mixers = []
    this.clock = new THREE.Clock()
    this.composers = []
    this.renderMixins = []
    this.render()
  }
  private initScene() {
    const scene = new THREE.Scene()
    return scene
  }
  private initCamera() {
    const fov = 20
    const aspect = this.element.offsetWidth / this.element.offsetHeight
    const near = 0.1
    const far = 2000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 0)
    return camera
  }
  private initCSSRender() {
    const CSSRenderer = new CSS2DRenderer()
    CSSRenderer.setSize(this.element.offsetWidth, this.element.offsetHeight)
    CSSRenderer.domElement.style.position = 'absolute'
    CSSRenderer.domElement.style.top = '0px'
    this.element.appendChild(CSSRenderer.domElement)
    return CSSRenderer
  }
  private initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor('#000')
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.setSize(this.element.offsetWidth, this.element.offsetHeight)
    renderer.localClippingEnabled = true
    this.element.appendChild(renderer.domElement)
    return renderer
  }
  private initControl() {
    const control = new OrbitControls(this.camera, this.CSSRender?.domElement)
    control.target = new THREE.Vector3(0, 0, 0)
    control.update()
    return control
  }
  addStats() {
    //@ts-ignore
    const stats = new Stats()
    this.element.appendChild(stats.dom)
  }
  addAxesHelper(size: number) {
    const axesHelper = new THREE.AxesHelper(size)
    this.scene.add(axesHelper)
    return axesHelper
  }
  createGroup() {
    const group = new THREE.Group()
    this.scene.add(group)
    return group
  }
  loadGLTF(url: string, onProgress = (progress: number) => {}): Promise<GLTF> {
    const loader = new GLTFLoader()
    return new Promise<GLTF>((resolve) => {
      loader.load(
        url,
        (object) => resolve(object),
        (xhr) => onProgress(Number((xhr.loaded / xhr.total) * 100)),
      )
    })
  }
  loadAnimate(
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: Array<THREE.AnimationClip>,
    animationName: string,
  ) {
    const mixer = new THREE.AnimationMixer(mesh)
    const clip = THREE.AnimationClip.findByName(animations, animationName)
    if (!clip) return void 0
    const action = mixer.clipAction(clip)
    action.play()
    this.mixers.push(mixer)
  }
  render() {
    const delta = new THREE.Clock().getDelta()
    this.renderer.render(this.scene, this.camera)
    const mixerUpdateDelta = this.clock.getDelta()
    this.mixers.forEach((mixer) => mixer.update(mixerUpdateDelta))
    this.composers.forEach((composer) => composer.render(delta))
    this.renderMixins.forEach((mixin) => isFunction(mixin) && mixin())
    TWEEN.update()
    isFunction(this.stats?.update) && this.stats.update()
    requestAnimationFrame(this.render.bind(this))
  }
}
