<template>
  <div class="layout-footer">
    <div class="item" :style="warningStyle" @click="warningHandle">
      {{ state.isWarning ? '取消告警' : '设备告警' }}
    </div>
    <div class="item" :style="decomposeStyle" @click="decomposeHandle">
      {{ !state.isDecompose ? '设备拆解' : '设备组装' }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, inject } from 'vue'

const state = reactive({
  isWarning: false,
  isDecompose: false,
  isDecomposeRuning: false,
})

const events = inject<any>('events')

const warningHandle = async () => {
  // if (state.isDecompose) return void 0
  state.isWarning = !state.isWarning

  if (state.isWarning) {
    await events.startWarning()

    // events.equipmentDisassembleAnimation()
  } else {
    await events.stopWarning()

    // events.equipmentCombineAnimation()
  }
}

const decomposeHandle = async () => {
  // if (state.isWarning) return void 0
  if (state.isDecomposeRuning) return void 0
  state.isDecompose = !state.isDecompose
  state.isDecomposeRuning = true
  if (state.isDecompose) {
    await events.eqDecomposeAnimation()
    state.isDecomposeRuning = false
  } else {
    await events.eqComposeAnimation()
    state.isDecomposeRuning = false
  }
}

const warningStyle = computed(() => {
  const style: any = {}
  if (state.isDecompose) {
    // style.cursor = 'not-allowed'
    style.cursor = 'pointer'
  } else {
    style.cursor = 'pointer'
  }

  if (state.isWarning) {
    style.color = '#5bc7fa'
  } else {
    style.color = '#fff'
  }
  return style
})

const decomposeStyle = computed(() => {
  const style: any = {}
  if (state.isDecomposeRuning) {
    style.cursor = 'not-allowed'
  } else {
    style.cursor = 'pointer'
  }

  if (state.isDecompose) {
    style.color = '#5bc7fa'
  } else {
    style.color = '#fff'
  }
  return style
})
</script>
<style lang="scss" scoped>
.layout-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-image: url('@/assets/images/footer_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 50px;
    font-family: DouyuFont;
    color: #fff;
    cursor: pointer;
    background-image: url('@/assets/images/footer_item_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
