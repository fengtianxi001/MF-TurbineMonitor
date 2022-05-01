<template>
  <div class="left">
    <Logo />
    <DashboardTemperature />
    <DashboardEnergy />
    <DashboardTotalParams />
  </div>
  <div class="right">
    <DashboardYawAngle />
    <DashboardActive />
    <DashboardError />
  </div>
  <Dashboard3D></Dashboard3D>
</template>
<script lang="ts" setup>
import Logo from "components/base/base-logo.vue"
import DashboardTemperature from "components/dashboard/dashboard-temperature.vue"
import DashboardEnergy from "components/dashboard/dashboard-energy.vue"
import DashboardTotalParams from "components/dashboard/dashboard-totalParams.vue"

import DashboardYawAngle from "components/dashboard/dashboard-yawAngle.vue"
import DashboardActive from "components/dashboard/dashboard-active.vue"
import DashboardError from "components/dashboard/dashboard-error.vue"
import Dashboard3D from "components/dashboard/dashboard-3d.vue"


</script>
<style lang="scss" scoped>
%side {
  width: 20%;
  min-width: 200px;
  height: 100vh;
  position: absolute;
  top: 0;
  padding: 20px;
  display: grid;
  grid-gap: 10px;
}

.left {
  @extend %side;
  left: 0;
  grid-template-rows: 80px 1fr 1.5fr 1.5fr;
}

.right {
  @extend %side;
  right: 0;
  grid-gap: 40px;
  grid-template-rows: 1fr 1fr 1.5fr;
  justify-items: end;

  &>div {
    flex-shrink: 0;
    overflow: hidden;
  }
}
</style>
