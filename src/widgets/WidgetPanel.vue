<template>
  <div
    class="widget-panel animate animate__bounceIn"
    @mousedown.stop="() => {}"
    @mouseup.stop="() => {}"
    @wheel.stop="() => {}"
    @dblclick.stop="() => {}"
    @click.stop="() => {}"
    @mouseenter.stop="() => {}"
    @mouseleave.stop="() => {}"
  >
    <div class="widget-panel-title">{{ title }}</div>
    <div class="widget-panel-main">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  title: string
}
defineProps<PropsType>()
</script>
<style lang="scss" scoped>
$beam-color: #99fffe;

.widget-panel {
  position: relative;
  box-sizing: border-box;
  width: 370px;
  height: 100%;
  padding: 10px 15px;
  overflow: auto;
  background: linear-gradient($beam-color, $beam-color) left -3px top 0,
    linear-gradient($beam-color, $beam-color) left -3px top -3px,
    linear-gradient($beam-color, $beam-color) right -3px top 0,
    linear-gradient($beam-color, $beam-color) right -3px top -3px,
    linear-gradient($beam-color, $beam-color) left -3px bottom 0,
    linear-gradient($beam-color, $beam-color) left -3px bottom -3px,
    linear-gradient($beam-color, $beam-color) right -3px bottom 0,
    linear-gradient($beam-color, $beam-color) right -3px bottom -3px;
  background-color: $dashborad-panel-bg;
  background-repeat: no-repeat;
  background-size: 20px 20px, 20px 20px;
  background-size: 3px 16px, 16px 3px;
  border: 1px solid transparent;
  backdrop-filter: blur(1px);

  .widget-panel-title {
    height: 30px;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  .widget-panel-main {
    height: calc(100% - 35px);
    overflow: auto;
  }
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

::-webkit-scrollbar-thumb {
  background-color: #cfcdc8;
  border-radius: 100px;
}
</style>
