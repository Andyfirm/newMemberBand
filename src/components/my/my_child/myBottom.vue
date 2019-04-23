<template>
  <div id="myBottom_container">
    <h6>易思普助手</h6>
    <ul class="list">
      <li>
        <router-link :to="{name: 'cardRecharge'}">
          <div class="icon_hyk"><img src="~images/icon/chargeIn.png" alt=""></div>
          <p>会员卡充值</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'myOrder'}">
          <div class="icon_yuyue"><img src="~images/icon/yuyue.png" alt=""></div>
          <p>我的预约</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'myPersonal'}">
          <div class="icon_sijiao"><img src="~images/icon/sijiao.png" alt=""></div>
          <p>我的私教</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'expenseCalendar'}">
          <div class="icon_xfjl"><img src="~images/icon/Consumptionrecord.png" alt=""></div>
          <p>消费记录</p>
        </router-link>
      </li>
       <li>
        <router-link :to="{name: 'ticketRecord'}">
          <div class="icon_xfjl"><img src="~images/icon/buyTicket.png" alt=""></div>
          <p>购票记录</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'leave'}">
          <div class="icon_qjzt"><img src="~images/icon/pause.png" alt=""></div>
          <p>请假暂停</p>
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="{name: 'fiancoIndex'}">
          <div class="icon_tcxx"><img src="~images/icon/test.png" alt=""></div>
          <p>体测信息</p>
        </router-link>
      </li> -->
      <!-- <li>
        <router-link :to="{name: 'messageBoard'}">
          <div class="icon_lyb"><img src="~images/icon/massageBoard.png" alt=""></div>
          <p>留言板</p>
        </router-link>
      </li> -->
      <li>
        <a href="tel:4007007576">
          <div class="icon_lxkf"><img src="~images/icon/server.png" alt=""></div>
          <p>联系客服</p>
        </a>
      </li>
      <li>
        <div class="icon_jqqd"><img src="~images/icon/more.png" alt=""></div>
        <p>敬请期待...</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'myBottom',
  data() {
    return {}
  }
}
</script>

<style scoped>
#myBottom_container {
  width: 100%;
  padding: 0 0.2rem;

  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  padding-bottom: 0.2rem;
}
h6 {
  font-size: 0.32rem;
  color: #333;
  padding: 0.36rem 0;
  border-bottom: 1px solid #dcdcdc;
}
.list {
  overflow: hidden;
  margin-top: 0.28rem;
}
.list li {
  float: left;
  width: 25%;
  height: 1.7rem;
}
.list li div {
  margin: 12% auto;
  height: 0.6rem;
  display: flex;
  align-items: center;
}
.list li div img {
  display: block;
  width: 100%;
}
.list li .icon_hyk {
  width: 0.72rem;
}
.list li .icon_yuyue {
  width: 0.64rem;
}
.list li .icon_sijiao {
  width: 0.54rem;
}
.list li .icon_xfjl {
  width: 0.52rem;
}
.list li .icon_qjzt {
  width: 0.6rem;
}
.list li .icon_tcxx {
  width: 0.66rem;
}
.list li .icon_lyb {
  width: 0.52rem;
}
.list li .icon_lxkf {
  width: 0.5rem;
}
.list li .icon_jqqd {
  width: 0.7rem;
}
.list li p {
  font-size: 0.24rem;
  color: #999;
  text-align: center;
}
a {
  text-decoration: none;
}
</style>
