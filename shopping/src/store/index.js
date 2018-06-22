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
        checkAll: true,
        check: true,
        count: null,
        n: null,
        deleteArr:[]

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
            axios.post("http://localhost:3000/getShopitem", { token: getCookie("token") }).then(res => {
                if (res.data.code == 0) {
                    router.push({ name: "login", params: { from: "shop" } })
                } else {
                    commit("getCart_M", { data: res.data.data, infor: payload })
                }
            });
        },
        checkAll_A({ commit }, payload) {
            commit("checkAll_M", payload)
        },
        check_A({ commit }, payload) {
            commit("check_M", payload)

        },
        refresh_A({commit}){
            axios.post("http://localhost:3000/getShopitem", { token: getCookie("token") }).then(res => {
                commit("refresh_M",res.data.data)
            });
        }
    },
    mutations: {
        getData_M(state, payload) {
            let obj = { ...state.lists }
            obj[payload.id] = payload.data.secondLevelCategories;
            state.lists = obj;
        },
        getCart_M(state, payload) {
            state.shopCar = payload.data;
            if (payload.infor) {
                let sum = 0;
                state.shopCar.map(i => {
                    if (i.sid == payload.infor.item.sid) {
                        sum += i.jdPrice * 1;
                    }
                })
                if (payload.infor.flag) {
                    if (payload.infor.data) {
                        state.count = state.count*1 + sum;
                    } else {
                        if(state.count==0){
                            return;
                        }
                        console.log(111)
                        state.count = state.count *1- sum;
                    }

                }
            } else {
                state.n = state.shopCar.length;
                state.deleteArr=state.shopCar;
                let sum = 0;
                state.shopCar.map(i => {
                    sum += i.count * i.jdPrice
                })
                state.count = sum;
            }
        },
        checkAll_M(state, payload) {
            let sum = 0;
            if (payload) {
                state.check = true;
                state.checkAll = true;
                state.shopCar.map(i => {
                    sum += i.count * i.jdPrice
                })
                state.count = sum;
                state.n = state.shopCar.length
            } else {
                state.check = false;
                state.checkAll = false;
                state.n = 0;
                state.count = 0;
            }

        },
        check_M(state, payload) {
            let s = payload.item.count * payload.item.jdPrice;
            if (payload.flag) {
                state.n = state.n + 1;
                if (state.n == state.shopCar.length) {
                    state.checkAll = true;
                    state.check = true;
                    console.log(111)
                }
                
                state.count = state.count*1 + s;
            } else {
                state.n = state.n - 1;
                state.checkAll = false;
                state.count = (state.count*1 - s).toFixed(2);
                if (state.n == 0) {
                    state.check = false;
                }

            }
        },
        refresh_M(state,payload){
            state.shopCar=payload;
            state.count=0;
            state.n=0;
            state.check = false;
            state.checkAll = false;
        }
    }
})
export default store;