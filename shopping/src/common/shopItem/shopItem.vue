<template>
  <div>
    <dl v-if="item.jdPrice">
      <dt @click="goToDetail(item.clickUrl)">
        <img v-lazy="item.imageurl" alt="">
      </dt>
      <dd>
        <h4>{{item.wname}}</h4>
        <p>
          <span>￥{{item.jdPrice}}</span>
          <i class="icon iconfont icon-gouwuche" @click="addItem(item)" ref="btn"></i>
        </p>
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
      num: 1
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
      this.http.post("/addCart", { token: getCookie("token"), item: item }).then(res => {
        if (res.data.code == 0) {
          observer.$emit("send", "登录超时，请重新登录")
          this.$router.push({ name: "login" })
        } else {
          observer.$emit("send", "添加成功")
        }
      })
    },
    addNum() {
      this.http.post("/addNum", { token: getCookie("token"), item: this.item }).then(res => {
        if (res.data.code == 1) {
          this.num++;
        } else {
          observer.$emit("send", "添加失败")
        }
      })
    }
  }
}
</script>

<style scoped>
dl {
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
dl dt {
  width: 100%;
  height: 3rem;
}
dl dt img {
  width: 100%;
  height: 100%;
}
dl dd {
  height: 1rem;
}
dl dd h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 0.6rem;
  line-height: 0.3rem;
  font-size: 0.2rem;
}
dl dd p{
  display: flex;
  justify-content: space-between;
}
dl dd p i.icon{
  font-size: .3rem;
  vertical-align: middle;
}
</style>

