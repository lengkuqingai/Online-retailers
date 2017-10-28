// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '../config/api.config'
Vue.use(VueAxios,Axios)
Axios.defaults.baseURL=apiConfig.baseUrl;
Vue.use(infiniteScroll)
// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
 preLoad: 1.2,
 loading: '../static/img/ok-2.png',
 attempt: 1
})
Vue.config.productionTip = false
import '../static/css/index.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
