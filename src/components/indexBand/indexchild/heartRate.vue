<template>
  <div>
    <!-- 心率监测 -->
    <div class="heartRate" @click="goheartDetails()">
      <div class="h_top">
        <div class="l_img"></div>
        <div class="textBox">
          <h6>{{ this.title }}</h6>
          <p class="dateTime">{{ this.nowTime }}</p>
        </div>
        <div class="r_jiantou"></div>
        <div class="r_textBox">
          <div class="number">
            <i class="heartRateNumber">{{ this.heartRateNumber }}</i>次/分
          </div>
        </div>
      </div>
      <echatsBiao></echatsBiao>
    </div>
  </div>
</template>
<script>
import echatsBiao from '../.././common/echatsBiao'
export default {
  data () {
    return {
      title: '心率监测',
      heartRateNumber: 0,
      nowTime: ''
    }
  },
  created () {
    this.heartRateNumber = JSON.parse(sessionStorage.getItem('infoData')).broadcastData.heartRate
  },
  mounted () {
    setInterval(() => {
      this.nowTime = this.$common.NowTime()
    }, 1000)
  },
  components: {
    echatsBiao: echatsBiao
  },
  methods: {
    goheartDetails () {
      this.$router.push({ path: '../../details/heartDetails' })
    }
  }
}
</script>
<style scope>
.heartRate {
  width: 100%;
  /* height: 4rem; */
  margin-top: 0.2rem;
  padding-bottom: 0.2rem;
  background-color: #fff;
}
.h_top {
  overflow: hidden;
  padding: 0.38rem 0.4rem 0.1rem;
}
.l_img {
  float: left;
  width: 0.46rem;
  height: 0.46rem;
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
.r_jiantou {
  float: right;
  width: 0.22rem;
  height: 0.38rem;
  margin-top: 0.1rem;
  background: url('~@/assets/images/jiantou_r.png') no-repeat center/contain;
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
.heartRate .l_img {
  background-image: url("~@/assets/images/xinlv.png");
}
.heartRate .number {
  font-size: 0.28rem;
  color: #666;
}
.heartRate i {
  font-size: 0.4rem;
}
.heartRate_contain {
  width: 100%;
  height: 3.24rem;
  padding: 0 0.4rem;
  margin-top: 0.4rem;
  /* background-color: skyblue; */
  box-sizing: border-box;
}
</style>
