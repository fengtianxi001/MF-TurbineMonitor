<template>
  <Layout>
    <BaseTurbine>
      <template #left>
        <component
          :is="Witgets[item]"
          v-for="item in chunkModules.left"
          :key="item"
        />
      </template>
      <template #right>
        <component
          :is="Witgets[item]"
          v-for="item in chunkModules.right"
          :key="item"
        />
      </template>
      <template #control>
        <Witgets.ControlPanel></Witgets.ControlPanel>
        <Witgets.ControlTurbine></Witgets.ControlTurbine>
      </template>
    </BaseTurbine>
  </Layout>
</template>
<script setup lang="ts">
import Layout from '@/layout/index.vue'
import { useLayoutStore } from '@/stores/modules/layout'
import { storeToRefs } from 'pinia'
import BaseTurbine from '@/components/BaseTurbine/index.vue'
import Witgets from './widgets'

const { chunkModules } = storeToRefs(useLayoutStore())
</script>
