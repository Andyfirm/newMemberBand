<template>
  <div id="storesInformation">
    <h5>分店信息</h5>
    <ul>
      <li v-for="item of indexList" :key="item.id">
        <div class="imgBox"><img :src="'./static/images/clubid' + clubId + '/shop/' + item.shopImg" onerror="this.src='./static/images/default/imgfault.png'" alt=""></div>
        <div class="content">
          <h6>{{item.name}}</h6>
          <div class="contact">
            <span class="icon_site"></span>
            <span style="height:0.708rem;">{{item.imgaddress.split('#')[1]}}</span>
          </div>
          <div class="contact">
            <span class="icon_call"></span>
            <a :href="'tel:'+ item.imgphone.split('#')[1]">{{item.imgphone.split('#')[1]}}</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'storesInformation',
  data() {
    return {
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  computed: {
    ...mapState(['indexList'])
  }
}
</script>

<style scoped>
#storesInformation {
  width: 100%;
  padding: 0.32rem 0.2rem 0.2rem 0.2rem;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}
h5 {
  font-size: 0.36rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
li {
  overflow: hidden;
  margin-bottom: 0.2rem;
}
li .imgBox {
  float: left;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 6px;
  overflow: hidden;
}
li .imgBox img {
  width: 100%;
}
.content {
  float: left;
  width: 75%;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
.content h6 {
  color: #666;
  font-size: 0.32rem;
  font-weight: 500;
  margin-bottom: 0.02rem;
}
.content .contact {
  overflow: hidden;
  margin-bottom: 0.08rem;
}
.content span,
.content a {
  float: left;
  display: block;
  width: 93%;
  padding-left: 0.1rem;
  color: #7ecef4;
  font-size: 0.26rem;
  text-decoration: none;
  box-sizing: border-box;
}
.content .icon_site,
.content .icon_call {
  display: block;
  float: left;
  width: 0.26rem;
  height: 0.26rem;
  margin-top: 0.04rem;
  background: url('~images/icon/address.png') no-repeat center/contain;
}
.content .icon_call {
  background-image: url('~images/icon/contact.png');
}
</style>
