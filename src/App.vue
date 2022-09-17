<template>
  <div class="base-layout">
    <div class="layout-left">
      <BaseBrand />
      <DashBoard.EnvMonitor />
      <DashBoard.EnergyMonitor />
      <DashBoard.StatisticsMonitor />
    </div>
    <div class="layout-right">
      <DashBoard.YawAngleMonitor />
      <DashBoard.ActiveMonitor />
      <DashBoard.ErrorMonitor />
    </div>
    <div class="layout-fullscreen">
      <DashBoard.TurbineMonitor />
    </div>
  </div>
</template>
<script setup lang="ts">
import DashBoard from '@/components/DashBoard'
</script>
<style lang="scss" scoped>
.base-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .layout-left {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-row-gap: 20px;
    z-index: 9999;
    width: 20vw;
    height: 100vh;
    padding: 20px;
    grid-template-rows: 80px 1fr 1.5fr 1.5fr;
  }

  .layout-right {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
    display: grid;
    grid-row-gap: 20px;
    width: 20vw;
    height: 100vh;
    padding: 20px;
    grid-template-rows: 1fr 1fr 1.5fr;
  }
}
</style>
