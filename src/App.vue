<template>
  <div class="screen__left">
    <BaseLogo />
    <DashboardTemperature />
    <DashboardEnergy />
    <DashboardTotalParams />
  </div>
  <div class="screen__right">
    <DashboardYawAngle />
    <DashboardActive />
    <DashboardError />
  </div>
  <DashboardTurbine />
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.screen__left {
  @include screen_sider(left);
  grid-template-rows: 80px 1fr 1.5fr 1.5fr;
}

.screen__right {
  @include screen_sider(right);
  grid-template-rows: 1fr 1fr 1.5fr;
}
</style>
