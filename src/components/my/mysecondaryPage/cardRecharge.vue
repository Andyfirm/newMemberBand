<template>
  <div id="cardRecharge">
    <div class="card_box">
      <div class="card_top" @click="openFunction">
        <div class="name_h">会员卡</div>
        <div class="card_icon"></div>
        <div class="card_text">{{cardDefault.cardname}}<i class="cardAfterfour" v-show="cardDefault.cardname">({{cardAfterfour}})</i></div>
        <div class="jt_r"></div>
      </div>
      <div class="card_czje">充值金额</div>
      <div class="money">
        <div class="money_content">
          <div class="money_l">￥</div>
          <input type="text" v-model="money">
        </div>
      </div>
    </div>
    <button id="btn" @click="charge">确认充值</button>
    <transition name="fade">
      <div v-show="isShow" class="zzc" @click="isShow=false"></div>
    </transition>
    <transition name="fade">
      <div v-show="isShow" class="popout">
        <div class="popout_top">
          <p>请选择要充值的会员卡</p>
          <i class="icon_close" @click="closeFunction"></i>
        </div>
        <ul class="card_content">
          <li v-for="(item, index) of cardList" :key="index" :class="{active: index===i}" @click="select(index)">
            <div class="icon_cards"></div>
            <div class="card_text">{{item.cardname}}<i class="cardAfterfour">(余额￥{{item.cardcash}})</i></div>
            <div class="icon_select"></div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'cardRecharge',
  data() {
    return {
      cardList: [],
      cardDefault: {},
      money: null,
      i: 0,
      isShow: false,
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    async getCardList() {
      const { data: res } = await this.$http.get('card/getCardByUser', {
        params: { shopNum: this.shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        let arr = res.data
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].cardcash > arr[j + 1].cardcash) {
              let temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
            }
          }
        }
        this.cardList = arr
        this.cardDefault = arr[0]
      }
    },
    select(index) {
      this.i = index
      this.isShow = false
      this.cardDefault = this.cardList[index]
      console.log(this.cardList[index])
    },
    openFunction() {
      this.isShow = true
    },
    closeFunction() {
      this.isShow = false
    },
    charge() {
      if (this.money < 0.01) {
        return this.$toast('请输入正确的金额')
      }
      let cardObj = { cardId: this.cardDefault.id, cardName: this.cardDefault.cardname, cardIndex: this.cardDefault.cardindex, cardShortName: this.cardDefault.cardShortName }
      let cardInfoStr = JSON.stringify(cardObj)
      const dataObj = {
        total: this.money,
        cardInfo: cardInfoStr,
        shopNum: this.shopNum,
        token: this.token,
        type: '充值',
        backUrl: 'reChargeBack'
      }
      this.setSubmittedData(dataObj)
      this.$router.push({ name: 'confirmPayment', query: { badgeName: '8' } })
    },
    ...mapMutations(['setSubmittedData'])
  },
  computed: {
    cardAfterfour() {
      let cardStr = this.cardDefault.cardindex || ''
      return cardStr.substring(cardStr.length - 4)
    }
  }
}
</script>

<style scoped>
#cardRecharge {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  height: 4.1rem;
}
.card_top {
  overflow: hidden;
  padding: 0.2rem;
  box-sizing: border-box;
}
.card_top .jt_r {
  width: 0.2rem;
  height: 0.32rem;
  margin-top: 0.1rem;
  background: url('~images/icon/arrowRight.png') no-repeat center/cover;
}
.name_h {
  float: left;
  font-size: 0.4rem;
  color: #333;
}
.card_text {
  float: left;
  margin-top: 0.05rem;
  font-size: 0.36rem;
  color: #333;
}
.card_icon {
  float: left;
  width: 0.42rem;
  height: 0.3rem;
  background: url('../../../../static/images/icon/zficon.png') no-repeat center/cover;
  margin: 0.14rem 0.2rem 0;
}
.jt_r {
  float: right;
}
.card_czje {
  padding-left: 0.2rem;
  margin-top: 0.4rem;
  font-size: 0.4rem;
  color: #333;
  box-sizing: border-box;
}
.money {
  padding: 0.2rem 0.2rem;
  margin-top: 0.1rem;
}
.money_content {
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
  padding: 0.2rem 0;
}
.money .money_l {
  float: left;
  font-size: 0.66rem;
  font-weight: 700;
  margin-top: 0.06rem;
}
.money input {
  float: left;
  width: 82%;
  margin-top: 0.16rem;
  height: 0.7rem;
  font-size: 0.8rem;
  border: 0;
  outline: none;
  padding-left: 0.2rem;
}
#btn {
  width: 100%;
  outline: none;
  color: #fff;
  padding: 0.32rem;
  margin: 0 auto;
  font-size: 0.32rem;
  border: 0;
  border-radius: 8px;
  background-color: #7ecef4;
  margin-top: 0.7rem;
}
.zzc {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.popout {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 7rem;
  background-color: #fff;
  z-index: 1;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter {
  opacity: 0;
}
.popout_top {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0.2rem;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
}
.popout_top p {
  width: 100%;
  text-align: center;
  font-size: 0.38rem;
  color: #333;
}
.icon_close {
  position: absolute;
  top: 50%;
  margin-top: -0.16rem;
  right: 0.2rem;
  display: block;
  width: 0.32rem;
  height: 0.32rem;
  background: url('~images/icon/close.png') no-repeat center/cover;
}
.card_content {
  width: 100%;
  height: 5.8rem;
  overflow-y: scroll;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.card_content li {
  width: 100%;
  overflow: hidden;
  padding: 0.2rem 0;
  border-bottom: 1px solid #e8e8e8;
}
.card_content li.active .icon_select {
  background-color: #7ecef4;
}
.icon_cards {
  float: left;
  width: 0.42rem;
  height: 0.3rem;
  margin-right: 0.2rem;
  margin-top: 0.146rem;
  background: url('../../../../static/images/icon/zficon.png') no-repeat center/cover;
}
.icon_select {
  float: right;
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  margin-top: 0.1rem;
  border: 1px solid #7ecef4;
  border-radius: 50%;
}
.cardAfterfour {
  font-size: 0.28rem;
  font-style: normal;
}
</style>
