<template>
  <BasePanel :title="MODULES_NAME_ENUM.ENV">
    <div class="chart" ref="container"></div>
  </BasePanel>
</template>
<script setup lang="ts">
import { useChart } from '@/hooks/index'
import { createChartOptions } from './createChartOptions'
import { getEnvData } from '@/apis/index'
import { MODULES_NAME_ENUM } from '@/configs/dashboard'

const container = ref<HTMLElement | undefined>()
const { option } = useChart(container)
const fetchData = async () => {
  const response = await getEnvData()
  option.value = createChartOptions(response)
}
onMounted(fetchData)
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 90px;
}
</style>
