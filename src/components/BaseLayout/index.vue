<template>
  <div class="base-layout">
    <div class="layout-left"></div>
    <div class="layout-right"></div>
    <div class="layout-fullscreen"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.base-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .layout-left {
    @include screen_sider(left);
    grid-template-rows: 80px 1fr 1.5fr 1.5fr;
  }

  .layout-right {
    @include screen_sider(right);
    grid-template-rows: 1fr 1fr 1.5fr;
  }
}
</style>
