import {
  EnvListItemType,
  EnergyListItemType,
  StatisticsListItemType,
  YawAngleListItemType,
  ActiveListItemType,
  ErrorListItemType,
} from './types'
import requre from '@/utils/request'

export const API_LIST = {
  ENV_LIST: '/env',
  ENERGY_LIST: '/energy',
  STATISTICS_LIST: '/statistics',
  YAW_ANGLE_LIST: '/yawAngle',
  ACTIVE_LIST: '/active',
  ERROR_LIST: '/error',
}

/**
 * @description: 获取环境数据
 * @return {*}
 */
export function getEnvData() {
  return requre.get<EnvListItemType[]>(API_LIST.ENV_LIST)
}

/**
 * @description: 获取发电数据
 * @return {*}
 */
export function getEnergyData() {
  return requre.get<EnergyListItemType[]>(API_LIST.ENERGY_LIST)
}

/**
 * @description: 获取统计参数数据
 * @return {*}
 */
export function getStatistics() {
  return requre.get<StatisticsListItemType[]>(API_LIST.STATISTICS_LIST)
}

/**
 * @description: 获取偏航角数据
 * @return {*}
 */
export function getYawAngle() {
  return requre.get<YawAngleListItemType>(API_LIST.YAW_ANGLE_LIST)
}

/**
 * @description: 获取偏航角数据
 * @return {*}
 */
export function getActive() {
  return requre.get<ActiveListItemType>(API_LIST.ACTIVE_LIST)
}

/**
 * @description: 获取异常监测数据
 * @return {*}
 */
export function getError() {
  return requre.get<ErrorListItemType>(API_LIST.ERROR_LIST)
}
