<template>
  <div id="myCardBanner">
    <div class="nullCard" v-show="wd_card.length===0">
      <div class="content">
        <p>您一张会员卡都没有，天哪</p>
        <router-link :to="{name: 'purchaseCard'}">
          <div class="img"></div>
        </router-link>
        <p>快来成为VIP</p>
      </div>
    </div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item of wd_card" :key="item.id">
        <div class="cardNum">
          会员卡号:
          <span class="numberxh">{{item.cardindex}}</span>
          <b class="erweima" @click="quickMark(item.cardindex)"></b>
        </div>
        <img
          :src="'./static/images/clubid' + clubId + '/hyk/'+(item.infCs?item.infCs.imgpath:'default.png')"
          class="main-img"
          @click="selectedCard(item)"
          onerror="this.src='./static/images/default/default.png'"
        >
        <div class="wenzi" @click="selectedCard(item)">
          <h4>{{item.infCs.name}}</h4>
          <h4 id="kahao">
            {{item.cardindex.slice(0,4)}} {{item.cardindex.slice(4,8)}} {{item.cardindex.slice(8,12)}} {{item.cardindex.slice(12,16)}}
            {{item.cardindex.slice(16)}}
          </h4>
          <p id="moneyNum">{{item.cardcash}}元</p>
        </div>
        <p class="cardInfo">
          <span class="condition">
            状态:
            <span class="condition_detail">{{item.cardstatus}}</span>
          </span>
          <span class="oldTime">
            到期时间:
            <span>{{item.enddate | convertDate}}</span>
          </span>
        </p>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" v-show="wd_card.length > 1"></div>
    <!-- 会员卡详细信息显示区域 -->
    <transition name="fade">
      <div
        v-if="hykdetailsItem !== ''"
        class="hykdetailsBox"
        v-show="hykdetailsActive"
        :class="{hykdetailsActive: hykdetailsActive}"
        ref="hykdetailsBox"
        @click.self="closeHykdetails"
      >
        <div class="boxWrap">
          <div class="topBox">
            <div class="qrcode" @click="quickMark(hykdetailsItem.cardindex)"></div>
            <div class="close" @click="closeHykdetails"></div>
          </div>
          <div class="cardBox">
            <img :src="'./static/images/clubid' + clubId + '/hyk/'+(hykdetailsItem.infCs?hykdetailsItem.infCs.imgpath:'default.png')" onerror="this.src='./static/images/default/default.png'" alt>
            <div class="hykdetails_wenzi">
              <div class="cardName">{{hykdetailsItem.infCs.name}}</div>
              <div
                class="cardIndex"
              >{{hykdetailsItem.cardindex.slice(0,4)}} {{hykdetailsItem.cardindex.slice(4,8)}} {{hykdetailsItem.cardindex.slice(8,12)}} {{hykdetailsItem.cardindex.slice(12,16)}} {{hykdetailsItem.cardindex.slice(16)}}</div>
              <div class="money">{{hykdetailsItem.cardcash}}元</div>
            </div>
          </div>
          <div class="textBox">
            <div class="top">
              <span class="left">
                状态：
                <i>{{hykdetailsItem.cardstatus}}</i>
              </span><br>
              <span
                class="right"
              >卡号：{{hykdetailsItem.cardindex.slice(0,4)}} {{hykdetailsItem.cardindex.slice(4,8)}} {{hykdetailsItem.cardindex.slice(8,12)}} {{hykdetailsItem.cardindex.slice(12,16)}} {{hykdetailsItem.cardindex.slice(16)}}</span>
            </div>
            <div class="time one">入会时间：{{hykdetailsItem.transdate | convertDate}}</div>
            <div class="time">到期时间：{{hykdetailsItem.enddate | convertDate}}</div>
            <div class="xmsy" v-if="hykdetailsItem.array">项目剩余</div>
            <div class="content" v-if="hykdetailsItem.array">
              <p v-for="(item,index) of hykdetailsItem.array" :key="index">{{item.type}} 剩余次数:{{item.num}}次</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 显示二维码区域 -->
    <transition name="fade">
      <div
        class="codeBox"
        v-show="qrcodeActive"
        :class="{qrcodeActive: qrcodeActive}"
        ref="codeBox"
        @click.self="closeQrcode"
      >
        <div class="qrcodeBox">
          <div class="close" @click="closeQrcode"></div>
          <div id="qrcode" ref="qrCodeUrl"></div>
          <p>扫描上方二维码，获取详细信息</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'myCardBanner',
  data() {
    return {
      swiperOption: {
        autoplay: false,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      wd_card: [],
      hykdetailsItem: '',
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      qrcodeActive: false,
      hykdetailsActive: false,
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('card/getCardByUser', {
        params: { shopNum: this.shopNum, token: this.token }
      })
      console.log(res)
      if (res.msg === 'success') {
        this.wd_card = res.data
      }
    },
    // 点击查看详细信息
    selectedCard(item) {
      this.hykdetailsItem = item
      this.hykdetailsActive = true
      let body = document.getElementsByTagName('body')[0]
      body.style.position = 'fixed'
    },
    // 点击关闭详细信息
    closeHykdetails() {
      this.hykdetailsActive = false
      let body = document.getElementsByTagName('body')[0]
      body.style.position = 'static'
    },
    // 点击查看二维码
    quickMark(cardIndex) {
      let codeBox = this.$refs.codeBox
      codeBox.ontouchmove = function(e) {
        e.preventDefault()
      }
      this.qrcodeActive = true
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: '2' + cardIndex,
        width: 200,
        height: 200
      })
      console.log(qrcode)
    },
    // 点击关闭二维码
    closeQrcode() {
      this.qrcodeActive = false
      let qrCodeDom = this.$refs.qrCodeUrl
      qrCodeDom.innerHTML = ''
    }
  }
}
</script>

<style scoped>
#myCardBanner {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 0.2rem;
  margin-top: 1.9rem;
  background-color: #fff;
  margin-bottom: 0.2rem;
  border-radius: 8px;
}
.nullCard {
  width: 100%;
  float: left;
  padding: 0 10px;
  border-radius: 8px;
  box-sizing: border-box;
}
.nullCard .content {
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}
.swiper-pagination {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.nullCard p {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.nullCard .img {
  width: 2.1rem;
  height: 2.1rem;
  margin: 0.5rem auto;
  background: url('~images/icon/tuoyuan.png') no-repeat center/cover;
}
.main-img {
  width: 100%;
}
.swiper-container {
  box-sizing: border-box;
}
.cardNum {
  padding: 0 2px;
  font-size: 0.28rem;
  color: #333;
  font-weight: 700;
  margin-bottom: 0.2rem;
}
.swiper-slide {
  position: relative;
  padding: 0.2rem;
  box-sizing: border-box;
}
.wenzi {
  position: absolute;
  top: 1.1rem;
  left: 0.6rem;
  width: 82%;
  color: #fff;
}
h4 {
  font-size: 0.4rem;
  font-weight: 700;
}
#kahao {
  margin: 0.76rem 0 0.4rem;
}
#moneyNum {
  font-size: 0.4rem;
  font-weight: 700;
  text-align: right;
}
.cardInfo {
  font-size: 0.32rem;
}
.oldTime {
  float: right;
}
.erweima {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  display: block;
  width: 0.48rem;
  height: 0.48rem;
  background: url('../../../../static/images/icon/qrcode.png') no-repeat center/contain;
}
.codeBox,
.hykdetailsBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 11;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
}
.hykdetailsBox {
  z-index: 10;
}
.codeBox.qrcodeActive {
  display: block;
}
.hykdetailsBox.hykdetailsActive {
  display: block;
}
.qrcodeBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 240px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
}
#qrcode {
  padding-left: 20px;
  padding-top: 50px;
}
.qrcodeBox p {
  position: absolute;
  bottom: 20px;
  width: 100%;
  font-size: 12px;
  text-align: center;
}
.qrcodeBox .close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 20px;
  height: 20px;
  background: url('../../../../static/images/icon/close.png') no-repeat center/cover;
}
.boxWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 2rem auto 0;
  overflow: hidden;
  width: 6.7rem;
  background-color: #fff;
  border-radius: 8px;
}
.topBox {
  position: relative;
  width: 100%;
  height: 1.1rem;
}
.topBox .qrcode {
  left: 0.42rem;
  top: 0.36rem;
  width: 0.48rem;
  height: 0.48rem;
  background: url('../../../../static/images/icon/qrcode.png') no-repeat center/contain;
}
.topBox .close {
  right: 0.4rem;
  top: 0.36rem;
  width: 0.3rem;
  height: 0.3rem;
  background: url('../../../../static/images/icon/close.png') no-repeat center/cover;
}
.topBox .qrcode,
.topBox .close {
  position: absolute;
}
.cardBox {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5.88rem;
  height: 3.16rem;
  margin: 0 auto;
}
.cardBox img {
  width: 100%;
}
.hykdetails_wenzi {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.hykdetails_wenzi .cardName {
  margin-top: 0.4rem;
  font-size: 0.38rem;
  font-weight: 700;
  color: #fff;
}
.hykdetails_wenzi .cardIndex {
  font-size: 0.37rem;
  font-weight: 700;
  color: #fff;
  margin: 0.56rem 0 0.3rem;
}
.hykdetails_wenzi .money {
  width: 100%;
  font-size: 0.38rem;
  font-weight: 700;
  color: #fff;
  text-align: right;
}
.textBox {
  width: 5.88rem;
  /* height: 4.4rem; */
  padding-bottom: 0.6rem;
  margin: 0 auto;
  font-size: 0.3rem;
  color: #999;
}
.textBox i {
  font-style: normal;
  color: #7fc0fd;
}
.textBox .top {
  overflow: hidden;
}
.textBox .top .left {
  display: block;
  height: 0.18rem;
}
.time.one {
  margin: 0.28rem 0;
}
.textBox .xmsy {
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
}
.textBox p {
  margin: 0.28rem 0;
}
.fade-enter-active {
  transition: opacity 0.4s;
}
.fade-enter {
  opacity: 0;
}
.textBox .content {
  overflow: scroll;
  max-height: 1.4rem;
}
.textBox .content p:first-child {
  margin-top: 0;
}
.condition_detail {
  color: #7fc0fd;
}
</style>
