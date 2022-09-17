<template>
  <li class="list-item">
    <span class="type" :type="data.type"></span>
    <span class="label">{{ data.label }}</span>
    <span class="value">{{ data.value }}</span>
  </li>
</template>
<script setup lang="ts">
import { ListItemType } from './types'
defineProps<{ data: ListItemType }>()
</script>
<style lang="scss" scoped>
.list-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0px 10px 0px 30px;
  font-size: 12px;
  color: #15c5e8;
  &:nth-child(odd) {
    background-color: rgba(4, 102, 158, 0.45);
  }
  &:nth-child(even) {
    background-color: rgba(9, 28, 70, 0.27);
  }
  .type {
    position: absolute;
    top: 11px;
    left: 11px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    &[type='danger'] {
      background-color: red;
    }
    &[type='normal'] {
      background-color: #3a6a45;
    }
    &[type='warnning'] {
      background-color: #fcef8f;
    }
  }
}
</style>
