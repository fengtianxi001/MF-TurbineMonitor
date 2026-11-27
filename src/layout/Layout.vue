<template>
  <div class="layout" :class="{ 'is-ready': !loading.isLoading }">
    <LayoutHeader class="stage stage-header" />
    <LayoutFooter
      v-show="!loading.isLoading"
      class="stage stage-footer"
    />
    <div class="layout-main">
      <div class="main-left stage stage-left">
        <slot name="left" />
      </div>
      <div class="main-right stage stage-right">
        <slot name="right" />
      </div>
      <div class="main-middle" ref="container">
        <LayoutLoading :loading="loading" />
        <slot name="middle" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from '@/layout/LayoutHeader.vue'
import LayoutFooter from '@/layout/LayoutFooter.vue'
import LayoutLoading from '@/layout/LayoutLoading.vue'

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
.layout {
  width: 100%;
  height: 100%;
  font-family: SarasaMonoSC;
  background-color: #000;
  .stage {
    visibility: hidden;
    opacity: 0;
  }
  &.is-ready {
    .stage {
      visibility: visible;
      animation-duration: 0.8s;
      animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
      animation-fill-mode: both;
    }
    .stage-header {
      animation-name: stage-header-in;
    }
    .stage-left {
      animation-name: stage-left-in;
      animation-delay: 0.3s;
    }
    .stage-right {
      animation-name: stage-right-in;
      animation-delay: 0.5s;
    }
    .stage-footer {
      animation-name: stage-footer-in;
      animation-delay: 0.75s;
    }
  }
  .layout-main {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
    background-color: #05326a;
    background-image: url(@/assets/images/grid_bg_01.png);
    background-repeat: repeat;
    .main-left {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 999;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: repeat(3, calc((100% - 40px) / 3));
      grid-gap: 20px;
      width: 420px;
      height: calc(100% - 20px);
    }
    .main-right {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 999;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: repeat(3, calc((100% - 40px) / 3));
      grid-gap: 20px;
      width: 420px;
      height: calc(100% - 20px);
    }
    .main-middle {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        z-index: 99;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: '';
        background-image: radial-gradient(
          circle,
          transparent 35%,
          rgb(0 0 0 / 72%) 100%
        );
      }
    }
  }
}

@keyframes stage-header-in {
  from {
    opacity: 0;
    transform: translateY(-24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stage-left-in {
  from {
    opacity: 0;
    transform: translateX(-36px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes stage-right-in {
  from {
    opacity: 0;
    transform: translateX(36px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes stage-footer-in {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .layout.is-ready .stage {
    opacity: 1;
    animation: none;
  }
}
</style>
