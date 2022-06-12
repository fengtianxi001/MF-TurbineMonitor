<template>
  <div class="custom-en-monitor">
    <base-panel :title="title">
      <div class="chart" ref="container"></div>
    </base-panel>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { PanelTitleType } from "@/types/index";
import { useChart, useSocket } from "@/hooks/index";
import { createNormalBarOptions } from "utils/createNormalBarOptions";
import BasePanel from "@/components/BasePanel.vue";
const title: PanelTitleType = {
  cn: "发电监测",
  sequence: 2,
};
const container = ref<null | HTMLElement>(null);
const { refresh } = useChart(container, createNormalBarOptions());
useSocket({
  params: {
    type: "monthlyPower",
  },
  formatter(response) {
    return response.data;
  },
  onUpdate(formatterResult) {
    refresh(createNormalBarOptions(formatterResult));
  },
});
</script>
<style lang="scss" scoped>
.custom-en-monitor {
  width: 60%;
  height: 100%;
  .chart {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>
