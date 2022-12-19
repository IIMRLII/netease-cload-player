import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NeteaseCloadPlayer from '@/components/NeteaseCloadPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/netease-cload-player'
    },
    {
      path: '/netease-cload-player',
      name: 'NeteaseCloadPlayer',
      component: NeteaseCloadPlayer
    }
  ]
})
