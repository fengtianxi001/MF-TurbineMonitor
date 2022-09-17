import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { ThreeBase } from '@/core/ThreeBase'
import { computed, onMounted, reactive, Ref, ref } from 'vue'
import { forEach, isFunction, sample, size } from 'lodash-es'
import { MODEL_POSITION, MODEL_SCALES } from '@/configs/model'
// @ts-ignore
import { RenderPass, EffectComposer, OutlinePass } from 'three-outlinepass'

export function useTurbine(element: Ref<HTMLElement>) {
  const turbineGroup = new THREE.Group()
  const equipmentsList: Array<THREE.Mesh> = []

  const percents = reactive({
    skeleton: 0,
    equipment: 0,
    plane: 0,
  })
  const percent = computed(() => {
    let result = 0
    forEach(percents, (value) => (result += value))
    return result / 3
  })
  const loading = computed(() => {
    return percent.value >= 100
  })
  onMounted(() => {
    const threeBase = new ThreeBase(element.value)
    threeBase.scene.add(turbineGroup)
    threeBase.camera.position.set(-1, 3.5, 2)
    threeBase.control.target.set(0, 2.6, 0)
    threeBase.control.update()
    loadLight(threeBase)
    loadTurbineEquipments(threeBase)
    loadTurbinePlane(threeBase)
    loadTurbineSkeleton(threeBase)
  })
  //加载灯光
  const loadLight = (threeBase: ThreeBase) => {
    const LIGHTS = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100],
    ]
    forEach(LIGHTS, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
      directionalLight.position.set(x, y, z)
      threeBase.scene.add(directionalLight)
    })
  }
  //加载风机设备
  const loadTurbineEquipments = async (threeBase: ThreeBase) => {
    const url = `${import.meta.env.VITE_API_DOMAIN}/model/equipment.glb`
    const { scene: object } = await threeBase.loadGLTF(url, (percent) => (percents.equipment = percent))
    document.addEventListener('click', (e) => {
      onEquipmentClick(e, object, threeBase)
    })
    object.scale.set(...MODEL_SCALES)
    object.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return void 0
      const material = mesh.material
      mesh.material = material.clone()
      equipmentsList.push(mesh)
    })
    turbineGroup.add(object)
    onEquipmentAlarm()
  }
  //加载风机平台
  const loadTurbinePlane = async (threeBase: ThreeBase) => {
    const url = `${import.meta.env.VITE_API_DOMAIN}/model/plane.glb`
    const onProgress = (percent: number) => {}
    const { scene: object } = await threeBase.loadGLTF(url, onProgress)
    const texture = object.children[0].material.map
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    threeBase.renderMixins.push(() => {
      const count = texture.repeat.y
      if (count <= 10) {
        texture.repeat.x += 0.01
        texture.repeat.y += 0.02
      } else {
        texture.repeat.x = 0
        texture.repeat.y = 0
      }
    })
    object.scale.set(...MODEL_SCALES)
    object.position.set(...MODEL_POSITION)
    threeBase.scene?.add(object)
  }
  //加载风机骨架
  const loadTurbineSkeleton = async (threeBase: ThreeBase) => {
    const url = `${import.meta.env.VITE_API_DOMAIN}/model/turbine.glb`
    const { scene: object, animations } = await threeBase.loadGLTF(url, (percent) => (percents.skeleton = percent))
    object.scale.set(...MODEL_SCALES)
    object.position.set(...MODEL_POSITION)
    const shellModel = object.getObjectByName('颜色材质') as THREE.Object3D
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5)
    shellModel.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return void 0
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.7,
      })
      // 白色外壳消隐效果
      mesh.material.clippingPlanes = [clippingPlane]
      threeBase.renderMixins.push(() => {
        if (clippingPlane.constant <= -1) return void 0
        clippingPlane.constant -= 0.001
      })
      turbineGroup.add(object)
      threeBase.loadAnimate(object, animations, 'Anim_0')
      updateYawAngle
    })
  }

  const updateYawAngle = () => {
    setInterval(() => {
      // rotate's angle +- 45deg
      const random = Math.floor(Math.random() * 90) - 45
      const oldAngle = turbineGroup.rotation.y
      const newAngle = random * (Math.PI / 180) + oldAngle
      const updateCallback = (data: any) => (turbineGroup.rotation.y = data)
      tweenAnimation(oldAngle, newAngle, 2000, updateCallback)
    })
    const tweenAnimation = (oldValue: any, newValue: any, during: number, updateCallback: (data: any) => void) => {
      const tween = new TWEEN.Tween(oldValue)
      tween.to(newValue, during ?? 1000)
      tween.onUpdate((data: any) => isFunction(updateCallback) && updateCallback(data))
      tween.start()
    }
  }

  const onEquipmentAlarm = () => {
    setInterval(() => {
      const equipment: any = sample(equipmentsList)
      if (!equipment) return void 0
      equipment.currentHex = equipment.currentHex ?? equipment.material.emissive.getHex()
      equipment.material.emissive.setHex(0xff0000)
      setTimeout(() => {
        equipment.material.emissive.setHex(equipment.currentHex)
      }, 4 * 1000)
    }, 5 * 1000)
  }
  const onEquipmentClick = (event: MouseEvent, equipments: THREE.Group, threeBase: ThreeBase) => {
    const mouse = new THREE.Vector2(
      (event.clientX / element.value.offsetWidth) * 2 - 1,
      -(event.clientY / element.value.offsetHeight) * 2 + 1,
    )
    console.log('hooks:', threeBase.camera)
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, threeBase.camera)
    const intersects = raycaster.intersectObject(equipments, true)
    if (size(intersects) <= 0) return void 0
    const selected = intersects[0].object
    if (selected instanceof THREE.Mesh) onOutline([selected], threeBase)
  }
  const onOutline = (selected: THREE.Object3D<THREE.Event>[], threeBase: ThreeBase, color = 0x15c5e8) => {
    const composer = new EffectComposer(threeBase.renderer)
    const renderPass = new RenderPass(threeBase.scene, threeBase.camera)
    const outlinePass = new OutlinePass(
      new THREE.Vector2(element.value.offsetWidth, element.value.offsetWidth),
      threeBase.scene,
      threeBase.camera,
      selected,
    )
    outlinePass.renderToScreen = true
    outlinePass.selectedObjects = selected
    composer.addPass(renderPass)
    composer.addPass(outlinePass)
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
    composer.render(threeBase.scene, threeBase.camera)
    threeBase.composers.push(composer)
  }
  return {
    loading,
    percent,
  }
}
