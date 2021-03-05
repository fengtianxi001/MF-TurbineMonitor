<script>
import Stats from "stats.js"
export default {
    name: "TStats",
    inject:["global"],
    mounted(){
        let newPanel = new Stats().Panel()
        this.stats.addPanel(newPanel);
        this.stats.showPanel(3)
        document.getElementById("stats").appendChild(this.stats.dom)
        this.$set(this.global,"stats",this.stats)
    },
    render(){
        return null 
    }
}
</script>
