<template>
  <BasePanel :title="MODULES_NAME_ENUM.ACTIVE">
    <BaseList :list="data" />
  </BasePanel>
</template>
<script setup lang="ts">
import { getActive } from '@/apis'
import { MODULES_NAME_ENUM } from '@/configs/dashboard'

const data = ref<any>({})
const fetchData = async () => {
  const response = await getActive()
  data.value = response
}
onMounted(fetchData)
</script>
<style lang="scss" scoped>
.the-active-monitor {
  width: 100%;
  height: 100%;
}
</style>
