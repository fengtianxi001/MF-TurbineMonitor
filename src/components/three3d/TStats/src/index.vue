<template>
    <div></div>
</template>
<script>
import Stats from "stats.js"
export default {
    name: "TStats",
    data(){
        return {
            stats: new Stats()
        }
    },
    inject:["global"],
    mounted(){
        let newPanel = new Stats.Panel()
        this.stats.addPanel(newPanel);
        this.stats.showPanel(3)
        document.getElementById("stats").appendChild(this.stats.dom)
        this.$set(this.global,"stats",this.stats)
        // this.global.stats = this.stats        
    },
}
</script>
<style lang='scss' scoped>

</style>