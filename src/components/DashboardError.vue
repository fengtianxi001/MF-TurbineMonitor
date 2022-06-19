<template>
  <div class="custom-active-monitor">
    <BasePanel :title="title">
      <BaseMessageList :data="data" />
    </BasePanel>
  </div>
</template>
<script setup lang="ts">
import { PanelTitleType } from '#/Panel'
import { MessageListType } from '#/MessageList'
const title: PanelTitleType = {
  cn: '异常监测',
  sequence: 6,
}
const data: Array<MessageListType> = [
  {
    label: '发动机运行',
    value: '状态可疑',
    type: 'primary',
  },
  {
    label: '齿轮箱运行',
    value: '状态可疑',
    type: 'warning',
  },
  {
    label: '变桨系统运行',
    value: '异常',
    type: 'danger',
  },
  {
    label: '主轴运行',
    value: '异常',
    type: 'danger',
  },
  {
    label: '叶片运行',
    value: '状态可疑',
    type: 'danger',
  },
  {
    label: '偏航角度',
    value: '异常',
    type: 'danger',
  },
  {
    label: '发电机',
    value: '正常',
    type: 'danger',
  },
  {
    label: '发电机',
    value: '正常',
    type: 'danger',
  },
]
</script>
<style lang="scss" scoped>
.custom-active-monitor {
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 90px;
  }
}
</style>
