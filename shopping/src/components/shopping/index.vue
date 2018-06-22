<template>
    <div class="shopBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo"></i>
            <span>购物车</span>
            <p>
                <span @click="compile">编辑</span>
                <i class="icon iconfont icon-xiaoxi"></i>
            </p>

        </header>
        <div class="scroll-box">
            <div class="content" v-if="shopCar">
                <Items v-for="(item,index) in shopCar" :key="index" :item="item"></Items>
            </div>
            <div class="car" v-else>
                购物车为空
            </div>
        </div>
        <div class="price">
            <p class="check">
                <i :class="flag?'iconfont icon-checked':'iconfont icon-unchecked'" @click="cancel"></i>
                <span>全选</span>
            </p>
            <p class="all">
                <span>合计: {{count}}</span>
                <span>运费</span>
            </p>
            <p class="account" @click="deletes()">{{msg}}</p>
        </div>

    </div>
</template>
<script>
import { getCookie } from "../../utils/cookies"
import Items from "./items"
import axios from "axios"
import { mapState, mapActions, mapGetters } from "vuex"
import observer from "../../utils/observer"
export default {
    data() {
        return {
            sum: 0,
            flag: true,
            msg: "结算",
            arr: []
        }
    },
    watch: {
        checkAll(n, o) {
            this.flag = n
        }
    },
    mounted() {
        this.getCart_A();
        observer.$on("send", (msg) => {
            if (!msg.flag) {
                if (this.arr.indexOf(msg.item.wname)) {
                    this.arr.push(msg.item.wname)
                }
            } else {
                this.arr.map((i, ind) => {
                    this.arr.splice(ind, 1)
                })
            }
        })
    },
    computed: {
        ...mapState(["shopCar"]),
        ...mapState(["checkAll"]),
        ...mapState(["count"]),

    },
    methods: {
        ...mapActions(["getCart_A"]),
        ...mapActions(["checkAll_A"]),
        ...mapActions(["deleteItem_A"]),
        ...mapActions(["refresh_A"]),
        cancel() {
            this.flag = !this.flag;
            this.checkAll_A(this.flag)
        },
        compile() {
            if (this.msg == "结算") {
                this.msg = "删除"
            } else {
                this.msg = "结算"
            }
        },
        deletes() {
            if (this.msg == "删除") {
                axios.post("http://localhost:3000/delete", { token: getCookie("token"), id: this.arr }).then(res => {
                    if (res.data.code == 0) {
                        alert("删除失败")
                    } else {
                        this.refresh_A()
                    }
                });
            }

        }
    },
    components: {
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
.car {
  width: 100%;
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
.check i.iconfont {
  font-size: 0.4rem;
  color: red;
}
</style>


