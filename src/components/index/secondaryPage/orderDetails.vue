<template>
  <div id="orderDetails_container">
    <div class="content">
      <ul>
        <li>场馆名称：{{shopName}}</li>
        <li>项目名称：{{item.name}}</li>
        <li class="quantity">
          <div>项目数量：</div>
          <span class="sub" @click="sub">
            <img src="~images/icon/reduce.png" alt>
          </span>
          <span>{{number}}</span>
          <span class="add" @click="number++">
            <img src="~images/icon/add.png" alt>
          </span>
        </li>
        <li>订单总价：{{orderPrice}}元</li>
        <li>
          活动优惠：
          <span style="color:#999;">无</span>
        </li>
        <li>提交时间：{{submitTime}}</li>
        <li>备注说明：
          <p style="color:#999;padding-top:0.3rem;">{{item.subtitle}}</p>
        </li>
      </ul>
    </div>
    <button @click="confirmPayment">提交订单</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'orderDetails',
  data() {
    return {
      number: 1,
      shopName: window.sessionStorage.getItem('shopName'),
      submitTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      type: this.$route.query.type,
      item: JSON.parse(this.$route.query.item),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    console.log(this.item)
  },
  methods: {
    sub() {
      if (this.number <= 1) {
        this.number = 1
      } else {
        this.number--
      }
    },
    confirmPayment() {
      // 点击提交按钮，将订单所需值存入vuex中，然后跳转到支付页面
      let dataObj = {}
      if (this.type === 'course') {
        dataObj.total = this.orderPrice
        dataObj.classId = this.item.id
        dataObj.shopNum = window.sessionStorage.getItem('shopNum')
        dataObj.token = window.sessionStorage.getItem('token')
        this.setSubmittedData(dataObj)
        // 将教练名称和课程名称存起来，在购买成功后显示
        window.sessionStorage.setItem('sjteacherName', this.item.teacher)
        window.sessionStorage.setItem('sjcourseName', this.item.name)
        this.$router.replace({ name: 'confirmPayment', query: { badgeName: '6' } }) // 购买私教
      } else if (this.type === 'ticket') {
        console.log(this.item)
        let ticketInfoArry = []
        for (let i = 0; i < this.number; i++) {
          let ticketObj = { ticketId: this.item.id }
          ticketInfoArry.push(ticketObj)
        }
        let ticketInfoStr = JSON.stringify(ticketInfoArry)
        dataObj.num = this.number // 数量
        dataObj.total = this.orderPrice // 总金额
        dataObj.token = window.sessionStorage.getItem('token') // token认证
        dataObj.shopNum = window.sessionStorage.getItem('shopNum') // 分店编号
        dataObj.ticketInfo = ticketInfoStr // 票信息(ticketId的jsonStr形式)
        dataObj.preTime = this.submitTime // 提交时间
        dataObj.type = '购票'
        this.setSubmittedData(dataObj)
        // 将票名称存起来，在购买成功后显示
        window.sessionStorage.setItem('ticketName', this.item.name)
        this.$router.replace({ name: 'confirmPayment', query: { badgeName: '4' } }) // 在线购票
      }
    },
    ...mapMutations(['setSubmittedData'])
  },
  computed: {
    orderPrice() {
      return (this.item.discountPrice * this.number).toFixed(2)
    }
  }
}
</script>

<style scoped>
#orderDetails_container {
  position: relative;
  width: 100%;
}
.content {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 9.6rem;
  padding: 0.4rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
ul li {
  color: #333;
  font-size: 0.32rem;
  padding: 0.38rem 0;
  border-bottom: 1px solid #dcdcdc;
}
.quantity {
  height: 1.08rem;
  line-height: 1.08rem;
  padding: 0;
}
.quantity div,
.quantity span {
  float: left;
}
.sub,
.add {
  display: block;
  width: 0.4rem;
  height: 0.4rem;
  margin: 0.34rem 0.2rem 0;
}
.sub {
  margin-left: 0;
}
.sub img,
.add img {
  display: block;
  width: 100%;
}
button {
  outline: none;
  border: 0;
  width: 100%;
  height: 1rem;
  color: #fff;
  font-size: 0.32rem;
  background-color: #7ecef4;
  border-radius: 8px;
  position: absolute;
  bottom: -1.3rem;
}
</style>
