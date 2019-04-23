<template>
  <div id="ticketQrCode">
    <div class="back" @click="back">返回</div>
    <div class="top">
      <h6>{{itemObj.ticket.name}}</h6>
      <p>金额：￥{{itemObj.subTotal}}</p>
      <p>时间：{{itemObj.preTime}}</p>
    </div>
    <div class="qrCodeBox" ref="qrCodeUrl"></div>
    <div class="shuoming" v-if="itemObj.showStatus==='effective'">请使用此二维码作为凭证</div>
    <div class="shuoming" v-else-if="itemObj.showStatus==='expired'">该二维码已过期</div>
    <div class="shuoming" v-else>该二维码已使用</div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'ticketQrCode',
  data() {
    return {
      itemObj: JSON.parse(this.$route.query.item)
    }
  },
  mounted() {
    console.log(this.itemObj)
    this.quickMark(this.itemObj.serialnumber)
  },
  methods: {
    quickMark(code) {
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: code,
        width: 140,
        height: 140
      })
      console.log(qrcode)
    },
    back() {
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
#ticketQrCode {
  overflow: hidden;
  width: 100%;
  height: 9rem;
  background: url('../../../../static/images/bg/qrcodeBg.png') no-repeat
    center/cover;
}
.back {
  font-size: 0.38rem;
  color: #7ecef4;
  height: 0.38rem;
  margin: 0.2rem 0.4rem 0.8rem;
}
.top {
  margin-left: 0.6rem;
}
.top h6 {
  font-size: 0.4rem;
  color: #333;
  margin-bottom: 0.4rem;
}
.top p {
  font-size: 0.24rem;
  color: #999;
  margin-bottom: 0.2rem;
}
.qrCodeBox {
  width: 140px;
  height: 140px;
  margin: 1.2rem auto 0.4rem;
}
.shuoming {
  font-size: 0.32rem;
  text-align: center;
  color: #333;
}
</style>
