/*
 * @Description:
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-07 23:46:36
 * @LastEditTime: 2022-01-08 00:07:52
 */
 /* eslint-disable */
import ThreeOperate from './ThreeOperate'
import TWEEN from '@tweenjs/tween.js'
class Turbine {
	threeOperate: ThreeOperate
	constructor(threeOperate: ThreeOperate) {
		this.threeOperate = threeOperate
		this.loadTurbine()
	}
	async loadTurbine() {
		const glb = await this.threeOperate.loadeGLTF('turbine.glb')
		const mesh = glb.scene
		const scale = 0.0003 * 1
		mesh.scale.set(scale, scale, scale)
		mesh.rotateX(Math.PI / 2)
		mesh.rotateY(-Math.PI / 2)
		mesh.position.set(0, 0, -2.42)
		const metal = mesh.getObjectByName('颜色材质') as THREE.Object3D
		metal.visible = false
		this.threeOperate.addToGroup(mesh)
		this.threeOperate.animation(mesh, glb.animations, 'Anim_0')
		this.updateYawAngle()
	}
	updateYawAngle() {
		setInterval(() => {
			const curAngle = this.threeOperate.turbineGroup.rotation.z
			const newAngle = Math.floor(Math.random() * 90) * (Math.PI / 180)
			const update = (data: { angle: any }) => {
				this.threeOperate.turbineGroup.rotation.z = data.angle
			}
			this.animation({ angle: curAngle }, { angle: newAngle }, 2000, update)
		}, 5000)
	}
	animation(
		oldObject: { angle: number },
		newObject: { angle: number },
		time: number,
		update: { (data: { angle: any }): void; (arg0: any): any }
	) {
		const tween = new TWEEN.Tween(oldObject)
		tween.to(newObject, time)
		tween.onUpdate(function (object: any) {
			update && update(object)
		})
		tween.easing(TWEEN.Easing.Linear.None)
		tween.start()
	}
}

export default Turbine
