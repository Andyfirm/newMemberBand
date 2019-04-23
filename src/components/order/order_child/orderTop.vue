<template>
  <div id="order_container">
    <div class="top_h">
      <div class="imgBox">
        <img :src="'./static/images/clubid' + clubId + '/logo/order-logo.jpg'" alt>
      </div>
      <h4>{{venue_name}}</h4>
    </div>
    <p>{{venuedetails}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'orderTop',
  data() {
    return {
      clubId: window.sessionStorage.getItem('clubId')
    }
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
#order_container {
  width: 100%;
  padding: 0.2rem;
  margin-top: 1.36rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
#order_container p {
  font-size: 0.28rem;
  color: #333;
  line-height: 0.46rem;
  margin: 0.2rem;
  margin-top: 0;
  text-indent: 0.4rem;
}
.top_h {
  overflow: hidden;
  width: 100%;
  padding-left: 0.18rem;
  padding: 0.05rem 0.18rem;
}
.imgBox {
  overflow: hidden;
  float: left;
  width: 1.4rem;
  height: 1.4rem;
  background-color: #efefef;
  /* box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.1); */
  border-radius: 50%;
  box-sizing: border-box;
}
.imgBox img {
  width: 100%;
}
.top_h h4 {
  float: left;
  width: 78%;
  padding-left: 0.4rem;
  margin-top: 0.42rem;
  font-size: 0.36rem;
  color: #333;
  /* text-shadow: -1px -1px white, 1px 1px #999; */
  box-sizing: border-box;
}
</style>
