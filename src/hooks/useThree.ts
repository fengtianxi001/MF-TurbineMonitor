import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { isFunction } from 'lodash-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { onMounted, shallowRef, ShallowRef, Ref } from 'vue'

export function useThree(element: Ref<HTMLElement>) {
  const scene: ShallowRef<THREE.Scene | null> = shallowRef(null)
  const camera: ShallowRef<THREE.PerspectiveCamera | null> = shallowRef(null)
  const cssRender: ShallowRef<CSS2DRenderer | null> = shallowRef(null)
  const renderer: ShallowRef<THREE.Renderer | null> = shallowRef(null)
  const control: ShallowRef<OrbitControls | null> = shallowRef(null)
  const clock: THREE.Clock = new THREE.Clock()
  const mixers: Array<THREE.AnimationMixer> = []
  const composers: Array<EffectComposer> = []
  const renderMixins: Array<Function> = []
  const stats: any = null
  onMounted(() => {
    console.log('element', element)
    scene.value = _initScene()
    camera.value = _initCamera()
    cssRender.value = _initCssRender()
    renderer.value = _initRenderer()
    control.value = _initControl()
    _render()
  })
  const _initScene = (): THREE.Scene => {
    const scene = new THREE.Scene()
    return scene
  }
  const _initCamera = (): THREE.PerspectiveCamera => {
    const fov = 20
    const aspect = element.value.offsetWidth / element.value.offsetHeight
    const near = 0.1
    const far = 2000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 0)
    
    // camera.updateWorldMatrix
    // camera.lookAt(scene!.value!.position);
    return camera
  }
  const _initCssRender = (): CSS2DRenderer => {
    const cssRender = new CSS2DRenderer()
    cssRender.setSize(element.value.offsetWidth, element.value.offsetHeight)
    cssRender.domElement.style.position = 'absolute'
    cssRender.domElement.style.top = '0px'
    element.value.appendChild(cssRender.domElement)
    return cssRender
  }
  const _initRenderer = (): THREE.Renderer => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor('#000')
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.shadowMap.enabled = true
    renderer.setSize(element.value.offsetWidth, element.value.offsetHeight)
    renderer.localClippingEnabled = true
    element.value.appendChild(renderer.domElement)
    return renderer
  }
  const _initControl = (): OrbitControls => {
    const control = new OrbitControls(camera.value!, cssRender.value?.domElement)
    control.target = new THREE.Vector3(0, 0, 0)
    control.update()
    return control
  }
  const initAxesHelper = (size: number): THREE.AxesHelper => {
    const axesHelper = new THREE.AxesHelper(size)
    scene.value!.add(axesHelper)
    return axesHelper
  }
  const initStats = () => {
    //@ts-ignore
    const stats = new Stats()
    element.value.appendChild(stats.dom)
  }
  const createGroup = (): THREE.Group => {
    const group = new THREE.Group()
    scene.value!.add(group)
    return group
  }
  const loadGLTF = (url: string, onProgress = (progress: number) => {}): Promise<GLTF> => {
    const loader = new GLTFLoader()
    const path = `${import.meta.env.VITE_API_DOMAIN}/model/${url}`
    return new Promise<GLTF>((resolve) => {
      loader.load(
        path,
        (object) => resolve(object),
        (xhr) => onProgress(Number((xhr.loaded / xhr.total) * 100)),
      )
    })
  }
  const loadAnimate = (
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: Array<THREE.AnimationClip>,
    animationName: string,
  ) => {
    const mixer = new THREE.AnimationMixer(mesh)
    const clip = THREE.AnimationClip.findByName(animations, animationName)
    if (!clip) return void 0
    const action = mixer.clipAction(clip)
    action.play()
    mixers.push(mixer)
  }
  const _render = () => {
    const delta = new THREE.Clock().getDelta()
    renderer.value!.render(scene.value!, camera.value!)
    const mixerUpdateDelta = clock.getDelta()
    mixers.forEach((mixer) => mixer.update(mixerUpdateDelta))
    composers.forEach((composer) => composer.render(delta))
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin())
    TWEEN.update()
    isFunction(stats?.update) && stats.update()
    requestAnimationFrame(_render)
  }
  return {
    scene,
    camera,
    control,
    renderer,
    mixers,
    composers,
    renderMixins,
    initAxesHelper,
    initStats,
    createGroup,
    loadGLTF,
    loadAnimate,
  }
}
