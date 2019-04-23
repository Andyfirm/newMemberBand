<template>
  <div class="reach" @click="goReach()">
    <div class="h_top">
      <div class="l_img"></div>
      <div class="textBox">
        <h6>达标天数</h6>
        <p class="dateTime">{{this.nowTime}}</p>
      </div>
      <div class="r_jiantou"></div>
    </div>
    <div class="bar">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nowTime: ''
    }
  },
  components: {},
  mounted () {
    setInterval(() => {
      this.nowTime = this.$common.NowTime()
    }, 1000)
  },
  methods: {
    goReach () {
      this.$router.push({ path: '../../details/reach' })
    }
  }
}
</script>
<style scoped>
.reach {
  width: 100%;
  padding-bottom: 0.4rem;
  margin-top: 0.2rem;
  background-color: #fff;
}
.reach .l_img {
  background-image: url('~@/assets/images/dabiao.png');
}
.textBox {
  float: left;
  margin-left: 0.32rem;
}
h6 {
  color: #666;
  font-size: 0.28rem;
  line-height: 0.28rem;
  font-weight: 500;
}
.dateTime {
  margin-top: 0.1rem;
  font-size: 0.16rem;
  line-height: 0.16rem;
  color: #666 !important;
}
.r_textBox {
  float: right;
  margin-right: 0.2rem;
}
.r_time {
  font-size: 0.2rem;
  line-height: 0.2rem;
  color: #999;
}
.r_time i {
  font-style: normal;
  font-size: 0.32rem;
}
.r_textBox p {
  margin-top: 0.1rem;
  font-size: 0.2rem;
  line-height: 0.2rem;
  color: #999 !important;
}
.r_jiantou {
  float: right;
  width: 0.22rem;
  height: 0.38rem;
  margin-top: 0.1rem;
  background: url('~@/assets/images/jiantou_r.png') no-repeat center/contain;
}
.bar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 1.6rem;
  padding: 0 0.4rem;
  margin-top: 0.2rem;
  box-sizing: border-box;
}
.bar ul {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
.bar li {
  position: absolute;
  bottom: 0;
  width: 0.8rem;
  height: 1.4rem;
  background-color: #ffc000;
}
.bar li:nth-child(1) {
  height: 1.1rem;
  background-color: #ccc;
}
.bar li:nth-child(2) {
  left: 0.98rem;
}
.bar li:nth-child(3) {
  left: 1.96rem;
  height: 1.3rem;
}
.bar li:nth-child(4) {
  left: 2.94rem;
}
.bar li:nth-child(5) {
  left: 3.92rem;
  height: 1.6rem;
}
.bar li:nth-child(6) {
  left: 4.9rem;
}
.bar li:nth-child(7) {
  left: 5.88rem;
  height: 1.8rem;
}
.line {
  width: 100%;
  height: 1px;
  margin-top: 0.3rem;
  background-color: #ffc000;
}
</style>
