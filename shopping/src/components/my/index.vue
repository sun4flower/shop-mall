<template>
    <div>
        <header class="header">
            <i class="icon iconfont icon-shezhi" @click="signOut()"></i>
            <span>我的717商城</span>
             <i class="icon iconfont icon-xiaoxi"></i>
        </header>
        <div class="top">
            <div class="img">
                <img :src="url" alt="">
                <p>路飞</p>
            </div>
        </div>
        <div class="shop">
            <span>
                <i class="icon iconfont icon-dianpu"></i>
                我的店铺
            </span>
            <i class="icon iconfont icon-webicon213"></i>
        </div>
        <ul class="order">
            <li>
                <i class="icon iconfont icon-nopayment"></i>
                <router-link :to="{name:'orderPage',params:{type:'pay'}}">待付款</router-link>
            </li>
            <li>
               <i class="icon iconfont icon-daishouhuo"></i>
                <router-link :to="{name:'orderPage',params:{type:'receieve'}}">待收货</router-link>
            </li>
            <li>
                <i class="icon iconfont icon-daifahuo"></i>
                 <router-link :to="{name:'orderPage',params:{type:'send'}}">待发货</router-link>
            </li>
            <li>
                <i class="icon iconfont icon-shouhou"></i>
                <router-link :to="{name:'orderPage',params:{type:'aftersale'}}">售后</router-link>
            </li>
            <li>
                <i class="icon iconfont icon-wodedingdan"></i>
                 <router-link :to="{name:'orderPage',params:{type:'all'}}">全部</router-link>
            </li>
        </ul>
        <ul class="list">
            <li>
                <p>
                   <i class="icon iconfont icon-yue"></i>
                    <span>账号余额</span>
                </p>
                <i class="icon iconfont icon-webicon213"></i>
            </li>
            <li @click="addAdmin">
                <p>
                    <i class="icon iconfont icon-dizhi"></i>
                    <span>地址管理</span>
                </p>
                <i class="icon iconfont icon-webicon213"></i>
            </li>
            <li>
                <p>
                    <i class="icon iconfont icon-kefu"></i>
                    <span>我的客服</span>
                </p>
                <i class="icon iconfont icon-webicon213"></i>
            </li>
        </ul>
        <toast ref="toast"></toast>
    </div>
</template>
<script>
export default {
    data(){
        return{
            url:""
        }
    },
    mounted(){
         this.http.post("/getImage").then(res => {
                this.url = res.data.data;
            })
    },
    methods:{
        addAdmin(){
            this.$router.push("/region")
            
        },
        signOut(){
            this.$router.push({name:"signOut"})
        },
    }
}
</script>
<style scoped>
.header {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
}
.top {
  height: 80px;
  width: 100%;
  background: url("../../img/未标题-3.png");
}
.shop {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 80px;
  font-size: 20px;
  line-height: 80px;
  color: #fc4141;
}
.shop span i.icon {
  font-size: 55px;
}
.order {
  display: flex;
  justify-content: space-around;
  height: 60px;
}
.order li {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 30px;
}
.order li i.icon {
  font-size: 25px;
}
.list li{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
}
.img{
    width:60px;
    margin:0 auto;
    padding-top: 10px;
    text-align: center;
}
.img img{
    width:80%;
    border-radius: 50%;
}
.img p{
    text-align: center;
    line-height: 20px;
    color:#fff;
}
</style>


