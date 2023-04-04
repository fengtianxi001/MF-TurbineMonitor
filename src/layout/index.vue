<template>
  <div class="layout">
    <div class="layout-header">{{ appName }}</div>
    <div class="layout-main">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const appName = '大型风力发电机监控平台'
</script>
<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #000;

  .layout-header {
    position: absolute;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 64px;
    padding-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background: url('@/assets/images/header_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 64px;
  }

  .layout-main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #01355059 1px, transparent 1px),
      linear-gradient(0deg, #01355059 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px;
  }
}
</style>
