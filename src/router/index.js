import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BigDipper from '@/components/BigDipper'
import NeteaseCloadPlayer from '@/components/NeteaseCloadPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/netease-cload-player'
    },
    {
      path: '/big-dipper',
      name: 'BigDipper',
      component: BigDipper
    },
    {
      path: '/netease-cload-player',
      name: 'NeteaseCloadPlayer',
      component: NeteaseCloadPlayer
    }
  ]
})
