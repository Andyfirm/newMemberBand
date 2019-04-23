<template>
  <div id="order">
    <top-nav :routers="routers"></top-nav>
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- <order-btom></order-btom> -->
    <footer-nav :page="1"></footer-nav>
  </div>
</template>

<script>
import footerNav from '../footer/footerNav'
import topNav from '../topNav/topNav'
import orderBtom from './order_child/orderBtom'
export default {
  name: 'order',
  components: {
    footerNav,
    topNav,
    orderBtom
  },
  data() {
    return {
      routers: ['orderSite', 'orderLeague', 'orderPersonal']
    }
  },
  created() {
    let show = window.sessionStorage.getItem('orderShow')
    if (show) {
      this.$router.push({ name: show })
    } else {
      this.$router.push({ name: 'orderSite' })
    }
  },
  activated() {
    let show = window.sessionStorage.getItem('orderShow')
    if (show) {
      this.$router.push({ name: show })
    } else {
      this.$router.push({ name: 'orderSite' })
    }
  }
}
</script>

<style scoped>
#order {
  padding-bottom: 1.4rem;
}
</style>
