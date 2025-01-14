<template>
  <LayoutPanel>
    <div class="container" ref="container"></div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import { LayoutPanel } from '@/layout'
import { nextTick, onMounted } from 'vue'
import { useEcharts } from '@/hooks'

const { container, echarts, setOption } = useEcharts()

const generateOptions = () => ({
  legend: {
    show: true,
    right: 0,
    textStyle: {
      color: '#fff',
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#000',
    borderColor: '#333',
    textStyle: {
      color: '#fff',
    },
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '0%',
    top: '10%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
      margin: 10,
    },
    data: [...Array(30).keys()],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#fff',
    },
    splitLine: {
      lineStyle: {
        color: '#c8c8c830',
        type: 'dashed',
      },
    },
  },
  series: [
    {
      smooth: true,
      showSymbol: false,
      data: Array.from({ length: 30 }).map(
        () => Math.floor(Math.random() * 90) + 10
      ),
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 254, 169, 1)' },
          { offset: 1, color: 'rgba(65, 138, 255, 0.2)' },
        ]),
      },
    },
  ],
})

onMounted(() => {
  nextTick(() => {
    const options = generateOptions()
    setOption(options)
  })
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
