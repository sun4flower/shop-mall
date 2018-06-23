<template>
    <div class="orderPage">
        <OrderPage :tit="tit"></OrderPage>
        <div class="top">
            <router-link :to="{name:'all'}">全部</router-link>
            <router-link :to="{name:'pay'}">待付款</router-link>
            <router-link :to="{name:'send'}">待发货</router-link>
            <router-link :to="{name:'receice'}">待收货</router-link>
            <router-link :to="{name:'afterSale'}">售后</router-link>
        </div>
        <router-view class="box"></router-view>
    </div>
</template>
<style>
</style>
<script>
import OrderPage from "@/common/header/header"
export default {
    data() {
        return {
            tit: {
                tip:"我的订单",
                url:"my"
            }
        }
    },
    components: {
        OrderPage
    },
    methods:{
        backFn(){
            alert(3)
            this.$router.push({name:"my"})
        }
    }
}
</script>
<style>
.orderPage{
    width:100%;
    height: 100%;
    display: flex;
    flex-direction:column;
}
.top {
  height: 0.9rem;
  line-height: 0.9rem;
  display: flex;
  font-size: 0.25rem;
  justify-content: space-around;
  font-style: none;
  padding:.1rem 0;
}
.top a {
  color: #333;
}
.top a.router-link-active {
  color: red;
  border-bottom:1px solid red;
}
.box{
    flex:1;
}
</style>



