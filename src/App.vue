<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color:#f2f2f2')
  }
}
</script>
<style>
</style>
