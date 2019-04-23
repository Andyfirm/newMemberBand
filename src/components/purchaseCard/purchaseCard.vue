<template>
  <div id="purchaseCard">
    <div v-if="cardList.length == 0" class="nocard">暂无卡片信息</div>
    <ul v-if="cardList.length > 0">
      <li class="cardBox" v-for="item of cardList" :key="item.id">
        <div class="imgBox_wrap" @click="showCard(item)">
          <img :src="'./static/images/clubid' + clubId + '/hyk/' + (item.infCs?item.infCs.imgpath:'default.png')" onerror="this.src='./static/images/default/default.png'" alt>
          <div class="imgBox">
            <h6>{{item.cardName?item.cardName:''}}</h6>
            <p></p>
            <div class="card_bottom">
              <span class="beizhu">备注</span>
              <span class="money">{{item.infCs?item.infCs.cardcash:''}}元</span>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="middle_l">卡名：{{item.cardName?item.cardName:''}}</div>
          <div class="middle_r">
            价格:
            <i>￥{{item.weChatPrice?item.weChatPrice:''}}</i>
          </div>
        </div>
      </li>
    </ul>
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
          <div class="cardBoxInfo">
            <img :src="'./static/images/clubid' + clubId + '/hyk/'+ (hykdetailsItem.infCs?hykdetailsItem.infCs.imgpath:'default.png')" onerror="this.src='./static/images/default/default.png'" alt>
            <div class="hykdetails_wenzi">
              <div class="cardName">{{hykdetailsItem.infCs.name}}</div>
              <div class="money">{{hykdetailsItem.weChatPrice}}元</div>
            </div>
          </div>
          <div class="textBox">
            <h6 style="font-size: 0.28rem;margin: 0.2rem 0;">详情</h6>
            <p
              style="font-size: 0.28rem;"
            >{{hykdetailsItem.infCs ? hykdetailsItem.infCs.remarks : ''}}</p>
            <button
              @click="purchase(hykdetailsItem.cardName, hykdetailsItem.id, hykdetailsItem.weChatPrice, hykdetailsItem.cardShortName)"
            >购买</button>
          </div>
        </div>
      </div>
    </transition>

    <footer-nav :page="2"></footer-nav>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import footerNav from '../footer/footerNav'
export default {
  name: 'purchaseCard',
  components: {
    footerNav
  },
  data() {
    return {
      state: '',
      cardList: [],
      shouqi: null,
      zhankai: null,
      originShopNum: null,
      hykdetailsItem: '',
      hykdetailsActive: false,
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    // 获取首屏数据
    async getCardList() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      let token = window.sessionStorage.getItem('token')
      const { data: res } = await this.$http.get('card/getCardByShopNum', {
        params: { shopNum, token }
      })
      if (res.msg === 'success') {
        this.state = res.data.state
        this.cardList = res.data.cardsInfo // 正式渲染
        // this.cardList.push(res.data.dataArray[0]) // 临时测试
        this.originShopNum = shopNum
      }
    },
    showCard(item) {
      console.log(item)
      this.hykdetailsItem = item
      this.hykdetailsActive = true
    },
    // 点击关闭详细信息
    closeHykdetails() {
      this.hykdetailsActive = false
      let body = document.getElementsByTagName('body')[0]
      body.style.position = 'static'
    },
    purchase(name, id, money, cardShortName) {
      let cardObj = { cardName: name, cardId: id, cardShortName }
      let cardInfoStr = JSON.stringify(cardObj)
      // 获取所选卡信息，跳转支付页面
      const dataObj = {
        kId: id,
        total: money,
        cardInfo: cardInfoStr,
        shopNum: window.sessionStorage.getItem('shopNum'),
        token: window.sessionStorage.getItem('token'),
        type: '办卡',
        backUrl: 'byCardBack'
      }
      this.setSubmittedData(dataObj)
      window.sessionStorage.setItem('cardName', name)
      if (this.state === 1) {
        this.$router.push({ name: 'realNameCard', query: { badgeName: '7' } })
      } else if (this.state === 2) {
        this.$router.push({ name: 'confirmPayment', query: { badgeName: '7' } })
      }
    },
    ...mapMutations(['setSubmittedData'])
  }
}
</script>

<style scoped>
#purchaseCard {
  width: 100%;
  padding-bottom: 1.4rem;
}
.cardBox {
  padding: 0.3rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
.imgBox_wrap {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 55.5%;
  border-radius: 8px;
  box-sizing: border-box;
}
.imgBox_wrap img {
  width: 100%;
}
.imgBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.imgBox h6 {
  font-size: 0.42rem;
  color: #fff;
  margin-top: 0.3rem;
  margin-left: 0.34rem;
}
.imgBox p {
  height: 0.42rem;
  font-size: 0.32rem;
  color: #fff;
  font-weight: 700;
  margin-top: 0.6rem;
  margin-left: 0.34rem;
}
.card_bottom {
  width: 100%;
  padding-left: 0.34rem;
  padding-right: 0.52rem;
  box-sizing: border-box;
  margin-top: 0.46rem;
  overflow: hidden;
}
.card_bottom .beizhu {
  float: left;
  font-size: 0.32rem;
  color: #fff;
  font-weight: 700;
  margin-top: 0.1rem;
}
.card_bottom .money {
  float: right;
  font-size: 0.42rem;
  color: #fff;
  font-weight: 700;
}
.middle {
  overflow: hidden;
  padding: 0 0.1rem;
}
.middle_l,
.middle_r {
  color: #999;
  font-size: 0.3rem;
}
.middle_l {
  float: left;
}
.middle_r {
  float: right;
}
.middle_r i {
  color: #7ecef4;
  font-style: normal;
}
.select {
  overflow: hidden;
  margin-top: 0.34rem;
  padding: 0 0.1rem;
}
.select_l {
  float: left;
  font-size: 0.26rem;
  color: #7ecef4;
  margin-top: 0.07rem;
}
.select_r {
  float: right;
  font-size: 0.32rem;
  color: #7ecef4;
}
.showp {
  height: 0;
  overflow: hidden;
  font-size: 0.3rem;
  color: #999;
  padding: 0 0.1rem;
  margin-top: 0.2rem;
}
.cardBox.unfoldLi .showp {
  height: auto;
}

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
.cardBoxInfo {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5.88rem;
  height: 3.16rem;
  margin: 0.2rem auto 0;
}
.cardBoxInfo img {
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
.hykdetails_wenzi .money {
  width: 100%;
  font-size: 0.38rem;
  font-weight: 700;
  color: #fff;
  margin-top: 1.3rem;
  text-align: right;
}
.textBox {
  width: 5.88rem;
  /* height: 4.4rem; */
  padding-bottom: 0.4rem;
  margin: 0 auto;
  font-size: 0.3rem;
  color: #999;
}
.textBox i {
  font-style: normal;
  color: #7fc0fd;
}

.fade-enter-active {
  transition: opacity 0.4s;
}
.fade-enter {
  opacity: 0;
}
button {
  outline: none;
  width: 100%;
  height: 0.8rem;
  color: #fff;
  margin-top: 0.4rem;
  border-radius: 8px;
  border: 0;
  background-color: #7ecef4;
}
.nocard {
  font-size: 0.28rem;
  text-align: center;
  margin-top: 0.8rem;
}
</style>
