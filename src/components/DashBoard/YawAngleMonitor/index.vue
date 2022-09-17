<template>
  <BasePanel :title="MODULES_NAME_ENUM.YAWANGLE">
    <div class="demo">
      <BaseList :list="data" />
    </div>
  </BasePanel>
</template>
<script setup lang="ts">
import { getYawAngle } from '@/apis'
import { MODULES_NAME_ENUM } from '@/configs/dashboard'

const data = ref<any>([])
const fetchData = async () => {
  const response = await getYawAngle()
  data.value = response
}
onMounted(fetchData)
</script>
<style>
.demo {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
</style>
