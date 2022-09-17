<template>
  <BasePanel :title="MODULES_NAME_ENUM.ERROR">
    <BaseList :list="data" />
  </BasePanel>
</template>
<script setup lang="ts">
import { getError } from '@/apis'
import { MODULES_NAME_ENUM } from '@/configs/dashboard'

const data = ref<any>({})
const fetchData = async () => {
  const response = await getError()
  data.value = response
}
onMounted(fetchData)
</script>
