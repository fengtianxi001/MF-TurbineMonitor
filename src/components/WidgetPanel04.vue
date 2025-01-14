<template>
  <LayoutPanel>
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in source"
        :key="index"
        :class="{ error: item.status }"
      >
        <div class="icon" :class="item.icon"></div>
        <div class="label">{{ item.label }}</div>
        <div class="key">
          <span class="value">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <i class="alert fa-solid fa-triangle-exclamation"></i>
      </div>
    </div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import { LayoutPanel } from '@/layout'
import { Random } from 'mockjs'

const source = [
  {
    icon: 'fa-solid fa-temperature-three-quarters',
    label: '温度',
    value: '23',
    unit: '度',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-umbrella',
    label: '湿度',
    value: '70',
    unit: '%',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-fan',
    label: '气压',
    value: '23',
    unit: 'kPa',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-wind',
    label: '最大风速',
    value: '11',
    unit: 'm/s',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-temperature-arrow-up',
    label: '环境温度',
    value: '15',
    unit: '度',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-weight-scale',
    label: '负荷率',
    value: '23',
    unit: '%',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-plug',
    label: '总功率',
    value: '12',
    unit: 'kVa',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-plug',
    label: '有功功率',
    value: '12',
    unit: 'kVa',
    status: Random.pick([true, false]),
  },
  {
    icon: 'fa-solid fa-plug',
    label: '无功功率',
    value: '12',
    unit: 'kVa',
    status: Random.pick([true, false]),
  },
]
</script>

<style lang="scss" scoped>
$emphasize-color: #74f7fd;
.container {
  box-sizing: border-box;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  height: 100%;
  padding-top: 10px;

  $icon-size: 34px;
  .item {
    position: relative;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: $icon-size auto;
    grid-column-gap: 10px;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    overflow: hidden;
    background-color: rgba(93, 101, 122, 20%);
    &.error {
      .icon {
        color: $emphasize-color;
        border: 1px solid $emphasize-color;
        border-radius: 50%;
      }
      .alert {
        // display: block;
        color: #74fab022;
      }
      .label,
      .key {
        color: $emphasize-color;
      }
    }
    .icon {
      display: flex;
      grid-row: 1 /3;
      align-items: center;
      justify-content: center;
      width: $icon-size;
      height: $icon-size;
      border: 1px solid #fff;
      border-radius: 50%;
    }
    .label {
      margin-top: 10px;
      font-size: 13px;
      color: #999;
      text-align: right;
    }
    .key {
      margin-bottom: 6px;
      font-size: 14px;
      color: #fff;
      text-align: right;
      .value {
        margin-right: 6px;
        font-size: 18px;
        font-weight: bold;
      }
      .unit {
        font-size: 13px;
      }
    }
    .alert {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 70px;
      color: #ffffff09;
    }
  }
}
</style>
