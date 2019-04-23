<template>
  <div id="myOrderPersonal">
    <div class="initBox" v-if="init==='null'" @click="orderShow">
      <img src="../../../../../static/images/icon/init.png" alt>
      <p>您还没有预约任何私教，赶快点我去预约吧</p>
    </div>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
      <ul v-if="init==='block'">
        <li v-for="item of list" :key="item.id">
          <div class="imgBox_l">
            <img
              :src="'./static/images/clubid' + clubId + '/sjkc/'+(item.infPTClassInfo?item.infPTClassInfo.imgurl:'imgfault.png')"
              onerror="this.src='./static/images/default/imgfault.png'"
              alt
            >
          </div>
          <div class="content_r">
            <p>教练：{{item.coachName}}</p>
            <p>课程：{{item.className}}</p>
            <p>
              开始时间：{{item.appointDate}}
              <i>{{item.appointBegin.slice(0,5)}}</i>
            </p>
            <p>
              结束时间：{{item.appointDate}}
              <i>{{item.appointEnd.slice(0,5)}}</i>
            </p>
            <button>
              <a class="mobile" :href="'tel:'+item.memberMobile">联系教练</a>
            </button>
            <button v-if="item.showStatus === '0'" @click="cancelReservation(item)">取消预约</button>
            <button v-else-if="item.showStatus === '1'" class="disabled">已过取消时间</button>
            <button v-else-if="item.showStatus === '2'" class="disabled">预约已过期</button>
            <button v-else-if="item.showStatus === '3'" class="disabled">预约已取消</button>
            <!-- 根据状态判断是否确认上课 -->
            <button v-else-if="item.showStatus === '4'" class="disabled">已上课</button>
            <div
              class="coach_bottom"
              v-if="item.memberConfirm===0&&item.coachConfirm===1&&(item.showStatus!=='2'&&item.showStatus!=='3')"
            >
              <span>教练代预约</span>
              <em @click="confirmYuue(item.id)">确认</em>
            </div>
            <div
              class="text"
              v-else-if="item.memberConfirm===1&&item.coachConfirm===0&&(item.showStatus !== '2'&&item.showStatus !=='3')"
            >会员已预约，待教练确认</div>
            <div
              class="text"
              v-else-if="item.memberConfirm===1&&item.coachConfirm===1&&(item.showStatus !== '2'&&item.showStatus !=='3')"
            >预约成功，等待上课</div>
            <button
              class="confirmClass"
              v-if="item.memberConfirm===1&&item.coachConfirm===2&&(item.showStatus !== '2'&&item.showStatus !=='3'&&item.showStatus !=='4')"
              @click="confirmClass(item)"
            >确认上课</button>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'myOrderPersonal',
  data() {
    return {
      init: null,
      pageNoIndex: 1,
      list: [],
      shopName: window.sessionStorage.getItem('shopName'),
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId'),
      isOpen: false
    }
  },
  created() {
    this.pageNoIndex = 1
    this.getList()
    window.sessionStorage.setItem('myOrderShow', 'myOrderPersonal')
  },
  methods: {
    // 下拉刷新
    refresh(done) {
      // 这是向下滑动的时候请求最新的数据
      this.pageNoIndex = 1
      this.getList(done)
    },
    // 上拉加载
    infinite(done) {
      this.upList(this.pageNoIndex, done)
    },
    // 获取首屏数据
    async getList(fn) {
      const { data: res } = await this.$http.get('pt/getAppointmentPTByUser', {
        params: {
          pageNo: 0,
          pageSize: 6,
          shopName: this.shopName,
          shopNum: this.shopNum,
          token: this.token
        }
      })
      console.log(res)
      if (res.msg === 'success') {
        if (fn) fn()
        this.isOpen = true
        if (res.data.length === 0) {
          // 如果请求数据为空则提示初始化状态
          let vcontainer = document.getElementsByClassName('_v-container')[0]
          vcontainer.style.zIndex = '-1'
          let vcontent = document.getElementsByClassName('_v-content')[0]
          vcontent.style.display = 'none'
          return (this.init = 'null')
        }
        // 有数据
        this.init = 'block'
        this.list = res.data
      } else {
        this.$toast(res.data)
      }
    },
    // 上拉加载
    async upList(page, fn) {
      if (!this.isOpen) return fn()
      const { data: res } = await this.$http.get('pt/getAppointmentPTByUser', {
        params: {
          pageNo: page,
          pageSize: 6,
          shopName: this.shopName,
          shopNum: this.shopNum,
          token: this.token
        }
      })
      if (res.msg === 'success') {
        if (res.data.length === 0) {
          // 没有更多数据了
          fn(true)
        } else {
          fn()
          this.list = this.list.concat(res.data)
          this.pageNoIndex++
          console.log(res.data)
        }
      } else {
        this.$toast(res.data)
      }
    },
    // 确认教练代预约
    confirmYuue(id) {
      this.$messagebox({
        title: '温馨提示',
        message: '您确定要教练代预约吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async action => {
        if (action === 'confirm') {
          const { data: res } = await this.$http.get(
            'pt/confirmPTAppointment',
            { params: { appointmentId: id, token: this.token } }
          )
          if (res.msg === 'success') {
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].id === id) {
                // 成功后将状态改为确认预约状态
                this.list[i].memberConfirm = 1
              }
            }
          } else {
            this.$toast(res.data)
          }
        }
      })
    },
    // 取消私教预约
    cancelReservation(item) {
      if (item.showStatus !== '0') return
      // 弹框提示是否取消私教预约
      this.$messagebox({
        title: '温馨提示',
        message: '您确定要取消私教预约吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async action => {
        if (action === 'confirm') {
          let useTimeObj = {
            starttime: item.appointBegin,
            endtime: item.appointEnd,
            date: item.appointDate
          }
          let useTime = JSON.stringify(useTimeObj)
          const { data: res } = await this.$http.get('pt/cancelPTAppointment', {
            params: {
              appointmentId: item.id,
              assCardNum: item.assCardNum,
              coachShortName: item.coachShortName,
              className: item.className,
              useTime,
              token: this.token
            }
          })
          console.log(res)
          if (res.msg === 'success') {
            let len = this.list.length
            for (let i = 0; i < len; i++) {
              if (this.list[i].id === item.id) {
                this.list[i].showStatus = '3' // 变为已取消预约的状态
                return
              }
            }
          } else {
            this.$toast(res.data)
          }
        }
      })
    },
    // 确认上课
    confirmClass(item) {
      this.$messagebox({
        title: '温馨提示',
        message: '您要确认上课吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async action => {
        if (action === 'confirm') {
          const { data: res } = await this.$http.get('pt/confirmPTClass', {
            params: { appointmentId: item.id, token: this.token }
          })
          if (res.msg === 'success') {
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].id === item.id) {
                // 成功后将状态改为已确认上课状态
                this.list[i].showStatus = '4'
              }
            }
          } else {
            this.$toast(res.data)
          }
        }
      })
    },
    // 点击跳转至一级私教预约页面
    orderShow() {
      window.sessionStorage.setItem('orderShow', 'orderPersonal') // 记录当前点击选中的状态
      this.$router.push({ name: 'orderPersonal' })
    }
  }
}
</script>

<style scoped>
#myOrderPersonal {
  position: relative;
  width: 100%;
  height: 12rem;
}
#myOrderPersonal ul li {
  overflow: hidden;
  padding: 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
}
.imgBox_l {
  overflow: hidden;
  float: left;
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
.coach_bottom {
  float: left;
  margin: 0.24rem 0 0.1rem;
}
.coach_bottom span,
.coach_bottom em {
  float: left;
  font-size: 0.28rem;
}
.coach_bottom span {
  color: #777;
}
.coach_bottom em {
  color: #7ecef4;
  margin-left: 0.7rem;
  font-style: normal;
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
.mobile {
  color: #fff;
}
.disabled {
  background-color: #ccc !important;
}
.content_r .text {
  float: left;
  font-size: 0.28rem;
  color: #999;
  margin: 0.2rem 0 0.08rem;
}
</style>
