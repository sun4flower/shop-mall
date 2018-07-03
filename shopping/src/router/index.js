import Vue from "vue"
import Router from "vue-router"
import Index from "../components/Index/index"
import Home from "../components/home/index"
import Login from "../components/login/index"
import Register from "../components/register/register"
//import Shop from "../components/shopping/index"
//import classify from "../components/classify/index"
const classify=()=>import(/* webpackChunkName: "classify" */ "../components/classify/index")
const Shop=()=>import(/* webpackChunkName: "Shop" */ "../components/shopping/index")
import My from "../components/my/index"
import Search from "../components/search/index"
import Detail from "../components/detail/detail"
import Region from "../components/my/address/add"
import NewAdd from "../components/my/address/newAdd"
import OrderPage from "../components/my/orderAdmin/orderPage"
import SignOut from "../components/my/setting/signOut"
import ItemDetail from "../components/home/detail/detail"
import {getCookie} from "../utils/cookies"
Vue.use(Router)
let router = new Router({
 mode:'history',//默认是hash模式
  scrollBehavior(to,from,savePosition){ // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    if (to.hash) {
        console.log(to.hash)
        return {
          // 這個是透過 to.hash 的值來找到對應的元素
          // 照你的 html 來看是不用多加處理這樣就可以了
          // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
          selector: to.hash
        }
      }
  },
    routes: [{
        path: "/",
        redirect: "/index/home"
    }, {
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
    },{
        path:"/orderPage/:type",
        name:"orderPage",
        component:OrderPage,
    },{
        path:"/signOut",
        name:"signOut",
        component:SignOut
    },{
        path:"/itemDetail",
        name:"itemDetail",
        component:ItemDetail
    },{
        path: '*',   // 错误路由[写在最后一个]
        redirect: '/index/home'   //重定向
      }
    ]
})
router.beforeEach((to, from, next) => {
    let token = getCookie('token')
    if (to.name == 'my' || to.name == 'shopping') { // 判断是不是点击的我的或者购物车页面
      if (!token) { // 没有token值到登陆页面 获取当前name传入query里
        next({
          name: 'login',
          query: {
            from: to.name // query 传参 登陆进去后直接接入当前页面
          }
        })
      } else {
        next();
      }
    } else {
      next()
    }
  })
  

export default router;