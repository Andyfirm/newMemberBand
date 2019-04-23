<template>
  <div class="heartDetails">
    <header>
      <div class="back" @click="back()"></div>
      <div class="topBox">
        <div class="number">
          <i class="heartRateNumber">{{ this.heartRateNumber }}</i>次/分
        </div>
        <p class="dateTime">{{this.nowTime}}</p>
      </div>
      <echatsBiao></echatsBiao>
      <!-- <div class="heartRate_contain" id="heartRate_contain"></div> -->
    </header>
    <!-- 各项分析 -->
    <div class="classify">
      <ul>
        <li>
          <div class="number">
            <i>{{ this.getData.maxHeartrate }}</i>次/分
          </div>
          <p>最高心率</p>
        </li>
        <li>
          <div class="number">
            <i>{{ this.getData.minHeartrate }}</i>次/分
          </div>
          <p>最低心率</p>
        </li>
        <li>
          <div class="number">
            <i class="heartRateNumber">{{ this.getData.aveHeartrate }}</i>次/分
          </div>
          <p>平均心率</p>
        </li>
        <li>
          <div class="number">
            <i>{{ this.getData.aerobicNumber }}</i>分钟
          </div>
          <p>有氧燃脂</p>
        </li>
        <li>
          <div class="number">
            <i>1</i>时
            <i>45</i>分
          </div>
          <p>舒适缓解</p>
        </li>
        <li>
          <div class="number">
            <i>1</i>时
            <i>34</i>分
          </div>
          <p>活力运动</p>
        </li>
      </ul>
    </div>
    <!-- 小贴士 -->
    <div class="shuomingBox">
      <div class="h_top">心率小贴士</div>
      <p>正常成人安静状态下，测量心率每分钟在60到100次，低于60次每分钟考虑窦性心动过缓，心率高于每分钟100次考虑窦性心动过速，通常安静状态下，心动偏慢，活动或者情绪激动可使心率增加。</p>
    </div>
  </div>
</template>
<script>
import echatsBiao from '../common/echatsBiao'
export default {
  data() {
    return {
      nowTime: '',
      heartRateNumber: 100,
      getData: {
        maxHeartrate: 0,
        minHeartrate: 0,
        aveHeartrate: 0,
        aerobicNumber: 0,
        comfortable: 0,
        vitality: 0
      }
    }
  },
  components: {
    echatsBiao: echatsBiao
  },
  mounted() {
    setInterval(() => {
      this.nowTime = this.$common.TimeNow()
    }, 1000)
  },
  methods: {
    back() {
      this.$router.push({ name: 'indexBand' })
    }
  }
}
</script>
<style scoped>
.heartDetails header {
  overflow: hidden;
  position: relative;
  width: 100%;
  background-color: #fff;
}
.heartDetails .back {
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  width: 0.3rem;
  height: 0.4rem;
  background: url('~@/assets/images/xinlvback.png') no-repeat center/cover;
}
.heartDetails .topBox {
  width: 100%;
  margin-top: 0.42rem;
  text-align: center;
}
.heartDetails .topBox .number {
  font-size: 0.28rem;
  color: #333;
}
.heartDetails .topBox .number i {
  font-size: 0.6rem;
  color: #fc726e;
}
.heartDetails .topBox p {
  font-size: 0.24rem;
  color: #666;
}
.heartDetails .classify {
  margin-top: 0.2rem;
  padding: 0.2rem 0;
  background-color: #fff;
}
.heartDetails .classify ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.heartDetails .classify li {
  width: 33.33%;
  margin: 0.3rem 0;
  text-align: center;
}
.heartDetails .classify .number {
  font-size: 0.24rem;
  color: #333;
}
.heartDetails .classify .number i {
  color: #fc726e;
  font-size: 0.5rem;
}
.heartDetails .classify p {
  font-size: 0.24rem;
  color: #333;
}
.heartDetails .shuomingBox {
  padding: 0.4rem 0.2rem 0.4rem 0.4rem;
  background-color: #fff;
  box-sizing: border-box;
  margin-top: 0.2rem;
}
.heartDetails .h_top {
  font-size: 0.28rem;
  color: #666;
  margin-bottom: 0.06rem;
}
.heartDetails .shuomingBox p {
  text-indent: 0.2rem;
  font-size: 0.24rem;
  color: #999;
}
.heartDetails .heartRate_contain {
  width: 100%;
  height: 3.24rem;
  padding: 0 0.4rem;
  margin-top: 0.4rem;
  /* background-color: skyblue; */
  box-sizing: border-box;
}
</style>
