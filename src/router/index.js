import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/indexBand/indexBand'
// import sleepDetails from '@/components/details/sleepDetails'
// import reach from '@/components/details/reach'
import member from '@/components/member/member'
import myset from '@/components/mySet/myset'
import pairing from '@/components/pairing/pairing'
import pairingSuccess from '@/components/pairing/pairingSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/member' },
    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/details/sleepDetails',
      name: 'sleepDetails',
      component: resolve => require(['@/components/details/sleepDetails'], resolve)
    },
    {
      path: '/details/heartDetails',
      name: 'heartDetails',
      component: resolve => require(['@/components/details/heartDetails'], resolve)
    },
    {
      path: '/details/reach',
      name: 'reach',
      component: resolve => require(['@/components/details/reach'], resolve)
    },
    {
      path: '/mySet/myset',
      name: 'myset',
      component: myset
    },
    {
      path: '/pairing/pairing',
      name: 'pairing',
      component: pairing
    },
    {
      path: '/pairing/pairingSuccess',
      name: 'pairingSuccess',
      component: pairingSuccess
    }
  ]
})
