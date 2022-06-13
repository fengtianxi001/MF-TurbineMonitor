<template>
  <div class="the-active-monitor">
    <base-panel :title="title">
      <base-message-list :data="data" />
    </base-panel>
  </div>
</template>
<script setup lang="ts">
import BasePanel from "@/components/BasePanel.vue";
import BaseMessageList from "@/components/BaseMessageList.vue";
import { PanelTitleType, MessageListType } from "@/types/index";
const title: PanelTitleType = {
  cn: "活动监测",
  sequence: 5,
};
const data: Array<MessageListType> = [
  {
    label: "发动机运行",
    value: "正常",
    type: "primary",
  },
  {
    label: "齿轮箱运行",
    value: "正常",
    type: "primary",
  },
  {
    label: "变桨系统运行",
    value: "正常",
    type: "primary",
  },
  {
    label: "主轴运行",
    value: "正常",
    type: "primary",
  },
  {
    label: "叶片运行",
    value: "正常",
    type: "primary",
  },
  {
    label: "偏航角度",
    value: "正常",
    type: "primary",
  },
];
</script>
<style lang="scss" scoped>
.the-active-monitor {
  width: 100%;
  height: 100%;
}
</style>
