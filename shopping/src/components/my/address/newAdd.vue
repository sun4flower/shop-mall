<template>
    <div class="addBox">
        <header class="header">
            <i class="icon iconfont icon-xaingzuo" @click="backFn"></i>
            <span>收货人</span>
            <span></span>
        </header>
        <div class="infor">
            <p><input type="text" placeholder="收货人姓名"></p>
            <p><input type="text" placeholder="手机号"></p>
            <p class="province">
                <select name="" id="">
                    <option value="北京">北京</option>
                    <option value="江苏">江苏</option>
                    <option value="广东">广东</option>
                </select>
                <select name="" id="">
                    <option value="北京">北京</option>
                    <option value="浙江">浙江</option>
                    <option value="广州">广州</option>
                </select>
            </p>
            <p class="area">
                <select name="" id="">
                    <option value="海淀区">海淀区</option>
                    <option value="大兴">大兴</option>                    
                    <option value="朝阳区">朝阳区</option>
                    <option value="通州">通州</option>
                </select>
            </p>
            <p><input type="text" name="" id="" placeholder="详细地址"></p>
            <div><input type="checkbox">设为默认地址</div>
            <p class="submit">
                <button>保存</button>
            </p>
        </div>
    </div>

</template>
<script>
export default {
    methods: {
        backFn() {
            this.$router.push("/region")
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
.infor {
  background: #eee;
  padding: 10px;
  flex: 1;
}
.infor p {
  padding: 10px;
  height: 60px;
}
.infor p input {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  text-indent: 1em;
}
.province{
    display: flex;
    justify-content: space-between;
}
.province select{
    width:40%;
}
.area select{
    width:100%;
    height: 100%;
    border:none;
    outline: none;
    
}
.area select option{
     width:100%;
}
.submit{
    height: 2.9rem;
    line-height: 2.9rem;
    text-align: center;
}
.submit button{
    height: 1rem;
    width:4.5rem;
    background: #fc4141;
    border-radius: 20px;
    color:#fff;
    text-align: center;
    line-height: 1rem;
    border:none;
    font-size: 20px;
    outline: none;
}
</style>



