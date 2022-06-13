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
import { horizontalBar } from "@/charts/horizontalBar";
import { useChart } from "@/hooks/index";
import BasePanel from "@/components/BasePanel.vue";
const title: PanelTitleType = {
  cn: "环境监测",
  sequence: 1,
};
const container = ref<HTMLElement | undefined>();
const { option } = useChart(container);
option.value = horizontalBar([
  {
    label: "环境温度",
    value: 50,
  },
  {
    label: "机舱温度",
    value: 60,
  },
  {
    label: "齿轮箱温度",
    value: 70,
  },
]);
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
