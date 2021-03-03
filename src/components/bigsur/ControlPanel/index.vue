<template>
	<div class="container">
		<ProjectTitle :options="titleOptions"></ProjectTitle>
		<div class="control_panel" v-for="data in dataList" :key="data.cn">
			<span class="name">{{data.cn}}:</span>
			<div>
				<span class="number_value">{{data.value}}</span>
				<span class="unit">{{data.unit}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import ProjectTitle from "../Project_title";
export default {
	name: "ControlPanel",
	data() {
		return {
			titleOptions: {
				order: "04",
				en: "Generation parameters",
				cn: "发电参数",
			},
			dataList: [
				{
					cn: "总发电量",
					value: 38419.41,
					unit: "MWh",
				},
				{
					cn: "有功功率",
					value: 1601.8,
					unit: "kW",
				},
				{
					cn: "无功功率",
					value: 1049.09,
					unit: "kVar",
				},
				{
					cn: "功率因数",
					value: 6.05,
					unit: " ",
				},
				{
					cn: "日累计发电量",
					value: 1682.82,
					unit: "MWh",
				},
				{
					cn: "总消耗电量",
					value: 876.19,
					unit: "KWh",
				},
			],
		};
	},
	components: {
		ProjectTitle,
	},
};
</script>
<style lang="scss" scoped>
$width: 10.4vw;
$height: 4.16vh;
.container {
	position: absolute;
	top: 2vh;
	right: 2vh;
}
.control_panel {
	width: $width;
	height: $height;
	background-color: #04669e73;
	display: flex;
	justify-content: space-between;
	line-height: $height;
	font-size: 0.7rem;
	padding: 0 1.2rem;
	box-sizing: border-box;
	color: #fff;
    margin-bottom: 1rem;
    background-image: url("../../../assets/images/panel.png");
    background-size: $width $height;
	.number_value {
		margin: 0 5px;
		color: #1ac2e3;
	}
	.unit {
		color: #7da2dc;
	}
}
</style>
