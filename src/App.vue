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
      <div ref="container" class="turbine-scene"></div>
      <div
        v-show="hover.visible"
        class="part-tooltip"
        :style="{ left: `${hover.x}px`, top: `${hover.y}px` }"
      >
        <span class="part-tooltip-dot"></span>
        {{ hover.name }}
      </div>
    </template>
  </Layout>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import {
  WidgetPanel01,
  WidgetPanel02,
  WidgetPanel03,
  WidgetPanel04,
  WidgetPanel05,
  WidgetPanel06,
  WidgetPanel07,
} from '@/components'
import { Layout } from '@/layout'
import { useTurbine } from '@/hooks'

const {
  container,
  loading,
  current,
  hover,
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
.turbine-scene {
  width: 100%;
  height: 100%;
}
.part-tooltip {
  position: absolute;
  z-index: 1000;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 7px 12px;
  font-size: 13px;
  color: #eaf8ff;
  pointer-events: none;
  background: rgb(4 22 49 / 88%);
  border: 1px solid rgb(116 247 253 / 65%);
  border-radius: 4px;
  box-shadow: 0 0 18px rgb(56 202 255 / 24%);
  transform: translateZ(0);
  backdrop-filter: blur(6px);
  .part-tooltip-dot {
    width: 6px;
    height: 6px;
    background: #74f7fd;
    border-radius: 50%;
    box-shadow: 0 0 8px #74f7fd;
  }
}
</style>
