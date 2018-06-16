<template>
  <div class="login-box">
    <h3 class="top">
      <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
      <span>登录717</span>
      <span @click="goToRegister">注册</span>
    </h3>
    <form>
      <p>
        <i class="icon iconfont icon-ren"></i><input type="text" v-model="form.username"></p>
      <p>
        <i class="icon iconfont icon-42"></i><input type="text" v-model="form.password"></p>
    </form>
    <div class="submit">

      <button @click="submit">立即登录</button>
      <a href="">忘记密码</a>
    </div>
    <div class="bot">
      <p class="tit">
        <i></i>
        <span>第三方账号登录</span>
        <i></i>
      </p>
      <ul class="account">
        <li>
          <i class="icon iconfont icon-weixin-copy"></i>
          <span>微信</span>
        </li>
        <li>
          <i class="icon iconfont icon-weibo"></i>
          <span>微博</span>
        </li>
        <li>
          <i class="icon iconfont icon-qq-copy"></i>
          <span>QQ</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    backFn() {
        this.$router.push({ name: "home" })
    },
    submit() {
      let userReg = /^1[5836]\d{9}$/
       if (!userReg.test(this.form.username)) {
        alert("請輸入正確的手機號")
        return
      }
      let pwdReg = /\d{6,}/
      if (pwdReg.test(this.form.password)) {
        alert("請輸入正確格式的密碼")
        return
      }
      if (this.form.username == "" || this.form.password == "" || this.form.repassword=="") {
           alert("不能為空")
        return
      }
      this.http.post("http://localhost:3000/user",{username: this.form.username, password: this.form.password } ).then(res => {
        if (res.data.code == 1) {
          document.cookie=`token=${res.data.token}`;
          console.log(this.$route.params.from)
          if (this.$route.params.from != undefined) {
            this.$router.push({name:this.$route.params.from})
          } else {
            this.$router.push({name:"home"})
          }

        } else {
          alert(res.data.msg)
        }
      })
    },
    goToRegister() {
      this.$router.push({ name: "register" })
    }
  }
}
</script>
<style scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
}
.top {
  height: 1.2rem;
  line-height: 1.2rem;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  background: #fff;
}
.top span {
  font-size: 0.24rem;
  font-weight: normal;
}
.top span:nth-child(3) {
  color: #fc4141;
  font-size: 0.2rem;
}
form {
  padding-top: 5px;
}
form p {
  display: flex;
  height: 1.1rem;
  line-height: 1.1rem;
  background: #fff;
}
form p i.icon {
  width: 0.8rem;
  font-size: 0.4rem;
  text-align: center;
}
form p input {
  flex: 1;
  border: none;
  outline: none;
  border-bottom: 1px solid #eee;
}
.submit {
  height: 3.5rem;
}
.submit button {
  display: block;
  width: 5.5rem;
  height: 1.1rem;
  background: #fc4141;
  margin: 1.1rem auto 0;
  border: none;
  border-radius: 30px;
  font-size: 0.3rem;
  text-align: center;
  color: #fff;
  font-weight: normal;
  outline: none;
}
.submit a {
  display: block;
  line-height: 60px;
  text-align: right;
  padding: 0 30px;
  text-decoration: underline;
  color: #666666;
}
.bot {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4rem;
  width: 100%;
}
.tit {
  display: flex;
  height: 30px;
  justify-content: center;
}
.tit i {
  display: block;
  border-bottom: 1px solid #333;
  width: 1.2rem;
  height: 15px;
}
.tit span {
  line-height: 30px;
  padding: 0 10px;
}
.account {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.account li {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.account li i.icon {
  font-size: 1.2rem;
}
.account li span {
  text-align: center;
  font-size: 18px;
  font-weight: 100;
}
.account li:nth-child(1) i.icon {
  color: #3cd656;
}
.account li:nth-child(2) i.icon {
  color: #fa7065;
}
.account li:nth-child(3) i.icon {
  color: #2ebdf2;
}
</style>


