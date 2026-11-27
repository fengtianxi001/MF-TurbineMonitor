import { nextTick, onUnmounted, ref, reactive } from 'vue'
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
  EXPLOSION: {
    ORDER: [
      '变桨系统',
      '转子',
      '主轴',
      '齿轮箱',
      '发电机',
      '油冷装置',
      '风冷装置',
      '偏航电机',
      '控制柜',
    ],
    PART_DURATION: 1100,
    PART_STAGGER: 150,
    LABEL_DURATION: 260,
    SKELETON_DURATION: 1200,
    CAMERA_DURATION: 1900,
    CAMERA_POSITION: { x: 0.82, y: 2.84, z: 0.2 },
    CAMERA_TARGET: { x: 0, y: 2.7, z: 0 },
  },
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

  const hover = reactive({
    visible: false,
    name: '',
    x: 0,
    y: 0,
  })

  const isAnimation = ref(false)

  const explosionState = ref<
    'composed' | 'decomposing' | 'decomposed' | 'composing'
  >('composed')

  const labelGroup = new THREE.Group()

  const trajectoryGroup = new THREE.Group()

  const labels = new Map<string, THREE.Object3D>()

  const trajectories = new Map<string, THREE.Line>()

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

  const overview = {
    position: new THREE.Vector3(0.5, 2.8, 0.5),
    target: new THREE.Vector3(0, 2.65, 0),
  }

  const materialStates = new Map<
    THREE.Material,
    { opacity: number; transparent: boolean; depthWrite: boolean }
  >()
  let materialTweens: ReturnType<typeof transitionAnimation>[] = []
  let cameraTween: ReturnType<typeof transitionAnimation> | undefined
  let explosionTweens: ReturnType<typeof transitionAnimation>[] = []

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const motionDuration = (duration: number) =>
    prefersReducedMotion ? Math.max(duration * 0.35, 120) : duration

  const motionDelay = (delay: number) =>
    prefersReducedMotion ? 0 : delay

  const setInteractionLocked = (locked: boolean) => {
    isAnimation.value = locked
    hover.visible = false
    if (container.value) container.value.style.cursor = 'default'
    if (ocontrol.value) ocontrol.value.enabled = !locked
  }

  const stopExplosionTweens = () => {
    explosionTweens.forEach((tween) => tween.stop())
    explosionTweens = []
  }

  const runExplosionTween = (
    props: Parameters<typeof transitionAnimation>[0],
    delay = 0
  ) =>
    new Promise<void>((resolve) => {
      const originalComplete = props.onComplete
      const tween = transitionAnimation({
        ...props,
        onComplete: (data) => {
          explosionTweens = explosionTweens.filter((item) => item !== tween)
          originalComplete?.(data)
          resolve()
        },
      }).delay(motionDelay(delay))
      explosionTweens.push(tween)
      tween.start()
    })

  const runClippingAnimation = (config: {
    objects: THREE.Object3D[]
    from: number
    to: number
    duration: number
  }) =>
    new Promise<void>((resolve) => {
      const tween = planeClippingAnimation({
        objects: config.objects,
        from: config.from,
        to: config.to,
        during: motionDuration(config.duration),
        easing: TWEEN.Easing.Cubic.InOut,
        onComplete: resolve,
      })
      explosionTweens.push(tween)
      tween.start()
    })

  const getMaterials = (object: THREE.Object3D) => {
    const materials: THREE.Material[] = []
    object.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      const childMaterials = Array.isArray(child.material)
        ? child.material
        : [child.material]
      childMaterials.forEach((material) => {
        if (!materialStates.has(material)) {
          materialStates.set(material, {
            opacity: material.opacity,
            transparent: material.transparent,
            depthWrite: material.depthWrite,
          })
        }
        materials.push(material)
      })
    })
    return materials
  }

  const clonePartMaterials = (part: THREE.Object3D) => {
    part.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return
      child.material = Array.isArray(child.material)
        ? child.material.map((material) => material.clone())
        : child.material.clone()
    })
  }

  const getEquipmentPart = (object: THREE.Object3D) => {
    let part = object
    while (part.parent && part.parent !== models.equipment) part = part.parent
    return part
  }

  const animateMaterialOpacity = (
    material: THREE.Material,
    opacity: number,
    restore = false
  ) => {
    const original = materialStates.get(material)
    material.transparent = true
    material.depthWrite = false
    const tween = transitionAnimation({
      from: { opacity: material.opacity },
      to: { opacity },
      duration: 280,
      easing: TWEEN.Easing.Quadratic.Out,
      onUpdate: ({ opacity: value }) => {
        material.opacity = value
        material.needsUpdate = true
      },
      onComplete: () => {
        if (!restore || !original) return
        material.transparent = original.transparent
        material.depthWrite = original.depthWrite
        material.needsUpdate = true
      },
    })
    materialTweens.push(tween)
    tween.start()
  }

  const animateEquipmentState = (selected?: THREE.Object3D) => {
    materialTweens.forEach((tween) => tween.stop())
    materialTweens = []
    models.equipment.children.forEach((part: THREE.Object3D) => {
      getMaterials(part).forEach((material) => {
        const original = materialStates.get(material)!
        animateMaterialOpacity(
          material,
          selected && part !== selected ? 0.18 : original.opacity,
          !selected
        )
      })
    })
  }

  const animateCamera = (position: THREE.Vector3, target: THREE.Vector3) => {
    cameraTween?.stop()
    cameraTween = transitionAnimation({
      from: {
        px: camera.value!.position.x,
        py: camera.value!.position.y,
        pz: camera.value!.position.z,
        tx: ocontrol.value!.target.x,
        ty: ocontrol.value!.target.y,
        tz: ocontrol.value!.target.z,
      },
      to: {
        px: position.x,
        py: position.y,
        pz: position.z,
        tx: target.x,
        ty: target.y,
        tz: target.z,
      },
      duration: 700,
      easing: TWEEN.Easing.Cubic.InOut,
      onUpdate: ({ px, py, pz, tx, ty, tz }) => {
        camera.value!.position.set(px, py, pz)
        ocontrol.value!.target.set(tx, ty, tz)
        ocontrol.value!.update()
      },
    })
    cameraTween.start()
  }

  const focusEquipmentPart = (part: THREE.Object3D) => {
    const box = new THREE.Box3().setFromObject(part)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const distance = Math.max(size.length() * 2.2, 0.42)
    const direction = camera.value!.position
      .clone()
      .sub(ocontrol.value!.target)
      .normalize()
    animateCamera(center.clone().add(direction.multiplyScalar(distance)), center)
  }

  const clearSelection = () => {
    current.value = ''
    outlinePass.value!.selectedObjects = []
    animateEquipmentState()
    animateCamera(overview.position, overview.target)
  }

  const getPart = (name: string) => models.equipment.getObjectByName(name)

  const setLabelOpacity = (name: string, opacity: number) => {
    const label = labels.get(name)
    const element = label?.userData.element as HTMLElement | undefined
    if (!element) return
    element.style.opacity = `${opacity}`
    element.style.transform = `translateY(${(1 - opacity) * 8}px)`
  }

  const setTrajectoryOpacity = (name: string, opacity: number) => {
    const line = trajectories.get(name)
    if (!line) return
    const material = line.material as THREE.LineBasicMaterial
    material.opacity = opacity
    material.needsUpdate = true
    line.visible = opacity > 0
  }

  const createExplosionResources = () => {
    CONFIG.EXPLOSION.ORDER.forEach((name) => {
      const position =
        CONFIG.EQUIPMENT_POSITION[
          name as keyof typeof CONFIG.EQUIPMENT_POSITION
        ]
      const points = [
        new THREE.Vector3(
          position.COMPOSE.x,
          position.COMPOSE.y,
          position.COMPOSE.z
        ).multiplyScalar(CONFIG.MODEL_SCALES[0]),
        new THREE.Vector3(
          position.DECOMPOSE.x,
          position.DECOMPOSE.y,
          position.DECOMPOSE.z
        ).multiplyScalar(CONFIG.MODEL_SCALES[0]),
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0x74f7fd,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
      const line = new THREE.Line(geometry, material)
      line.visible = false
      trajectories.set(name, line)
      trajectoryGroup.add(line)

      const point = position.LABEL
      const label = loadCSS2DByVue(WidgetLabel, { name })
      const element = label.element as HTMLElement
      label.userData.element = element
      element.style.opacity = '0'
      element.style.transform = 'translateY(8px)'
      element.style.transition = 'none'
      label.position.set(point.x, point.y, point.z)
      labels.set(name, label)
      labelGroup.add(label)
    })
    scene.value!.add(trajectoryGroup, labelGroup)
  }

  const animateCameraTo = (
    position: THREE.Vector3,
    target: THREE.Vector3,
    duration: number
  ) =>
    runExplosionTween({
      from: {
        px: camera.value!.position.x,
        py: camera.value!.position.y,
        pz: camera.value!.position.z,
        tx: ocontrol.value!.target.x,
        ty: ocontrol.value!.target.y,
        tz: ocontrol.value!.target.z,
      },
      to: {
        px: position.x,
        py: position.y,
        pz: position.z,
        tx: target.x,
        ty: target.y,
        tz: target.z,
      },
      duration: motionDuration(duration),
      easing: TWEEN.Easing.Quintic.InOut,
      onUpdate: ({ px, py, pz, tx, ty, tz }) => {
        camera.value!.position.set(px, py, pz)
        ocontrol.value!.target.set(tx, ty, tz)
        ocontrol.value!.update()
      },
    })

  const animateExplosionPart = (
    name: string,
    direction: 'decompose' | 'compose',
    delay: number
  ) => {
    const part = getPart(name)
    if (!part) return Promise.resolve()
    const position =
      CONFIG.EQUIPMENT_POSITION[
        name as keyof typeof CONFIG.EQUIPMENT_POSITION
      ]
    const destination =
      direction === 'decompose' ? position.DECOMPOSE : position.COMPOSE
    const start = { x: part.position.x, y: part.position.y, z: part.position.z }

    return runExplosionTween(
      {
        from: { ...start, progress: 0 },
        to: { ...destination, progress: 1 },
        duration: motionDuration(CONFIG.EXPLOSION.PART_DURATION),
        easing:
          direction === 'decompose'
            ? TWEEN.Easing.Quintic.InOut
            : TWEEN.Easing.Cubic.InOut,
        onUpdate: ({ x, y, z, progress }) => {
          part.position.set(x, y, z)
          const presentationProgress =
            direction === 'decompose' ? progress : 1 - progress
          const labelProgress =
            direction === 'decompose'
              ? Math.max(0, (progress - 0.72) / 0.28)
              : Math.max(0, 1 - progress * 3.5)
          setTrajectoryOpacity(name, presentationProgress * 0.48)
          setLabelOpacity(name, labelProgress)
        },
        onComplete: () => {
          part.position.set(destination.x, destination.y, destination.z)
          const visible = direction === 'decompose'
          setTrajectoryOpacity(name, visible ? 0.48 : 0)
          setLabelOpacity(name, visible ? 1 : 0)
        },
      },
      delay
    )
  }

  const boostrap = async () => {
    await loadModels() // 加载风机模型
    loadLights() // 加载灯光
    createExplosionResources()
    await openingAnimation() // 开场动画

    models.equipment.children.forEach((part: THREE.Object3D) => getMaterials(part))

    addModelPick(models.equipment, (intersects) => {
      if (isAnimation.value) return
      if (intersects.length > 0) {
        const part = getEquipmentPart(intersects[0].object)
        if (current.value === part.name) {
          clearSelection()
          return
        }
        current.value = part.name
        outlinePass.value!.selectedObjects = [part]
        animateEquipmentState(part)
        focusEquipmentPart(part)
      } else {
        clearSelection()
      }
    })
    addModelHoverPick(models.equipment, (intersects, event) => {
      if (isAnimation.value) return
      if (intersects.length > 0) {
        const part = getEquipmentPart(intersects[0].object)
        hover.visible = true
        hover.name = part.name
        hover.x = event.offsetX + 16
        hover.y = event.offsetY + 16
        if (container.value) container.value.style.cursor = 'pointer'
      } else {
        hover.visible = false
        if (container.value) container.value.style.cursor = 'default'
      }
    })
  }
  //加载机架和设备模型
  const loadModels = async () => {
    const loadEquipment = async () => {
      const gltf = await loadGltf(CONFIG.MODEL_SOURCES.EQUIPMENT)
      const model = gltf.scene
      model.scale.set(...CONFIG.MODEL_SCALES)
      model.children.forEach(clonePartMaterials)
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

  const prepareExplosionAnimation = () => {
    stopExplosionTweens()
    cameraTween?.stop()
    materialTweens.forEach((tween) => tween.stop())
    materialTweens = []
    current.value = ''
    hover.visible = false
    outlinePass.value!.selectedObjects = []
    animateEquipmentState()
    setInteractionLocked(true)
  }

  //设备分解动画: 外壳削切 => 镜头拉开 => 设备错峰分离 => 显示轨迹和标签
  const eqDecomposeAnimation = async () => {
    if (isAnimation.value || explosionState.value !== 'composed') {
      return undefined
    }

    explosionState.value = 'decomposing'
    prepareExplosionAnimation()
    try {
      skeletons.color.visible = false
      skeletons.wireframe.visible = true
      const cameraPosition = new THREE.Vector3(
        CONFIG.EXPLOSION.CAMERA_POSITION.x,
        CONFIG.EXPLOSION.CAMERA_POSITION.y,
        CONFIG.EXPLOSION.CAMERA_POSITION.z
      )
      const cameraTarget = new THREE.Vector3(
        CONFIG.EXPLOSION.CAMERA_TARGET.x,
        CONFIG.EXPLOSION.CAMERA_TARGET.y,
        CONFIG.EXPLOSION.CAMERA_TARGET.z
      )

      await Promise.all([
        runClippingAnimation({
          objects: [skeletons.wireframe],
          from: 4,
          to: 2,
          duration: CONFIG.EXPLOSION.SKELETON_DURATION,
        }),
        animateCameraTo(
          cameraPosition,
          cameraTarget,
          CONFIG.EXPLOSION.CAMERA_DURATION
        ),
      ])
      skeletons.wireframe.visible = false

      await Promise.all(
        CONFIG.EXPLOSION.ORDER.map((name, index) =>
          animateExplosionPart(
            name,
            'decompose',
            index * CONFIG.EXPLOSION.PART_STAGGER
          )
        )
      )
      explosionState.value = 'decomposed'
    } finally {
      if (explosionState.value === 'decomposing') {
        explosionState.value = 'composed'
      }
      setInteractionLocked(false)
    }
    return undefined
  }

  //设备组合动画: 标签和轨迹逆序消失 => 设备逆序组合 => 外壳还原
  const eqComposeAnimation = async () => {
    if (isAnimation.value || explosionState.value !== 'decomposed') {
      return undefined
    }

    explosionState.value = 'composing'
    prepareExplosionAnimation()
    try {
      const reverseOrder = [...CONFIG.EXPLOSION.ORDER].reverse()
      await Promise.all([
        ...reverseOrder.map((name, index) =>
          animateExplosionPart(
            name,
            'compose',
            index * CONFIG.EXPLOSION.PART_STAGGER
          )
        ),
        animateCameraTo(
          overview.position,
          overview.target,
          CONFIG.EXPLOSION.CAMERA_DURATION
        ),
      ])

      skeletons.wireframe.visible = true
      await runClippingAnimation({
        objects: [skeletons.wireframe],
        from: 2,
        to: 4,
        duration: CONFIG.EXPLOSION.SKELETON_DURATION,
      })
      explosionState.value = 'composed'
    } finally {
      if (explosionState.value === 'composing') {
        explosionState.value = 'decomposed'
      }
      setInteractionLocked(false)
    }
    return undefined
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

  onUnmounted(() => {
    clearInterval(warningTimer.value)
    stopExplosionTweens()
    materialTweens.forEach((tween) => tween.stop())
    cameraTween?.stop()
    trajectories.forEach((line) => {
      line.geometry.dispose()
      ;(line.material as THREE.Material).dispose()
    })
    trajectories.clear()
    labels.clear()
  })

  nextTick(async () => {
    await boostrap()
  })

  return {
    container,
    loading,
    current,
    hover,
    eqDecomposeAnimation,
    eqComposeAnimation,
    startWarning,
    stopWarning,
  }
}

export default useTurbine
