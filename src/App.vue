<template>
  <Layout :loading="loading">
    <template #left>
      <WidgetPanel04 title="参数监测" />
      <WidgetPanel02 title="历史功率" />
      <WidgetPanel03 title="日发电量监测 " />
    </template>
    <template #right>
      <WidgetPanel07
        v-show="current"
        :title="current + '详情'"
        :name="current"
      />
      <WidgetPanel06 v-show="!current" title="运行监测" />
      <WidgetPanel01 title="故障对比" />
      <WidgetPanel05 title="偏航角度监测" />
    </template>
    <template #middle>
      <div style="width: 100%; height: 100%" ref="container"></div>
    </template>
  </Layout>
</template>
<script setup lang="ts">
import {
  WidgetPanel01,
  WidgetPanel02,
  WidgetPanel03,
  WidgetPanel04,
  WidgetPanel05,
  WidgetPanel06,
  WidgetPanel07,
} from '@/components'
import { provide } from 'vue'
import { Layout } from '@/layout'
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
        background-image: radial-gradient(circle, transparent 30%, #000 70%);
      }
    }
  }
}
</style>
