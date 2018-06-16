<template>
    <div class="wrap">
        <router-view class="box"> </router-view>
        <div class="footer">
            <router-link :to="{name:'home'}">
                <i class="icon iconfont icon-shouye"></i>首页</router-link>
            <router-link :to="{name:'classify'}">
                <i class="icon iconfont icon-fenlei"></i>分类</router-link>
            <router-link :to="{name:'shop'}">
                <i class="icon iconfont icon-gouwuche"></i> 购物车</router-link>
            <router-link :to="{name:'my'}">
                <i class="icon iconfont icon-wode"></i>我的</router-link>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.box {
  flex: 1;
}
.footer {
  height: 0.95rem;
  display: flex;
  justify-content: space-around;
}
.footer a {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer a i.icon {
  padding: 10px 0;
}
</style>


