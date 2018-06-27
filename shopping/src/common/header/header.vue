<template>
    <div class="header">
        <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
        <span>{{tit.tip}}</span>
        <i class="icon iconfont icon-xiaoxi"></i>
    </div>
</template>
<script>
export default {
   props:["tit"],
   methods:{
       backFn(){
           this.$router.push({name:this.tit.url})
       }
   }
}
</script>

<style>
.header {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  background: #fff;
}
</style>

