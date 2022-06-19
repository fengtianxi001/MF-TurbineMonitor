<template>
  <div class="base-panel">
    <div class="base-panel__title">
      <div class="base-panel__sequence">{{ sequence }}</div>
      <ul class="base-panel__name">
        <li class="base-panel__name__en">{{ en }}</li>
        <li class="base-panel__name__cn">{{ title.cn }}</li>
      </ul>
    </div>
    <div class="base-panel__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { createSequence, createEnTitleByCn } from '@/utils/index'
import { PanelTitleType } from '#/Panel'
interface propsType {
  title: PanelTitleType
}
const { title } = defineProps<propsType>()
const sequence = computed(() => createSequence(Number(title?.sequence) || 1))
const en = computed(() => createEnTitleByCn(title.cn))
</script>
<style lang="scss" scoped>
.base-panel {
  width: 100%;
  height: 100%;
  .base-panel__title {
    @extend %v-center;
    width: 100%;
    user-select: none;
    .base-panel__sequence {
      font-size: 28px;
      font-weight: bolder;
      padding: 0 16px;
      border-left: 4px solid $mainColor;
      color: $fontColor;
    }
    .base-panel__name {
      &__en {
        color: $fontColor;
        font-size: 0.8rem;
      }
      &__cn {
        color: $mainColor;
        font-size: 1.1rem;
        font-weight: bold;
        color: $fontColor;
      }
    }
  }
  .base-panel__content {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 10px;
    @extend %scrollbar;
    overflow: hidden;
  }
}
</style>
