/*
 * @Description:
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-06 23:01:04
 * @LastEditTime: 2022-01-08 00:08:25
 */

/*eslint-disable*/
import * as THREE from 'three'
THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import TWEEN from '@tweenjs/tween.js'

class ThreeOperate {
	container: HTMLElement
	scene: THREE.Scene
	camera: THREE.PerspectiveCamera
	renderer: THREE.WebGLRenderer
	CSSRender: CSS2DRenderer
	control: null | OrbitControls
	render: null | (() => void)
	mixers: THREE.AnimationMixer[]
	clock: THREE.Clock
	compose: any
	turbineGroup: THREE.Group
	constructor(container: HTMLElement) {
		this.container = container
		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 500)
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
		this.CSSRender = new CSS2DRenderer()
		this.control = null
		this.render = null
		this.mixers = []
		this.clock = new THREE.Clock()
		this.compose = null
		this.init()
		this.turbineGroup = new THREE.Group()
		this.scene.add(this.turbineGroup)
	}
	init() {
		this.initCamera()
		this.initRenderer()
		this.initCSSRender()
		this.initControl()
		this.initRender()
		this.initLights()
	}
	initCamera() {
		this.camera.position.set(-2, 2, 2)
		this.camera.lookAt(this.scene.position)
	}
	initLights() {
		const lights = [
			[100, 100, 100],
			[-100, 100, 100],
			[100, -100, 100],
		]
		lights.map(([x, y, z]) => {
			var spotLight = new THREE.DirectionalLight(0xffffff, 3)
			spotLight.position.set(x, y, z)
			this.scene.add(spotLight)
		})
	}
	initRenderer() {
		this.renderer.shadowMap.enabled = true
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.container.appendChild(this.renderer.domElement)
	}
	initCSSRender() {
		this.CSSRender.setSize(window.innerWidth, window.innerHeight)
		this.CSSRender.domElement.style.position = 'absolute'
		this.CSSRender.domElement.style.top = '0px'
		this.container.appendChild(this.CSSRender.domElement)
	}
	initControl() {
		this.control = new OrbitControls(this.camera, this.CSSRender.domElement)
	}
	initRender() {
		this.render = () => {
			const delta = new THREE.Clock().getDelta()
			this.renderer.render(this.scene, this.camera)
			requestAnimationFrame(this.render as () => void)
			const mixerUpdateDelta = this.clock.getDelta()
			this.mixers.map(mixer => {
				mixer.update(mixerUpdateDelta)
			})
			this.compose && this.compose.render(delta)
			TWEEN.update()
		}
	}
	add(object: THREE.Object3D<THREE.Event>) {
		this.scene.add(object)
	}
	addToGroup(object: THREE.Object3D<THREE.Event>) {
		this.turbineGroup.add(object)
	}
	loadeGLTF(
		src: any,
		onProgress = (progress: any) => {
			console.log(progress)
		}
	) {
		const loader = new GLTFLoader()
		const url = `${process.env.BASE_URL}model/${src}`
		return new Promise<GLTF>(resolve => {
			loader.load(
				url,
				object => resolve(object) as unknown as Promise<GLTF>,
				xhr => {
					onProgress((xhr.loaded / xhr.total) * 100)
				}
			)
		})
	}
	animation(mesh: THREE.Object3D<THREE.Event> | THREE.AnimationObjectGroup, animations: any, animationName: any) {
		const mixer = new THREE.AnimationMixer(mesh)
		const clip = THREE.AnimationClip.findByName(animations, animationName)
		if (clip) {
			const action = mixer.clipAction(clip)
			action.play()
			this.mixers.push(mixer)
		}
	}
	addCompose(compose: any) {
		this.compose = compose
	}
}

export default ThreeOperate
