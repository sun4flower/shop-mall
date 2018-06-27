<template>
    <div class="wrap">
        <header class="header">
            <a href="#a0">商品</a>
            <a href="#a1">评价</a>
            <a href="#a2">详情</a>
            <a href="#a3">推荐</a>
            <!-- <span @click="jump">商品</span>
            <span @click="jump">评价</span>
            <span @click="jump">详情</span>
            <span @click="jump">推荐</span> -->
        </header>
        <div class="scroll" >

            <div class="good" id="a0">

                <div class="slider">
                    <img src="@/assets/img/2.jpg" alt="">
                </div>

            </div>
            <div class="estamite" id="a1">
                评价
            </div>
            <div class="detail" id="a2">
                详情
            </div>
            <div class="command" id="a3">
                推荐
            </div>
        </div>

    </div>
</template>
<script>
export default {
    mounted(){
        
    }
}
</script>
<style scopde>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
    width: 100%;
  height: 0.9rem;
  display: flex;
  justify-content: space-around;
  line-height: 0.9rem;
}
.scroll{
      width: 100%;
    flex:1;
    overflow: scroll;
}
.good {
  width: 100%;
  height: 3rem;
  overflow: hidden;
}
.slider img {
  width: 100%;
  height: 100%;
}
.estamite {
  height: 3rem;
}
.detail {
  height: 5rem;
}
.detail {
  height: 4rem;
}
.command {
  height: 16rem;
}
</style>


