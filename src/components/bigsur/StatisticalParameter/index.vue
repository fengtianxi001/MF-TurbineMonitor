<template>
	<div class="statistical_parameter">
		<ul class="container">
			<li class="left">
				<header>
					<span>统计参数</span>
					<span>statistical parameter</span>
				</header>
				<article>
					<li>
						<span>年发电量:</span>
						<span>8398.86</span>
						<span>万kWh</span>
					</li>
					<li>
						<span>负荷率:</span>
						<span>34.33</span>
						<span>万kWh</span>
					</li>
					<li>
						<span>月发电量:</span>
						<span>288.08</span>
						<span>万kWh</span>
					</li>
					<li>
						<span>平均风速:</span>
						<span>14.2</span>
						<span>m/s</span>
					</li>
					<li>
						<span>日发电量:</span>
						<span>48.62</span>
						<span>万kWh</span>
					</li>
					<li>
						<span>最大风速:</span>
						<span>19.95</span>
						<span>m/s</span>
					</li>
					<li>
						<span>总功率:</span>
						<span>35508.3</span>
						<span>万kWh</span>
					</li>
				</article>
			</li>
			<li class="right">
				<header>
					<span>#1风机</span>
				</header>
				<!-- <div> -->
				<StackLine class="stackLine"></StackLine>
				<!-- </div> -->
			</li>
		</ul>
	</div>
</template>
<script>
import StackLine from "../StackLine/index";
export default {
	components: {
		StackLine,
	},
};
</script>
<style lang="scss" scoped>
.statistical_parameter {
	width: 27.08vw;
	height: 18vh;
	background-color: #04669e73;
	padding: 0.625rem 1.25rem;
	position: absolute;
	right: 2vh;
	bottom: 2vh;
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		.left {
			width: 60%;
			height: 100%;
			header {
				text-align: left;
				color: #fff;
				span {
					font-size: 0.875rem;
					font-weight: bold;
				}
				span:nth-child(1) {
					display: block;
				}
				span:nth-child(2) {
					color: #15c5e8;
					font-size: 0.75rem;
					margin-top: 2px;
					padding-bottom: 0.625rem;
					border-bottom: 2px solid #fff;
				}
			}
			article {
				margin-top: 1.25rem;
				display: flex;
				flex-wrap: wrap;
				font-size: 12px;
				color: #fff;
				li {
					width: 50%;
					flex-shrink: 1;
					text-align: left;
					line-height: 1.875rem;
					span:nth-child(2) {
						margin: 0 1px;
						color: #1ac2e3;
					}
					span:nth-child(3) {
						margin: 0 1px;
						color: #7da2dc;
					}
				}
			}
		}
		.right {
			width: 50%;
			height: 100%;
			// background-color: pink;
			header {
				display: flex;
				flex-direction: row-reverse;
				span {
					width: 50%;
					height: 24px;
					background-color: #028ab5;
					color: #fff;
					font-size: 12px;
					line-height: 24px;
				}
				.stackLine {
					width: 100%;
					margin-top: 4px;
					height: calc(100% - 28px);
					border: 1px solid red;
				}
			}
		}
	}
}
</style>
