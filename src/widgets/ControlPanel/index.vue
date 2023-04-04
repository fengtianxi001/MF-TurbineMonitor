<template>
  <BaseCollaspse title="面板控制">
    <BaseCheckbox
      v-for="{ key, visible, label } in layoutModules"
      :key="key"
      :value="visible"
      :label="label"
      @change="onToggleByModuleName(key)"
    />
  </BaseCollaspse>
</template>
<script setup lang="ts">
import BaseCheckbox from '@/components/BaseCheckbox/index.vue'
import { useLayoutStore } from '@/stores/modules/layout'
import { storeToRefs } from 'pinia'
import BaseCollaspse from '@/components/BaseCollaspse/index.vue'

const store = useLayoutStore()
const { layoutModules } = storeToRefs(store)
const { onToggleByModuleName } = store
</script>
