import Mock from 'mockjs'
import { API_LIST } from '@/apis'
import {
  EnvListItemType,
  EnergyListItemType,
  StatisticsListItemType,
  YawAngleListItemType,
  ErrorListItemType,
} from '@/apis/types'
import { createTraversedArray } from '@/utils/common'
import { map } from 'lodash-es'

Mock.setup({ timeout: '600-1000' })

function successResponse<T>(data: T) {
  return {
    data,
    errorCode: '',
    success: true,
  }
}

function failResponse<T>(data: T) {
  return {
    data,
    errorCode: 500,
    success: false,
  }
}

//模拟环境数据接口
Mock.mock(new RegExp(API_LIST.ENV_LIST), () => {
  return successResponse<EnvListItemType[]>([
    {
      label: '环境温度',
      value: `${(Math.random() * 50).toFixed(2)}`,
    },
    {
      label: '机舱温度',
      value: `${(Math.random() * 50).toFixed(2)}`,
    },
    {
      label: '齿轮箱温度',
      value: `${(Math.random() * 50).toFixed(2)}`,
    },
  ])
})

//模拟发电数据接口
Mock.mock(new RegExp(API_LIST.ENERGY_LIST), () => {
  return successResponse<EnergyListItemType[]>(
    map(createTraversedArray(12), (item, index) => ({
      label: `#${index}`,
      value: (Math.random() * 100).toFixed(2),
    })),
  )
})

//模拟统计数据接口
Mock.mock(new RegExp(API_LIST.STATISTICS_LIST), () => {
  return successResponse<StatisticsListItemType[]>([
    {
      label: '年发电量',
      value: `${Math.random() * 1000}MWh`,
      type: 'normal',
    },
    {
      label: '月发电量',
      value: `${Math.random() * 1000}MWh`,
      type: 'normal',
    },
    {
      label: '日发电量',
      value: `${Math.random() * 1000}MWh`,
      type: 'normal',
    },
    {
      label: '负荷率',
      value: `${Math.random() * 100}%`,
      type: 'normal',
    },
    {
      label: '平均风速:',
      value: `${Math.random() * 1000}km/s`,
      type: 'normal',
    },
    {
      label: '最大风速',
      value: `${Math.random() * 1000}km/s`,
      type: 'normal',
    },
    {
      label: '总功率',
      value: `${Math.random() * 1000}KVa`,
      type: 'normal',
    },
  ])
})

//模拟偏航角数据接口
Mock.mock(new RegExp(API_LIST.YAW_ANGLE_LIST), () => {
  return successResponse<YawAngleListItemType[]>(
    createTraversedArray(100).map(() => {
      const dirEnum = '东西南北'
      const random = Math.round(Math.random() * 3)
      const value = Math.round(Math.random() * 90)
      const type = value > 60 ? 'danger' : 'primary'
      return {
        label: `向${dirEnum[random]}偏航 (2022/04/27 3:45:32)`,
        value: `${value}°`,
        type,
      }
    }),
  )
})

//模拟异常信息数据接口
Mock.mock(new RegExp(API_LIST.ERROR_LIST), () => {
  return successResponse<ErrorListItemType[]>([
    {
      label: '发动机运行',
      value: '状态可疑',
      type: 'danger',
    },
    {
      label: '齿轮箱运行',
      value: '状态可疑',
      type: 'danger',
    },
    {
      label: '变桨系统运行',
      value: '异常',
      type: 'danger',
    },
    {
      label: '主轴运行',
      value: '异常',
      type: 'danger',
    },
    {
      label: '叶片运行',
      value: '状态可疑',
      type: 'danger',
    },
    {
      label: '偏航角度',
      value: '异常',
      type: 'danger',
    },
    {
      label: '发电机',
      value: '正常',
      type: 'danger',
    },
    {
      label: '发电机',
      value: '正常',
      type: 'danger',
    },
  ])
})

//模拟异常信息数据接口
Mock.mock(new RegExp(API_LIST.ACTIVE_LIST), () => {
  return successResponse<ErrorListItemType[]>([
    {
      label: '发动机运行',
      value: '正常',
      type: 'normal',
    },
    {
      label: '齿轮箱运行',
      value: '正常',
      type: 'normal',
    },
    {
      label: '变桨系统运行',
      value: '正常',
      type: 'normal',
    },
    {
      label: '主轴运行',
      value: '正常',
      type: 'normal',
    },
    {
      label: '叶片运行',
      value: '正常',
      type: 'normal',
    },
    {
      label: '偏航角度',
      value: '正常',
      type: 'normal',
    },
  ])
})
