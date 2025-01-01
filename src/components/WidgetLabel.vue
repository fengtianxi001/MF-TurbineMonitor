<template>
  <div class="equipment-label" @click="onClick">{{ name }}</div>
</template>
<script setup lang="ts">
interface PropsType {
  name: string
}
const props = defineProps<PropsType>()

const onClick = () => {
  // alert(props.name)
}
</script>
<style lang="scss" scoped>
.equipment-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 30px;

  // width: 135px;
  // height: 40px;
  font-weight: bolder;
  color: #fff;
  pointer-events: all;
  cursor: pointer;
  background-color: #0005;

  // background-image: url(@/assets/label_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 100px;
}
</style>
