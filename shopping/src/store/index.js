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
        n: null

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
                    console.log(i.sid)
                    console.log(payload.infor)
                    if (i.sid == payload.infor.item.sid) {
                        sum += i.jdPrice * 1;
                    }
                })
                console.log(payload.infor.flag)
                if (payload.infor.flag) {
                    console.log(3333)
                    console.log(sum)
                    if (payload.infor.data) {
                        state.count = state.count + sum;
                    } else {
                        state.count = state.count - sum;
                    }

                } else {
                    console.log(444)

                }
            } else {
                state.n = state.shopCar.length;
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
                console.log(state.n)
                if (state.n == state.shopCar.length) {
                    state.checkAll = true;
                    state.check = true;
                }
                state.count = state.count + s;
            } else {
                state.n = state.n - 1;
                state.checkAll = false;
                state.count = state.count - s;
                if (state.n == 0) {
                    state.check = false;
                }

            }
        }
    }
})
export default store;