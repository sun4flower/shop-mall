<template>
    <div class="orderPage">
        <OrderPage :tit="tit"></OrderPage>
        <div class="top">
            <router-link replace :to="{name:'orderPage',params:{type:'all'}}">全部</router-link>
            <router-link replace :to="{name:'orderPage',params:{type:'pay'}}">待付款</router-link>
            <router-link replace :to="{name:'orderPage',params:{type:'send'}}">待发货</router-link>
            <router-link replace :to="{name:'orderPage',params:{type:'receieve'}}">待收货</router-link>
            <router-link replace :to="{name:'orderPage',params:{type:'aftersale'}}">售后</router-link>
        </div>
        <ul class="box">
            <li v-for="(item,index) in list" :key="index">
                <Item :item="item"></Item>
            </li>
        </ul>
        <toast></toast>
         <p class="msg">到底了哦！！！</p>
    </div>
</template>
<style>
</style>
<script>
import OrderPage from "@/common/header/header"
import { getCookie } from "@/utils/cookies"
import Item from "./detail/all"
export default {
    data() {
        return {
            tit: {
                tip: "我的订单",
                url: "my"
            },
            list: []
        }
    },
    components: {
        OrderPage
    },
    watch: {
        $route(n, o) {
            this.getData(n)
        }
    },
    created() {
        this.getData(this.$route)
    },
    methods: {
        backFn() {
            alert(3)
            this.$router.push({ name: "my" })
        },
        getData(n) {

            this.http.post("/getOrder", { token: getCookie("token"), type: n.params.type || "all" }).then(res => {
                if (res.data.code == 0) {
                    this.$router.push({name:"login",params:{from:"orderPage"}})
                } else {
                    this.list = res.data.msg
                }
            })
        }
    },
    components: {
        Item, OrderPage
    }
}
</script>
<style>
.orderPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:#eee;
}
.top {
  height: 0.9rem;
  line-height: 0.9rem;
  display: flex;
  font-size: 0.25rem;
  justify-content: space-around;
  font-style: none;
  padding: 0.1rem 0;
  background:#fff;
}
.top a {
  color: #333;
}
.top a.router-link-active {
  color: red;
  border-bottom:1px solid red;
}
.box {
  flex: 1;
}
.msg {
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  width: 100%;
}
</style>



