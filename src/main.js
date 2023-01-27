// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import $ from 'jquery' jq已安装在webpack全局

import axios from 'axios' //引入axios
// axios.defaults.baseURL = 'http://musicapi.leanapp.cn/'
// axios.defaults.baseURL = 'http://47.98.189.161:3000/'
axios.defaults.baseURL = 'http://150.158.49.199:3000/'
Vue.prototype.$axios = axios

import '@/icons/index'//引入svg

// Vue.config.productionTip = false 显示生产tip

/* eslint-disable no-new */
var thisVue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default thisVue
