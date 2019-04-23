<template>
  <div id="confirmPayment">
    <div class="content">
      <p class="time_top">剩余支付时间：{{minute}}:{{second}}</p>
      <p class="money">￥{{submittedData.total}}元</p>
      <ul>
        <li class="select_text">选择支付方式：</li>
      </ul>
      <ul class="typePayment">
        <li
          class="wxli"
          @click="select(index, item.notMoney, item.past)"
          v-for="(item, index) of cardList"
          :key="index"
          :class="{active: index===i}"
        >
          <div class="icon">
            <img
              :src="index === 0 ? './static/images/icon/weChat.png' : './static/images/icon/zficon.png' "
              alt
            >
          </div>
          <p v-if="item.id===1">{{item.cardname}}</p>
          <p v-else :class="{zhihuiText: item.notMoney || item.past}">
            {{item.cardname}}
            <i class="yue">(余额￥{{item.cardcash}})</i>
          </p>
          <div class="radius" :class="{zhihuiBorder: item.notMoney || item.past}"></div>
        </li>
      </ul>
    </div>
    <div btn_footer>
      <button
        id="btn"
        v-if="minutes=='00' && seconds== '00'"
        disabled="disabled"
        style="background-color: #ccc;"
      >已过支付时间</button>
      <button id="btn" v-else @click="submit">确认支付</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'confirmPayment',
  data() {
    return {
      minutes: 30,
      seconds: 0,
      cardList: [],
      i: 0,
      isWx: true,
      cardName: null,
      cardindex: null,
      badgeName: this.$route.query.badgeName,
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.countDow()
    this.getCardList()
  },
  methods: {
    select(index, notMoney, past) {
      if (notMoney && index !== 0) return this.$toast('此卡余额不足')
      // 如果卡对应的参数zhihui为true说明卡已过期 禁止选中
      if (past && index !== 0) return this.$toast('此卡已过期')
      this.i = index
      // 微信支付
      if (index === 0) {
        this.isWx = true
      } else {
        // 会员卡支付
        this.isWx = false
        this.cardName = this.cardList[index].cardname
        this.cardindex = this.cardList[index].cardindex
      }
    },
    // 发起支付
    submit() {
      if (this.isWx) {
        // 微信支付
        let url
        let dataObj
        switch (this.badgeName) {
          case '1': // 场地预约
            url = 'place/reservationPlaceByOnlinePay'
            dataObj = this.submittedData
            dataObj.paytype = '微信支付'
            this.wxRequest(url, dataObj)
            break
          case '4': // 在线购票
            url = 'ticket/activePay'
            dataObj = this.submittedData
            dataObj.paytype = '微信支付'
            this.wxRequest(url, dataObj)
            break
          case '5': // 在线报班
            url = 'myresp/wxBusubmit'
            dataObj = this.submittedData
            dataObj.paytype = '微信支付'
            this.wxRequest(url, dataObj)
            break
          case '6': // 购买私教
            url = 'pt/wxBuyPrivateCourse'
            dataObj = this.submittedData
            dataObj.paytype = '微信支付'
            if (this.cardList.length <= 1) {
              // 如果没有卡则直接走支付请求，不进行绑卡操作
              this.$messagebox({
                title: '温馨提示',
                message:
                  '为了精准的为您提供服务，我们会为您免费办理一张会员卡与此课程关联，以确保您的私教课程能正常使用。',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(action => {
                this.wxRequest(url, dataObj)
              })
            } else {
              this.$router.replace({
                name: 'description',
                query: { dataStr: JSON.stringify(dataObj) }
              })
            }
            break
          case '7': // 购卡
            url = 'card/reChargeOrbyCard'
            dataObj = this.submittedData
            dataObj.payType = 'wx'
            this.wxRequest(url, dataObj)
            break
          case '8': // 会员卡充值
            url = 'card/reChargeOrbyCard'
            dataObj = this.submittedData
            dataObj.payType = 'wx'
            this.wxRequest(url, dataObj)
            break
        }
      } else {
        // 会员卡
        let url
        let dataObj
        switch (this.badgeName) {
          case '1': // 场地预约
            url = 'place/reservationPlace'
            dataObj = this.submittedData
            dataObj.itemname = this.cardName
            dataObj.Cardindex = this.cardindex
            dataObj.paytype = '会员卡支付'
            this.cardRequest(url, dataObj)
            break
          case '4': // 在线购票
            url = 'ticket/memberBuyTicket'
            dataObj = this.submittedData
            dataObj.paytype = '会员卡支付'
            dataObj.Cardindex = this.cardindex
            this.cardRequest(url, dataObj)
            break
          case '5': // 在线报班
            url = 'myresp/Busubmit'
            dataObj = this.submittedData
            dataObj.itemname = this.cardName
            dataObj.asscardnum = this.cardindex
            dataObj.paytype = '会员卡支付'
            this.cardRequest(url, dataObj)
            break
          case '6': // 购买私教
            url = 'myresp/BuyCourse'
            dataObj = this.submittedData
            dataObj.itemname = this.cardName
            dataObj.Cardindex = this.cardindex
            dataObj.paytype = '会员卡支付'
            this.$router.replace({
              name: 'description',
              query: { dataStr: JSON.stringify(dataObj) }
            })
            break
        }
      }
    },
    // 微信请求
    async wxRequest(url, data) {
      const { data: res } = await this.$http.post(url, this.qs.stringify(data))
      if (res.msg === 'success') {
        this.callback(res.data)
        console.log(res)
      } else {
        this.$toast(res.data)
      }
    },
    // 微信成功支付回调
    callback(data) {
      let _this = this
      let appId = data.appId
      let timeStamp = data.timeStamp
      let nonceStr = data.nonceStr
      let packages = data.package
      let signType = data.signType
      let paySign = data.paySign
      // 支付接口
      /* global WeixinJSBridge */
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: appId, // 公众号名称，由商户传入
          timeStamp: timeStamp, // 时间戳，自 1970 年以来的秒数
          nonceStr: nonceStr, // 随机串
          package: packages, // <span style="font-family:微软雅黑;">商品包信息</span>
          signType: signType, // 微信签名方式:
          paySign: paySign // 微信签名
        },
        function(res) {
          let result = res.err_msg
          if (result === 'get_brand_wcpay_request:ok') {
            // 支付成功
            switch (_this.badgeName) {
              case '1': // 场地预约
                _this.$router.replace({
                  name: 'succeed',
                  query: { stamp: '1' }
                })
                break
              case '4': // 在线购票
                _this.$router.replace({
                  name: 'succeed',
                  query: { stamp: '4' }
                })
                break
              case '5': // 在线报班
                _this.$router.replace({
                  name: 'succeed',
                  query: { stamp: '5' }
                })
                break
              case '6': // 购买私教
                _this.$router.replace({
                  name: 'succeed',
                  query: { stamp: '6' }
                })
                break
              case '7': // 购卡
                _this.$router.replace({
                  name: 'succeed',
                  query: { stamp: '7' }
                })
                break
              case '8': // 会员卡充值
                _this.$router.replace({
                  name: 'succeed',
                  query: { stamp: '8' }
                })
                break
            }
          }
        }
      )
    },
    // 会员卡请求
    async cardRequest(url, data) {
      const { data: res } = await this.$http.post(url, this.qs.stringify(data))
      if (res.msg === 'success') {
        // 支付成功
        switch (this.badgeName) {
          case '1': // 场地预约
            this.$router.replace({ name: 'succeed', query: { stamp: '1' } })
            break
          case '4': // 在线购票
            this.$router.replace({ name: 'succeed', query: { stamp: '4' } })
            break
          case '5': // 在线报班
            this.$router.replace({ name: 'succeed', query: { stamp: '5' } })
            break
          case '6': // 购买私教
            this.$router.replace({ name: 'succeed', query: { stamp: '6' } })
            break
        }
      } else {
        this.$toast(res.data)
      }
    },
    // 倒计时补零
    num: function(n) {
      return n < 10 ? '0' + n : '' + n
    },
    // 倒计时
    countDow() {
      let _this = this
      let time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0
          window.clearInterval(time)
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },
    // 获得卡信息
    async getCardList() {
      if (this.badgeName === '7' || this.badgeName === '8') {
        this.cardList.push({ id: 1, cardname: '微信' })
        return
      }
      const { data: res } = await this.$http.get('card/getCardByUser', {
        params: { shopNum: this.shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        let arr = res.data
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].cardcash < arr[j + 1].cardcash) {
              let temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
            }
          }
        }
        for (var i = 0; i < arr.length; i++) {
          var cardcash = arr[i].cardcash
          if (cardcash - this.priceTotal <= 0) {
            arr[i].notMoney = true
          }
          let endDate = new Date(arr[i].enddate).getTime()
          let nowDate = new Date().getTime()
          if (endDate < nowDate) arr[i].past = true
        }
        let weixinObj = { id: 1, cardname: '微信' }
        arr.unshift(weixinObj)
        this.cardList = arr
      } else {
      }
    }
  },
  // 倒计时操作
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal)
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal)
      }
    }
  },
  computed: {
    // 获取要提交的数据
    ...mapState(['submittedData']),
    // 倒计时操作
    second: function() {
      return this.num(this.seconds)
    },
    // 倒计时操作
    minute: function() {
      return this.num(this.minutes)
    }
  }
}
</script>

<style scoped>
#confirmPayment {
  width: 100%;
}
.content {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.4rem;
  box-sizing: border-box;
}
.time_top {
  text-align: center;
  font-size: 0.36rem;
  color: #999;
  margin-bottom: 0.3rem;
}
.money {
  text-align: center;
  font-size: 0.48rem;
  color: #333;
}
.select_text {
  font-size: 0.34rem;
  color: #333;
  padding: 0.4rem 0;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  margin-top: 0.45rem;
}
.typePayment {
  height: 5.2rem;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.typePayment li {
  padding: 0.4rem 0;
  border-bottom: 1px solid #dcdcdc;
}
.typePayment .wxli {
  overflow: hidden;
}
.typePayment .wxli .icon {
  float: left;
  width: 0.4rem;
  height: 0.36rem;
  margin-top: 0.05rem;
}
.typePayment img {
  display: block;
  width: 100%;
}
.typePayment p {
  float: left;
  font-size: 0.34rem;
  color: #333;
  margin-left: 0.3rem;
}
.typePayment .radius {
  float: right;
  width: 0.36rem;
  height: 0.36rem;
  border: 1px solid #7ecef4;
  border-radius: 50%;
}
.typePayment li.active .radius {
  background-color: #7ecef4;
}
.yue {
  font-size: 0.26rem;
  font-style: normal;
}
.btn_footer {
  position: fixed;
  left: 0;
  bottom: 1.96rem;
  width: 100%;
  padding: 0 0.2rem;
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
}
.zhihuiText {
  color: #ccc !important;
}
.zhihuiBorder {
  border: 1px solid #ccc !important;
}
</style>
