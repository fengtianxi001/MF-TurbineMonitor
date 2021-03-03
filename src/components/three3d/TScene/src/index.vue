<template>
    <div></div>
</template>
<script>
import {Scene} from "three"
export default {   
    name: "TScene",
    inject: ["global"],
    data(){
        return {
            // scene: 
        }
    },
    mounted(){
        // this.$parent.global.scene = this.scene
        this.global.scene = new Scene()
    }
}
</script>
<style lang='scss' scoped>

</style>