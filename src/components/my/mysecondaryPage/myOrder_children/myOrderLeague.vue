<template>
  <div id="myOrderLeague">
    <div class="initBox" v-if="init==='null'" @click="orderShow">
      <img src="../../../../../static/images/icon/init.png" alt>
      <p>您还没有预约任何团课，赶快点我去预约吧</p>
    </div>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
      <ul v-if="init==='block'">
        <li v-for="item of myLeagueList" :key="item.id">
          <div class="imgBox_l">
            <img :src="'./static/images/clubid' + clubId + '/league/'+item.imgurl" onerror="this.src='./static/images/default/imgfault.png'" alt>
          </div>
          <div class="content_r">
            <p>课程：{{item.coachName}}</p>
            <p>教室：{{item.classRoom}}</p>
            <p>
              开始时间：{{item.endTime.slice(0,10)}}
              <i>{{item.courseTime.slice(0,5)}}</i>
            </p>
            <p>
              结束时间：{{item.endTime.slice(0,10)}}
              <i>{{item.courseTime.slice(-5)}}</i>
            </p>
            <!-- 签到 -->
            <button
              class="signIn"
              v-if="item.showStatus === '0'||item.showStatus === '1'"
              @click="isTuanke(item.id)"
            >签到</button>
            <button
              class="signIn"
              v-else-if="item.showStatus === '3' || item.showStatus === '4'"
              style="background-color:#ccc;color: #fff;"
            >签到</button>
            <button
              class="signIn"
              v-else-if="item.showStatus === '2'"
              style="background-color:#7EF481;color: #fff;"
            >签到成功</button>
            <!-- 取消预约 -->
            <button
              v-if="item.showStatus === '0'"
              @click="isCancel(item.id,item.tuanKeName,item.coachName)"
            >取消预约</button>
            <button
              v-else-if="item.showStatus === '1'"
              style="background-color:#ccc;color: #fff;"
            >已过取消时间</button>
            <button
              v-else-if="item.showStatus === '3'"
              style="background-color:#ccc;color: #fff;"
            >预约已过期</button>
            <button
              v-else-if="item.showStatus === '4'"
              style="background-color:#ccc;color: #fff;"
            >预约已取消</button>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'myOrderLeague',
  data() {
    return {
      pageNoIndex: 1,
      myLeagueList: [],
      init: null,
      shopNum: window.sessionStorage.getItem('shopNum'),
      shopName: window.sessionStorage.getItem('shopName'),
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId'),
      isOpen: false
    }
  },
  created() {
    this.pageNoIndex = 1
    this.getmyLeagueList()
    window.sessionStorage.setItem('myOrderShow', 'myOrderLeague')
  },
  methods: {
    // 下拉刷新
    refresh(done) {
      // 这是向下滑动的时候请求最新的数据
      this.pageNoIndex = 1
      this.getmyLeagueList(done)
    },
    // 上拉加载
    infinite(done) {
      this.upList(this.pageNoIndex, done)
    },
    // 点击跳转
    orderShow() {
      window.sessionStorage.setItem('orderShow', 'orderLeague')
      this.$router.push({ name: 'orderLeague' })
    },
    // 获取首屏数据
    async getmyLeagueList(fn) {
      const { data: res } = await this.$http.get(
        'tuanke/getTuanKeAppointmentByUser',
        {
          params: {
            pageNo: 0,
            pageSize: 4,
            shopName: this.shopName,
            token: this.token
          }
        }
      )
      console.log(res)
      if (res.msg === 'success') {
        if (fn) fn()
        this.isOpen = true
        // 如果首屏请求为空
        if (res.data.length === 0) {
          let vcontainer = document.getElementsByClassName('_v-container')[0]
          vcontainer.style.zIndex = '-1'
          let vcontent = document.getElementsByClassName('_v-content')[0]
          vcontent.style.display = 'none'
          return (this.init = 'null')
        }
        // 有数据
        this.myLeagueList = res.data
        this.init = 'block'
      } else {
        this.$toast(res.data)
      }
    },
    // 上拉加载
    async upList(pageNoIndex, fn) {
      if (!this.isOpen) return fn()
      const { data: res } = await this.$http.get(
        'tuanke/getTuanKeAppointmentByUser',
        {
          params: {
            pageNo: pageNoIndex,
            pageSize: 4,
            shopName: this.shopName,
            token: this.token
          }
        }
      )
      if (res.msg === 'success') {
        if (res.data.length === 0) {
          // 没有更多数据了
          fn(true)
        } else {
          fn()
          this.myLeagueList = this.myLeagueList.concat(res.data)
          this.pageNoIndex++
          console.log(res.data)
        }
      } else {
        this.$toast(res.data)
      }
    },
    // 取消预约提示
    isCancel(id, tuanKeName, coachName) {
      this.$messagebox({
        title: '温馨提示',
        message: '您确定要取消团课预约吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.cancelTuanke(id, tuanKeName, coachName)
        }
      })
    },
    // 取消预约
    async cancelTuanke(id, tuanKeName, coachName) {
      const { data: res } = await this.$http.get('tuanke/cancelTKAppointment', {
        params: {
          id,
          tuankeName: tuanKeName,
          teacherName: coachName,
          shopNum: this.shopNum,
          token: this.token
        }
      })
      if (res.msg === 'success') {
        let len = this.myLeagueList.length
        for (let i = 0; i < len; i++) {
          if (this.myLeagueList[i].id === id) {
            this.myLeagueList[i].showStatus = '4' // 变为已取消预约的状态
            return
          }
        }
      } else {
        this.$toast(res.data)
      }
    },
    // 签到
    // affrmTuanke
    isTuanke(id) {
      this.$messagebox({
        title: '温馨提示',
        message: '您确认要签到吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.affrmTuanke(id)
        }
      })
    },
    async affrmTuanke(id) {
      const { data: res } = await this.$http.get(
        'tuanke/confirmTuankeAppointment',
        { params: { id, token: this.token } }
      )
      if (res.msg === 'success') {
        let len = this.myLeagueList.length
        for (let i = 0; i < len; i++) {
          if (this.myLeagueList[i].id === id) {
            this.myLeagueList[i].showStatus = '2' // 变为已签到的状态
            return
          }
        }
      } else {
        this.$toast(res.data)
      }
    }
  }
}
</script>

<style scoped>
#myOrderLeague {
  width: 100%;
  position: relative;
  width: 100%;
  height: 12rem;
}
#myOrderLeague ul li {
  overflow: hidden;
  padding: 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
}
.imgBox_l {
  float: left;
  overflow: hidden;
  width: 2.28rem;
  height: 2.28rem;
  background-color: #efefef;
  border-radius: 8px;
}
.imgBox_l img {
  width: 100%;
}
.content_r {
  position: relative;
  float: right;
  width: 65%;
  padding-left: 0.4rem;
  box-sizing: border-box;
}
.content_r p {
  font-size: 0.26rem;
  color: #888;
  margin-bottom: 0.06rem;
}
.content_r p i {
  color: #7ecef4;
  font-style: normal;
}
.content_r button {
  float: left;
  display: block;
  outline: none;
  border: 0;
  font-size: 0.26rem;
  padding: 0.14rem 0.2rem;
  color: #fff;
  background-color: #7ecef4;
  border-radius: 8px;
  margin-top: 0.16rem;
  margin-right: 0.2rem;
}
.initBox {
  width: 100%;
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
.signIn {
  padding: 0.14rem 0.4rem !important;
}
</style>
