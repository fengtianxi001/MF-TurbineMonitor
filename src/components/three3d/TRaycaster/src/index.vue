<template>
    <div></div>
</template>
<script>
import { Raycaster } from 'three'
export default {
    name: "TRaycaster",
    state(){
        return {
            raycaster: new Raycaster()
        }
    }
}
</script>
<style lang='scss' scoped>

</style>