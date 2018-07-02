<template>
    <dl>
        <dt>
            <i :class="item.check?'iconfont icon-checked':'iconfont icon-unchecked'" @click="check(item)"></i>
            <img :src="item.imageurl" alt="">
        </dt>
        <dd>
            <p>
                {{item.wname}}
            </p>
            <div>
                <aside class="divri">
                    <span style="color:#a3a3a3;">x 1</span>
                    <p style="color:red;">￥{{item.jdPrice}}</p>
                </aside>
                <aside class="btns">
                    <span @click="subNum(item)">-</span>
                    <span>{{item.count}}</span>
                    <span @click="addNum(item)">+</span>
                </aside>
            </div>

        </dd>
        <toast></toast>
    </dl>
</template>
<script>
import { getCookie } from "../../utils/cookies"
import observer from "../../utils/observer"
import { mapState, mapActions, mapGetters } from "vuex"
export default {
    data() {
        return {
            flag: true
        }
    },
    props: {
        item: {
            required: true,
            type: Object
        }
    },
    computed: {

    },
    methods: {
        ...mapActions(["checkItem_A"]),
        ...mapActions(["getCart_A"]),
        check(item) {
            this.checkItem_A(item)
        },
        subNum(item) {
            if (item.count <= 1) {
                this.$toastBus.$emit("toast", "不能再少了！！！")
            } else {
                this.http.post("/subNum", { token: getCookie("token"), item: item}).then(res => {
                     this.getCart_A({item:item,count:item.count-1})
                })
            }
        },
        addNum(item) {
            this.http.post("/addNum", { token: getCookie("token"), item: item }).then(res => {
                this.getCart_A({item:item,count:item.count+1})
            })
        }

    }
}
</script>

<style>
dl {
  display: flex;
  height: 2.6rem;
  background: #fff;
  margin: 4px 0;
  padding: 2px;
}
dl dt {
  width: 3rem;
  display: flex;
  padding: 3px;
  flex: 1;
  box-sizing: border-box;
}
dl dt i.iconfont {
  font-size: 0.4rem;
  color: red;
  margin-top: 1.1rem;
}

dl dt img {
  width: 2.6rem;
  padding: 5px;
}
dl dd {
  font-size: 0.25rem;
  padding: 10px;
}
dl dd div {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
dl dd p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

