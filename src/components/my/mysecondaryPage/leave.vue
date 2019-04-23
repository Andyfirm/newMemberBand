<template>
  <div id="leave">
    <div class="nav_topWrap">
      <div class="navWrap">
        <div class="nav_top">
          <div>
            <div class="leave_l active" ref="leave_l" @click="leave">请假</div>
          </div>
          <div>
            <div class="pause_r" ref="pause_r" @click="pause">暂停</div>
          </div>
        </div>
      </div>
      <div class="initBox" v-if="leaves.length===0" v-show="isLeave">
        <img src="../../../../static/images/icon/init.png" alt>
        <p>您暂时没有请假记录</p>
      </div>
      <div class="wrapList">
        <ul v-if="leaves.length!==0" class="content_leave" v-show="isLeave">
          <li v-for="item of leaves" :key="item.id">
            <p>卡号:{{item.asscardnum}}</p>
            <p>请假天数:{{item.vactiondays}}天</p>
            <p>开始时间:{{item.vactionstartdate}}</p>
            <p>结束时间:{{item.vactionenddate}}</p>
            <p>请假日期:{{item.vactiondate}}</p>
            <p>注销日期:{{item.cancelDate}}</p>
          </li>
        </ul>
        <div class="initBox" v-if="stops.length===0" v-show="isPause">
          <img src="../../../../static/images/icon/init.png" alt>
          <p>您暂时没有暂停记录</p>
        </div>
        <ul class="content_leave" v-if="stops.length!==0" v-show="isPause">
          <li v-for="item of stops" :key="item.id">
            <p>卡号:{{item.asscardnum}}</p>
            <p>暂停天数:{{item.vactiondays}}天</p>
            <p>开始时间:{{item.pauseStartDate}}</p>
            <p>结束时间:{{item.pauseEndDate}}</p>
            <p>暂停日期:{{item.vactiondate}}</p>
            <p>注销日期:{{item.cancelDate}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leave',
  data() {
    return {
      isLeave: true,
      isPause: false,
      pageNoIndex: 1,
      leaves: [],
      stops: [],
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.pageNoIndex = 1
    this.getList()
  },
  methods: {
    // 获取首屏数据
    async getList(fn) {
      const { data: res } = await this.$http.get('myresp/getLeaveByUser', {
        params: {
          pageNo: 0,
          pageSize: 6,
          shopNum: this.shopNum,
          token: this.token,
          state: 'stop'
        }
      })
      console.log(res)
      if (res.msg === 'success') {
        if (fn) fn()
        this.leaves = res.data
        // this.stops = res.data.stop
      }
    },
    // 请假
    leave() {
      let leave = this.$refs.leave_l
      let pause = this.$refs.pause_r
      leave.classList.add('active')
      pause.classList.remove('active')
      this.isLeave = true
      this.isPause = false
    },
    // 暂停
    async pause() {
      let leave = this.$refs.leave_l
      let pause = this.$refs.pause_r
      leave.classList.remove('active')
      pause.classList.add('active')
      this.isLeave = false
      this.isPause = true
      const { data: res } = await this.$http.get('myresp/getLeaveByUser', {
        params: {
          pageNo: 0,
          pageSize: 6,
          shopNum: this.shopNum,
          token: this.token,
          state: ''
        }
      })
      console.log(res)
      if (res.msg === 'success') {
        this.stops = res.data
        console.log(this.stops)
      }
    }
  }
}
</script>

<style scoped>
#leave {
  width: 100%;
}
.nav_topWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
}
.nav_top {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  font-size: 0.38rem;
  color: #333;
  border-radius: 8px;
  box-sizing: border-box;
}
.nav_top > div {
  float: left;
  width: 50%;
  text-align: center;
}
.nav_top .leave_l,
.nav_top .pause_r {
  width: 24%;
  padding: 0.24rem 0;
  margin: 0 auto;
}
.nav_top .active {
  color: #7fbeff;
  border-bottom: 2px solid #7fbeff;
  box-sizing: border-box;
}
.content_leave {
  width: 100%;
  margin-top: 0.2rem;
}
.content_leave li {
  background-color: #fff;
  border-radius: 8px;
  padding: 0.2rem 0.4rem;
}
.content_leave li p {
  font-size: 0.3rem;
  color: #333;
  margin: 0.2rem 0;
}
li {
  margin-bottom: 0.2rem;
}
.initBox {
  width: 100%;
  margin-top: 2rem;
}
.initBox img {
  display: block;
  width: 5rem;
  height: 5rem;
  margin: 0.52rem auto;
}
.initBox p {
  font-size: 0.32rem;
  text-align: center;
}
.wrapList {
  position: relative;
  height: 12rem;
  margin-top: 1.26rem;
}
.navWrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9;
  padding: 0.2rem;
  background-color: #f6f6f6;
  box-sizing: border-box;
}
</style>
