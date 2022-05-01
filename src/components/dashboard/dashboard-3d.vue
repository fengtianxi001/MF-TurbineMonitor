<template>
  <div class="custom-three" ref="threeRef">
    <div class="loading" v-show="loadPercent !== 100">
      模型正在加载中:{{ Math.floor(loadPercent) }}%
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Three3D from "@/scripts/three3d";
const threeRef = ref();
const loadPercent = ref(0);
onMounted(() => {
  const three3d = new Three3D(threeRef.value, {
    clearColor: "#040b1a",
  });
  three3d
    .loadModel((percent) => {
      loadPercent.value = percent / 3;
    })
    .then((res) => {
      loadPercent.value = 100;
    });
});
</script>
<style>
.custom-three {
  width: 100vw;
  height: 100vh;
}
.loading {
  /* background-color: red; */
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
