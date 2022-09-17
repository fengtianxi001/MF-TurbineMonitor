<template>
  <ul class="base-list">
    <ListItem v-for="(item, index) in list" :data="item" :key="index" />
  </ul>
</template>
<script setup lang="ts">
import { ListType } from './types'
import ListItem from './ListItem.vue'
const props = defineProps<{ list: ListType }>()
</script>

<style lang="scss" scoped>
.base-list {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  @extend %scrollbar;
}
</style>
