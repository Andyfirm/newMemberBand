<template>
  <div id="tickets_container">
    <my-select @change="getTickList" @changeShopName="changeShopName"></my-select>
    <div class="ticket_box">
      <div class="content_top">
        <div class="shop">门店：{{shopName}}</div>
        <router-link :to="{name: 'ticketRecord'}" class="ticket_record">购票记录</router-link>
      </div>
      <ul class="content_mide">
        <li v-for="item of ticketList" :key="item.id">
          <div class="img_left">
            <img :src="'./static/images/clubid' + clubId + '/ticket/' + item.picture" onerror="this.src='./static/images/default/ticketdefault.png'" alt="">
            <div class="textBox">
              <div class="ticketName">{{item.name}}</div>
              <div class="money">{{item.price}}元</div>
            </div>
          </div>
          <div class="btn_right">
            <button @click="purchase(item)">购买</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import select from '../public/select'
export default {
  name: 'ticketsOnline',
  components: {
    mySelect: select
  },
  data() {
    return {
      ticketList: [],
      shopNumOrigin: null,
      shopName: window.sessionStorage.getItem('shopName'),
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  activated() {
    if (this.shopNumOrigin !== window.sessionStorage.getItem('shopNum')) {
      this.getTickList()
    }
  },
  methods: {
    // 获取首屏数据
    async getTickList() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      if (shopNum === this.shopNumOrigin) return
      const { data: res } = await this.$http.get('ticket/getOnlineAllTicketInfo', {
        params: { shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        this.ticketList = res.data
        this.shopNumOrigin = window.sessionStorage.getItem('shopNum')
      }
    },
    // 改变分店
    changeShopName() {
      this.shopName = window.sessionStorage.getItem('shopName')
    },
    purchase(item) {
      let itemStr = JSON.stringify(item)
      // 编程式导航，预留是否可以购票的权限
      this.$router.push({ name: 'orderDetails', query: { item: itemStr, type: 'ticket' } })
    }
  }
}
</script>

<style scoped>
#tickets_container {
  width: 100%;
}
.ticket_box {
  padding: 0.4rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.content_top {
  overflow: hidden;
  margin-bottom: 0.4rem;
}
.ticket_box .shop {
  color: #333;
  font-size: 0.32rem;
  float: left;
}
.ticket_record {
  float: right;
  color: rgb(30, 159, 255);
  font-size: 0.32rem;
  line-height: 0.36rem;
  text-decoration: none;
  margin-top: 0.06rem;
}
.content_mide {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}
.content_mide li {
  overflow: hidden;
  margin-bottom: 0.4rem;
}
.img_left {
  position: relative;
  float: left;
  width: 3.84rem;
  height: 1.94rem;
  border-radius: 8px;
  background: ghostwhite;
}
.img_left img {
  width: 100%;
}
.img_left .textBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 0.32rem;
}
.ticketName {
  color: #fff;
  margin: 0.2rem;
}
.money {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
  color: #fff;
}
.btn_right {
  float: right;
}
.btn_right button {
  width: 1.38rem;
  height: 0.7rem;
  color: #fff;
  font-size: 0.32rem;
  background-color: #7ecef4;
  outline: none;
  border: 1px solid transparent;
  border-radius: 8px;
}
</style>
