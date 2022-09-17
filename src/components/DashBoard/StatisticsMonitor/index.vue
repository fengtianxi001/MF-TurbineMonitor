<template>
  <BasePanel :title="MODULES_NAME_ENUM.STATISTICS" class="statistics-monitor">
    <BaseList :list="data" />
  </BasePanel>
</template>
<script setup lang="ts">
import { getStatistics } from '@/apis'
import { MODULES_NAME_ENUM } from '@/configs/dashboard'

const data = ref<any>([])

const fetchData = async () => {
  const resposne = await getStatistics()
  data.value = resposne
}
onMounted(fetchData)
</script>
