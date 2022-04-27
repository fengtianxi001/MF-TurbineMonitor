<template>
    <div class="base-panel-title">
        <div class="title-sequence">{{ sequence }}</div>
        <ul class="title-name">
            <li class="title-name-en">{{ en }}</li>
            <li class="title-name-cn">{{ options.cn }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { createSequence, createEnTitleByCn } from "utils/index";
import { panelTitleType } from "./types";
interface propsType {
    options: panelTitleType
}
const props = defineProps<propsType>()
const sequence = computed(() => createSequence(Number(props.options?.sequence) || 1))
const en = computed(() => createEnTitleByCn(props.options.cn))
</script>

<style lang="scss" scoped>
.base-panel-title {
    @extend %v-center;
    width: 100%;
    user-select: none;

    .title-sequence {
        font-size: 28px;
        font-weight: bolder;
        padding: 0 16px;
        border-left: 4px solid $mainColor;
        color: $fontColor;
    }

    .title-name {
        &-en {
            color: $fontColor;
            font-size: .8rem;
        }

        &-cn {
            color: $mainColor;
            font-size: 1.1rem;
            font-weight: bold;
            color: $fontColor;
        }
    }

}
</style>