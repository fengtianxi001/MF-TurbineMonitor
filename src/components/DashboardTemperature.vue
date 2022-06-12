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
import { createDynamicBarOptions } from "utils/createDynamicBarOptions";
import { useChart, useSocket } from "@/hooks/index";
import { EQUIPMENTS_STATUS_MAP } from "@/constants/equipments";
import BasePanel from "@/components/BasePanel.vue";
const title: PanelTitleType = {
  cn: "环境监测",
  sequence: 1,
};
const container = ref<null | HTMLElement>(null);
const { refresh } = useChart(container, createDynamicBarOptions());
useSocket({
  params: {
    type: "temperatures",
  },
  formatter(response) {
    return Object.keys(response.data).map((key) => ({
      //@ts-ignore
      label: EQUIPMENTS_STATUS_MAP[key]["label"],
      value: response.data[key],
    }));
  },
  onUpdate(formatterResult) {
    refresh(createDynamicBarOptions(formatterResult));
  },
});
</script>
<style lang="scss" scoped>
.custom-en-monitor {
  width: 60%;
  height: 100%;
  .chart {
    width: 100%;
    height: 90px;
  }
}
</style>
