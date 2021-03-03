<template>
	<svg class="icon" aria-hidden="true">
		<use :xlink:href="icon"></use>
	</svg>
</template>
<script>
/*eslint-disable*/
const contexts = require.context('../assets/iconfont', true, /iconfont.js$/);
contexts.keys().forEach(key => {
    const moduleName = key.replace(/^\.\//, '')
    require('../assets/iconfont/' + moduleName)
})
export default {
    name: "SvgIcon",
    props: {
       icon: String 
    }
};
</script>
<style lang="scss" scoped>
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
