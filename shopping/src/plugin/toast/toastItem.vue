<template>
    <div class="tips" v-if="isActive">
        <slot>333</slot>
    </div>
</template>
<script>
export default {
    data(){
        return {
           isActive:true
        }
    },
    mounted(){
        setTimeout(()=>{
            this.isActive=false
        },2000)
    }
}
</script>
<style>
</style>


