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
import All from "../components/my/orderAdmin/detail/all"
import Pay from "../components/my/orderAdmin/detail/pay"
import AfterSale from "../components/my/orderAdmin/detail/afterSale"
import Send from "../components/my/orderAdmin/detail/send"
import Receice from "../components/my/orderAdmin/detail/receive"


Vue.use(Router)
let router = new Router({
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
        path:"/orderPage",
        name:"orderPage",
        component:OrderPage,
        children:[ {
            path: "all",
            name: "all",
            component: All
        },{
            path: "pay",
            name: "pay",
            component: Pay
        },{
            path: "afterSale",
            name: "afterSale",
            component: AfterSale
        },{
            path: "send",
            name: "send",
            component: Send
        },{
            path: "receice",
            name: "receice",
            component: Receice
        }]
    }]
})

export default router;