<template>
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
</template>

<script>
export default {
  name: 'headTop',
  data () {
    return {
      changeHide: true,
      isActive: false,
      stepcount: 678,
      infoData: {},
      querydate: {
        km: 0,
        kj: 2,
        hg: 3,
        bu: 4
      }
    }
  },
  created () {
    this.fnTime()
    this.infoData = JSON.parse(sessionStorage.getItem('infoData'))
    this.stepcount = this.infoData.broadcastData.stepCount
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color:#f2f2f2')
  },
  methods: {
    gomyset () {
      this.$router.push({ path: '../mySet/myset' })
    },
    fnTime () {
      setTimeout(() => {
        this.changeHide = false
        this.isActive = true
      }, 2000)
    }
  }
}
</script>
<style scoped>
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

</style>
