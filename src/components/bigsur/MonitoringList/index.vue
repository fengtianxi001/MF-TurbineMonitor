<template>
	<div class="data_monitoring">
		<ProjectTitle :options="titleOption"></ProjectTitle>
		<div class="monitoring_list">
			<ul class="btn_list">
				<li :class="{active: activeIndex === 0}" @click="btnhandle(0)" >实时数据</li>
				<li :class="{active: activeIndex === 1}" @click="btnhandle(1)">故障信息</li>
			</ul>
			<ul class="data_list">
				<li v-for="item in 9" :key="item">
					<span>偏航系统精准</span>
					<span>11:17:42</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import ProjectTitle from "../Project_title/index";
export default {
	name: "DataMonitoring",
	data() {
		return {
			activeIndex: 0,
			titleOption: {
				order: "03",
				en: "data monitoring",
				cn: "数据监测",
			},
		};
	},
	methods:{
		btnhandle(index) {
			this.activeIndex = index
		}
	},
	components: {
		ProjectTitle,
	},
};
</script>
<style lang="scss" scoped>
$list_height: 2.8vh;
$btn_height: calc(#{$list_height} + 4px); 
.data_monitoring {
	position: absolute;
	bottom: 2vh;
	left: 2vh;
	z-index: 999999;
	.monitoring_list {
		width: 16.6vw;
		height: 26.8vh;
		.btn_list {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			li:nth-child(1) {
				margin-right: 10px;
			}
			li {
				width: calc(100% - 10px);
				height: $btn_height;
				line-height: $btn_height;
				color: #fff;
				font-size: 0.8rem;
				background-color: #04669e73;
				cursor: pointer;
			}
			li.active {
				background-color: #1ac2e3;
				box-shadow: 0 0 20px 0px rgb(108 231 255 / 71%), 0 2px 0 #000;
			}
		}
		.data_list {
			max-height: 22.4vh;
			overflow-y: scroll;
			li:nth-child(2n) {
				background-color: #04669e73;
			}
			li {
				width: 100%;
				height: $list_height;
				background-color: #091c4645;
				color: #15c5e8;
				line-height: $list_height;
				font-size: 0.7px;
				text-align: left;
				box-sizing: border-box;
				padding: 0 1rem;
				display: flex;
				justify-content: space-between;
			}
		}
	}
}

::-webkit-scrollbar {
	width: 4px;
	height: 10px;
	background-color: transparent;
}

::-webkit-scrollbar-track {
	border-radius: 10px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #15c5e8;
}
</style>
