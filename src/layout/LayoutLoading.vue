<template>
  <div
    class="layout-loading animate animate__slideInDown"
    v-if="loading.isLoading"
  >
    <div class="loading-gif"></div>
    <div class="loading-tip">
      模型正在加载中 ({{ loading.loaded }}/{{ loading.total }}) ...
    </div>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  loading: {
    total: number // 全部
    loaded: number // 已加载
    isLoading: boolean // 执行状态
  }
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.layout-loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #000;
  .loading-gif {
    width: 1000px;
    height: 250px;
    background-image: url('@/assets/images/loading.gif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .loading-tip {
    // font-family: DOUYUFont;

    // font-style: italic;
    // font-weight: bolder;
    color: #5fb9c7;
  }
}
</style>
