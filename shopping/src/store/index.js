import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
import { getCookie } from "../utils/cookies"
import router from "../router/index"
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        lists: {},
        shopCar: [],
        deleteArr: [],
        scrollTo:''

    },
    actions: {
        getData_A({ commit, state }, id) {
            if (!state.lists[id]) {
                axios.get(`/proxy/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${id}`).then(res => {
                    commit("getData_M", {
                        id: id,
                        data: res.data
                    })
                });
            }
        },
        getCart_A({ commit }, payload) {
            axios.post("http://192.168.191.1:3000/getShopitem", { token: getCookie("token") }).then(res => {
                if (res.data.code == 0) {
                    router.push({ name: "login", params: { from: "shop" } })
                } else {
                    commit("getCart_M", { data: res.data.data, payload: payload })
                }
            });
        },
        checkItem_A({ commit }, payload) {
            commit("checkItem_M", payload)
        },
        checkAll_A({ commit }, payload) {
            commit("checkAll_M", payload)
        },
        refresh_A({ commit }) {
            axios.post("http://192.168.191.1:3000/getShopitem", { token: getCookie("token") }).then(res => {
                if (res.data.code == 0) {
                    router.push({ name: "login", params: { from: "shop" } })
                } else {
                    commit("refresh_M", res.data.data)
                }
            });
        },
        scroll_A({commit},payload){
            commit("scroll_M",payload)
        }

    },
    mutations: {
        getData_M(state, payload) {
            let obj = { ...state.lists }
            obj[payload.id] = payload.data.secondLevelCategories;
            state.lists = obj;
        },
        getCart_M(state, payload) {
            if (payload.payload) {
                let obj = [...state.shopCar]
                obj.map(i => {
                    if (i.wname == payload.payload.item.wname) {
                        i.count = payload.payload.count
                    }
                    return i
                })
                state.shopCar = obj;
            } else {
                let obj = [...payload.data]
                obj.map(i => {
                    i.check = true;
                    return i
                })
                state.shopCar = obj;
            }

        },
        checkItem_M(state, payload) {
            let arr = [...state.shopCar]
            arr.map(i => {
                if (i.wname == payload.wname) {
                    i.check = !i.check;
                    return i
                }
            })
        },
        checkAll_M(state, payload) {
            let arr = [...state.shopCar]
            arr.map(i => {
                if (payload) {
                    i.check = true
                } else {
                    i.check = false
                }
                return i;
            })
        },
        refresh_M(state, payload) {
            let arr = [...payload]
            arr.map(i => {
                i.check = false
                return i;
            })
            state.shopCar = arr;
        },
        scroll_M(state,payload){
            state.scrollTo=payload;
        }

    },
    getters: {
    }
})
export default store;