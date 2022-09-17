<template>
  <div class="turbine-monitor" ref="threeRef"></div>
</template>
<script setup lang="ts">
import { useTurbine } from '@/hooks/useTurbine'
const threeRef = ref()
useTurbine(threeRef)
</script>
<style>
.turbine-monitor {
  width: 100vw;
  height: 100vh;
}
</style>
