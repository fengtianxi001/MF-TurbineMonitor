<template>
  <WidgetPanel title="发电监测">
    <div ref="continer" class="widget-statistics-chart"></div>
  </WidgetPanel>
</template>
<script setup lang="ts">
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import { onMounted, ref } from 'vue'
import WidgetPanel from '../WidgetPanel.vue'

highcharts3d(highcharts)
const continer = ref()
onMounted(() => {
  const options: any = {
    credits: { enabled: false },
    chart: {
      renderTo: continer.value,
      type: 'column',
      backgroundColor: 'rgba(0,0,0,0)',
      options3d: {
        enabled: true,
        alpha: 5,
        beta: 20,
        depth: 0,
        viewDistance: 25,
      },
    },
    xAxis: {
      categories: [
        '#1风机',
        '#2风机',
        '#3风机',
        '#4风机',
        '#5风机',
        '#6风机',
        '#7风机',
        '#8风机',
        '#9风机',
      ],
      tickWidth: 0,
      gridLineWidth: 0,
      left: '10px',
      labels: {
        style: {
          color: '#8fe3fd',
          fontSize: '10px',
        },
      },
    },
    yAxis: {
      visible: false,
      left: '10px',
    },
    tooltip: {
      pointFormat: '本月发电量: {point.y}MWh',
    },
    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        depth: 20,
        borderColor: '',
        dataLabels: {
          borderWidth: 0,
          enabled: true,
          color: '#8fe3fd',
          style: {
            fontSize: '8px',
          },
          // @ts-ignore
          formatter() {
            // @ts-ignore
            return `${this.y}`
          },
        },
      },
    },
    series: [
      {
        data: [22, 42, 99, 97, 98, 40, 97, 98, 40],
        colorByPoint: true,
      },
    ],
  }
  const chart = new highcharts.Chart(options)
})
</script>
<style lang="scss" scoped>
.widget-statistics-chart {
  width: 100%;
  height: 100%;

  // background-color: red;
}
</style>
