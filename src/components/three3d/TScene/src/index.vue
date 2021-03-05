<script>
import { Scene } from "three";
export default {
    name: "TScene",
    inject: ["global"],
    mounted() {
        this.global.scene = new Scene();
    },
    render(){
        return null 
    }
};
</script>
