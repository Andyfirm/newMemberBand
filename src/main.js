import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/globel.css'
import Mint from 'mint-ui'
import Axios from 'axios'
import qs from 'qs'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Moment from 'moment'
import { Swipe, SwipeItem } from 'vue-swipe'
import store from './store/index'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import '../static/iconfont/iconfont.css'
import '../static/iconfont/iconfont.eot'
import '../static/iconfont/iconfont.svg'
import '../static/iconfont/iconfont.ttf'
import VeLine from 'v-charts/lib/line.common'
import VueScroller from 'vue-scroller'
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
export default vConsole
Vue.use(VueScroller)
Vue.use(VueAwesomeSwiper)

Vue.filter('convertDate', function(value) {
  return Moment(value).format('YYYY-MM-DD')
})

Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.component(VeLine.name, VeLine)
Vue.use(Mint)
// http://192.168.1.43/  https://www.easyserp.com/weixinPayTest/ http://192.168.1.180/weixinPay/  https://www.easyserp.com/weixinPayTest https://www.147soft.cn/easyserpClient/
Axios.defaults.baseURL = 'https://www.147soft.cn/easyserpClient/'
Vue.prototype.$http = Axios
Vue.prototype.qs = qs
Vue.prototype.$moment = Moment
Vue.config.productionTip = false

// 监听物理返回键
window.addEventListener('popstate', (e) => {
  let isLogin = window.sessionStorage.getItem('isLogin')
  console.log(router.match(location).hash)
  if (router.match(location).hash === '#/login' && isLogin === 'true') {
    router.push({ name: 'index' })
  }
  if (router.match(location).hash === '#/myOrder' || router.match(location).hash === '#/myOrder/myOrderSite' || router.match(location).hash === '#/myOrder/myOrderLeague' || router.match(location).hash === '#/myOrder/myOrderPersonal') {
    router.push({ name: 'myCentre' })
  }
  if (router.match(location).hash === '#/orders/orderPersonal') {
    router.push({ name: 'index' })
  }
  if (router.match(location).hash === '#/orders') {
    router.push({ name: 'orderSite' })
  }
  if (router.match(location).hash === '#/succeed?stamp=4') {
    router.replace({ name: 'index' })
  }
})
Axios.interceptors.request.use(config => {
  if (router.match(location).hash === '#/login') {
    Mint.Indicator.open('正在登录...')
    return config
  }
  Mint.Indicator.open('正在加载...')
  return config
})
Axios.interceptors.response.use(
  res => {
    Mint.Indicator.close()
    if (res.data === -1) {
      Mint.Toast({
        message: '身份信息失效，请重新登录',
        position: 'middle',
        duration: 5000
      })
      router.push({ name: 'login' })
      return
    }
    return res
  },
  error => {
    Mint.Indicator.close()
    Mint.Toast({
      message: '网络连接不可用，请稍后重试',
      position: 'middle',
      duration: 5000
    })
    return error
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
