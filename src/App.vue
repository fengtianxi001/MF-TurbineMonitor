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
import { useTurbine } from '@/hooks'
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
