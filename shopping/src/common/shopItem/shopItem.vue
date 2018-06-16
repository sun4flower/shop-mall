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
          <i class="icon iconfont icon-gouwuche" @click="addItem(item)"></i>
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
export default {
  props: ["item"],
  data() {
    return {
      price: null
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions(["addItem_A"]),
    goToDetail(url) {
      this.$router.push({ path: "/detail", query: { url: url } })
    },
    addItem(i) {
      this.addItem_A(i)

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
</style>

