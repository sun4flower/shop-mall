# 项目总结
 1. 本项目是717商城项目，主要功能点包括商品展示，添加购物车，搜索功能，以及登录注册。主要使用vue-cli脚手架搭建，vue-router做页面路由，并结合vuex做数据缓存。项目中还使用了一些插件，如vue-lazyload做图片缓存，swiper做轮播图
 2. 路由搭建，
     * 一级路由，如主页，登录页，注册页，搜索页<br />
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
     * 项目的二级路由，如主页下方的四个tab切换（首页，分类，购物车，我的）<br />
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
            ]\
    在做路由搭建的时候涉及到了一些路由拦截问题，以为涉及用户个人信息时，需要确定用户是否登录，这时用到了beforeRouteEnter，在进入用户的个人页面时，先向后台发送token，查看后台是否存在，如存在，用户可以访问，如果不存在需跳转到登录页面.</br>
    * 本项目在路由切换的时候使用了动态import(基于Promise的API)的方式，类实现异步加载模块。当然这种方法也有一定的弊端，比如客户的网可能时好时坏，在网速好的时候不能请求全部页面，也许客户请求的时候正好是网不好，就会慢一点，但是这个方法会加速客服的首页请求，因为他把打包好的bundle文件拆分了，就会加速首页请求。
       * 具体使用方法<br />
        引入babel-plugin-syntax-dynamic-import 配置babelrc "plugins": ["syntax-dynamic-import"]
        const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue') 使用chunkFilename: '[name].bundle.js',可以另命名拆分的文件
    * 客服在切换订单详情时，可以共用一个组件，当从不同组件进入同一组件时，可以使用动态路由传参的方法，根据参数不同，向后台发起不同的请求。
      * 具体使用方法 <br />
      需要在路由中先配好{path:"/orderPage/:type"}，在页面中 :to="{name:'orderPage',params:{type:'all'} 使用params传递不同的参数
3.  项目中具体技术 
     * 在商品列表页涉及到下拉刷新问题，这里用到了offset、scrollTop等js原生方法。
    在做项目时模拟了一下后台，主要是我需要使用的各种端口，以及登录时发送cookies的加密，使用了jsonwebtoken来做token加密。在向后台请求数据时，需要结合vuex缓存数据，避免多次向服务器发起请求。
    * 项目中还涉及到了跨域问题，解决跨域有三种方式，分别是jsonp、proxy代理以及cors。
       第一种jsonp运用了动态创建scrip标签，用他的src属性访问跨域的js脚本，并且需要在全局准备一个函数，服务端会返回一段调用这个函数的js代码，并传递我们调用的数据，我们就可以在这个全局函数中得到这个参数\
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
    * 添加购物车使用了组件封装，每一条商品用组件封装以便复用，渲染子组件时，父组件用props给子组件传递数据。在子组件操作数据时，如增加减少，涉及到了子父通讯，
    一共有三种方式传递数据 
      * 第一种为this.$emit 父组件使用v-bind:"发送的事件事件名"来监听子组件的事件
      * 第二种是global event bus 定义全局变量来实现组件间通讯
      * 第三种是vuex 本项目使用了vuex来实现组件间通讯 vuex中通过改变父子组件的checked来实现全选反选功能，当选中全部子组件的时候，通过数据长度和选中组件的个数来判断，如果相等，父组件checked，如不等，父组件unchecked·
    * 判断生产模式还是开发模式baseURL:process.env.NODE_ENV=="production"?testUrl:onlineUrl
      向js脚本注入变量new webpack.DefinePlugin()
    * 当客服更改头像时，需要向后台传输图片，需要将图片编码成二进制的数据流，共有两种方法
      * 第一种是使用h5新的api=>formData,使用方法</br>let 实例化formData = new FormData() 添加图片formData.append('img', e.target.files[0])
      请求后台接口时将图片作为参数传给后台，后台可以使用multer包来解析保存
      * 第二种方法为form表单本身就有属性enctype="multipart/form-data"</br>
        enctype：规定了form表单在发送到服务器时候编码方式。他有如下的三个值。 
        ①application/x-www-form-urlencoded。默认的编码方式。但是在用文本的传输和MP3等大型文件的时候，使用这种编码就显得 效率低下。 
        ②multipart/form-data 。 指定传输数据为二进制类型，比如图片、mp3、文件。 
        ③text/plain。纯文体的传输。空格转换为 “+” 加号，但不对特殊字符编码。
    * 添加地址时有多选框，这里使用了vue-multiselect

4.  做项目时遇到了一个渲染问题，主要因为数据中有个别数据与其他数据不同，如商品列表数据中推荐了一些商店，在就需要不同的dom结构，我困扰了一天，最后想到了用v-if这个指令来实现不同的dom渲染结构

