<template>
    <div class="base-panel">
        <PanleTitle :options="titleOptions"></PanleTitle>
        <div class="base-panel-content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import PanleTitle from "components/Base/base-panelTitle.vue"
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