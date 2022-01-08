<!--
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 16:31:53
 * @LastEditTime: 2022-01-05 17:19:27
-->
<template>
	<ul class="custom-title">
		<li class="title-en">Large-scale wind turbines</li>
		<li class="title-cn">大型风力发电机</li>
	</ul>
</template>
<script lang="ts">
/*eslint-disable*/
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'custom-title',
	setup() {},
})
</script>

<style lang="scss" scoped>
.custom-title {
    .title-en{
        font-size: 0.8rem;
        color: $grey;
        font-weight: bolder;
    }
    .title-cn{
        font-size: 1.7rem;
        color: $color;
        font-weight: bolder;
    }
}
</style>
