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
import { PanelTitleType, MessageListType } from "@/types/index";
const title: PanelTitleType = {
  cn: "偏航角度监测",
  sequence: 4,
};
const data: Array<MessageListType> = new Array(6).fill(0).map(() => {
  const dirEnum = "东西南北";
  const random = Math.round(Math.random() * 3);
  const value = Math.round(Math.random() * 90);
  const type = value > 60 ? "danger" : "primary";
  return {
    label: `向${dirEnum[random]}偏航   (2022/04/27 3:45:32)`,
    value: `${value}°`,
    type,
  };
});
</script>
<style lang="scss" scoped>
.custom-active-monitor {
  width: 100%;
  height: 100%;
}
</style>
