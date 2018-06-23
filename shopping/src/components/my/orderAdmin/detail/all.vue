<template>
  <div class="list">
    <div>
      <h3>
        <p><img src="@/assets/img/2.jpg" alt="">
          <span>小鱼的店</span>
        </p>
        <p>等待卖家发货</p>
      </h3>
      <dl>
        <dt><img src="@/assets/img/2.jpg" alt=""></dt>
        <dd>
          <p>维生素咀嚼片维生素咀嚼片维素咀嚼片维生素咀嚼片素咀嚼片维生素咀嚼片生素咀嚼片维生素咀嚼片维生素咀嚼片维生素咀嚼片</p>
          <div>
            <span>1899</span>
            <span>x1</span>
          </div>
        </dd>
      </dl>
      <div class="tit">
        <p><span>提醒卖家发货</span><span>申请退款</span></p>
      </div>
    </div>

  </div>
</template>
<script>
import ShopItem from "@/common/shopItem/shopItem"
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["shopCar"]),
  },
  mounted() {

  },
  components: {
    ShopItem
  }
}
</script>
<style>
.list{
  background: #eee;
}
.list > div{
  background: #fff;
}
.list > div h3 {
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
  line-height: 0.73rem;
  height: 0.73rem;
}
.list > div h3 p:nth-of-type(2) {
  color: red;
}
.list > div h3 img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  vertical-align: middle;
}
.list > div dl {
  display: flex;
}
.list > div dl dt {
  width: 2.46rem;
  height: 2.46rem;
  padding: 0.25rem;
}
.list > div dl dt img {
  width: 100%;
  height: 100%;
}
.list > div dl dd {
  flex: 1;
  padding: 0.1rem;
}
.list > div dl dd p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 0.41rem;
  font-size: 0.22rem;
}
.list > div dl dd > div {
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
  margin-top: 0.8rem;
  font-size: 0.23rem;
}
.tit{
  height: 1rem;
  position: relative;
}
.tit p{
  position: absolute;;
  right:.26rem;
  top:.2rem;
  line-height: .6rem;
}
.tit p span{
    border:1px solid #333;
    padding: .05rem .2rem;
    font-size: .22rem;
    margin: .1rem;
    border-radius: 5px;
}
</style>


