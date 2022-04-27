<template>
    <ul class="base-message-list">
        <li class="message-list-item" :class="{ danger: type === 'danger' }" :style="itemStyle"
            v-for="({ label, value, type }, index) in data">
            <span>{{ label }}</span>
            <span>{{ value }}</span>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { computed, defineProps, StyleValue, Ref } from 'vue'
import { messageListType } from "./types"
interface propsType {
    data: Array<messageListType>
}
const props = defineProps<propsType>()
const itemStyle: Ref<StyleValue> = computed(() => {
    const height = 100 / props.data.length

    return {
        height: height + "%"
    }
})
</script>

<style lang="scss" scoped>
.base-message-list {
    width: 100%;
    height: 100%;
    overflow-x:hidden;
    @extend %scrollbar;

    .message-list-item {
        min-height: 30px;
        display: flex;
        align-items: center;
        color: #15c5e8;
        font-size: 12px;
        padding: 0 20px;
        @extend %h-between;
        position: relative;
        &.danger {
            color: #fff;
            // background-color: red!important;
            animation: twinkling 3s ease-in-out infinite;
            // border-left: 2px solid red;
            &::before{
                content: "";
                width: 8px;
                height: 8px;
                background-color: red;
                position: absolute;
                top: calc(50% - 4px);
                left: 4px;
                border-radius: 50%;
            }
        }

        &:nth-child(odd) {
            background-color: rgba(4, 102, 158, 0.45);
        }

        &:nth-child(even) {
            background-color: rgba(9, 28, 70, 0.27);
        }
    }
}

@keyframes twinkling {
    0% {
        opacity: 1;
        // filter: alpha(opacity=20);
        transform: scale(1);
    }

    50% {
        opacity: 0.5;
        // filter: alpha(opacity=50);
        // transform: scale(1.01);
    }

    100% {
        opacity: 1;
        // filter: alpha(opacity=20);
        transform: scale(1);
    }
}
</style>