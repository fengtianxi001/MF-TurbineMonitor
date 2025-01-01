<template>
  <div class="layout">
    <LayoutHeader />
    <LayoutFooter v-show="!loading.isLoading" />
    <div class="layout-main">
      <div class="main-left">
        <WidgetPanel04 title="参数监测" />
        <WidgetPanel02 title="历史功率" />
        <WidgetPanel03 title="日发电量监测 " />
      </div>
      <div class="main-right">
        <WidgetPanel07
          v-show="current"
          :title="current + '详情'"
          :name="current"
        />
        <WidgetPanel06 v-show="!current" title="运行监测" />
        <WidgetPanel01 title="故障对比" />
        <WidgetPanel05 title="偏航角度监测" />
      </div>
      <div class="main-middle" ref="container">
        <LayoutLoading :loading="loading" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutLoading from '@/components/LayoutLoading.vue'

import WidgetPanel01 from '@/components/WidgetPanel01.vue'
import WidgetPanel02 from '@/components/WidgetPanel02.vue'
import WidgetPanel03 from '@/components/WidgetPanel03.vue'
import WidgetPanel04 from '@/components/WidgetPanel04.vue'
import WidgetPanel05 from '@/components/WidgetPanel05.vue'
import WidgetPanel06 from '@/components/WidgetPanel06.vue'
import WidgetPanel07 from '@/components/WidgetPanel07.vue'
import { useTurbine } from '@/hooks/useTurbine'

const {
  container,
  loading,
  current,
  eqDecomposeAnimation,
  eqComposeAnimation,
  startWarning,
  stopWarning,
} = useTurbine()

provide('events', {
  eqDecomposeAnimation,
  eqComposeAnimation,
  startWarning,
  stopWarning,
})
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  background-color: #000;
  .layout-main {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
    background-color: #05326a;
    background-image: url(@/assets/grid_bg_01.png);
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
        background-image: radial-gradient(circle, transparent 30%, #000 70%);
      }
    }
  }
}
</style>
