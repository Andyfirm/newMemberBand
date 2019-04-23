<template>
  <div id="selectBindCard">
    <div class="shuoming">选择会员卡</div>
    <ul>
      <li v-for="item of list" :key="item.id">
        <div class="card_icon"></div>
        <div class="card_text">
          {{item.cardname}}
          <i class="cardAfterfour">（{{item.cardindex.slice(-4)}}）</i>
        </div>
        <button @click="bindCard(item.cardindex)">立即绑定</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'selectBindCard',
  data() {
    return {
      list: [],
      dataStr: this.$route.query.dataStr,
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.cardList()
  },
  methods: {
    // 获取卡列表
    async cardList() {
      const { data: res } = await this.$http.get('card/getCardByUser', {
        params: { shopNum: this.shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        this.list = res.data
        console.log(res.data)
      }
    },
    // 提示确认消息
    bindCard(cardindex) {
      this.$messagebox({
        title: '温馨提示',
        message: '绑定卡号后无法更改，您确认要绑定此卡吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          let dataObj = JSON.parse(this.dataStr)
          if (dataObj.paytype === '微信支付') {
            this.wxAjax(cardindex)
          } else if (dataObj.paytype === '会员卡支付') {
            this.cardAjax(cardindex)
          }
        }
      })
    },
    // 微信支付
    async wxAjax(cardindex) {
      let dataObj = JSON.parse(this.dataStr)
      dataObj.CardIndex = cardindex
      const { data: res } = await this.$http.post(
        'pt/wxBuyPrivateCourse',
        this.qs.stringify(dataObj)
      )
      if (res.msg === 'success') {
        this.callback(res.data)
      } else {
        this.$toast(res.data)
      }
    },
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
            _this.$router.replace({ name: 'succeed', query: { stamp: '6' } })
          }
        }
      )
    },
    // 会员卡支付
    async cardAjax(cardindex) {
      let dataObj = JSON.parse(this.dataStr)
      dataObj.toCardindex = cardindex
      const { data: res } = await this.$http.post(
        'pt/buyPrivateCourse',
        this.qs.stringify(dataObj)
      )
      if (res.msg === 'success') {
        this.$router.replace({ name: 'succeed', query: { stamp: '6' } })
      } else {
        this.$toast(res.data)
      }
    }
  }
}
</script>
<style scoped>
#selectBindCard {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.2rem;
  box-sizing: border-box;
}
.shuoming {
  font-size: 0.36rem;
  color: #333;
  padding-left: 0.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #dcdcdc;
}
.card_icon {
  float: left;
  width: 0.42rem;
  height: 0.3rem;
  background: url('../../../static/images/icon/zficon.png') no-repeat
    center/cover;
  margin: 0.14rem 0.2rem 0;
}
.card_text {
  float: left;
  margin-top: 0.05rem;
  font-size: 0.32rem;
  color: #333;
}
.cardAfterfour {
  font-size: 0.28rem;
  font-style: normal;
}
li {
  overflow: hidden;
  padding: 0.3rem 0;
  padding-right: 0.2rem;
  border-bottom: 1px solid #dcdcdc;
}
button {
  float: right;
  outline: none;
  border: 0;
  background-color: #fff;
  color: #7ecef4;
  font-size: 0.32rem;
  margin-top: 0.08rem;
}
</style>
