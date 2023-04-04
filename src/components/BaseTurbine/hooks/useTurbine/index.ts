import * as THREE from 'three'
import { useThree } from '@/hooks'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { forEach, size } from 'lodash'
import { v4 as uuid } from 'uuid'
import { animation } from '@/utils/common'
import { MODEL_EQUIPMENT_POSITION_PARAMS_ENUM } from '@/constants/ModelEquipment'
import { MODEL_SKELETON_ENUM } from '@/constants/ModelSkeleton'

const MODEL_SCALES = <const>[0.0001 * 3, 0.0001 * 3, 0.0001 * 3]
const MODEL_URL = <const>{
  SKELETON: `${import.meta.env.VITE_API_DOMAIN}/models/turbine.glb`,
  PLANE: `${import.meta.env.VITE_API_DOMAIN}/models/plane.glb`,
  EQUIPMENT: `${import.meta.env.VITE_API_DOMAIN}/models/equipment.glb`,
}

export function useTurbine() {
  const loading = ref(false)
  const turbine = new THREE.Group()
  const modelSkeleton = shallowRef<THREE.Object3D>()
  const modelPlane = shallowRef<THREE.Object3D>()
  const modelEquipment = shallowRef<THREE.Object3D>()

  const {
    container,
    scene,
    camera,
    control,
    renderMixins,
    loadGLTF,
    loadModels,
    loadAnimate,
    render,
  } = useThree()

  // 加载灯光
  const loadLights = () => {
    const LIGHT_LIST = [
      [100, 100, 100],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100],
    ]
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
      directionalLight.position.set(x, y, z)
      scene.value?.add(directionalLight)
    })
  }
  // 加载风机骨架
  const loadTurbineSkeleton = async () => {
    const { scene: object, animations } = await loadGLTF(MODEL_URL.SKELETON)
    object.scale.set(...MODEL_SCALES)
    object.position.set(0, 0, 0)
    loadAnimate(object, animations, animations[0].name)
    object.name = 'skeleton'
    modelSkeleton.value = object
    turbine.add(object)
  }
  // 加载风机平台
  const loadTurbinePlane = async () => {
    const { scene: object } = await loadGLTF(MODEL_URL.PLANE)
    object.scale.set(...MODEL_SCALES)
    object.position.set(0, 0, 0)
    object.name = 'plane'
    modelPlane.value = object
    turbine.add(object)
  }
  // 加载风机设备
  const loadTurbineEquipments = async () => {
    const { scene: object } = await loadGLTF(MODEL_URL.EQUIPMENT)
    object.scale.set(...MODEL_SCALES)
    object.name = 'equipment'
    modelEquipment.value = object
    turbine.add(object)
  }
  // 风机骨架消隐动画
  const skeletonAnimation = () => {
    const shellModel = modelSkeleton.value?.getObjectByName(
      MODEL_SKELETON_ENUM.ColorMaterial
    )
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5)
    shellModel?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined
      mesh.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.7,
      })
      // 白色外壳消隐效果
      mesh.material.clippingPlanes = [clippingPlane]
      return undefined
    })
    const uid = uuid()
    renderMixins.set(uid, () => {
      if (clippingPlane.constant <= -0.1) {
        modelSkeleton.value?.remove(shellModel!)
        renderMixins.delete(uid)
        console.log('renderMixins', renderMixins)
      }
      clippingPlane.constant -= 0.01
    })
  }
  // 风机平台动画
  const planeAnimation = () => {
    // @ts-ignore
    const texture = modelPlane.value.children[0].material.map
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    const uid = uuid()
    renderMixins.set(uid, () => {
      const count = texture.repeat.y
      if (count <= 10) {
        texture.repeat.x += 0.01
        texture.repeat.y += 0.02
      } else {
        texture.repeat.x = 0
        texture.repeat.y = 0
      }
    })
  }
  // 地面和风机骨架消隐藏
  const groundAndSkeletonHideAnimation = () => {
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 3.5)
    modelSkeleton.value?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined
      mesh.material.clippingPlanes = [clippingPlane]
      return undefined
    })
    modelPlane.value?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined
      mesh.material.clippingPlanes = [clippingPlane]
      return undefined
    })
    const uid = uuid()
    renderMixins.set(uid, () => {
      if (clippingPlane.constant <= -0.1) renderMixins.delete(uid)
      clippingPlane.constant -= 0.04
    })
  }
  // 地面和风机骨架显示
  const groundAndSkeletonShowAnimation = () => {
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -0.1)
    modelSkeleton.value?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined
      mesh.material.clippingPlanes = [clippingPlane]
      return undefined
    })
    modelPlane.value?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined
      mesh.material.clippingPlanes = [clippingPlane]
      return undefined
    })
    const uid = uuid()
    renderMixins.set(uid, () => {
      if (clippingPlane.constant >= 3.5) renderMixins.delete(uid)
      clippingPlane.constant += 0.04
    })
  }
  // 设备分解动画
  const equipmentDecomposeAnimation = async () => {
    groundAndSkeletonHideAnimation()
    // await sleep(1 * 1000);
    modelEquipment.value?.updateMatrixWorld()
    modelEquipment.value?.children.forEach((child: THREE.Object3D) => {
      const params = MODEL_EQUIPMENT_POSITION_PARAMS_ENUM[child.name]
      animation({
        from: child.position,
        to: params.DECOMPOSE,
        duration: 2 * 1000,
        onUpdate: (position: any) => {
          child.position.set(position.x, position.y, position.z)
        },
      })
    })
  }
  // 设备合成动画
  const equipmentComposeAnimation = async () => {
    groundAndSkeletonShowAnimation()
    modelEquipment.value?.children.forEach((child: THREE.Object3D) => {
      const params = MODEL_EQUIPMENT_POSITION_PARAMS_ENUM[child.name]
      animation({
        from: child.position,
        to: params.COMPOSE,
        duration: 2 * 1000,
        onUpdate: (position: any) => {
          child.position.set(position.x, position.y, position.z)
        },
      })
    })
  }
  // 风机设备点击事件
  const onEquipmentClick = () => {
    const equipmentList: any = []
    modelEquipment.value?.traverse((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return undefined
      const { material } = mesh
      mesh.material = material.clone()
      equipmentList.push(mesh)
      return undefined
    })
    const handler = (event: MouseEvent) => {
      const el = container.value as HTMLElement
      const mouse = new THREE.Vector2(
        (event.clientX / el.offsetWidth) * 2 - 1,
        -(event.clientY / el.offsetHeight) * 2 + 1
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera.value!)
      const intersects = raycaster.intersectObject(modelEquipment.value!, true)
      // console.log('intersects', intersects[0].point)
      if (size(intersects) <= 0) return undefined
      const equipment = <any>intersects[0].object
      if (!equipment) return undefined
      equipmentList.forEach((child: any) => {
        child.material.emissive.setHex(child.currentHex)
      })
      equipment.currentHex =
        equipment.currentHex ?? equipment.material.emissive.getHex()
      equipment.material.emissive.setHex(0xff0000)
      return undefined
    }
    document.addEventListener('click', handler)
    onUnmounted(() => document.removeEventListener('click', handler))
  }
  onMounted(async () => {
    loading.value = true
    scene.value?.add(turbine)
    camera.value?.position.set(-1, 3.5, 2)
    control.value?.target.set(0, 2.6, 0)
    control.value?.update()
    loadLights()
    await loadModels([
      loadTurbineSkeleton(),
      loadTurbinePlane(),
      loadTurbineEquipments(),
    ])
    loading.value = false
    // 当全部模型加载时完毕触发
    render()
    onEquipmentClick()
    skeletonAnimation()
    planeAnimation()
  })
  return {
    container,
    loading,
    turbine,
    equipmentDecomposeAnimation,
    equipmentComposeAnimation,
  }
}

export default useTurbine
