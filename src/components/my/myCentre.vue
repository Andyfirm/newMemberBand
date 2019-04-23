<template>
  <div id="myCentre_container">
    <my-top></my-top>
    <my-card-banner></my-card-banner>
    <my-bottom></my-bottom>
    <footer-nav :page="3"></footer-nav>
  </div>
</template>

<script>
import myTop from './my_child/myTop'
import myCardBanner from './my_child/myCardBanner'
import myBottom from './my_child/myBottom'
import footerNav from '../footer/footerNav'
export default {
  name: 'myCentre',
  components: {
    footerNav,
    myTop,
    myBottom,
    myCardBanner
  },
  created() {
    let isLogin = window.sessionStorage.getItem('isLogin')
    if (isLogin === 'false') {
      this.$router.push({ name: 'login', replace: true })
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
#myCentre_container {
  width: 100%;
  padding-bottom: 1.6rem;
}
</style>
