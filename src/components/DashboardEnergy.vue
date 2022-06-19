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
import { useChart } from '@/hooks/index'
import { verticalBar, defaultChartValue } from '@/charts/verticalBar'
const title: PanelTitleType = {
  cn: '发电监测',
  sequence: 2,
}
const container = ref<HTMLElement | undefined>()
const { option } = useChart(container)
option.value = verticalBar(defaultChartValue)
</script>
<style lang="scss" scoped>
.custom-en-monitor {
  width: 60%;
  height: 100%;
  .chart {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>
