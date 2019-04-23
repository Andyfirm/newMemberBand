<template>
  <div id="myOrder">
    <top-nav :routers="routers"></top-nav>
      <router-view/>
  </div>
</template>

<script>
import topNav from '../../topNav/topNav'
export default {
  name: 'myOrder',
  components: {
    topNav
  },
  data() {
    return {
      routers: ['myOrderSite', 'myOrderLeague', 'myOrderPersonal']
    }
  },
  activated() {
    const myOrderShow = window.sessionStorage.getItem('myOrderShow')
    if (myOrderShow) {
      this.$router.push({ name: myOrderShow })
    } else {
      this.$router.push({ name: 'myOrderSite' })
    }
  }
}
</script>

<style scoped>
#myOrder {
  width: 100%;
  padding-top: 1.36rem;
}
</style>
