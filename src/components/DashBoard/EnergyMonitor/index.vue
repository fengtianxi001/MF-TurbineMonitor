<template>
  <BasePanel :title="MODULES_NAME_ENUM.ENERGY">
    <div class="chart" ref="container"></div>
  </BasePanel>
</template>
<script setup lang="ts">
import { getEnergyData } from '@/apis'
import { useChart } from '@/hooks/index'
import { createChartOptions } from './createChartOptions'
import { MODULES_NAME_ENUM } from '@/configs/dashboard'

const container = ref<HTMLElement | undefined>()
const { option } = useChart(container)
const fetchData = async () => {
  const response = await getEnergyData()
  option.value = createChartOptions(response)
}
onMounted(fetchData)
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
