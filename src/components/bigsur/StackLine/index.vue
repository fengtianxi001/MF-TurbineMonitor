<template>
	<div ref="echart_container" class="echart_container"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
	mounted() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(this.$refs.echart_container);
		// 绘制图表
		myChart.setOption({
			tooltip: {
				trigger: "axis",
			},
			// legend: {
			// 	data: ["功率", "风速"],
			// 	// position: "left"
			// },
			grid: {
				left: 10,
				right: 10,
				bottom: 20,
				top: 30,
				containLabel: true,
			},
			xAxis: {
				type: "category",
				// boundaryGap: false,
				data: ["1", "2", "3", "4", "5", "6", "7"],
				axisLine: {
					show: false,
					lineStyle: {
						color: "#028ab5ad",
					},
				},
			},
			yAxis: {
				type: "value",
				axisLine: {
					show: false,
					lineStyle: {
						color: "#028ab5ad",
					},
				},

				splitLine: {
					lineStyle: {
						color: ["#028ab545"],
					},
				},
			},
			series: [
				{
					name: "功率",
					type: "line",
					data: [12, 6, 13, 5, 18, 15, 8],
					lineStyle: {
						color: "#15c5e8",
					},
					itemStyle: {
						normal: {
							color: "#15c5e8",
						},
					},
				},
				{
					name: "风速",
					type: "line",
					// stack: "总量",
					data: [2, 4, 12, 15, 10, 11, 5],
                    lineStyle: {
						color: "#c8a818",
					},
					itemStyle: {
						normal: {
							color: "#c8a818",
						},
					},
				},
			],
		});
	},
};
</script>
<style lang="scss" scoped>
.echart_container {
	width: 100%;
	height: 100%;
	// background-color: red;
	// border: 1px solid red;
	// display: flex;
	// align-items: center;
}
</style>
