<template>
    <div class="lists">
        <div class="list">
            <div>
                <h3>
                    <p>
                        <i :class="flag?'iconfont icon-unchecked':'iconfont icon-checked'" @click="cancel()"></i>
                        <img src="@/assets/img/2.jpg" alt="">
                        <span>小鱼的店</span>
                    </p>
                    <p>等待买家付款</p>
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
                    <p>
                        <span>取消订单</span>
                        <span>立即支付</span>
                    </p>
                </div>
            </div>

        </div>
        <p class="msg">到底了哦！！！</p>
    </div>

</template>
<script>
export default {
    data() {
        return {
            flag: true
        }
    },
    methods: {
        cancel() {
            this.flag = !this.flag;
        }
    }
}
</script>
<style scoped>
.lists {
  background: #eee;
  overflow: scroll;
  display: flex;
  flex-direction: column;
}
.list {
  flex: 1;
}
.list div {
  background: #fff;
  margin: 0.1rem 0;
}
.list div h3 {
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
i.iconfont {
  color: red;
  font-size: 0.4rem;
}
.list > div dl dd > div {
  display: flex;
  justify-content: space-between;
  padding: 0 0.1rem;
  margin-top: 0.8rem;
  font-size: 0.23rem;
}
.tit {
  height: 1rem;
  position: relative;
}
.tit p {
  position: absolute;
  right: 0.26rem;
  top: 0.2rem;
  line-height: 0.6rem;
}
.tit p span {
  border: 1px solid #333;
  padding: 0.05rem 0.2rem;
  font-size: 0.22rem;
  margin: 0.1rem;
  border-radius: 5px;
}
.msg {
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  width: 100%;
}
</style>


