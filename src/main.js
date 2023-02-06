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

import { Message } from 'element-ui';//按需引入elementui
Vue.component(Message)
// Vue.prototype.$message = Message

//注意：这里使用的$message,所以在使用时候也是this.$message
Vue.prototype.$message = function(msg){
  return Message({
    message: msg,
    duration: 2000,
    showClose: true,
  })
}
//分别对success、warning和error等样式进行设置
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 2000,
    showClose: true,
  })
}
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 2000,
    showClose: true,
  })
}
Vue.prototype.$message.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 2000,
    showClose: true,
  })
}


// Vue.config.productionTip = false 显示生产tip

/* eslint-disable no-new */
var thisVue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default thisVue