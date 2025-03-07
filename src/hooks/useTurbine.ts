import { nextTick, ref, reactive } from 'vue'
import { forEach, random } from 'lodash-es'
import useThree from './useThree'
import TWEEN from 'three/examples/jsm/libs/tween.module.js'
import * as THREE from 'three'
import WidgetLabel from '@/components/WidgetLabel.vue'

const CONFIG = {
  MODEL_SOURCES: {
    EQUIPMENT: `${import.meta.env.VITE_API_DOMAIN}/models/equipment.glb`,
    PLANE: `${import.meta.env.VITE_API_DOMAIN}/models/plane.glb`,
    SKELETON: `${import.meta.env.VITE_API_DOMAIN}/models/skeleton.glb`,
  },
  MODEL_SCALES: [0.0001 * 3, 0.0001 * 3, 0.0001 * 3],
  EQUIPMENT_POSITION: {
    变桨系统: {
      LABEL: { x: 0.0291, y: 2.6277, z: 0.2308 },
      COMPOSE: { x: 2519.0795, y: 29288.6777, z: 0 },
      DECOMPOSE: { x: 2519.0795, y: 29000.6777, z: 300 },
    },
    转子: {
      LABEL: { x: 0.0632, y: 2.7692, z: 0.1746 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8850, z: 300 },
    },
    主轴: {
      LABEL: { x: 0.0183, y: 2.6193, z: 0.0815 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8350, z: 200 },
    },
    齿轮箱: {
      LABEL: { x: 0.0319, y: 2.6239, z: -0.0402 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8350, z: 100 },
    },
    油冷装置: {
      LABEL: { x: 0.0364, y: 2.7995, z: 0.0593 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8650, z: 600 },
    },
    偏航电机: {
      LABEL: { x: -0.0122, y: 2.75662, z: -0.0305 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8850, z: 400 },
    },
    风冷装置: {
      LABEL: { x: -0.001, y: 2.7643, z: -0.1305 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8750, z: 300 },
    },
    发电机: {
      LABEL: { x: 0.0047, y: 2.6156, z: -0.2045 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8350, z: 0 },
    },
    控制柜: {
      LABEL: { x: 0.0249, y: 2.7605, z: -0.2521 },
      COMPOSE: { x: 20437.7851, y: 8650, z: 0 },
      DECOMPOSE: { x: 20437.7851, y: 8850, z: 0 },
    },
  },
} as const

export function useTurbine() {
  const {
    container,
    scene,
    camera,
    ocontrol,
    outlinePass,
    hexPass,
    loadGltf,
    loadAnimationMixer,
    loadCSS2DByVue,
    addModelPick,
    addModelHoverPick,
    addOutlineEffect,
    transitionAnimation,
    planeClippingAnimation,
  } = useThree()

  const current = ref('')

  const isAnimation = ref(false)

  const labelGroup = new THREE.Group()

  const models = {
    equipment: null as any,
    plane: null as any,
    skeleton: null as any,
  }

  const skeletons = {
    color: null as any,
    wireframe: null as any,
  }

  const loading = reactive({
    total: 2, // 全部
    loaded: 0, // 已加载
    isLoading: true, // 执行状态
  })

  const boostrap = async () => {
    await loadModels() // 加载风机模型
    loadLights() // 加载灯光
    await openingAnimation() // 开场动画

    addModelPick(models.equipment, (intersects) => {
      if (intersects.length > 0) {
        const obj = intersects[0]['object']
        current.value = obj.name
        outlinePass.value!.selectedObjects = [obj]
      } else {
        current.value = ''
        outlinePass.value!.selectedObjects = []
      }
    })
    addModelHoverPick(models.equipment, (intersects) => {
      if (intersects.length > 0) {
        const obj = intersects[0]['object']
        hexPass.value!.selectedObjects = [obj]
      } else {
        hexPass.value!.selectedObjects = []
      }
    })
  }
  //加载机架和设备模型
  const loadModels = async () => {
    const loadEquipment = async () => {
      const gltf = await loadGltf(CONFIG.MODEL_SOURCES.EQUIPMENT)
      const model = gltf.scene
      model.scale.set(...CONFIG.MODEL_SCALES)
      models.equipment = model
      loading.loaded += 1
      model.name = 'equipment'
      scene.value!.add(model)
    }
    const loadSkeleton = async () => {
      const gltf = await loadGltf(CONFIG.MODEL_SOURCES.SKELETON)
      const model = gltf.scene
      loadAnimationMixer(model, gltf.animations, gltf.animations[0].name)
      model.scale.set(...CONFIG.MODEL_SCALES)
      models.skeleton = model
      loading.loaded += 1
      model.name = 'skeleton'
      scene.value!.add(model)
      skeletons.color = models.skeleton.getObjectByName('颜色材质')
      skeletons.wireframe = models.skeleton.getObjectByName('线框材质')
    }
    await Promise.all([loadEquipment(), loadSkeleton()])
    loading.isLoading = false
    loading.loaded = 2
  }
  //加载灯光
  const loadLights = () => {
    const LIGHT_LIST = [
      [0, 0, 0],
      [-100, 100, 100],
      [100, -100, 100],
      [100, 100, -100],
    ]
    forEach(LIGHT_LIST, ([x, y, z]) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
      directionalLight.position.set(x, y, z)
      scene.value?.add(directionalLight)
    })
  }

  //开场动画
  const openingAnimation = () => {
    return new Promise((resolve) => {
      isAnimation.value = true
      // 风机白色外壳平面削切动画
      planeClippingAnimation({
        objects: [skeletons.color!],
        from: 4,
        to: 2,
        during: 1000 * 4,
        onComplete() {
          isAnimation.value = false
          skeletons.color!.visible = false
        },
      }).start()
      // 镜头移动
      transitionAnimation({
        from: camera.value!.position,
        to: { x: 0.5, y: 2.8, z: 0.5 },
        duration: 1000 * 2,
        easing: TWEEN.Easing.Quintic.InOut,
        onUpdate: ({ x, y, z }: any) => {
          camera.value!.position.set(x, y, z)
          ocontrol.value?.update()
        },
        onComplete() {
          isAnimation.value = false
          resolve(void 0)
        },
      }).start()
    })
  }

  //设备分解动画: 外壳削切 => 设备分离 => 显示标签/摄像头转动
  const eqDecomposeAnimation = () => {
    return new Promise((resolve) => {
      //先确保白色外壳隐藏
      skeletons.color.visible = false
      isAnimation.value = true

      const skeletonAnimate = planeClippingAnimation({
        objects: [skeletons.wireframe],
        from: 4,
        to: 2,
        during: 1000 * 2,
        onComplete: () => {
          skeletons.wireframe.visible = false
          cameraAnimate.start()
        },
      })

      //可以每个部件创建一个动画，这里为了更好控制进程避免使用settimeout，只使用一个动画(更麻烦)
      const from: any = {}
      const to: any = {}

      forEach(models.equipment.children, (mesh, index) => {
        const name = mesh.name as keyof typeof CONFIG.EQUIPMENT_POSITION
        const decompose = CONFIG.EQUIPMENT_POSITION[name]['DECOMPOSE']
        const compose = CONFIG.EQUIPMENT_POSITION[name]['COMPOSE']
        from[`x${index}`] = compose.x
        from[`y${index}`] = compose.y
        from[`z${index}`] = compose.z
        to[`x${index}`] = decompose.x
        to[`y${index}`] = decompose.y
        to[`z${index}`] = decompose.z
      })

      const eqAnimate = transitionAnimation({
        from,
        to,
        duration: 1000 * 2,
        easing: TWEEN.Easing.Quintic.InOut,
        onUpdate(data) {
          forEach(models.equipment.children, (mesh, index) => {
            mesh.position.set(
              data[`x${index}`],
              data[`y${index}`],
              data[`z${index}`]
            )
          })
        },
        onComplete: () => {
          isAnimation.value = false
          createEquipmentLabel()
          resolve(void 0)
        },
      })

      const cameraAnimate = transitionAnimation({
        from: camera.value!.position,
        to: { x: 0.7, y: 2.8, z: 0 },
        duration: 1000 * 2,
        easing: TWEEN.Easing.Linear.None,
        onUpdate(data) {
          camera.value!.position.set(data.x, data.y, data.z)
          ocontrol.value?.update()
        },
      })
      skeletonAnimate.chain(eqAnimate).start()
    })
  }

  //设备组合动画: 隐藏标签 => 设备组合 => 外壳还原
  const eqComposeAnimation = () => {
    return new Promise((resolve) => {
      isAnimation.value = true
      removeEquipmentLabel()

      const cameraAnimate = transitionAnimation({
        from: camera.value!.position,
        to: { x: 0.5, y: 2.8, z: 0.5 },
        duration: 1000 * 2,
        easing: TWEEN.Easing.Linear.None,
        onUpdate(data) {
          camera.value!.position.set(data.x, data.y, data.z)
          ocontrol.value?.update()
        },
      })
      cameraAnimate.start()
      const from: any = {}
      const to: any = {}

      forEach(models.equipment.children, (mesh, index) => {
        const name = mesh.name as keyof typeof CONFIG.EQUIPMENT_POSITION
        const decompose = CONFIG.EQUIPMENT_POSITION[name]['DECOMPOSE']
        const compose = CONFIG.EQUIPMENT_POSITION[name]['COMPOSE']
        from[`x${index}`] = decompose.x
        from[`y${index}`] = decompose.y
        from[`z${index}`] = decompose.z
        to[`x${index}`] = compose.x
        to[`y${index}`] = compose.y
        to[`z${index}`] = compose.z
      })

      const eqAnimate = transitionAnimation({
        from,
        to,
        duration: 1000 * 2,
        easing: TWEEN.Easing.Quintic.InOut,
        onUpdate(data) {
          forEach(models.equipment.children, (mesh, index) => {
            mesh.position.set(
              data[`x${index}`],
              data[`y${index}`],
              data[`z${index}`]
            )
          })
        },
      })
      skeletons.wireframe.visible = true
      const skeletonAnimate = planeClippingAnimation({
        objects: [skeletons.wireframe],
        from: 2,
        to: 4,
        during: 1000 * 2,
        onComplete: () => {
          isAnimation.value = false
          resolve(void 0)
        },
      })
      eqAnimate.chain(skeletonAnimate).start()
    })
  }

  //生成设备标签
  const createEquipmentLabel = () => {
    forEach(CONFIG.EQUIPMENT_POSITION, (point, name) => {
      const label = loadCSS2DByVue(WidgetLabel, { name })
      label.position.set(point.LABEL.x, point.LABEL.y, point.LABEL.z)
      labelGroup.add(label)
    })
    scene.value!.add(labelGroup)
  }

  //移除设备标签
  const removeEquipmentLabel = () => {
    while (labelGroup.children.length > 0) {
      const child: any = labelGroup.children[0]
      labelGroup.remove(child) //
      child.geometry && child.geometry.dispose() // 释放几何体资源
      child.material && child.material.dispose() // 释放材质资源
    }
    scene.value!.remove(labelGroup)
  }

  const warningTimer = ref()

  //开始模拟设备告警
  const startWarning = () => {
    models.equipment.children.forEach((mesh: any) => {
      mesh.material = mesh.material.clone()
      mesh.hex = mesh.material.emissive.getHex()
    })

    const handle = () => {
      const currentIndex = random(0, models.equipment.children.length - 1)
      const currentName = models.equipment.children[currentIndex].name
      models.equipment.children.forEach((mesh: any, index: number) => {
        if (index === currentIndex) {
          mesh.material.emissive.setHex(0xff0000)
        } else {
          mesh.material.emissive.setHex(mesh.hex)
        }
      })
      transitionAnimation({
        from: camera.value!.position,
        to: { x: 0.7, y: 2.8, z: 0 },
        duration: 1000 * 2,
        easing: TWEEN.Easing.Linear.None,
        onUpdate(data) {
          camera.value!.position.set(data.x, data.y, data.z)
          ocontrol.value?.update()
        },
      }).start()
    }
    handle()
    warningTimer.value = setInterval(handle, 1000 * 2)
  }

  //结束模拟设备告警
  const stopWarning = () => {
    clearInterval(warningTimer.value)
    models.equipment.children.forEach((mesh: any) => {
      mesh.material.emissive.setHex(mesh.hex)
    })

    transitionAnimation({
      from: camera.value!.position,
      to: { x: 0.5, y: 2.8, z: 0.5 },
      duration: 1000 * 2,
      easing: TWEEN.Easing.Linear.None,
      onUpdate(data) {
        camera.value!.position.set(data.x, data.y, data.z)
        ocontrol.value?.update()
      },
    }).start()
  }

  nextTick(async () => {
    await boostrap()
  })

  return {
    container,
    loading,
    current,
    eqDecomposeAnimation,
    eqComposeAnimation,
    startWarning,
    stopWarning,
  }
}

export default useTurbine
