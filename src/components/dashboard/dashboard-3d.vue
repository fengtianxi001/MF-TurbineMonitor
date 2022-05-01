<template>
  <div class="custom-three" ref="threeRef"></div>
</template>
<script setup lang="ts">
// import Three from "utils/Three"
// import * as THREE from "three"
// import Equipment from "utils/Equipment"
// import Turbine from "utils/Turbine"
import { onMounted, ref } from "vue";
import Three3D from "@/scripts/three3d";
const threeRef = ref();
onMounted(() => {
  const three3d = new Three3D(threeRef.value, {
    needHelp: true,
    clearColor: "#040b1a"
  });
  three3d.loadTurbineSkeleton(); 
  three3d.loadTurbinePlane()
  three3d.loadTurbineEquipment()
});
</script>
<style>
.custom-three {
  width: 100vw;
  height: 100vh;
}
</style>
