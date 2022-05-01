<template>
    <div class="custom-en-monitor">
        <BPanel :titleOptions="title">
            <div class="chart" ref="container"></div>
        </BPanel>
    </div>
</template>
<script setup lang="ts">
import BPanel from "components/Base/BPanel.vue"
import { panelTitleType } from "components/Base/types";
import { createActiveBarConfig } from "configs/chart/activeBar";
import { ref } from "vue";
import { useChart } from "hooks/useChart";
import { useSocket } from "@/hooks/useSocket";
import { TEMPERATURES_STATUS_MAP } from "@/constants/temperatures";

const title: panelTitleType = {
    cn: "环境监测",
    sequence: 1
}
const container = ref<null | HTMLElement>(null)
const { refresh } = useChart(container, createActiveBarConfig())
useSocket({
    params: {
        type: "temperatures",
    },
    formatter(response) {
        return Object.keys(response.data).map((key) => (
            {
                label: TEMPERATURES_STATUS_MAP[key]["label"],
                value: response.data[key]
            }
        ))
    },
    onUpdate(formatterResult) {
        refresh(createActiveBarConfig(formatterResult))
    }
})
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