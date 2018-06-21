# 项目总结
 1. 本项目是717商城项目，主要功能点包括商品展示，添加购物车，搜索功能，以及登录注册。主要使用vue-cli脚手架搭建，vue-router做页面路由，并结合vuex做数据缓存。项目中还使用了一些插件，如vue-lazyload做图片缓存，swiper做轮播图
 2. 路由搭建，
    首先搭建项目的一级路由，如主页，登录页，注册页，搜索页
     routes: [
                {
                    path: "/",
                    redirect: "/index/home"
                }, {
                    path: "/index",
                    name: "Index",
                    component: Index,
                }, {
                    path: "/login",
                    name: "login",
                    component: Login
                },{
                    path:"/search",
                    name:"search",
                    component:Search
                },{
                    path:"/detail",
                    name:"detail",
                    component:Detail
                },{
                    path:"/region",
                    name:"region",
                    component:Region
                },{
                    path:"/newAdd",
                    name:"newAdd",
                    component:NewAdd
                },{
                    path:"/register",
                    name:"register",
                    component:Register
                }
            ]
    然后搭建项目的二级路由，如主页下方的四个tab切换（首页，分类，购物车，我的）
    routes: [
                {
                    path: "/index",
                    name: "Index",
                    component: Index,
                    children: [{
                        path: "home",
                        name: "home",
                        component: Home
                    },{
                        path: "shop",
                        name: "shop",
                        component: Shop
                    },
                        , {
                        path: "classify",
                        name: "classify",
                        component: classify
                    }, {
                        path: "my",
                        name: "my",
                        component: My
                    }]
                }
            ]
    在做路由搭建的时候涉及到了一些路由拦截问题，以为涉及用户个人信息时，需要确定用户是否登录，这时用到了beforeRouteEnter，在进入用户的个人页面时，先向后台发送token，查看后台是否存在，如存在，用户可以访问，如果不存在需跳转到登录页面
3.  在商品列表页涉及到下拉刷新问题，这里用到了offset、scrollTop等js原生方法。
    在做项目时模拟了一下后台，主要是我需要使用的各种端口，以及登录时发送cookies的加密，使用了jsonwebtoken来做token加密。在向后台请求数据时，需要结合vuex缓存数据，避免多次向服务器发起请求。
    项目中还涉及到了跨域问题，解决跨域有三种方式，分别是jsonp、proxy代理以及cors。
    第一种jsonp运用了动态创建scrip标签，用他的src属性访问跨域的js脚本，并且需要在全局准备一个函数，服务端会返回一段调用这个函数的js代码，并传递我们调用的数据，我们就可以在这个全局函数中得到这个参数。
    function jsonp(url, names) {
        return new Promise((resolve, reject) => {
                window[names] = function (data) {
                    resolve(data)
                }
                let script = document.createElement("script")
                script.src = url;
                document.body.appendChild(script)
            })
         }
    第二种proxy代理将设置好的端口代理到其他域名的服务器请求地址，changeOrigin: true是必须的参数，pathRewrite会重写url，将prox去掉
     "/proxy": {
        target: 'https://m.gome.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
    第三种cors 是cross origin resource shareing的缩写，跨源资源共享。
    这个方法主要后端对响应头进行设置
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
        'Access-Control-Allow-Methods': 'POST'
    })
    分为简单请求和非简单请求
    非简单请求是post请求，他会先发起一次预请求，请求成功后再允许请求后台数据
    添加购物车使用了组件封装，每一条商品用组件封装以便复用，渲染子组件时，父组件用props给子组件传递数据。在子组件操作数据时，如增加减少，涉及到了子父通讯，
    一共有三种方式传递数据 
    第一种为this.$emit 父组件使用v-bind:"发送的事件事件名"来监听子组件的事件
    第二种是global event bus 定义全局变量来实现组件间通讯
    第三种是vuex 本项目使用了vuex来实现组件间通讯
    

4.  做项目时遇到了一个渲染问题，主要因为数据中有个别数据与其他数据不同，如商品列表数据中推荐了一些商店，在就需要不同的dom结构，我困扰了一天，最后想到了用v-if这     个指令来实现不同的dom渲染结构

