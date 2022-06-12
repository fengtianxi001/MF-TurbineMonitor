<template>
  <div class="custom-active-monitor">
    <base-panel :title="title">
      <base-message-list :data="data" />
    </base-panel>
  </div>
</template>
<script setup lang="ts">
import BasePanel from "@/components/BasePanel.vue";
import BaseMessageList from "@/components/BaseMessageList.vue";
import { panelTitleType } from "components/Base/types";
import { reactive } from "vue";
import { messageListType } from "components/Base/types";
const title: panelTitleType = {
  cn: "异常监测",
  sequence: 6,
};
const data: Array<messageListType> = [
  {
    label: "发动机运行",
    value: "状态可疑",
    type: "primary",
  },
  {
    label: "齿轮箱运行",
    value: "状态可疑",
    type: "warning",
  },
  {
    label: "变桨系统运行",
    value: "异常",
    type: "danger",
  },
  {
    label: "主轴运行",
    value: "异常",
    type: "danger",
  },
  {
    label: "叶片运行",
    value: "状态可疑",
  },
  {
    label: "偏航角度",
    value: "异常",
    type: "danger",
  },
  {
    label: "发电机",
    value: "正常",
    type: "danger",
  },
  {
    label: "发电机",
    value: "正常",
    type: "danger",
  },
];

const state = reactive({
  title: { cn: "运行数据监测" },
});
</script>
<style lang="scss" scoped>
.custom-active-monitor {
  width: 100%;
  height: 100%;

  .chart {
    width: 100%;
    height: 90px;
  }
}
</style>
