// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
import '../static/css/globel.css'
import common from '../static/js/index.js'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(Mint)
Vue.prototype.$common = common
console.log(common)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = Axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
