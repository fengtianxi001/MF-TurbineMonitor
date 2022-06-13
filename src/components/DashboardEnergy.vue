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
import { useChart } from "@/hooks/index";
import { verticalBar, defaultChartValue } from "@/charts/verticalBar";
import BasePanel from "@/components/BasePanel.vue";
const title: PanelTitleType = {
  cn: "发电监测",
  sequence: 2,
};
const container = ref<HTMLElement | undefined>();
const { option } = useChart(container);
option.value = verticalBar(defaultChartValue);
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
