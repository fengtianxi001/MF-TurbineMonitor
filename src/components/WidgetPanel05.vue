<template>
  <LayoutPanel>
    <div class="wrap">
      <div class="item-list" ref="container">
        <div
          class="item"
          v-for="{ name, status, angle, time } in list"
          :class="{ error: status === 0 }"
        >
          <div class="item-circle"></div>
          <div class="item-name">{{ name }}</div>
          <div class="item-angle">{{ angle }}</div>
          <div class="item-type">{{ status ? '正常' : '异常' }}</div>
          <div class="item-time">{{ time }}</div>
        </div>
      </div>
    </div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import { LayoutPanel } from '@/layout'
import { ref, onMounted } from 'vue'
import { Random } from 'mockjs'

const directions = ['东', '东北', '北', '西北', '西', '西南', '南', '东南']

const list = ref<any[]>(
  directions.map(() => {
    const angle = Random.integer(0, 360)
    return {
      name: `向${Random.pick(directions)}偏航`,
      angle: `${angle}度`,
      status: angle < 180 ? 1 : 0,
      time: Random.date('MM/dd HH:mm:ss'),
    }
  })
)

const container = ref()

let timer: any
onMounted(() => {
  if (timer) window.clearInterval(timer)
  timer = setInterval(() => {
    container.value.classList.add('scroll')
    setTimeout(() => {
      if (!timer) return void 0
      container.value.classList.remove('scroll')
      list.value.push(list.value.shift())
    }, 2000)
  }, 3000)
})
</script>

<style lang="scss" scoped>
@keyframes row-out {
  from {
    top: 0;
  }
  to {
    top: -36px;
  }
}
.wrap {
  height: 100%;
  overflow: hidden;
}
.item-list {
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  height: 670px;

  // overflow: hidden;
  &.scroll {
    position: relative;
    animation: row-out 1s linear forwards;
    .row:first-child {
      opacity: 0;
      transition: opacity 1s;
    }
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 16px;
    background: linear-gradient(90deg, #74fabd22, transparent);
    &.error {
      background: linear-gradient(90deg, #e38d7022, transparent);
      .item-circle {
        background-color: #e38d70;
      }
    }
    .item-circle {
      position: absolute;
      left: 10px;
      width: 5px;
      height: 10px;
      background-color: #74fabd;
    }
    .item-name {
      width: 30%;
      padding-left: 15px;
    }
    .item-angle {
      width: 20%;
    }
    .item-type {
      width: 10%;
    }
    .item-time {
      width: 40%;
      text-align: end;
    }
  }
}
</style>
