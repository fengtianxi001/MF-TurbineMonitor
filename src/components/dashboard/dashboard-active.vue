<template>
  <div class="custom-active-monitor">
    <Panle :titleOptions="title">
      <MessageList :data="data"></MessageList>
    </Panle>
  </div>
</template>
<script setup lang="ts">
import Panle from "components/Base/base-panel.vue";
import MessageList from "components/base/base-messageList.vue";
import { panelTitleType, messageListType } from "components/base/types";
const title: panelTitleType = {
  cn: "活动监测",
  sequence: 5,
};
const data: Array<messageListType> = [
  {
    label: "发动机运行",
    value: "正常",
  },
  {
    label: "齿轮箱运行",
    value: "正常",
  },
  {
    label: "变桨系统运行",
    value: "正常",
  },
  {
    label: "主轴运行",
    value: "正常",
  },
  {
    label: "叶片运行",
    value: "正常",
  },
  {
    label: "偏航角度",
    value: "正常",
  },
];
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
