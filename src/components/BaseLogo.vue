<template>
  <ul class="base-logo">
    <li class="base-logo__en">{{ state.en }}</li>
    <li class="base-logo__cn">{{ state.cn }}</li>
  </ul>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  en: "LARGE-SCALE WIND TURBINE",
  cn: "大型风力发电机",
});
</script>
<style lang="scss" scoped>
.base-logo {
  color: #fff;
  font-weight: bolder;
  .base-logo__en {
    font-size: 0.8rem;
  }
  .base-logo__cn {
    font-size: 1.7rem;
  }
}
</style>
