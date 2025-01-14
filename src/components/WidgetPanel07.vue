<template>
  <LayoutPanel>
    <div class="container">
      <div class="item" v-for="item in list">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-value">{{ item.value }}{{ item.unit }}</div>
      </div>
    </div>
  </LayoutPanel>
</template>
<script setup lang="ts">
import { LayoutPanel } from '@/layout'
import { computed } from 'vue'

interface PropsType {
  name: string
}
const props = defineProps<PropsType>()

const CONFIG: any = {
  变桨系统: [
    { label: '变桨角度', value: 15, unit: '度' },
    { label: '变桨速度', value: 2, unit: '度/秒' },
    { label: '变桨系统温度', value: 45, unit: '摄氏度' },
    { label: '电机负载', value: 3.5, unit: '千瓦' },
    { label: '变桨位置传感器反馈', value: 1.2, unit: '米' },
    { label: '故障状态', value: 0, unit: '(无故障)' },
    { label: '电源电压', value: 400, unit: '伏特' },
    { label: '桨叶压力', value: 1200, unit: '帕斯卡' },
    { label: '变桨角度变化', value: 0.5, unit: '度' },
    { label: '变桨响应时间', value: 0.1, unit: '秒' },
    { label: '电流', value: 10, unit: '安培' },
    { label: '变桨系统运行时间', value: 200, unit: '小时' },
    { label: '变桨故障次数', value: 1, unit: '' },
    { label: '系统工作状态', value: '正常', unit: '' },
    { label: '变桨电机温度', value: 60, unit: '摄氏度' },
    { label: '变桨角度限制', value: 25, unit: '度' },
  ],
  转子: [
    { label: '转子直径', value: 120, unit: '米' },
    { label: '转子重量', value: 15000, unit: '千克' },
    { label: '转子材料', value: '玻璃纤维', unit: '' },
    { label: '转速', value: 12, unit: '转/分钟' },
    { label: '最大载荷', value: 5000, unit: '牛顿' },
    { label: '转子倾斜角度', value: 5, unit: '度' },
    { label: '转子寿命', value: 20, unit: '年' },
    { label: '转子气动效率', value: 92, unit: '%' },
    { label: '转子温度', value: 50, unit: '摄氏度' },
    { label: '转子材料强度', value: 350, unit: '兆帕' },
    { label: '转子振动频率', value: 60, unit: '赫兹' },
    { label: '转子旋转惯量', value: 150, unit: '千克·米²' },
    { label: '转子工作时间', value: 1000, unit: '小时' },
    { label: '转子检修周期', value: 5, unit: '年' },
    { label: '转子转动摩擦系数', value: 0.02, unit: '' },
    { label: '转子冷却方式', value: '风冷', unit: '' },
  ],
  主轴: [
    { label: '主轴直径', value: 0.15, unit: '米' },
    { label: '主轴长度', value: 5.0, unit: '米' },
    { label: '主轴材料', value: '钢', unit: '' },
    { label: '主轴重量', value: 2000, unit: '千克' },
    { label: '主轴转速', value: 15, unit: '转/分钟' },
    { label: '主轴承载能力', value: 10000, unit: '牛顿' },
    { label: '主轴温度', value: 60, unit: '摄氏度' },
    { label: '主轴轴承类型', value: '滚动轴承', unit: '' },
    { label: '主轴材料强度', value: 500, unit: '兆帕' },
    { label: '主轴运行时间', value: 3000, unit: '小时' },
    { label: '主轴磨损程度', value: 0.1, unit: '毫米' },
    { label: '主轴动态平衡状态', value: '正常', unit: '' },
    { label: '主轴冷却方式', value: '油冷', unit: '' },
    { label: '主轴安装角度', value: 0, unit: '度' },
    { label: '主轴检修周期', value: 3, unit: '年' },
    { label: '主轴振动频率', value: 50, unit: '赫兹' },
  ],
  齿轮箱: [
    { label: '齿轮箱类型', value: '行星齿轮箱', unit: '' },
    { label: '齿轮箱比', value: 15, unit: ':1' },
    { label: '齿轮箱输入转速', value: 20, unit: '转/分钟' },
    { label: '齿轮箱输出转速', value: 300, unit: '转/分钟' },
    { label: '齿轮箱效率', value: 95, unit: '%' },
    { label: '齿轮箱温度', value: 70, unit: '摄氏度' },
    { label: '齿轮箱重量', value: 250, unit: '千克' },
    { label: '齿轮材料', value: '合金钢', unit: '' },
    { label: '齿轮箱噪音级别', value: 60, unit: '分贝' },
    { label: '齿轮箱润滑方式', value: '油润滑', unit: '' },
    { label: '齿轮磨损程度', value: 0.05, unit: '毫米' },
    { label: '齿轮箱检修周期', value: 4, unit: '年' },
    { label: '齿轮箱冷却方式', value: '水冷', unit: '' },
    { label: '齿轮箱负载能力', value: 20000, unit: '牛顿' },
    { label: '齿轮箱运行时长', value: 5000, unit: '小时' },
    { label: '齿轮箱振动状态', value: '正常', unit: '' },
  ],
  油冷装置: [
    { label: '油冷却器类型', value: '板式冷却器', unit: '' },
    { label: '油流量', value: 50, unit: '升/分钟' },
    { label: '油温', value: 40, unit: '摄氏度' },
    { label: '冷却效率', value: 90, unit: '%' },
    { label: '油冷装置重量', value: 100, unit: '千克' },
    { label: '油类型', value: '合成油', unit: '' },
    { label: '冷却介质温度', value: 25, unit: '摄氏度' },
    { label: '最大工作压力', value: 5, unit: '巴' },
    { label: '油冷却器运行时间', value: 2000, unit: '小时' },
    { label: '油冷却器故障次数', value: 0, unit: '' },
    { label: '油流量波动', value: 5, unit: '升/分钟' },
    { label: '油冷却器材料', value: '铝合金', unit: '' },
    { label: '油冷却器检修周期', value: 3, unit: '年' },
    { label: '工作噪音', value: 55, unit: '分贝' },
    { label: '冷却器振动状态', value: '正常', unit: '' },
    { label: '油温上限', value: 70, unit: '摄氏度' },
  ],
  偏航电机: [
    { label: '电机类型', value: '伺服电机', unit: '' },
    { label: '额定功率', value: 5, unit: '千瓦' },
    { label: '额定电压', value: 400, unit: '伏特' },
    { label: '额定转速', value: 1500, unit: '转/分钟' },
    { label: '最大扭矩', value: 30, unit: '牛顿·米' },
    { label: '电机重量', value: 50, unit: '千克' },
    { label: '控制类型', value: '闭环控制', unit: '' },
    { label: '工作温度', value: 70, unit: '摄氏度' },
    { label: '电机运行时间', value: 1000, unit: '小时' },
    { label: '电机故障状态', value: 0, unit: '(无故障)' },
    { label: '电机起动次数', value: 10, unit: '' },
    { label: '电机效率', value: 92, unit: '%' },
    { label: '电机冷却方式', value: '风冷', unit: '' },
    { label: '电机绝缘等级', value: 'F级', unit: '' },
    { label: '电机负载状态', value: '正常', unit: '' },
    { label: '电机振动状态', value: '正常', unit: '' },
  ],
  风冷装置: [
    { label: '冷却器类型', value: '风冷散热器', unit: '' },
    { label: '风扇类型', value: '轴流风扇', unit: '' },
    { label: '风扇功率', value: 1.5, unit: '千瓦' },
    { label: '风量', value: 3000, unit: '立方米/小时' },
    { label: '冷却效率', value: 85, unit: '%' },
    { label: '工作温度', value: 35, unit: '摄氏度' },
    { label: '装置重量', value: 25, unit: '千克' },
    { label: '风扇转速', value: 1200, unit: '转/分钟' },
    { label: '风扇运行时间', value: 1500, unit: '小时' },
    { label: '风扇故障状态', value: 0, unit: '(无故障)' },
    { label: '冷却器噪音级别', value: 50, unit: '分贝' },
    { label: '风扇材料', value: '塑料', unit: '' },
    { label: '风冷装置检修周期', value: 2, unit: '年' },
    { label: '风扇振动状态', value: '正常', unit: '' },
    { label: '风扇电流', value: 3, unit: '安培' },
    { label: '风量波动', value: 100, unit: '立方米/小时' },
  ],
  发电机: [
    { label: '发电机类型', value: '同步发电机', unit: '' },
    { label: '额定功率', value: 1000, unit: '千瓦' },
    { label: '额定电压', value: 400, unit: '伏特' },
    { label: '额定频率', value: 50, unit: '赫兹' },
    { label: '效率', value: 95, unit: '%' },
    { label: '发电机重量', value: 500, unit: '千克' },
    { label: '转速', value: 1500, unit: '转/分钟' },
    { label: '冷却方式', value: '水冷', unit: '' },
    { label: '发电机运行时间', value: 2000, unit: '小时' },
    { label: '发电机故障状态', value: 0, unit: '(无故障)' },
    { label: '发电机启动次数', value: 10, unit: '' },
    { label: '发电机输出电流', value: 1500, unit: '安培' },
    { label: '发电机检修周期', value: 4, unit: '年' },
    { label: '发电机振动状态', value: '正常', unit: '' },
    { label: '发电机温度', value: 70, unit: '摄氏度' },
    { label: '发电机负载状态', value: '正常', unit: '' },
  ],
  控制柜: [
    { label: '控制柜类型', value: '配电控制柜', unit: '' },
    { label: '额定电压', value: 400, unit: '伏特' },
    { label: '额定电流', value: 100, unit: '安培' },
    { label: '防护等级', value: 'IP65', unit: '' },
    { label: '控制方式', value: '自动控制', unit: '' },
    { label: '柜体材料', value: '冷轧钢', unit: '' },
    { label: '柜体重量', value: 150, unit: '千克' },
    { label: '工作温度', value: 40, unit: '摄氏度' },
    { label: '柜内电流', value: 80, unit: '安培' },
    { label: '柜内电压', value: 380, unit: '伏特' },
    { label: '控制柜工作状态', value: '正常', unit: '' },
    { label: '柜体温度', value: 50, unit: '摄氏度' },
    { label: '柜内项目数量', value: 20, unit: '' },
    { label: '控制柜检修周期', value: 3, unit: '年' },
    { label: '柜体振动状态', value: '正常', unit: '' },
    { label: '柜体防护等级测试', value: '合格', unit: '' },
  ],
}

const list = computed(() => {
  return CONFIG[props.name] || []
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  height: 100%;
  overflow: hidden;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(93, 101, 122, 20%);
    .item-label {
      font-size: 12px;
    }
    .item-value {
      margin-top: 4px;
      font-size: 12px;
      color: #74f7fd;
    }
  }
}
</style>
