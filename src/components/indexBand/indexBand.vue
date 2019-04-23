<template>
  <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
    <mt-loadmore :top-method="loadTop" @translate-change="translateChange" ref="loadmore">
      <div class="head">
        <div class="top">
          <img src="@/assets/images/jiantou_l.png" alt="">
          <img src="@/assets/images/set.png" alt="" @click="gomyset()">
        </div>
        <div class="bigCircle" :class="{ 'active': isActive }">
          <div class="xiaoyuanBox">
            <div class="l_Box">
                <div class="l_yuan"></div>
            </div>
            <div class="r_Box">
                <div v-show="this.isActive" class="r_yuan" :class="{ 'active': isActive }"></div>
            </div>
          </div>
          <div v-show="this.changeHide" class="tishiyu">正在加载数据...</div>
          <div class="tinyCircle" :class="{ 'active': isActive }">
            <div v-show="!this.changeHide"><span class="step">{{this.stepcount}}</span><span class="text">步数</span></div>
          </div>
        </div>
        <div class="headerItem">
          <div class="item">
            <p class="juli">{{this.querydate.km}}KM</p>
            <p>距离</p>
          </div>
          <div class="item">
            <p class="calories">{{this.querydate.kj}}KJ</p>
            <p>热量</p>
          </div>
          <div class="item">
            <p class="contrRelax">{{this.querydate.hg}}/0mmHg</p>
            <p>血压</p>
          </div>
          <div class="item">
            <p class="stepSet">{{this.querydate.bu}}步</p>
            <p>目标</p>
          </div>
        </div>
      </div>
      <!-- <headTop :v-bind="changeHide"></headTop> -->
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
      <div class="heartRate" @click="goheartDetails()">
        <div class="h_top">
          <div class="l_img"></div>
          <div class="textBox">
            <h6>{{ this.title2 }}</h6>
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
            <li v-for="(item, index) in items" :key="index"
              :style="{ height:  item.heightrem + 'rem'}"
              :class="{ 'active': !item.showColor }">
            </li>
            <!-- <span>4-9</span> -->
          </ul>
          <div class="line"></div>
        </div>
      </div>
      <foo></foo>
    </mt-loadmore>
  </div>
</template>

<script>
import echatsBiao from '../common/echatsBiao'
import foo from './indexchild/footer'
import { publicUrl } from '../../api/index.js'
export default {
  name: 'indexBand',
  components: {
    echatsBiao: echatsBiao,
    // days: days,
    foo: foo
  },
  data () {
    return {
      changeHide: true,
      isActive: false,
      showColor: false,
      stepcount: 678,
      title: '睡眠监测',
      title2: '心率监测',
      heartRateNumber: 0,
      nowTime: '',
      items: [
        { heightrem: '1.8', showColor: true },
        { heightrem: '1.3', showColor: false },
        { heightrem: '1.4', showColor: false },
        { heightrem: '1.8', showColor: true },
        { heightrem: '1.4', showColor: false },
        { heightrem: '1.6', showColor: true },
        { heightrem: '1.5', showColor: true }
      ],
      days: [],
      querydate: {
        km: 0,
        kj: 2,
        hg: 3,
        bu: 4
      },
      wrapperHeight: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      publicUrl({ method: 'retrieveData' }).then(res => {
        console.log(res)
        if (res.broadcastData !== '') {
          this.changeHide = false
          this.isActive = true
          this.stepcount = res.broadcastData.stepCount
          this.heartRateNumber = res.broadcastData.heartRate
        }
      }).catch((msg) => {
        alert('网络有问题')
      })
    },
    translateChange (translate) {
      const translateNum = +translate
      this.translate = translateNum.toFixed(2)
      this.moveTranslate = (1 + translateNum / 70).toFixed(2)
    },
    loadTop () {
      this.changeHide = true
      this.isActive = false
      setTimeout(() => {
        publicUrl({ method: 'retrieveData' }).then(res => {
          if (res.broadcastData !== '') {
            this.changeHide = false
            this.isActive = true
            this.$refs.loadmore.onTopLoaded()
          }
        }).catch((msg) => {
          this.$refs.loadmore.onTopLoaded()
        })
      }, 1500)
    },
    // 睡眠监测
    gosleepDetail () {
      this.$router.push({ path: '../details/sleepDetails' })
    },
    // 心率监测
    goheartDetails () {
      this.$router.push({ path: '../../details/heartDetails' })
    },
    // 达标天数
    goReach () {
      this.$router.push({ path: '../../details/reach' })
    }
  },
  mounted () {
    setInterval(() => {
      this.nowTime = this.$common.NowTime()
    }, 1000)
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().to
  }
}
</script>
<style scope>
.loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear;
    font-size: 0.2rem;
}
.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}

.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
    border-bottom: 1px solid #eee
}

.page-loadmore-listitem {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.2rem;
}

.page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
}

.page-loadmore-wrapper {
    overflow: scroll
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

.head{
  width: 100%;
  height: 8rem;
  background:linear-gradient(0deg,rgba(141,187,250,1) 0%,rgba(135,245,179,1) 100%);
  justify-content: center;
  display: flex;
  position: relative;
}
.top{
  position: absolute;
  top: 0.4rem;
  width: 100%;
  height: 0.4rem;
}
.top img:nth-child(1){
  width: 0.3rem;
  height: 0.42rem;
  float: left;
  margin-left: 0.4rem;
}
.top img:nth-child(2){
  width: 0.4rem;
  height: 0.42rem;
  float: right;
  margin-right: 0.4rem;
}
.bigCircle{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.7rem;
  height: 4.7rem;
  top: 0.8rem;
  bottom: 0.9rem;
  background-image: url('~@/assets/images/loading.gif');
  background-size: 100% 100%;
  border-radius: 50%;
  box-sizing: border-box;
}
.bigCircle.active {
    background-image: url('~@/assets/images/ddd.gif');
    animation: mymove 0.5s 1;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  49.3% {
    transform: scale(1.05);
  }
  52.7% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
.xiaoyuanBox{
    position: absolute;
    left: 0.66rem;
    top: 0.57rem;
    width: 3.54rem;
    height: 3.54rem;
    /* border: 3px solid #fff; */
    border-radius: 50%;
}
.l_Box {
    left: 0;
}
.r_Box {
  right: 0;
}
.l_Box, .r_Box {
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 50%;
  height: 100%;
}
.l_yuan {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  /* background-color: blue; */
  border-radius: 50%;
  border-top: 3px solid #fff;
  border-left: 3px solid #fff;
  border-right: 3px solid rgba(0, 0, 0, 0);
  border-bottom: 3px solid rgba(0, 0, 0, 0);
  transform: rotateZ(-225deg);
  box-sizing: border-box;
}
.r_yuan {
  position: absolute;
  top: 0;
  left: -101%;
  width: 200%;
  height: 100%;
  /* background-color: blue; */
  border-radius: 50%;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  border-left: 3px solid rgba(0, 0, 0, 0);
  border-top: 3px solid rgba(0, 0, 0, 0);
  transform: rotateZ(-225deg);
  box-sizing: border-box;
}
.l_yuan.active:after {
  position: absolute;
  left: 2.82rem;
  top: 0.37rem;
  content: '';
  width: 11px;
  height: 11px;
  display: block;
  background: url('~@/assets/images/yuan.png') no-repeat center/cover;
  background-size: 100% 100%;
}
.r_yuan.active:after {
  position: absolute;
  left: 0.39rem;
  top: 2.84rem;
  content: '';
  width: 11px;
  height: 11px;
  display: block;
  background: url('~@/assets/images/yuan.png') no-repeat center/cover;
  background-size: 100% 100%;
}
.r_yuan {
  position: absolute;
}
.tinyCircle {
    width: 3.6rem;
    height: 3.6rem;
    margin-left: 0.16rem;
    border-radius: 50%;
    box-sizing: border-box;
}
.tinyCircle .step {
  display: block;
  width: 100%;
  margin-top: 1.4rem;
  margin-bottom: 0.1rem;
  font-size: 0.7rem;
  text-align: center;
  color: #fff;
}
.tinyCircle .text {
  display: block;
  width: 100%;
  font-size: 0.4rem;
  text-align: center;
  color: #fff;
}
.tinyCircle.active {
    margin-left: 0.16rem;
    background: url('~@/assets/images/ddq.gif') no-repeat center/cover;
}
.bigCircle .tishiyu {
  position: absolute;
  bottom: -0.4rem;
  font-size: 0.24rem;
  color: #fff;
}
.headerItem {
  position: absolute;
  width: 100%;
  height: 0.8rem;
  bottom: 0.8rem;
  overflow: hidden;
}
.headerItem .item {
  float: left;
  width: 25%;
  color: #fff;
  text-align: center;
}
.headerItem .item p {
  font-size: 0.3rem;
  line-height: 0.3rem;
  margin-bottom: 0.1rem;
}

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
.heartRate {
  width: 100%;
  /* height: 4rem; */
  margin-top: 0.2rem;
  padding-bottom: 0.2rem;
  background-color: #fff;
}
.l_img {
  float: left;
  width: 0.46rem;
  height: 0.46rem;
  background: url("~@/assets/images/shuimian.png") no-repeat center/contain;
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
.reach {
  width: 100%;
  padding-bottom: 0.4rem;
  margin-top: 0.2rem;
  background-color: #fff;
}
.reach .l_img {
  background-image: url('~@/assets/images/dabiao.png');
}
.r_textBox p {
  margin-top: 0.1rem;
  font-size: 0.2rem;
  line-height: 0.2rem;
  color: #999 !important;
}
.bar {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0 0.4rem;
  margin-top: 0.2rem;
  box-sizing: border-box;
}
.bar ul {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.bar li {
  width: 0.8rem;
  height: 1.4rem;
  background-color: #ffc000;
  text-align: center
}
.bar span{
  color: wheat;
  font-size: 0.2rem;
  position: absolute;
  bottom: 0rem;
}
.bar .active{
  background-color: #ccc;
}
/* .bar li:nth-child(1) {
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
} */
.line {
  width: 100%;
  height: 1px;
  position: absolute;
  top: 0rem;
  margin-top: 0.3rem;
  background-color: #ffc000;
}
</style>
