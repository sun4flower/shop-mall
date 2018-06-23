<template>
    <div class="home-wrap">
        <div class="top">
            <div>
                <i><img src="../../assets/img/1.jpg" alt=""></i>

                <input type="text" placeholder="请输入您要购买的商品" @click="gotoSearch()">
                <p>
                    <span>
                        <i class="icon iconfont icon-dianpu"></i>
                        <b>我的店铺</b>
                    </span>
                    <span>
                        <i class="icon iconfont icon-xiaoxi"></i>
                        <b>消息</b>
                    </span>
                </p>
            </div>
        </div>
        <div class="scroll-box" ref="scrollBox" @scroll="onScroll">
            <div class="swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><img src="../../assets/img/安全食品banner.png" alt=""></div>
                    <div class="swiper-slide"><img src="../../assets/img/家乡味道.png" alt=""></div>
                </div>
            </div>
            <ul class="lists" ref="list">
                <li>
                    <i class="icon iconfont icon-mifan"></i>
                    <span>家乡味道</span>
                </li>
                <li>
                    <i class="icon iconfont icon-chuan"></i>
                    <span>进口食品</span>
                </li>
                <li>
                    <i class="icon iconfont icon-niunai"></i>
                    <span>牛奶乳品</span>
                </li>
                <li>
                    <i class="icon iconfont icon-chongyinkafei"></i>
                    <span>茶果冲饮</span>
                </li>
                <li>
                    <i class="icon iconfont icon-lingshi"></i>
                    <span>休闲零食</span>
                </li>
                <li>
                    <i class="icon iconfont icon-wheat__easyic"></i>
                    <span>水面粮油</span>
                </li>
                <li>
                    <i class="icon iconfont icon-tiaowei"></i>
                    <span>调味调料</span>
                </li>
                <li>
                    <i class="icon iconfont icon-jiushui"></i>
                    <span>酒水饮品</span>
                </li>
            </ul>
            <div class="tit" ref="tit">
                <p>商城动态</p>
                <span>绿色无公害,无污染,无公害,天然有机蔬菜吃的放心，健康第一，安全保证，确保蔬菜安全</span>
            </div>
            <ul class="listsItem" ref="listItem">
                <li v-for="(item,index) in newdata" :key="index">
                    <keep-alive>
                        <ShopItem :item="item"></ShopItem>
                    </keep-alive>
                </li>
            </ul>
            <p class="more" ref="more">加载更多</p>
        </div>
       <toast ref="toast"></toast>
    </div>
</template>
<script>
//import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
import ShopItem from "../../common/shopItem/shopItem"
import jsonp from "../../utils/jsonp"
import axios from "axios"
import observer from '../../utils/observer';
export default {
    data() {
        return {
            flag: true,
            n: 1,
            data: "",
            url: "https://h5api.m.taobao.com/h5/mtop.taobao.wireless.home.load/1.0/?jsv=2.4.11&appKey=12574478&t=1528795798675&sign=b5cc9e50d50441bef8be7813b540488a&api=mtop.taobao.wireless.home.load&v=1.0&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%22containerId%22%3A%22main%22%2C%22ext%22%3A%22%7B%5C%22h5_platform%5C%22%3A%5C%22h5%5C%22%2C%5C%22h5_ttid%5C%22%3A%5C%2260000%40taobao_h5_1.0.0%5C%22%7D%22%7D"
        }
    },
    computed: {
        newdata() {
            return this.data
        }
    },
    mounted() {
        observer.$on("send",(msg)=>{
            this.$refs.toast.active(msg)
        })
        // new Swiper(this.$refs.swiper, {
        //     // autoplay:true
        // }),

        this.http.get("/index/recommend.action?_format_=json&page=1").then(res => {
            this.data = JSON.parse(res.data.recommend).wareInfoList;
        })
        // jsonp(this.url,"mtopjsonp1").then(res=>{
        //     console.log(res)
        // })
    },
    methods: {
        gotoSearch() {
            this.$router.push({ path: "/search", query: { name: "Home" } })
        },
        onScroll() {
            let scrT = this.$refs.scrollBox.scrollTop;
            let docH = this.$refs.scrollBox.offsetHeight;
            let scrH = this.$refs.swiper.offsetHeight + this.$refs.list.offsetHeight + this.$refs.tit.offsetHeight + this.$refs.listItem.offsetHeight + this.$refs.more.offsetHeight;
            if (scrH - docH - scrT < 10 && this.flag) {
                this.flag = false;
                this.n = this.n + 1;
                this.http.get("/index/recommend.action?_format_=json&page=" + `${this.n}`).then(res => {
                    this.data = [...this.data, ...JSON.parse(res.data.recommend).wareInfoList]
                    this.flag = true;
                });
            }
        }
    },
    components: {
        ShopItem
    }
}
</script>
<style scoped>
.home-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-box {
  flex: 1;
  overflow: scroll;
}
.top {
  width: 100%;
  height: 0.88rem;
  position: absolute;
  top: 0;
  z-index: 99;
  background: #fff;
  padding-bottom: 0.88rem;
}
.top > div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.top > div > i {
  flex-basis: 1rem;
  display: block;
  color: #fc5757;
  text-align: center;
  line-height: 0.88rem;
}
.top > div > i > img {
  width: 90%;
  vertical-align: middle;
}

.top input {
  flex: 1;
}
.top p {
  flex-basis: 2rem;
  color: #fc5757;
  box-sizing: border-box;
}
.top p {
  display: flex;
  justify-content: space-around;
}
.top p span {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 0;
}
.top p span i.icon {
  font-size: 0.42rem;
}
.top input {
  height: 0.56rem;
  margin-top: 0.16rem;
  border: none;
  background: #eee;
  border-radius: 5px;
  text-indent: 1em;
}
.swiper-container img {
  width: 100%;
}
.lists {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.lists li {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 0;
}
.lists li i.icon {
  font-size: 20px;
  padding: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  background: #f8c986;
  color: #fff;
}
.lists li:nth-child(2) i.icon {
  background: #ad56f1;
}
.lists li:nth-child(3) i.icon {
  background: #ffde00;
}
.lists li:nth-child(4) i.icon {
  background: #70bf00;
}
.lists li:nth-child(5) i.icon {
  background: #f65c38;
}
.lists li:nth-child(6) i.icon {
  background: #ffc62c;
}
.lists li:nth-child(7) i.icon {
  background: #ffb139;
}
.lists li:nth-child(8) i.icon {
  background: #6962fc;
}
.lists li span {
  line-height: 30px;
}
.tit {
  display: flex;
  padding: 0 0.1rem;
}
.tit p {
  width: 0.72rem;
  font-size: 0.24rem;
  color: #ff6d00;
}
.tit span {
  line-height: 0.3rem;
  font-size: 0.18rem;
}
.listsItem {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
}
.listsItem li {
  width: 50%;
  padding: 8px;
}
.more {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 0.2rem;
}
.swiper-container {
  height: 3.4rem;
}
</style>


