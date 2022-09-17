import { EnergyListItemType } from '../../../apis/types'
export function createChartOptions(config: EnergyListItemType[]): echarts.EChartsCoreOption {
  const label = Object.keys(config)
  const data1: Array<number> = []
  const data2: Array<number> = []
  Object.values(config).forEach((cur) => {
    data1.push(cur[0])
    data2.push(cur[1])
  })
  return {
    tooltip: {
      trigger: 'axis',
    },
    color: ['#15c5e8', '#c8a818'],
    grid: {
      left: 10,
      right: 14,
      bottom: 10,
      top: 30,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: label,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        lineStyle: {
          color: ['#028ab545'],
        },
      },
    },
    series: [
      {
        name: '功率',
        type: 'line',
        data: data1,
        lineStyle: {
          color: '#15c5e8',
        },
      },
      {
        name: '风速',
        type: 'line',
        data: data2,
        lineStyle: {
          color: '#c8a818',
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  }
}
