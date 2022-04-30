<template>
  <div class="left">
    <CustomLogo></CustomLogo>
    <CustomEnMonitor></CustomEnMonitor>
    <CustomEnergyMonitor></CustomEnergyMonitor>
    <CustomTotalMonitor></CustomTotalMonitor>
  </div>
  <div class="right">
    <CustomPitchMonitor></CustomPitchMonitor>
    <CustomActiveMonitor></CustomActiveMonitor>
    <CustomErrorMonitor></CustomErrorMonitor>
  </div>
  <CustomThree></CustomThree>
</template>
<script lang="ts" setup>
import CustomEnMonitor from "components/custom/CustomEnMonitor/index.vue"
import CustomEnergyMonitor from "components/custom/CustomEnergyMonitor/index.vue"
import CustomTotalMonitor from "components/custom/CustomTotalMonitor/index.vue"
import CustomLogo from "components/custom/CustomLogo/index.vue"
import CustomPitchMonitor from "components/custom/CustomPitchMonitor/index.vue"
import CustomActiveMonitor from "components/custom/CustomActiveMonitor/index.vue"
import CustomErrorMonitor from "components/custom/CustomErrorMonitor/index.vue"
import CustomThree from "components/custom/CustomThree/index.vue"


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
