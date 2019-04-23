<template>
  <div id="succeed">
    <div class="success">
      <img src="../../../static/images/icon/success.png" alt>
    </div>
    <p class="success_p" v-if="stamp==='1'||stamp==='2'||stamp==='3'">预约成功</p>
    <p class="success_p" v-else-if="stamp==='8'">充值成功</p>
    <p class="success_p" v-else>购买成功</p>
    <p
      class="money"
      v-if="stamp==='1'||stamp==='4'||stamp==='5'||stamp==='6'||stamp==='7'||stamp==='8'"
    >支付: {{submittedData.total}}元</p>
    <!-- 场地 -->
    <div class="words" v-if="stamp === '1'">
      <p class="shuoming">您已成功预约:</p>
      <span class="ymd" style="color:#7ECEF4;">{{ymd[0]}}日</span>
      <div class="clearfix shijian">
        <span
          class="right"
          style="color:#7ECEF4;"
          v-for="(item,index) of time"
          :key="index"
        >{{item}} {{name[index]}}</span>
      </div>
      <p>请准时到场报到锻炼，如有事无法到场请提前取消。</p>
    </div>
    <!-- 私教 -->
    <div class="words sj" v-if="stamp === '3'">
      <p class="shuoming">您已成功预约:</p>
      <div class="title">
        <span>{{sjdataStr.teachername}}教练</span>
        <span>{{sjdataStr.teachitemname}}课程</span>
      </div>
      <p class="date">预约时间段</p>
      <ul>
        <li
          v-for="(item, index) of sjdataStr.selectList"
          :key="index"
        >{{item.date}} {{item.starttime}}-{{item.endtime}}</li>
      </ul>
    </div>
    <!-- 预约团课 -->
     <div class="words sj" v-if="stamp === '2'">
      <p class="shuoming">您已成功预约:</p>
      <div class="title">
        <span>{{tuankecourseName}}项目</span>
      </div>
      <p class="date">预约时间段</p>
      <ul>
        <li>{{tuankecourseTime}}</li>
      </ul>
    </div>
    <!-- 在线购票 -->
    <div class="words sj" v-if="stamp === '4'">
      <p class="shuoming">您已成功购买:</p>
      <div class="title" style="margin-bottom:0.4rem;">
        <span>{{ticketName}}</span>
      </div>
    </div>
    <!-- 购买私教课程 -->
    <div class="words sj" v-if="stamp === '6'">
      <p class="shuoming">您已成功购买:</p>
      <div class="title" style="margin-bottom:0.4rem;">
        <span>{{sjteacherName}}教练</span>
        <span>{{sjcourseName}}课程</span>
      </div>
    </div>
     <!-- 购卡 -->
    <div class="words sj" v-if="stamp === '7'">
      <p class="shuoming">您已成功购买:</p>
      <span style="text-align:center;display:block;width:100%;">{{cardName}}</span>
    </div>
    <p class="know" @click="classDetail">我知道了</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'succeed',
  data() {
    return {
      stamp: this.$route.query.stamp, // 标识
      // 在线购票相关
      ticketName: window.sessionStorage.getItem('ticketName'),
      // 场地相关
      ymd: [],
      time: [],
      name: [],
      // 私教相关
      sjdataStr: {},
      // 购买私教课程相关
      sjteacherName: window.sessionStorage.getItem('sjteacherName'),
      sjcourseName: window.sessionStorage.getItem('sjcourseName'),
      // 团课相关
      tuankecourseTime: window.sessionStorage.getItem('tuankecourseTime'),
      tuankecourseName: window.sessionStorage.getItem('tuankecourseName'),
      // 购卡
      cardName: window.sessionStorage.getItem('cardName')
    }
  },
  mounted() {
    this.filter()
  },
  methods: {
    filter() {
      switch (this.stamp) {
        case '1': // 场地预约成功
          let arr = this.submittedData.fieldinfo.split('/')
          for (let i = 0; i < arr.length - 1; i++) {
            let arr1 = arr[i].split('#')
            this.ymd.push(arr1[0])
            this.time.push(arr1[0])
            this.name.push(arr1[4])
          }
          break
        case '2':
          break
        case '3': // 私教预约成功
          let sjDataStr = window.sessionStorage.getItem('sjdataStr')
          this.sjdataStr = JSON.parse(sjDataStr)
          console.log(this.sjdataStr)
          break
        case '4': // 在线购票
          break
        case '5':
          break
      }
    },
    classDetail() {
      switch (this.stamp) {
        case '1': // 场地预约
          this.$router.replace({ name: 'orderSite' })
          break
        case '2': // 团课预约
          this.$router.replace({
            name: 'orderSite',
            query: { success: 'success' }
          }) // 携带参数，刷新下一个页面
          break
        case '3': // 私教预约
          this.$router.replace({ name: 'orderSite' })
          break
        case '4': // 在线购票
          this.$router.replace({ name: 'ticketsOnline' })
          break
        case '5': // 在线报班
          this.$router.replace({ name: 'onlineClass' })
          break
        case '6': // 购买私教
          this.$router.replace({ name: 'index' })
          break
        case '7': // 购卡
          this.$router.replace({ name: 'purchaseCard' })
          break
        case '8': // 充值成功
          this.$router.replace({ name: 'myCentre' })
          break
      }
    }
  },
  computed: {
    ...mapState(['submittedData'])
  }
}
</script>

<style scoped>
#succeed {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding-top: 0.8rem;
  padding-bottom: 0.4rem;
}
.success {
  width: 2.88rem;
  height: 2.88rem;
  margin: 0 auto;
}
.success img {
  width: 100%;
}
.success_p {
  font-size: 0.4rem;
  color: #7ecef4;
  text-align: center;
  margin-top: 0.4rem;
}
.money {
  text-align: center;
  font-size: 0.36rem;
  padding: 0.36rem;
  color: #666;
}
.words {
  padding: 0 0.3rem;
}
.shuoming {
  font-size: 0.36rem;
}
.ymd {
  display: block;
  font-size: 0.36rem;
  padding-bottom: 0.2rem;
  padding-left: 0.6rem;
}
.clearfix.shijian {
  padding: 0 1.4rem;
}
.clearfix.shijian span {
  display: block;
  font-size: 0.36rem;
  padding-bottom: 0.2rem;
}
.words p {
  font-size: 0.32rem;
  color: #999;
  padding-bottom: 0.2rem;
}
.know {
  font-size: 0.36rem;
  font-weight: 700;
  color: #7ecef4;
  text-align: center;
}
.words.sj {
  color: #7ecef4;
  font-size: 0.32rem;
}
.words.sj .title {
  text-align: center;
}
.words.sj p.date {
  margin-top: 0.2rem;
  text-align: center;
}
.words.sj ul {
  overflow: scroll;
  max-height: 4rem;
  padding: 0.2rem 0;
  margin-bottom: 0.4rem;
}
.words.sj ul li {
  text-align: center;
}
</style>
