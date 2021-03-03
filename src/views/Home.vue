<template>
	<div id="home">
		<HeaderLogo></HeaderLogo>
		<Histogram></Histogram>
		<AngleGuage style="margin-top:10px"></AngleGuage>
		<MonitoringList class="MonitoringList"></MonitoringList>
		<StatisticalParameter></StatisticalParameter>
		<ControlPanel></ControlPanel>
		<!-- <div class="three3d"> -->
		<Three3d></Three3d>
		<!-- </div> -->
	</div>
</template>
<script>
/*eslint-disable*/
import ProjectTitle from "../components/bigsur/Project_title/index";
import Histogram from "../components/bigsur/Histogram/index";
import MonitoringList from "../components/bigsur/MonitoringList/index";
import StatisticalParameter from "../components/bigsur/StatisticalParameter";
import ControlPanel from "../components/bigsur/ControlPanel";
import AngleGuage from "../components/bigsur/AngleGuage/index";
import HeaderLogo from "../components/bigsur/HeaderLogo/index";
import Three3d from "../components/three3d/index.vue";
export default {
	name: "Home",
	components: {
		ProjectTitle,
		Histogram,
		MonitoringList,
		StatisticalParameter,
		ControlPanel,
		AngleGuage,
		HeaderLogo,
		Three3d,
	},
};
</script>
<style lang="scss" scoped>
#home {
	width: 100%;
	height: 100%;
	background-color: #040b1a;
	// padding: 20px 30px;
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: hidden;
}
.three3d {
	width: 100vw;
	height: 100vh;
	background-color: #040b1a;
}
</style>
