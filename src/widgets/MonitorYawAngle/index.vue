<template>
  <WidgetPanel title="偏航角度监测">
    <BaseTable :columns="columns" :data="dataSource"></BaseTable>
  </WidgetPanel>
</template>
<script setup lang="ts">
import BaseTable from '@/components/BaseTable/index.vue'
import { reactive } from 'vue'
import WidgetPanel from '../WidgetPanel.vue'

const columns = [
  {
    title: '偏航方向',
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
    name: '向西48°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向西38°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向西28°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向西18°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向西8°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向东8°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向东18°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向东28°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向东38°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
  {
    name: '向东48°',
    time: '2023/04/02 12:00',
    status: '正常',
  },
])
</script>
