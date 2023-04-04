import { defineStore } from 'pinia'
import { computed } from 'vue'
import { store } from '@/stores'
import { map, filter, size, sortBy } from 'lodash'
import { Message } from '@arco-design/web-vue'
import { useLocalStorageState } from '@/hooks'

export type ModuleNameType =
  | 'MonitorActive'
  | 'MonitorEnergy'
  | 'MonitorEnv'
  | 'MonitorError'
  | 'MonitorStatistics'
  | 'MonitorYawAngle'

export type ModuleType = Record<
  ModuleNameType,
  {
    key: ModuleNameType
    label: string
    visible: boolean
    updateTime: number
  }
>

export const useLayoutStore = defineStore('app-layout', () => {
  /** @description: 所有的模块 */
  const layoutModules = useLocalStorageState<ModuleType>('layout-modules', {
    defaultValue: {
      MonitorActive: {
        key: 'MonitorActive',
        label: '活动监测',
        visible: true,
        updateTime: 1,
      },
      MonitorEnergy: {
        key: 'MonitorEnergy',
        label: '发电监测',
        visible: true,
        updateTime: 2,
      },
      MonitorEnv: {
        key: 'MonitorEnv',
        label: '环境监测',
        visible: true,
        updateTime: 3,
      },
      MonitorError: {
        key: 'MonitorError',
        label: '异常监测',
        visible: true,
        updateTime: 4,
      },
      MonitorStatistics: {
        key: 'MonitorStatistics',
        label: '参数监测',
        visible: true,
        updateTime: 5,
      },
      MonitorYawAngle: {
        key: 'MonitorYawAngle',
        label: '偏航角度监测',
        visible: true,
        updateTime: 6,
      },
    },
  })
  /** @description: 所有模块中可见的模块并按照更新时间排序, 返回的是模块的名称 */
  const validModules = computed(() => {
    const list = sortBy(filter(layoutModules.value, 'visible'), 'updateTime')
    return map(list, 'key')
  })
  /** @description: 将有效模块分块便于左右显示 */
  const chunkModules = computed(() => ({
    left: validModules.value.slice(0, 3),
    right: validModules.value.slice(3, 6),
  }))
  /** @description: 根据模块名称切换模块的可见性 */
  const onToggleByModuleName = (moduleName: ModuleNameType) => {
    const module = layoutModules.value[moduleName]
    const visible = !module?.visible
    if (visible && size(validModules.value) >= 6)
      return Message.warning('至多勾选六个模块')
    module.visible = visible
    module.updateTime = new Date().getTime()
    return undefined
  }

  return {
    layoutModules,
    validModules,
    chunkModules,
    onToggleByModuleName,
  }
})

/** @description: 在setup外部使用 */
export function useLayoutStoreWithOut() {
  return useLayoutStore(store)
}
