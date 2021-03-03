<template>
	<ul class="project_title">
		<li class="numerical_order">{{ options.order }}</li>
		<li class="title_text">
			<div>{{ options.en }}</div>
			<div>{{ options.cn }}</div>
		</li>
	</ul>
</template>
<script>
export default {
	name: "project_title",
	props: {
		options: {
			type: Object,
			default: () => {
				return {
					order: "numerical order",
					en: "environmental monitoring",
					cn: "环境监测",
				};
			},
		},
	},
};
</script>
<style lang="scss" scoped>
$width: 10.4vw;
$height: 4vh;
.project_title {
	width: $width;
	height: $height;
	border-left: 4px solid #17c4e6;
	display: flex;
	margin-bottom: 0.8rem;
	.numerical_order {
		width: $height;
		height: $height;
		font-size: 1.6rem;
		color: #fff;
		font-weight: bolder;
		line-height: $height;
		text-align: center;
		padding-left: 0.5rem;
	}
	.title_text { 
		text-align: left;
		margin-left: 0.5rem;
		font-size: 0.66rem;
		color: #6284a0;
		div:nth-child(2) {
			color: #fff;
			font-size: 1.1rem;
			font-weight: bolder;
		}
	}
}
</style>
