<template>
	<div class="environmental_monitoring">
		<ProjectTitle :options="titleOptions"></ProjectTitle>
		<div ref="echart_container" class="echart_container"></div>
	</div>
</template>
<script>
import * as echarts from "echarts";
import ProjectTitle from "../Project_title/index";
export default {
	name: "Histogram",
	data() {
		return {
			titleOptions: {
				order: "01",
				en: "environmental monitoring",
				cn: "环境监测",
			},
			chartData: [19, 68, 70],
		};
	},
	components: {
		ProjectTitle,
	},
	methods: {
		createChart(data) {
			var myChart = echarts.init(this.$refs.echart_container);
			myChart.setOption({
				grid: {
					left: 80,
					right: 30,
					bottom: 0,
					top: 0,
				},
				xAxis: {
					type: "value",
					show: false,
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
					max: 200,
					splitNumber: 4,
				},
				yAxis: {
					type: "category",
					data: ["齿轮箱温度", "机舱温度", "环境温度"],
					axisTick: {
						show: false,
					},
					splitLine: {
						show: false,
					},
					axisLine: {
						show: false,
						lineStyle: {
							color: "#fff",
						},
					},
				},
				series: [
					{
						data,
						type: "bar",
						showBackground: true,
						backgroundStyle: {
							color: "#123e59",
						},
						// barGap: 10,
						barCategoryGap: 11,
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: [212, 4],
									formatter: "{c} ℃",
									textStyle: {
										color: "#1e9ec5",
										fontSize: 11,
										fontWeight: "bolder",
									},
								},
								color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									{
										offset: 0,
										color: "#15c5e8",
									},
									{
										offset: 1,
										color: "#15c5e8",
									},
								]),
							},
						},
					},
				],
			});
		},
		mockData() {
			const environment = parseInt(Math.random() * 100)
			const cabine = parseInt(Math.random() * 100)
			const gearBox = parseInt(Math.random() * 100)
			return [environment,cabine,gearBox]
		},
	},
	mounted() {
		this.createChart(this.chartData);
		setInterval (() => {
			const arr = this.mockData()
			this.chartData = arr
		}, 3000);
	},
	watch: {
		chartData() {
			this.createChart(this.chartData);
		},
	},
};
</script>
<style lang="scss" scoped>
.environmental_monitoring {
	position: absolute;
	top: 16vh;
	left: 2vh;
	.echart_container {
		width: 16.6vw;
		height: 8vh;
	}
}
</style>
