<template>
  <div class="base-table">
    <ul class="base-table-header">
      <li
        v-for="(item, index) in columns"
        :key="index"
        class="base-table-header-column"
        :style="{ width: item.width }"
      >
        {{ item.title }}
      </li>
    </ul>
    <div v-autoscroll="20" class="base-table-body">
      <ul
        v-for="(row, index1) in dataSource"
        :key="index1"
        class="base-table-body-row"
      >
        <li
          v-for="(column, index2) in row"
          :key="index2"
          class="base-table-body-column"
          :style="{ width: column.width }"
        >
          {{ column.content }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface PropsType {
  columns: any[]
  data: any[]
}
const props = defineProps<PropsType>()
const dataSource = computed(() =>
  props.data.map((item) =>
    props.columns.map((column) => {
      const content = item[column.dataIndex]
      return {
        content,
        width: column.width,
      }
    })
  )
)
</script>
<style lang="scss" scoped>
.base-table {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .base-table-header {
    display: flex;
    padding: 0;
    margin: 0;
    background: rgb(96 182 255 / 15%);

    li {
      list-style: none;
      background-color: rgb(11 101 140 / 45.1%);
    }
  }

  .base-table-body {
    height: calc(100% - 40px);
    padding: 0;
    margin: 0;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .base-table-body-row {
      display: flex;
      padding: 0;
      margin: 0;

      &:nth-child(even) {
        background-color: #0b658c26;
      }

      .base-table-body-column {
        list-style: none;
      }
    }
  }
}

/* stylelint-disable-next-line no-descending-specificity */
.base-table-header-column,
.base-table-body-column {
  box-sizing: border-box;
  height: 40px;
  padding: 0 10px;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
}
</style>
