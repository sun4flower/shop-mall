<template>
    <div class="wrap">
        <header class="header">
            <a href="#a0" :class="{active:'a0'==item}" @click="item='a0'">商品</a>
            <a href="#a1" :class="{active:'a1'==item}" @click="item='a1'">评价</a>
            <a href="#a2" :class="{active:'a2'==item}" @click="item='a2'">详情</a>
            <a href="#a3" :class="{active:'a3'==item}" @click="item='a3'">推荐</a>
            <!-- <span @click="jump">商品</span>
            <span @click="jump">评价</span>
            <span @click="jump">详情</span>
            <span @click="jump">推荐</span> -->
        </header>
        <div class="scroll">

            <div class="good" id="a0">
                <!-- <div class="swiper-container" ref="swiper">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="(item,index) in list" :key="index">
                             <img src="@/assets/img/双店铺banner2.png" alt="">
                        </li>
                    </ul>
                </div> -->
                <p>颜色分类：<input type="radio" name="" id="">粉红</p>
                <p>尺码：<span><input type="radio" name="" id="" value="粉红">粉红</span></p>

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
import Vue from "vue"
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
export default {
    data() {
        return {
            item: "a0",
            letter: "",
            list: [],
        }
    },
    created() {
        this.http.get("/getBanner").then(res => {
            console.log(res.data)
            this.list = res.data.data
        })
    },
    mounted() {
        new Swiper(this.$refs.swiper, {
            // autoplay:true
        }),
        this.letter = this.$route.query.item
        console.log(this.$route.query.item)
    },
    filters: {
        disCount: (value) => {
            return value * 2
        }
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
.scroll {
  width: 100%;
  flex: 1;
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
.active {
  border-bottom: 1px solid red;
}
img{
    width: 100%;
}
</style>


