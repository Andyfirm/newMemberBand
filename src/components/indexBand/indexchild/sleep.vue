<template>
  <div class="center" @click="gosleepDetail()">
    <div class="h_top">
      <div class="l_img"></div>
      <div class="textBox">
        <h6>{{ this.title }}</h6>
        <p class="dateTime">{{ this.nowTime }}</p>
      </div>
      <div class="r_jiantou"></div>
      <div class="r_textBox">
        <div class="r_time">
          <i>8</i>h
          <i>20</i>m
        </div>
        <p>睡眠总时长</p>
      </div>
    </div>
    <div class="stateBox">
      <div class="state_textBox">
        <div class="shenshui">
          <i>1</i>h
          <i>14</i>m
        </div>
        <p>深睡</p>
      </div>
      <div class="state_textBox">
        <div class="qianshuimian">
          <i>7</i>h
          <i>06</i>m
        </div>
        <p>浅睡眠</p>
      </div>
      <div class="state_textBox">
        <div class="qinxing">
          <i>0</i>m
        </div>
        <p>清醒</p>
      </div>
    </div>
    <ul class="sleep_contain">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="btom_time">
      <div class="start_time">凌晨12:00</div>
      <div class="end_time">晚上11:59</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '睡眠监测',
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
    gosleepDetail () {
      this.$router.push({ path: '../details/sleepDetails' })
    }
  }
}
</script>
<style scoped>
i {
  font-style: normal;
}
.center {
  width: 100%;
  /* height: 4rem; */
  background: white;
}
.h_top {
  overflow: hidden;
  padding: 0.36rem 0.4rem 0.1rem;
}
.l_img {
  float: left;
  width: 0.46rem;
  height: 0.46rem;
  margin-top: 0.08rem;
  background: url("~@/assets/images/shuimian.png") no-repeat center/contain;
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
  background: url("~@/assets/images/jiantou_r.png") no-repeat center/contain;
}
.stateBox {
  overflow: hidden;
  margin-top: 0.12rem;
}
.stateBox .state_textBox {
  float: left;
  width: 33.33%;
  font-size: 0.28rem;
  text-align: center;
  color: #333;
}
.stateBox .state_textBox i {
  font-size: 0.4rem;
}
.stateBox .state_textBox p {
  font-size: 0.24rem;
  color: #666;
}
.sleep_contain {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1.24rem;
  margin-top: 0.2rem;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.sleep_contain li {
  width: 40%;
  height: 100%;
  background-color: #b587cf;
}
.sleep_contain li:nth-child(2) {
  width: 20%;
  background-color: #784496;
}
.sleep_contain li:nth-child(4) {
  width: 10%;
  background-color: #784496;
}
.btom_time {
  overflow: hidden;
  font-size: 0.16rem;
  color: #666;
  padding: 0 0.1rem;
  margin-top: 0.1rem;
  box-sizing: border-box;
}
.btom_time .start_time {
  float: left;
  margin-bottom: 0.4rem;
}
.btom_time .end_time {
  float: right;
}
</style>
