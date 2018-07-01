<template>
  <div class="login-box">
    <h3 class="top">
      <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
      <span>注册</span>
      <span @click="goToLogin">登录</span>
    </h3>
    <form>
      <p>
        <i class="icon iconfont icon-ren"></i><input type="text" v-model="form.username" placeholder="请输入手机号">
      </p>
      <p>
        <i class="icon iconfont icon-42"></i><input type="text" v-model="form.password" placeholder="请输入密码">
      </p>
      <p>
        <i class="icon iconfont icon-42"></i><input type="text" v-model="form.repassword" placeholder="请再次输入密码">
      </p>
    </form>
    <div class="submit">
      <button type="button" @click="submit">立即注册</button>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        repassword: ""
      }
    }
  },
  methods: {
    backFn() {
      this.$router.push({ name: "Login" })

    },
    submit() {
      let userReg = /^1[5836]\d{9}$/
      if (!userReg.test(str.trim(this.form.username))) {
        alert("請輸入正確的手機號")
        return
      }
      if (this.form.password != this.form.repassword) {
        alert("密碼不一致")
        return
      }
      if (this.form.username == "" || this.form.password == "" || this.form.repassword=="") {
           alert("不能為空")
        return
      }
      this.http.post("/user/register",{ username: str.trim(this.form.username), password:str.trim(this.form.password) }).then(res => {
          if(res.data.code==1){
             this.$router.push({ name: "login" })
          }else{
            alert(res.data.msg)
            
          }
      })
    },
    goToLogin(){
         this.$router.push({ name: "login" })
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




