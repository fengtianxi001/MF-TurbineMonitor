<template>
  <div class="custom-three" ref="threeRef"></div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useTurbine } from "@/hooks/useTurbine";
const threeRef = ref();
const loadPercent = ref(0);
const { loading, percent } = useTurbine(threeRef);
</script>
<style>
.custom-three {
  width: 100vw;
  height: 100vh;
}
.loading {
  position: absolute;
  z-index: 9999;
  font-size: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
}
</style>
