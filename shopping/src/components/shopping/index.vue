<template>
    <div class="shopBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo"></i>
            <span>购物车</span>
            <i class="icon iconfont icon-xiaoxi"></i>
        </header>
        <div class="scroll-box">
            <div class="content" v-if="shopCar">
                 <Items  v-for="(item,index) in shopCar" :key="index" :item="item"></Items>
            </div>
           
            <!-- <ul class="content" v-if="shopCar">
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
            </ul> -->
            <div  class ="car" v-else>
                购物车为空
            </div>
        </div>

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
import Items from "./items"
import axios from "axios"
import { mapState,mapActions } from "vuex"
export default {
    data() {
        return {
            shopCar: []
        }
    },
    methods:{

    },
    mounted() {
        this.http.post("http://localhost:3000/getShopitem", { token: getCookie("token") }).then(res => {
            if (res.data.code == 0) {
                this.$router.push({ name: "login", params: { from: to.name } })
            } else {
                this.shopCar=res.data.data;
            }
        });
    },
    components:{
        Items
    }
}
</script>
<style scoped>
.shopBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.scroll-box {
  flex: 1;
  overflow: hidden;
  background: #ccc;
  display: flex;
}
.content {
  width: 100%;
  overflow-y: scroll;
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
.car{
    width:100%;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
}

.pri {
  display: flex;
  flex-direction: column;
}
.btns {
  display: flex;
  height: 0.6rem;
}
.btns span {
  border: 1px solid #ccc;
  padding: 0 10px;
  text-align: center;
  line-height: 0.6rem;
}
</style>


