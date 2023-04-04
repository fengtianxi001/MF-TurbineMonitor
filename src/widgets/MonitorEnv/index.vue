<template>
  <WidgetPanel title="环境监测">
    <div ref="container" class="widget-safty"></div>
  </WidgetPanel>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
import WidgetPanel from '../WidgetPanel.vue'

highcharts3d(highcharts)

const container = ref()
onMounted(() => {
  const options: any = {
    credits: { enabled: false },
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)',
      options3d: {
        enabled: true,
        alpha: 50,
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      itemStyle: {
        color: '#fff',
        fontSize: '14px',
        lineHeight: '30px',
      },
    },
    title: false,
    plotOptions: {
      pie: {
        innerSize: 50,
        depth: 40,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: '时长',
        data: [
          ['停机维护', 24],
          ['故障维护', 16],
          ['正常运行', 87],
          ['保养维护', 3],
        ],
      },
    ],
  }
  highcharts.chart(container.value, options)
})
</script>
<style lang="scss" scoped>
.widget-safty {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
