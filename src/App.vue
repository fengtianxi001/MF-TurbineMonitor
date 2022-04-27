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
import CustomEnMonitor from "components/Custom/CustomEnMonitor/index.vue"
import CustomEnergyMonitor from "components/Custom/CustomEnergyMonitor/index.vue"
import CustomTotalMonitor from "components/Custom/CustomTotalMonitor/index.vue"
import CustomLogo from "components/Custom/CustomLogo/index.vue"
import CustomPitchMonitor from "components/Custom/CustomPitchMonitor/index.vue"
import CustomActiveMonitor from "components/Custom/CustomActiveMonitor/index.vue"
import CustomErrorMonitor from "components/Custom/CustomErrorMonitor/index.vue"
import CustomThree from "components/Custom/CustomThree/index.vue"


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
