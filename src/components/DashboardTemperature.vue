<template>
  <div class="custom-en-monitor">
    <BasePanel :title="title">
      <div class="chart" ref="container"></div>
    </BasePanel>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { PanelTitleType } from '#/Panel'
import { horizontalBar, defaultChartValue } from '@/charts/horizontalBar'
import { useChart } from '@/hooks/index'
const title: PanelTitleType = {
  cn: '环境监测',
  sequence: 1,
}
const container = ref<HTMLElement | undefined>()
const { option } = useChart(container)
option.value = horizontalBar(defaultChartValue)
</script>
<style lang="scss" scoped>
.custom-en-monitor {
  width: 60%;
  height: 100%;
  .chart {
    width: 100%;
    height: 90px;
  }
}
</style>
