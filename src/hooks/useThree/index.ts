import { isFunction } from 'lodash'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { onMounted, shallowRef, ref } from 'vue'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import useLoading from '@/hooks/useLoading'
import ThreeBase from './core'

function useThree() {
  const container = ref<HTMLElement>()
  const { loading, openLoading, closeLoading } = useLoading(true, 500)
  const scene = shallowRef<THREE.Scene>()
  const camera = shallowRef<THREE.Camera>()
  const renderer = shallowRef<THREE.WebGLRenderer>()
  const CSSRenderer = shallowRef<CSS2DRenderer>()
  const control = shallowRef<OrbitControls>()
  const mixers: any = []
  const clock = new THREE.Clock()
  const composers = new Map()
  const renderMixins = new Map()
  onMounted(() => {
    const el = container.value as HTMLElement
    scene.value = ThreeBase.initScene()
    camera.value = ThreeBase.initCamera(el)
    renderer.value = ThreeBase.initRenderer(el)
    CSSRenderer.value = ThreeBase.initCSSRender(el)
    control.value = ThreeBase.initControl(
      camera.value,
      CSSRenderer.value.domElement
    )
  })
  const render = () => {
    const delta = new THREE.Clock().getDelta()
    renderer.value!.render(scene.value!, camera.value!)
    const mixerUpdateDelta = clock.getDelta()
    mixers.forEach((mixer: any) => mixer.update(mixerUpdateDelta))
    composers.forEach((composer) => composer.render(delta))
    renderMixins.forEach((mixin) => isFunction(mixin) && mixin())
    CSSRenderer.value!.render(scene.value!, camera.value!)
    TWEEN.update()
    requestAnimationFrame(() => render())
  }

  const loadModels = async (tasks: Promise<any>[]) => {
    openLoading()
    await Promise.all(tasks)
    closeLoading()
  }
  const loadGLTF = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader()
    const onCompleted = (object: GLTF, resolve: any) => resolve(object)
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => onCompleted(object, resolve))
    })
  }

  const loadAnimate = (
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: Array<THREE.AnimationClip>,
    animationName: string
  ) => {
    const mixer = new THREE.AnimationMixer(mesh)
    const clip = THREE.AnimationClip.findByName(animations, animationName)
    if (!clip) return undefined
    const action = mixer.clipAction(clip)
    action.play()
    mixers.push(mixer)
    return undefined
  }
  return {
    container,
    loading,
    scene,
    camera,
    renderer,
    CSSRenderer,
    control,
    mixers,
    clock,
    composers,
    renderMixins,
    render,
    loadGLTF,
    loadAnimate,
    loadModels,
  }
}

export default useThree
