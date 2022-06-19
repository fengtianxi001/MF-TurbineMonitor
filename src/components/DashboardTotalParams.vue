<template>
  <div class="custom-total-monitor">
    <base-panel :title="title">
      <div class="total-panel">
        <message-list :data="messageDate" />
        <div class="chart" ref="container"></div>
      </div>
    </base-panel>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useChart } from "@/hooks/useChart";
import { PanelTitleType } from "@/types/index";
import { brokenLine, defaultChartValue } from "@/charts/brokenLine";
import { MessageListType } from "@/types/index";
import BasePanel from "@/components/BasePanel.vue";
import MessageList from "@/components/BaseMessageList.vue";
const title: PanelTitleType = {
  cn: "参数统计",
  sequence: 1,
};
const messageDate: Array<MessageListType> = [
  {
    label: "年发电量",
    value: `1000MWh`,
    type: "primary",
  },
  {
    label: "月发电量",
    value: `100MWh`,
    type: "primary",
  },
  {
    label: "日发电量",
    value: `10MWh`,
    type: "primary",
  },
  {
    label: "负荷率",
    value: `100%`,
    type: "primary",
  },
  {
    label: "平均风速:",
    value: `100km/s`,
    type: "primary",
  },
  {
    label: "最大风速",
    value: `200km/s`,
    type: "primary",
  },
  {
    label: "总功率",
    value: `10000KVa`,
    type: "primary",
  },
];
const container = ref<HTMLElement | undefined>();
const { option } = useChart(container);
option.value = brokenLine(defaultChartValue);
</script>
<style lang="scss" scoped>
.custom-total-monitor {
  width: 600px;
  height: 100%;
  .total-panel {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .chart {
    padding-left: 10px;
    width: 100%;
    height: 100%;
    background-color: #04669e73;
  }
}
</style>
