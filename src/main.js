// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import $ from 'jquery' jq已安装在webpack全局

import axios from 'axios' //引入axios
axios.defaults.baseURL = 'http://musicapi.leanapp.cn/'
Vue.prototype.$axios = axios

// import '@/old_components/main.css'
// import '@/old_components/mouse/mouse.css'
// import '@/old_components/lrc/lrc.css'
// import '@/old_components/player/player.css'
// import '@/old_components/player/player.css'
// import '@/old_components/top/top.css'
// import '@/old_components/search/search.css'
// import '@/old_components/media.css'
// import '@/old_components/recommend/recommend.css'
// import '@/old_components/songList/songList.css'
// import '@/old_components/album/album.css'
// import '@/old_components/singer/singer.css'

// import '@/old_components/user/suspensions.css'
// import '@/old_components/user/login.css'
// import '@/old_components/user/register.css'
// import '@/old_components/user/userinfo.css'


// Vue.config.productionTip = false 显示生产tip

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
