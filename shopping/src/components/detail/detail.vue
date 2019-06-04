<template>
    <div class="box">
        <iframe :src="this.$route.query.url" frameborder="0" class="detailPage"></iframe>
    </div>
</template>
<script>
export default {
    mounted(){
        //console.log(this.$route)
    }  
}
</script>
<style>
.box{
    width:100%;
    height: 100%;
}
.detailPage{
    width:100%;
    height: 100%;
}
</style>
