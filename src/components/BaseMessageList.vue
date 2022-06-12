<template>
  <ul class="base-message-list">
    <li
      v-for="({ label, value, type }, index) in data"
      class="base-message-list__item"
      :key="index"
      :class="className(type)"
      :style="itemStyle"
    >
      <span>{{ label }}</span>
      <span>{{ value }}</span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed, StyleValue, Ref } from "vue";
import { MessageListType } from "@/types/MessageList";
interface PropsType {
  data: Array<MessageListType>;
}
const props = defineProps<PropsType>();
const itemStyle: Ref<StyleValue> = computed(() => ({
  height: 100 / props.data.length + "%",
}));
const className = (type: string) => ({ danger: type === "danger" });
</script>

<style lang="scss" scoped>
.base-message-list {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  @extend %scrollbar;

  .base-message-list__item {
    min-height: 30px;
    display: flex;
    align-items: center;
    color: #15c5e8;
    font-size: 12px;
    padding: 0 20px;
    @extend %h-between;
    position: relative;
    &.danger {
      color: #fff;
      animation: twinkling 3s ease-in-out infinite;
      &::before {
        content: "";
        width: 8px;
        height: 8px;
        background-color: red;
        position: absolute;
        top: calc(50% - 4px);
        left: 4px;
        border-radius: 50%;
      }
    }
    &:nth-child(odd) {
      background-color: rgba(4, 102, 158, 0.45);
    }
    &:nth-child(even) {
      background-color: rgba(9, 28, 70, 0.27);
    }
  }
}

@keyframes twinkling {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
