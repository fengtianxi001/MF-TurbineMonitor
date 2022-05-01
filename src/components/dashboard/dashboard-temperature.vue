<template>
  <div class="custom-en-monitor">
    <Panel :titleOptions="title">
      <div class="chart" ref="container"></div>
    </Panel>
  </div>
</template>
<script setup lang="ts">
import Panel from "components/base/base-panel.vue";
import { panelTitleType } from "components/Base/types";
import { createDynamicBarOptions } from "utils/createDynamicBarOptions";
import { ref } from "vue";
import { useChart } from "hooks/useChart";
import { useSocket } from "hooks/useSocket";
import { EQUIPMENTS_STATUS_MAP } from "@/constants/equipments";
const title: panelTitleType = {
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
