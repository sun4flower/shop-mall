<template>
    <div class="wrap">
        <header class="header">
            <input type="text" placeholder="输入您要买的商品" v-model="datas" @click="goToSearch">
            <i class="icon iconfont icon-xiaoxi"></i>
        </header>
        <div class="classBox" ref="classBox">
            <div class="left">
                <ul ref="scrollbox" @scroll="onScroll()">
                    <li v-for="(item,index) in data" :key="index" @click="scrollFn" :data-id="index-0+17951827" :class="{'active':code==index-0+17951827}">
                        {{item}}
                    </li>
                </ul>
            </div>

            <div class="right">
                <div class="scroller">
                    <!-- {{newlist.secondLevelCategories}} -->
                    <!-- <img :src="newlist.imageUrl" alt=""> -->
                    <div v-for="(item,index) in newlist" :key="index">
                        <h3>{{item.goodsTypeName}}</h3>
                        <div class="boxs">
                            <dl v-for="(i,ind) in item.goodsTypeList" :key="ind" class="itemBox">
                                <dt>
                                    <img v-lazy="i.goodsTypeImgUrl" alt="">
                                </dt>
                                <dd>
                                    <p>{{i.goodsTypeName}}</p>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            data: ["热门分类", "手机数码", "电脑办公", "电视影音", "空调冰洗", "厨房卫浴",
                "生活电器", "食品酒水", "美妆个户", "母婴玩具", "医疗保健", "服饰鞋帽", "运动户外",
                "箱包奢品", "珠宝首饰", "住宅家具", "家装建材", "家居日用", "床品家纺", "汽车用品"],
            code: 17951827,
            datas:""
        }
    },
    mounted(){
        //this.$store.dispatch("getData_A",17951827);
        this.getData_A(17951827)
    },
    methods: {
        ...mapActions(["getData_A"]),
        onScroll() {

        },
        scrollFn(e) {
            let id = e.target.dataset.id;
            let h = e.target.offsetTop - this.$refs.classBox.offsetTop;
            this.$refs.scrollbox.scrollTop = h;
            this.code = id;
            this.$store.dispatch("getData_A",this.code)
        },
        goToSearch() {
            this.$router.push({path:"/search",query:{name:"classify"}})
            // this.http(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.datas}&dotime=1528960286000`).then(res => {
            //     this.html = res.data
            // })
        }
    },
    computed:{
        ...mapState(["lists"]),
        newlist(){
            return this.lists[this.code]
        }
    }
}
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
}
.header {
  height: 0.9rem;
  display: flex;
  padding: 0 5px;
}
.header i.icon {
  width: 1.1rem;
  font-size: 0.3rem;
  line-height: 0.9rem;
  text-align: center;
}
.header input {
  flex: 1;
  border: none;
  outline: none;
  text-indent: 2em;
}
.classBox {
  display: flex;
  width: 100%;
  height: 100%;
  flex:1;
}
.left {
  width: 2.1rem;
  background: #eeeeee;
  height: 100%;
  display: flex;
}

.left ul {
  overflow-y: scroll;
  flex: 1;
}
.left li {
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
}
.active {
  color: red;
  border-left: 2px solid red;
}
.right {
  flex: 1;
  display: flex;
  padding: 3px;
}
.scroller {
  flex: 1;
  overflow: scroll;
}
.scroller img {
  width: 100%;
}
.boxs {
  display: flex;
  flex-wrap: wrap;
}
.itemBox {
  width: 33.33%;
  padding: 10px;
}
.scroller h3 {
  text-indent: 2em;
}
.itemBox img {
  width: 100%;
}
.img {
  width: 100%;
}
</style>


