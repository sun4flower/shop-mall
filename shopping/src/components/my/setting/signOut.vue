<template>
    <div>
        <heads :tit="tit"></heads>
        <div class="infor">
            <p class="img">
                <span>我的头像</span>
                <span>
                    <img :src="url" alt="">
                    <input type="file" @change="changeImg">
                </span>
            </p>
            <p>
                <span>用户名</span>
                <span>路飞</span>
            </p>
            <p>
                <span>我的二维码</span>
            </p>
        </div>
        <button @click="signout">退出登录</button>
        <confirm></confirm>
    </div>
</template>
<script>
import heads from "@/common/header/header"
import { delCookie, getCookie } from "@/utils/cookies"
export default {
    data() {
        return {
            tit: {
                tip: "设置",
                url: "my"
            },
            url: ""
        }
    },
    created() {
        if (!getCookie("token")) {
            this.$router.push({ name: 'login', params: { from: "signOut" } })
        } else {
            this.getImage()
        }

    },
    methods: {
        getImage() {
            this.http.post("/getImage").then(res => {
                this.url = res.data.data;
                console.log(res)
            })
        },
        signout() {
            this.$confirmBus.$emit("confirm", { msg: "确定要退出登录吗", show: true })
            this.$confirmBus.$on("send", (msg) => {
                if (msg) {
                    delCookie("token")
                    this.$router.push({ name: "my" })
                }
                this.$confirmBus.$emit("confirm", { msg: "确定要退出登录吗", show: false })
            })
        },
        changeImg(e) {
            let formData = new FormData()
            formData.append('img', e.target.files[0])
            this.http.post("/setImage", formData).then(res => {
                this.url = res.data.data;
                // this.getImage()

            })
        }
    },
    components: {
        heads
    }
}
</script>
<style scoped>
.infor p {
  display: flex;
  padding: 0 0.1rem;
  line-height: 0.8rem;
  height: 0.8rem;
  font-size: 0.2rem;
  justify-content: space-between;
}
button {
  width: 60%;
  display: block;
  margin: 3rem auto;
  background: #f50;
  color: #fff;
  text-align: center;
  line-height: 0.8rem;
  height: 0.8rem;
  border: none;
  outline: none;
}
.img span:nth-child(2) {
  width: 0.8rem;
  height: 0.8rem;
  line-height: .8rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.img span img {
  width:100%;
}
.img span input {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>


