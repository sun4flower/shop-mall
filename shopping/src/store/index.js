import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        lists: {},
        shopCar: []
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
        addItem_A({ commit }, data) {
            commit("addItem_M", data)
        }
    },
    mutations: {
        addItem_M(state, payload) {
            let arr = [...state.shopCar];
            let status=arr.some(i => {
                if (i.wareId == payload.wareId) {
                    i.canAddCart = i.canAddCart-0+ 1;
                    return true
                } else {
                    return false;
                }
            });
            if (status) {
                state.shopCar = arr;
            } else {
                payload.canAddCart=payload.canAddCart-0+1;
                payload.book=true;
                arr.push(payload)
                state.shopCar = arr;
            }
            console.log(state.shopCar)
        },
        getData_M(state, payload) {
            let obj = { ...state.lists }
            obj[payload.id] = payload.data.secondLevelCategories;
            state.lists = obj;
        },
    }
})
export default store;