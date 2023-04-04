<template>
  <WidgetPanel title="异常监测">
    <BaseTable :columns="columns" :data="dataSource"></BaseTable>
  </WidgetPanel>
</template>
<script setup lang="ts">
import BaseTable from '@/components/BaseTable/index.vue'
import { reactive } from 'vue'
import WidgetPanel from '../WidgetPanel.vue'

const columns = [
  {
    title: '监测项目',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '监测时间',
    dataIndex: 'time',
    width: '55%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: '20%',
  },
]
const dataSource = reactive([
  {
    name: '发动机',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '发动机',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '齿轮箱',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '变桨系统',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '主轴',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '传送带',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '叶片',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
  {
    name: '发电机',
    time: '2023/04/03 12:00',
    status: '可疑',
  },
])
</script>
