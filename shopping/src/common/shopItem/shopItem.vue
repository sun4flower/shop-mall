<template>
  <div>
    <dl v-if="item.jdPrice">
      <dt @click="goToDetail(item.clickUrl)">
        <img v-lazy="item.imageurl" alt="">
      </dt>
      <dd>
        <h4>{{item.wname}}</h4>
        <div>
          <span>￥{{item.jdPrice}}</span>
          <i class="icon iconfont icon-gouwuche" @click="addItem(item)" ref="btn"></i>
          <!-- <p class="btns">
            <span>-</span>
            <span>{{item.count}}</span>
            <span @click="addNum(item)">+</span>
          </p> -->
        </div>
      </dd>
    </dl>
    <dl v-else class="store">
      <dt @click="goToDetail(item.clickUrl)">
        <img v-lazy="item.imageurl" alt="">
      </dt>
      <dd>
        {{item.wname}}
      </dd>

    </dl>
  </div>

</template>
<script>
import { mapState, mapActions } from "vuex";
import { getCookie } from "../../utils/cookies"
import observer from "../../utils/observer";
export default {
  props: ["item"],
  data() {
    return {
      price: null,
      num:1
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions(["addItem_A"]),
    goToDetail(url) {
      this.$router.push({ path: "/detail", query: { url: url } })
    },
    addItem(item) {
      this.http.post("http://localhost:3000/addCart", { token: getCookie("token"), item: item }).then(res => {
        if (res.data.code == 0) {
          alert("登录超时，请重新登录")
          this.$router.push({ name: "login" })
        } else {
          //this.$refs.btn.classList.add("active")
         
          alert("添加成功")
        }
      })
    },
    addNum() {
       this.http.post("http://localhost:3000/addNum", { token: getCookie("token"), item: this.item }).then(res => {
         if(res.data.code==1){
           this.num++;
         }else{
           alert("添加失败")
         }
      })
    }
  }
}
</script>

<style scoped>
li dl {
  width: 100%;
}
img {
  width: 100%;
}
dl dd h4 {
  padding: 0 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
  font-size: 0.2rem;
}
dl dd div {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  height: 40px;
  line-height: 40px;
  position: relative;
}
dl dd div span {
  color: red;
  font-size: 0.25rem;
  line-height: 35px;
}
dl dd div i.icon {
  font-size: 0.4rem;
  background: #fff;
  z-index: 99;
}
.active {
  display: none;
}
li dl {
  width: 100%;
}
img {
  width: 100%;
}
dl dd h4 {
  padding: 0 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 20px;
  font-size: 0.2rem;
}
dl dd p {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  height: 40px;
  line-height: 40px;
}
dl dd p span {
  color: red;
  font-size: 0.25rem;
  line-height: 35px;
}
dl dd p i.icon {
  font-size: 0.4rem;
}
.store {
  line-height: 30px;
  font-size: 0.22rem;
}
.btns {
  position: absolute;
  right: 0;
  top: 0;
}
</style>

