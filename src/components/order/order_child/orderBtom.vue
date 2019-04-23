<template>
  <div id="orderBtom_container">
    <ul class="top_location">
      <li class="oneli">
        <div class="icon_call"></div>
        <a :href="'tel:'+mobile">{{mobile}}</a>
      </li>
      <li>
        <div class="icon_location"></div>
        <p>{{address}}</p>
      </li>
    </ul>
    <ul class="bottom_location">
      <li>
        <div class="icon_title"></div>
        <span>交通信息</span>
        <div class="dtBox">
          <div class="icon icon_dt"></div>
          <p>{{etroroute}}</p>
        </div>
        <div class="gjBox">
          <div class="icon icon_gj"></div>
          <p>{{transitlot}}</p>
        </div>
      </li>
      <li>
        <div class="icon_title"></div>
        <span>停车</span>
        <div class="dtBox">
          <div class="icon icon_tc"></div>
          <p>{{parkinglotdetails}}</p>
        </div>
        <div class="gjBox">
          <div class="icon icon_sf"></div>
          <p>{{parkinglotcharge}}</p>
        </div>
      </li>
      <li>
        <div class="icon_title"></div>
        <span>场地设施</span>
        <div class="dtBox">
          <div class="icon icon_rz"></div>
          <p>{{groundfacilities}}</p>
        </div>
        <div class="gjBox">
          <div class="icon icon_zd"></div>
          <p>{{lightingfacilities}}</p>
        </div>
        <div class="gjBox">
          <div class="icon icon_dp"></div>
          <p>{{restfacilities}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'orderBtom',
  data() {
    return {}
  },
  computed: {
    ...mapState(['indexListShow']),
    mobile() {
      return this.indexListShow[0].imgphone.split('#')[1]
    },
    address() {
      return this.indexListShow[0].imgaddress.split('#')[1]
    },
    etroroute() {
      return this.indexListShow[0].imgmetroroute.split('#')[1]
    },
    transitlot() {
      return this.indexListShow[0].imgtransitlot.split('#')[1]
    },
    parkinglotdetails() {
      return this.indexListShow[0].imgparkinglotdetails.split('#')[1]
    },
    parkinglotcharge() {
      return this.indexListShow[0].imgparkinglotcharge.split('#')[1]
    },
    groundfacilities() {
      return this.indexListShow[0].imggroundfacilities.split('#')[1]
    },
    lightingfacilities() {
      return this.indexListShow[0].imglightingfacilities.split('#')[1]
    },
    restfacilities() {
      return this.indexListShow[0].imgrestfacilities.split('#')[1]
    }
  }
}
</script>

<style scoped>
#orderBtom_container {
  width: 100%;
}
.top_location,
.bottom_location {
  padding: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 0.2rem;
}
.top_location {
  padding: 0.4rem 0.2rem;
}
.bottom_location {
  overflow: hidden;
  padding-top: 0;
}
.top_location li {
  overflow: hidden;
}
.oneli {
  margin-bottom: 0.2rem;
}
.top_location a {
  float: left;
  padding-left: 0.2rem;
  font-size: 0.32rem;
  color: #333;
  text-decoration: none;
}
.top_location p {
  float: left;
  width: 95%;
  padding-left: 0.2rem;
  font-size: 0.3rem;
  line-height: 0.46rem;
  color: #333;
  box-sizing: border-box;
}
.icon_call {
  float: left;
  width: 0.32rem;
  height: 0.38rem;
  background: url('~images/icon-order/telephone.png') no-repeat center/cover;
}
.icon_location {
  float: left;
  width: 0.32rem;
  height: 0.42rem;
  background: url('~images/icon-order/address.png') no-repeat center/cover;
}
.icon_title {
  float: left;
  width: 0.32rem;
  height: 0.28rem;
  margin-top: 0.092rem;
  background: url('~images/icon-order/triangle.png') no-repeat center/cover;
}
.bottom_location span {
  float: left;
  width: 90%;
  padding-left: 0.2rem;
  font-size: 0.3rem;
  color: #333;
}
.bottom_location li {
  overflow: hidden;
  margin-top: 0.4rem;
  padding-bottom: 0.06rem;
  border-bottom: 1px solid #e5e5e5;
}
.dtBox,
.gjBox {
  float: left;
  width: 100%;
  font-size: 0.3rem;
  color: #333;
  padding-left: 0.3rem;
  margin-bottom: 0.4rem;
  box-sizing: border-box;
}
.dtBox {
  margin-top: 0.4rem;
}
.icon {
  float: left;
  width: 0.48rem;
  height: 0.48rem;
  background: url('~images/icon-order/subway.png') no-repeat center/contain;
}
.bottom_location p {
  float: left;
  width: 89%;
  padding-left: 0.2rem;
}
.icon_gj {
  background: url('~images/icon-order/bus.png') no-repeat center/contain;
}
.icon_sf {
  background: url('~images/icon-order/charge.png') no-repeat center/contain;
}
.icon_rz {
  background: url('~images/icon-order/parking.png') no-repeat center/contain;
}
.icon_zd {
  background: url('~images/icon-order/light.png') no-repeat center/contain;
}
.icon_dp {
  background: url('~images/icon-order/tibuxi.png') no-repeat center/contain;
}
.icon_tc {
  background: url('~images/icon-order/tingche.png') no-repeat center/contain;
}
</style>
