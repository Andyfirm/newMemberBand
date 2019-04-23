import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('@/components/index/index.vue')
const orders = () => import('@/components/order/order.vue')
const stadiumDetails = () => import('@/components/index/secondaryPage/stadiumDetails.vue')
const ticketsOnline = () => import('@/components/index/secondaryPage/ticketsOnline.vue')
const ticketRecord = () => import('@/components/index/secondaryPage/ticketRecord.vue')
const ticketQrCode = () => import('@/components/index/secondaryPage/ticketQrCode.vue')
const orderDetails = () => import('@/components/index/secondaryPage/orderDetails.vue')
const onlineClass = () => import('@/components/index/secondaryPage/onlineClass.vue')
const classDetails = () => import('@/components/index/secondaryPage/classDetails.vue')
const moreCoach = () => import('@/components/index/secondaryPage/moreCoach.vue')
const coachingCourse = () => import('@/components/index/secondaryPage/coachingCourse.vue')
const courseDetails = () => import('@/components/index/secondaryPage/courseDetails.vue')
const confirmPayment = () => import('@/components/confirmPayment/confirmPayment.vue')
const succeed = () => import('@/components/confirmPayment/succeed.vue')
const orderSite = () => import('@/components/order/order_child/orderSite.vue')
const orderLeague = () => import('@/components/order/order_child/orderLeague.vue')
const orderPersonal = () => import('@/components/order/order_child/orderPersonal.vue')
const purchaseCard = () => import('@/components/purchaseCard/purchaseCard.vue')
const myCentre = () => import('@/components/my/myCentre.vue')
const cardRecharge = () => import('@/components/my/mysecondaryPage/cardRecharge')
const myOrder = () => import('@/components/my/mysecondaryPage/myOrder')
const myOrderSite = () => import('@/components/my/mysecondaryPage/myOrder_children/myOrderSite')
const myOrderLeague = () => import('@/components/my/mysecondaryPage/myOrder_children/myOrderLeague')
const myOrderPersonal = () => import('@/components/my/mysecondaryPage/myOrder_children/myOrderPersonal')
const myPersonal = () => import('@/components/my/mysecondaryPage/myPersonal')
const expenseCalendar = () => import('@/components/my/mysecondaryPage/expenseCalendar')
const leave = () => import('@/components/my/mysecondaryPage/leave')
const fiancoIndex = () => import('@/components/my/mysecondaryPage/fiancoIndex')
const fiancoResult = () => import('@/components/my/mysecondaryPage/fiancoResult')
const fiancoDetails = () => import('@/components/my/mysecondaryPage/fiancoDetails')
const messageBoard = () => import('@/components/my/mysecondaryPage/messageBoard')
const realNameCard = () => import('@/components/realNameCard/realNameCard')
const siteList = () => import('@/components/order/secondaryPage/siteList')
const coachScheduling = () => import('@/components/order/secondaryPage/coachScheduling')
const groupCourseDetails = () => import('@/components/order/secondaryPage/groupCourseDetails')
const login = () => import('@/components/login/login')
const forgetpassword = () => import('@/components/login/forgetpassword')
const register = () => import('@/components/login/register')
const headAccount = () => import('@/components//index/secondaryPage/headAccount')
const personalDetails = () => import('@/components/my/mysecondaryPage/personalDetails')
const club = () => import('@/components/dataOrigin/club')
const branch = () => import('@/components/dataOrigin/branch')
const member = () => import('@/components/dataOrigin/member')
const description = () => import('@/components/bindCard/description')
const selectBindCard = () => import('@/components/bindCard/selectBindCard')

Vue.use(Router)

export default new Router({
  linkActiveClass: 'myactive',
  routes: [
    { path: '/', redirect: '/member' },
    { path: '/member', name: 'member', component: member },
    { path: '/club', name: 'club', component: club },
    { path: '/branch', name: 'branch', component: branch },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders,
      children: [
        { path: 'orderSite', name: 'orderSite', component: orderSite },
        { path: 'orderLeague', name: 'orderLeague', component: orderLeague },
        { path: 'orderPersonal', name: 'orderPersonal', component: orderPersonal }
      ]
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
      children: [
        { path: 'myOrderSite', name: 'myOrderSite', component: myOrderSite },
        { path: 'myOrderLeague', name: 'myOrderLeague', component: myOrderLeague },
        { path: 'myOrderPersonal', name: 'myOrderPersonal', component: myOrderPersonal }
      ]
    },
    {
      path: '/stadiumDetails',
      name: 'stadiumDetails',
      component: stadiumDetails,
      meta: {
        keepAlive: true
      }
    },
    { path: '/ticketsOnline', name: 'ticketsOnline', component: ticketsOnline },
    {
      path: '/ticketRecord',
      name: 'ticketRecord',
      component: ticketRecord,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ticketQrCode',
      name: 'ticketQrCode',
      component: ticketQrCode,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: orderDetails,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/confirmPayment',
      name: 'confirmPayment',
      component: confirmPayment,
      meta: {
        keepAlive: true
      }
    },
    { path: '/onlineClass', name: 'onlineClass', component: onlineClass },
    {
      path: '/classDetails',
      name: 'classDetails',
      component: classDetails,
      meta: {
        keepAlive: true
      }
    },
    { path: '/moreCoach', name: 'moreCoach', component: moreCoach },
    {
      path: '/coachingCourse',
      name: 'coachingCourse',
      component: coachingCourse,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/courseDetails',
      name: 'courseDetails',
      component: courseDetails,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/purchaseCard',
      name: 'purchaseCard',
      component: purchaseCard,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/myCentre',
      name: 'myCentre',
      component: myCentre,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/cardRecharge',
      name: 'cardRecharge',
      component: cardRecharge,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/myPersonal',
      name: 'myPersonal',
      component: myPersonal,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/expenseCalendar',
      name: 'expenseCalendar',
      component: expenseCalendar,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/leave',
      name: 'leave',
      component: leave,
      meta: {
        keepAlive: true
      }
    },
    { path: '/fiancoIndex', name: 'fiancoIndex', component: fiancoIndex },
    { path: '/fiancoResult', name: 'fiancoResult', component: fiancoResult },
    { path: '/fiancoDetails', name: 'fiancoDetails', component: fiancoDetails },
    {
      path: '/messageBoard',
      name: 'messageBoard',
      component: messageBoard,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/realNameCard',
      name: 'realNameCard',
      component: realNameCard,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/siteList',
      name: 'siteList',
      component: siteList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: forgetpassword,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/coachScheduling',
      name: 'coachScheduling',
      component: coachScheduling,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/groupCourseDetails',
      name: 'groupCourseDetails',
      component: groupCourseDetails,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/succeed',
      name: 'succeed',
      component: succeed,
      meta: {
        keepAlive: true
      }
    },
    { path: '/headAccount', name: 'headAccount', component: headAccount },
    {
      path: '/personalDetails',
      name: 'personalDetails',
      component: personalDetails,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/description',
      name: 'description',
      component: description,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/selectBindCard',
      name: 'selectBindCard',
      component: selectBindCard,
      meta: {
        keepAlive: true
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
