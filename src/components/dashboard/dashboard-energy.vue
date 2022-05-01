<template>
  <div class="custom-en-monitor">
    <Panel :titleOptions="title">
      <div class="chart" ref="container"></div>
    </Panel>
  </div>
</template>
<script setup lang="ts">
import Panel from "components/base/base-panel.vue";
import { panelTitleType } from "components/base/types";
import { createNormalBarOptions } from "utils/createNormalBarOptions";
import { reactive, ref } from "vue";
import { useChart } from "hooks/useChart";
import { useSocket } from "hooks/useSocket";
const title: panelTitleType = {
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
