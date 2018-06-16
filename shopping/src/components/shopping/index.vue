<template>
    <div class="shopBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo"></i>
            <span>购物车</span>
            <i class="icon iconfont icon-xiaoxi"></i>
        </header>
        <ul class="content">
            <li v-for="(item,index) in shopCar" :key="index">
                <dl>
                    <dt>
                        <input type="checkbox" checked="item.book">
                        <img :src="item.imageurl" alt="">
                    </dt>
                    <dd>
                        <p>
                            {{item.wname}}
                        </p>
                        <div>
                            <aside class="divri">
                                <span style="color:#a3a3a3;">x{{item.canAddCart}}</span>
                                <p style="color:red;">￥{{item.jdPrice}}</p>
                            </aside>
                            <aside class="btns">
                                <span>-</span>
                                <span>{{item.canAddCart}}</span>
                                <span>+</span>
                            </aside>
                        </div>

                    </dd>
                </dl>
            </li>
        </ul>
        <div class="price">
            <p class="check"><input type="checkbox">
                <span>全选</span>
            </p>
            <p class="all">
                <span>合计</span>
                <span>运费</span>
            </p>
            <p class="account">结算</p>
        </div>
    </div>

</template>
<script>
import { getCookie } from "../../utils/cookies"
import axios from "axios"
import { mapState } from "vuex"
export default {
    beforeRouteEnter(to, from, next) {
        axios.post("http://localhost:3000/getShopitem", { token: getCookie("token") }).then(res => {
            if (res.data.code == 0) {
                next({ name: "login", params: { from: to.name } })
            } else {
                next()
            }
        });
    },
    computed: {
        ...mapState(["shopCar"])
    }
}
</script>
<style>
.shopBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.content {
  flex: 1;
  background: #ccc;
}
.price {
  height: 0.9rem;
  display: flex;
  font-size: 0.2rem;
  justify-content: space-between;
  padding-left: 10px;
}
.check {
  line-height: 0.9rem;
}
.all {
  display: flex;
  flex-direction: column;
  line-height: 0.45rem;
}
.account {
  height: 100%;
  width: 2.5rem;
  background: #fc4141;
  color: #fff;
  line-height: 0.9rem;
  text-align: center;
  font-size: 0.23rem;
}

.content li dl {
  display: flex;
  height: 2.6rem;
  background: #fff;
  margin: 4px 0;
  padding: 2px;
}
.content li dl dt {
  width: 3rem;
  display: flex;
  padding:3px;
  flex: 1;
  box-sizing: border-box;
}
.content li dl dt input {
    margin-top: 1.3rem;
}
.content li dl dt img {
  width: 2.6rem;
  padding: 5px;
}
.content li dl dd {
  font-size: 0.25rem;
  padding: 10px;
}
.content li dl dd div {
  display: flex;
  margin-top:20px;
  justify-content: space-between;
}
.content li dl dd p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pri {
  display: flex;
  flex-direction: column;
}
.btns{
    display: flex;
    height: .6rem;
    
}
.btns span{
    border:1px solid #ccc;
    padding:0 10px;
    text-align: center;
    line-height: .6rem;
}
</style>


