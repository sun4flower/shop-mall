import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import http from "./utils/http"
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    loading:require('./assets/img/loading.jpg')
})
Vue.use(http)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
