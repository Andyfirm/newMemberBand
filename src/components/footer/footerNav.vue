<template>
  <div id="footer_nav">
    <router-link :to="{name: 'index'}" replace :class="{home:page===0}">
      <div class="imgBox"></div>
      <p>首页</p>
    </router-link>
    <router-link :to="{name: 'orders'}" replace :class="{order:page===1}">
      <div class="imgBox"></div>
      <p>预约</p>
    </router-link>
    <router-link :to="{name: 'purchaseCard'}" replace :class="{card:page===2}">
      <div class="imgBox"></div>
      <p>购卡</p>
    </router-link>
    <router-link :to="{name: 'myCentre'}" replace :class="{my:page===3}">
      <div class="imgBox"></div>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'footerNav',
  props: ['page'],
  data() {
    return {}
  }
}
</script>

<style scoped>
#footer_nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1rem;
  padding-top: 0.1rem;
  background-color: #fff;
  border-top: 1px solid #efefef;
}
#footer_nav a {
  display: block;
  float: left;
  width: 25%;
  text-align: center;
  text-decoration: none;
  font-size: 0.28rem;
  color: #999;
}
#footer_nav a p {
  margin-top: 0.08rem;
}
#footer_nav .imgBox {
  width: 0.48rem;
  height: 0.44rem;
  margin: 0 auto;
  background: url('~images/icon/home.png') no-repeat center/contain;
}
#footer_nav a:nth-child(2) div {
  background-image: url('~images/icon/Order.png');
}
#footer_nav a:nth-child(3) div {
  background-image: url('~images/icon/buyCard.png');
}
#footer_nav a:nth-child(4) div {
  background-image: url('~images/icon/my.png');
}
#footer_nav a.home div {
  background-image: url('~images/icon/home2.png');
}
#footer_nav a.home p {
  color: #7ec1fc;
}
#footer_nav a.order div {
  background-image: url('~images/icon/order2.png');
}
#footer_nav a.order p {
  color: #7ec1fc;
}
#footer_nav a.card div {
  background-image: url('~images/icon/buyCard2.png');
}
#footer_nav a.card p {
  color: #7ec1fc;
}
#footer_nav a.my div {
  background-image: url('~images/icon/my2.png');
}
#footer_nav a.my p {
  color: #7ec1fc;
}
</style>
