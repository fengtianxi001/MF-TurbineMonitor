<template>
    <div class="custom-active-monitor">
        <BPanel :titleOptions="title">
            <BMessageList :data="data"></BMessageList>
        </BPanel>
    </div>
</template>
<script setup lang="ts">
import BPanel from "components/Base/BPanel.vue"
import BMessageList from "components/Base/BMessageList.vue"
import { panelTitleType } from "components/Base/types";
import { reactive } from "vue";
import { messageListType } from "components/Base/types";
const title: panelTitleType = {
    cn: "偏航角度监测",
    sequence: 4
}
const data: Array<messageListType> = new Array(6).fill(0).map(() => {
    const dirEnum = "东西南北"
    const random = Math.round(Math.random() * 3)
    const value = Math.round(Math.random() * 90)
    const type = value > 60 ? "danger" : "primary"
    return {
        label: `向${dirEnum[random]}偏航   (2022/04/27 3:45:32)`,
        value: `${value}°`,
        type
    }
})


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