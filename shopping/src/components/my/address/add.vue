<template>
    <div class="addBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货地址</span>
            <span></span>
        </header>
        <ul class="inforBox">
            <li v-for="(item,ind) in list" :key="ind">
                <p>
                    <span>{{item.username}}</span>
                    <span>{{item.phone}}</span>
                </p>
                <p>{{item.province}}{{item.city}}{{item.area}}{{item.street}}</p>
                <div class="select">
                    <aside>
                        <input type="checkbox">
                        <span>默认地址</span>
                    </aside>
                    <aside>
                        <span @click="edit(item)">编辑</span>
                        <span @click="deletes(item)">删除</span>
                    </aside>
                </div>
            </li>

        </ul>

        <div class="footer">
            <button @click="newAdd()">新增地址</button>
        </div>
        <toast></toast>
    </div>

</template>
<script>
import axios from "axios";
import { getCookie } from "../../../utils/cookies"
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.http.post("/getaddr", { token: getCookie("token") }).then(res => {
                if (res.data.code == 0) {
                    this.$router.push({name:"login",params:{from:"region"}})
                } else {
                    this.list = res.data.msg;
                }
            })
        },
        backFn() {
            this.$router.push({ name: "my" })
        },
        newAdd() {
            this.$router.push({ name: "newAdd", type: "add" })
        },
        edit(item) {
            this.$router.push({ name: "newAdd", params: { type: "edit", data: { id: item.id, username: item.username, phone: item.phone, province: { name: item.province }, city: { name: item.city }, area: item.area, street: item.street } } })
        },
        deletes(item) {
            if (confirm("确定删除吗")) {
                this.http.post("/deleteaddr", { token: getCookie("token"), data: { id: item.id } }).then(res => {
                    if (res.data.code == 0) {
                        this.$toastBus.$emit("toast", "删除失败")
                    } else {
                        this.getData()
                    }
                })
            }

        }
    }
}
</script>
<style scoped>
.addBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.inforBox {
  padding: 10px;
  flex: 1;
}
.inforBox p {
  line-height: 30px;
  font-size: 0.2rem;
  color: #8c8c8c;
}
.inforBox p span {
  color: #333;
  font-size: 0.2rem;
}
.select {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  font-size: 0.2rem;
}
.footer {
  height: 1.7rem;
}
.footer button {
  width: 4.6rem;
  height: 0.97rem;
  background: #fc4141;
  color: #fff;
  text-align: center;
  line-height: 0.97rem;
  font-size: 0.3rem;
  margin: 0.5rem auto;
  display: block;
  border: none;
  outline: none;
  border-radius: 25px;
}
</style>



