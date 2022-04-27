<template>
    <div class="base-panel">
        <BPanleTitle :options="titleOptions"></BPanleTitle>
        <div class="base-panel-content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import BPanleTitle from "components/Base/BPanelTitle.vue"
import { panelTitleType } from "./types";
interface propsType {
    titleOptions: panelTitleType
}
const props = defineProps<propsType>()
</script>
<style lang="scss" scoped>
.base-panel {
    width: 100%;
    height: 100%;
    .base-panel-content {
        width: 100%;
        height: calc(100% - 50px);
        margin-top: 10px;
        @extend %scrollbar;
        overflow: hidden;
    }
}
</style>