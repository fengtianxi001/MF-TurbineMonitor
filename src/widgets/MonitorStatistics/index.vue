<template>
  <WidgetPanel title="参数监测">
    <ul class="widget-rain">
      <li class="rain-item normal">
        <span class="label">年发电量</span>
        <span class="value">1000</span>
        <span class="unit">MWh</span>
      </li>
      <li class="rain-item normal">
        <span class="label">月发电量</span>
        <span class="value">100</span>
        <span class="unit">MWh</span>
      </li>
      <li class="rain-item normal">
        <span class="label">周发电量</span>
        <span class="value">10</span>
        <span class="unit">MWh</span>
      </li>
      <li class="rain-item normal">
        <span class="label">日发电量</span>
        <span class="value">1</span>
        <span class="unit">MWh</span>
      </li>
      <li class="rain-item warning">
        <img class="icon" :src="alarm" />
        <span class="label">负荷率</span>
        <span class="value">100</span>
        <span class="unit">%</span>
      </li>
      <li class="rain-item warning">
        <img class="icon" :src="alarm" />
        <span class="label">平均风速</span>
        <span class="value">100</span>
        <span class="unit">km/s</span>
      </li>
      <li class="rain-item warning">
        <img class="icon" :src="alarm" />
        <span class="label">最大风速</span>
        <span class="value">200</span>
        <span class="unit">km/s</span>
      </li>
      <li class="rain-item">
        <img class="icon" :src="alarm" />
        <span class="label">总功率</span>
        <span class="value">1000</span>
        <span class="unit">KVa</span>
      </li>
    </ul>
  </WidgetPanel>
</template>
<script setup lang="ts">
import alarm from '@/assets/icons/alarm.png'
import WidgetPanel from '../WidgetPanel.vue'
</script>
<style lang="scss" scoped>
.widget-rain {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  .rain-item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 8px;
    font-size: 14px;
    color: #fff;
    list-style: none;
    background: $dashborad-panel-item-bg;

    .label {
      flex: 1;
    }

    .value {
      font-size: 16px;
      font-weight: bold;
    }

    .unit {
      margin-left: 4px;
    }

    .icon {
      position: absolute;
      top: 4px;
      left: 10px;
      width: 40px;
      height: 40px;
    }

    &.warning {
      color: #fac73e;
    }

    &.normal {
      .value {
        color: #fff;
      }

      .unit {
        color: #aebfe9;
      }
    }
  }
}
</style>
