<template>
  <div class="base-checkbox" :class="className" @click="emit('change')">
    <div class="checkbox-trigger">
      <div class="checkbox-trigger-inner"></div>
    </div>
    <div class="checkbox-label">{{ label }}</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface PropsType {
  value: boolean
  label: string
}
const props = defineProps<PropsType>()
const className = computed(() => (props.value ? 'active' : ''))
const emit = defineEmits(['change'])
</script>
<style lang="scss" scoped>
.base-checkbox {
  display: flex;
  align-items: center;
  height: 30px;
  color: #fff;
  user-select: none;

  .checkbox-trigger {
    box-sizing: border-box;
    width: 15px;
    height: 15px;
    padding: 2px;
    cursor: pointer;
    border: 1px solid #0bfbff;

    .checkbox-trigger-inner {
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
  }

  .checkbox-label {
    margin-left: 5px;
  }

  &.active {
    .checkbox-trigger {
      .checkbox-trigger-inner {
        background-color: #0bfbff;
      }
    }
  }
}
</style>
