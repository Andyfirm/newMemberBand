<template>
  <div id="introduction">
    <div class="top">
      <h4>场馆简介</h4>
      <router-link :to="{name: 'stadiumDetails', query: {venue_name, cgimgurl, venuedetails}}">了解更多</router-link>
    </div>
    <p class="content">{{venuedetails}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'introduction',
  data() {
    return {}
  },
  computed: {
    ...mapState(['shopNumVuex', 'indexListShow']),
    venue_name() {
      return this.indexListShow[0].name
    },
    cgimgurl() {
      return this.indexListShow[0].shopImg
    },
    venuedetails() {
      return this.indexListShow[0].venuedetails
    }
  }
}
</script>

<style scoped>
#introduction {
  width: 100%;
  margin-top: 0.2rem;
  padding: 0.32rem 0.2rem 0.2rem 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
.top {
  height: 0.4rem;
  line-height: 0.4rem;
  overflow: hidden;
  margin-bottom: 0.26rem;
}
.top h4 {
  font-size: 0.36rem;
  float: left;
}
.top a {
  float: right;
  color: #7ecef4;
  font-size: 0.32rem;
  text-decoration: none;
}
.content {
  line-height: 0.5rem;
  color: #999;
  font-size: 0.28rem;
  text-indent: 0.3rem;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
