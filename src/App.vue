<template>
  <div class="left">
    <base-logo />
    <dashboard-temperature />
    <dashboard-energy />
    <dashboard-total-params />
  </div>
  <div class="right">
    <dashboard-yaw-angle />
    <dashboard-active />
    <dashboard-error />
  </div>
  <dashboard-turbine />
</template>
<script lang="ts" setup>
import BaseLogo from "@/components/BaseLogo.vue";
import DashboardTemperature from "@/components/DashboardTemperature.vue";
import DashboardEnergy from "@/components/DashboardEnergy.vue";
import DashboardTotalParams from "@/components/DashboardTotalParams.vue";

import DashboardYawAngle from "@/components/DashboardYawAngle.vue";
import DashboardActive from "@/components/DashboardActive.vue";
import DashboardError from "@/components/DashboardError.vue";
import DashboardTurbine from "@/components/DashboardTurbine.vue";
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
  z-index: 9999;
}

.right {
  @extend %side;
  right: 0;
  grid-gap: 40px;
  grid-template-rows: 1fr 1fr 1.5fr;
  justify-items: end;
  z-index: 9999;
  & > div {
    flex-shrink: 0;
    overflow: hidden;
  }
}
</style>
