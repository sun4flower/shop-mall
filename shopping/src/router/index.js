import Vue from "vue"
import Router from "vue-router"
import Index from "../components/Index/index"
import Home from "../components/home/index"
import Login from "../components/login/index"
import Register from "../components/register/register"
import Shop from "../components/shopping/index"
import classify from "../components/classify/index"
import My from "../components/my/index"
import Search from "../components/search/index"
import Detail from "../components/detail/detail"
import Region from "../components/my/address/add"
import NewAdd from "../components/my/address/newAdd"
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
    }]
})

export default router;