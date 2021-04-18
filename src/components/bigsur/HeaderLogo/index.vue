<template>
	<div class="header">
		<ul>
			<li>Large-scale wind turbines</li>
			<li>大型风力发电机</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "HeaderLogo"
};
</script>
<style lang="scss" scoped>
$imgwidth: calc(10vh - 1.6rem);
.header {
	height: 10vh;
	box-sizing: border-box;
	padding: 0.8rem 0;
	display: flex;
	align-items: center;
	position: absolute;
	top: 2vh;
	left: 2vh;
	img {
		width: $imgwidth;
		height: $imgwidth;
		margin-right: 0.7rem;
	}
	ul {
		display: flex;
		flex-direction: column;
		text-align: left;
		font-size: 0.8rem;
		color: #6284a0;
		li:nth-child(2) {
			font-size: 1.7rem;
			color: #fff;
			font-weight: bolder;
		}
	}
}
</style>
