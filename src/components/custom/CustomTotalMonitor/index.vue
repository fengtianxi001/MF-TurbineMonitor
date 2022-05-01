<template>
    <div class="custom-total-monitor">
        <BPanel :titleOptions="title">
            <div class="total-panel">
                <BMessageList :data="messageDate"></BMessageList>
                <div class="chart" ref="container"></div>
            </div>
        </BPanel>


    </div>
</template>
<script setup lang="ts">
import BPanel from "components/Base/BPanel.vue"
import BMessageList from "components/Base/BMessageList.vue"
import { panelTitleType } from "components/Base/types";
import { ref } from "vue";
import { useChart } from "hooks/useChart";
import { createNormalLineOptions } from "utils/createNormalLineOptions";
import { useSocket } from "@/hooks/useSocket";
const title: panelTitleType = {
    cn: "参数统计",
    sequence: 1
}
const messageDate = [
    {
        label: "年发电量",
        value: `1000MWh`
    },
    {
        label: "月发电量",
        value: `100MWh`
    },
    {
        label: "日发电量",
        value: `10MWh`
    },
    {
        label: "负荷率",
        value: `100%`
    }, {
        label: "平均风速:",
        value: `100km/s`
    }, {
        label: "最大风速",
        value: `200km/s`
    }, {
        label: "总功率",
        value: `10000KVa`
    },
]
const container = ref<null | HTMLElement>(null)
const { refresh } = useChart(container, createNormalLineOptions())

useSocket({
    params: {
        type: "totalData",
    },
    formatter(response) {
        return response.data
    },
    onUpdate(formatterResult) {
        refresh(createNormalLineOptions(formatterResult))
    }
})
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