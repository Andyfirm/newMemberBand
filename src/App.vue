<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store')))
      )
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>
