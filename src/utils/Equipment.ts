/*
 * @Description:
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-07 20:37:45
 * @LastEditTime: 2022-01-08 18:11:06
 */

/*eslint-disable*/
import ThreeOperate from './ThreeOperate'
import { RenderPass, EffectComposer, OutlinePass } from 'three-outlinepass'
import * as THREE from 'three'
class Equipment {
	threeOperate: ThreeOperate
	equipmentMaterialMap: Map<any, any>
	equipments: THREE.Group
	constructor(threeOperate: ThreeOperate) {
		this.threeOperate = threeOperate
		this.loadEquipment()
		this.equipmentMaterialMap = new Map()
		this.equipments = new THREE.Group()
	}
	async loadEquipment() {
		const glb = await this.threeOperate.loadeGLTF('equipment.glb')
		const mesh = glb.scene
		this.equipments = mesh
		const scale = 0.0003 * 1
		mesh.scale.set(scale, scale, scale)
		mesh.rotateX(Math.PI / 2)
		mesh.rotateY(-Math.PI / 2)
		mesh.position.set(0, 0, -2.42)
		mesh.traverse(child => {
			// console.log(child)
			if (child.type === 'Mesh') {
				const meshChild = child as THREE.Mesh
				const material = meshChild.material as any
				meshChild.material = material.clone()
				// console.log(material.uuid)
				this.equipmentMaterialMap.set(child.name, child)
			}
		})
		this.threeOperate.addToGroup(mesh)
		this.alarmEquipment()
		this.bindingClick()
	}
	alarmEquipment() {
		console.log(this.equipmentMaterialMap)

		const equipments = [
			'主轴',
			'偏航电机',
			'发电机',
			'变桨系统',
			'控制柜',
			'油冷装置',
			'转子',
			'风冷装置',
			'齿轮箱',
		]
		setInterval(() => {
			const equipment = this.equipmentMaterialMap.get(equipments[Math.floor(Math.random() * 9)])
			if (equipment) {
				equipment.material.emissive.setHex(equipment.currentHex)
			}
			equipment.currentHex = equipment.material.emissive.getHex()
			equipment.material.emissive.setHex(0xff0000)
			setTimeout(() => {
				if (equipment) equipment.material.emissive.setHex(equipment.currentHex)
			}, 4000)
		}, 5000)
	}
	bindingClick() {
		document.addEventListener('click', this.equipmentClick.bind(this))
	}
	equipmentClick(event: MouseEvent) {
		const [w, h] = [window.innerWidth, window.innerHeight]
		const mouse = new THREE.Vector2((event.clientX / w) * 2 - 1, -(event.clientY / h) * 2 + 1)
		const raycaster = new THREE.Raycaster()
		raycaster.setFromCamera(mouse, this.threeOperate.camera)

		const intersects = raycaster.intersectObject(this.equipments, true)
		if (intersects.length <= 0) return false
		const selectedObject = intersects[0].object
		// console.log(intersects)

		if (selectedObject.type === 'Mesh') {
			this.outline([selectedObject])
		}
	}
	outline(selectedObjects: THREE.Object3D<THREE.Event>[], color = 0x15c5e8) {
		const { renderer, camera, scene } = this.threeOperate
		const [w, h] = [window.innerWidth, window.innerHeight]
		var compose = new EffectComposer(renderer)
		// console.log("123");

		var renderPass = new RenderPass(scene, camera)
		var outlinePass = new OutlinePass(new THREE.Vector2(w, h), scene, camera, selectedObjects)
		outlinePass.renderToScreen = true
		outlinePass.selectedObjects = selectedObjects
		compose.addPass(renderPass)
		compose.addPass(outlinePass)
		const params = {
			edgeStrength: 10,
			edgeGlow: 0,
			edgeThickness: 50.0,
			pulsePeriod: 1,
			usePatternTexture: false,
		}
		outlinePass.edgeStrength = params.edgeStrength
		outlinePass.edgeGlow = params.edgeGlow
		outlinePass.visibleEdgeColor.set(color)
		outlinePass.hiddenEdgeColor.set(color)
		compose.render(scene, camera)
		this.threeOperate.addCompose(compose)
	}
}

export default Equipment
