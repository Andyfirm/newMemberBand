<template>
  <div class="sleepDetails">
    <header>
      <div class="back" @click="goback()"></div>
      <p>{{ this.titlemsg }}</p>
      <span class="number">{{ this.number }}分</span>
      <p>您的睡眠优于{{ this.percentage }}%的同龄人</p>
      <ul class="sleep_contain">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="btom_time">
        <div class="start_time">{{ this.startTime }}入睡</div>
        <div class="end_time">{{ this.endTime }}起床</div>
      </div>
    </header>
    <div class="duration">
      <div class="durationtop">
        <div class="duration_number">
          <i>8</i>h
          <i>20</i>m
        </div>
        <div class="text">睡眠总时长</div>
      </div>
      <div class="jindutiao">
        <div :style="{width: this.shen}"></div>
        <div :style="{width: this.qian}"></div>
      </div>
      <div class="bottom">
        <!-- 深睡眠 -->
        <div class="btom_textBox shenshuimian">
          <div class="btom_textBox_number">
            <i>1</i>h
            <i>14</i>m
          </div>
          <div class="hint">深睡眠时长</div>
          <div class="legend">
            <span></span>
            <i>{{this.shen}}</i>
          </div>
        </div>
        <!-- 浅睡眠 -->
        <div class="btom_textBox qianshuimian">
          <div class="btom_textBox_number">
            <i>7</i>h
            <i>06</i>m
          </div>
          <div class="hint">浅睡眠时长</div>
          <div class="legend">
            <span></span>
            <i>{{this.qian}}</i>
          </div>
        </div>
        <!-- 清醒时长 -->
        <div class="btom_textBox qinxing">
          <div class="btom_textBox_number">
            <i>0</i>h
            <i>20</i>m
          </div>
          <div class="hint">清醒时长</div>
        </div>
      </div>
    </div>
    <!-- 小贴士 -->
    <div class="shuomingBox">
      <div class="h_top">睡眠小贴士</div>
      <p>首先，保持睡眠的环境安静，且不要有光线，最好选用遮光窗帘。其次，最好固定睡眠时间，每天在同一个时间上床，同一个时间起床，时间不要过长。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sleepDetails',
  components: {},
  data() {
    return {
      shen: '24%',
      qian: '76%',
      titlemsg: '昨晚您的睡眠得分',
      number: 0,
      percentage: 68,
      startTime: '23:00',
      endTime: '07:20'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goback() {
      window.history.go(-1)
    },
    getData() {
      this.$http
        .get('https://www.easyserp.com/wristband/wristband', {
          params: {
            method: 'retrieveData'
          }
        })
        .then(function(data) {
          console.log(data)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.sleepDetails header {
  position: relative;
  width: 100%;
  height: 4.7rem;
  padding-top: 0.8rem;
  box-sizing: border-box;
  background: url('~@/assets/images/sleep.png') no-repeat center/cover;
}
.sleepDetails .back {
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  width: 0.4rem;
  height: 0.6rem;
  /* background-color: #fff; */
}
.sleepDetails header p {
  font-size: 0.24rem;
  color: #efdbfa;
  text-align: center;
}
.sleepDetails header .number {
  display: block;
  width: 100%;
  margin: 0.1rem 0;
  font-size: 0.6rem;
  color: #fff;
  text-align: center;
}

.sleepDetails .sleep_contain {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 1.24rem;
  margin-top: 0.35rem;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.sleepDetails .sleep_contain li {
  width: 40%;
  height: 100%;
  background-color: #b587cf;
}
.sleepDetails .sleep_contain li:nth-child(2) {
  width: 20%;
  background-color: #784496;
}
.sleepDetails .sleep_contain li:nth-child(4) {
  width: 10%;
  background-color: #784496;
}
.sleepDetails .btom_time {
  overflow: hidden;
  font-size: 0.16rem;
  color: #fff;
  padding: 0 0.1rem;
  margin-top: 0.1rem;
  box-sizing: border-box;
}
.sleepDetails .btom_time .start_time {
  float: left;
  margin-bottom: 0.4rem;
}
.sleepDetails .btom_time .end_time {
  float: right;
}
.sleepDetails .duration {
  margin: 0.2rem 0;
  padding: 0.4rem 0.4rem;
  background-color: #fff;
  box-sizing: border-box;
}
.sleepDetails .jindutiao {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0.26rem;
  margin: 0.5rem 0 0.3rem;
}
.sleepDetails .jindutiao > div:nth-child(1) {
  width: 30%;
  height: 100%;
  background-color: #784496;
}
.sleepDetails .jindutiao > div:nth-child(2) {
  width: 70%;
  height: 100%;
  background-color: #b587cf;
}
.sleepDetails .bottom {
  overflow: hidden;
}
.sleepDetails .durationtop i,
.bottom i {
  font-size: 0.4rem;
  color: #784496;
}
/* .sleepDetails .duration_number{
  text-align: center;
  font-size: 0.24rem;
} */
.durationtop .duration_number,
.btom_textBox_number {
  text-align: center;
  font-size: 0.24rem;
}
.sleepDetails .durationtop .text,
.hint {
  margin: 0 0 0.1rem;
  text-align: center;
  font-size: 0.24rem;
  color: #784496;
}
.sleepDetails .legend {
  overflow: hidden;
  padding-left: 0.8rem;
}
.sleepDetails .legend span {
  float: left;
  display: block;
  width: 0.2rem;
  height: 0.2rem;
  background-color: #784496;
}
.sleepDetails .qianshuimian span {
  background-color: #b587cf;
}
.sleepDetails .legend i {
  float: left;
  display: block;
  font-size: 0.18rem;
  line-height: 0.18rem;
  margin-left: 0.14rem;
}
.sleepDetails .bottom > div {
  float: left;
  width: 33.33%;
}
.sleepDetails .qinxing .btom_textBox_number,
.sleepDetails .qinxing .btom_textBox_number i,
.sleepDetails .qinxing .hint {
  color: #666 !important;
}
.sleepDetails .shuomingBox {
  padding: 0.4rem 0.2rem 0.4rem 0.4rem;
  background-color: #fff;
  box-sizing: border-box;
}
.sleepDetails .h_top {
  font-size: 0.28rem;
  color: #666;
}
.sleepDetails .shuomingBox p {
  margin-top: 0.22rem;
  text-indent: 0.2rem;
  font-size: 0.24rem;
  color: #999;
}
</style>
