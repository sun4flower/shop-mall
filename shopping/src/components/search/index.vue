<template>
    <div>
        <div class="top">
            <input type="text" @keyup="goToSearch" v-model="data">
            <span @click="cancel">取消</span>
        </div>
        <ul v-html="html" v-if="html" class="html">

        </ul>
        <div v-else>
            <div class="recent">
                <p>最近搜索</p>
                <div class="list">
                    <span>大米</span>
                    <span>巧克力</span>
                </div>
            </div>

            <div class="search">
                <p>大家都在搜</p>
                <div class="lists">
                    <span>蜂蜜</span>
                    <span>三黄鸡</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            data: "",
            html: ''
        }
    }, 
    methods: {
        cancel() {
            this.$router.push({name:this.$route.query.name})
        },
        goToSearch() {
            this.http(`https://m.gome.com.cn/index.php?ctl=index&act=keywordsPromptNew&keystr=${this.data}&dotime=1528960286000`).then(res => {
                this.html = res.data
            })
        }
    }
}
</script>
<style scoped>
.top {
  width: 100%;
  padding-left: 20px;
  height: 40px;
  display: flex;
}
.top input {
  height: 30px;
  margin-top: 5px;
  background: #eee;
  flex: 1;
  border: none;
  border-radius: 5px;
}
.top span {
  width: 1.2rem;
  text-align: center;
  line-height: 40px;
  font-size: 0.24rem;
}
p {
  padding: 0 10px;
  color: #838383;
  font-size: 0.24rem;
}
.list,
.lists {
  display: flex;
  flex-wrap: wrap;
}
.list span,
.lists span {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin: 5px;
}
.html {
  line-height: 30px;
  padding: 0 10px;
}
</style>


