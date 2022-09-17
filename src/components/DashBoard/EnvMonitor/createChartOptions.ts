import { EnergyListItemType } from '../../../apis/types'
export function createChartOptions(config: EnergyListItemType[]): echarts.EChartsCoreOption {
  const label = config.map(({ label }) => label)
  const data = config.map(({ value }) => value)
  return {
    color: ['#15c4e7'],
    grid: {
      left: 70,
      right: 10,
      bottom: 0,
      top: 0,
    },
    xAxis: {
      type: 'value',
      show: false,
      max: 100,
    },
    yAxis: {
      type: 'category',
      data: label,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff',
        },
      },
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2,
    },
    series: [
      {
        data,
        type: 'bar',
        showBackground: true,
        realtimeSort: true,
        barCategoryGap: 11,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
        },
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  }
}
