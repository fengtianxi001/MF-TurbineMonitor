<template>
  <div class="base-panel">
    <div class="base-panel__title">
      <div class="base-panel__sequence">{{ state.sequence }}</div>
      <ul class="base-panel__name">
        <li class="base-panel__name__en">{{ state.en }}</li>
        <li class="base-panel__name__cn">{{ state.cn }}</li>
      </ul>
    </div>
    <div class="base-panel__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PanelTitleType } from './types'
import { convertSequence, convertCnToEn } from '@/utils/common'

const { title } = defineProps<{ title: PanelTitleType }>()
const state = computed(() => ({
  sequence: convertSequence(title.sequence),
  en: convertCnToEn(title.cn, 'startCase'),
  cn: title.cn,
}))
</script>
<style lang="scss" scoped src="./styles.scss"></style>
