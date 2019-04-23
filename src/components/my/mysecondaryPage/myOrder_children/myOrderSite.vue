<template>
  <div id="myOrderSite">
    <div class="initBox" v-if="init==='null'" @click="orderShow">
      <img src="../../../../../static/images/icon/init.png" alt>
      <p>您还没有预约任何场地，赶快点我去预约吧</p>
    </div>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
      <ul v-if="init==='block'" class="content">
        <li v-for="item of mySiteList" :key="item.id">
          <div class="imgBox_l">
            <img
              :src="'./static/images/clubid' + clubId + '/site/'+ (item.infSt?item.infSt.fieldimg:'imgfault.png')"
              onerror="this.src='./static/images/default/imgfault.png'"
              alt
            >
          </div>
          <div class="content_r">
            <p>场地：{{item.stagenum}}</p>
            <p>
              开始时间：{{item.readydate}}
              <i>{{item.readystarttime.slice(0,5)}}</i>
            </p>
            <p>
              结束时间：{{item.readydate}}
              <i>{{item.readyendtime.slice(0,5)}}</i>
            </p>
            <p>
              总价：
              <i>￥{{item.price}}</i>
            </p>
            <!-- 到场按钮 -->
            <button
              v-if="item.showStatus === '0'||item.showStatus === '1'"
              @click="affrmSite(item.id)"
            >确认到场</button>
            <button class="disabled" v-else-if="item.showStatus === '2'">已确认到场</button>
            <button
              class="disabled"
              v-else-if="item.showStatus === '3'||item.showStatus === '4'"
            >确认到场</button>
            <!-- 取消预约按钮 -->
            <button class="disabled" v-if="item.showStatus === '1'">已过取消时间</button>
            <button class="disabled" v-else-if="item.showStatus === '3'">预约已过期</button>
            <button class="disabled" v-else-if="item.showStatus === '4'">预约已取消</button>
            <button
              v-else-if="item.showStatus === '0'"
              @click="cancelSite(item.id,item.billNum,item.stagenum)"
            >取消预约</button>
          </div>
          <p class="subtime">提交预约时间：{{item.preTime}}</p>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
export default {
  name: 'myOrderSite',
  data() {
    return {
      pageNoIndex: 1,
      mySiteList: [],
      init: null,
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId'),
      isOpen: false // 判断是否可以下拉加载
    }
  },
  created() {
    this.pageNoIndex = 1
    this.getmySiteList()
    window.sessionStorage.setItem('myOrderShow', 'myOrderSite')
  },
  methods: {
    // 下拉刷新
    refresh(done) {
      // 这是向下滑动的时候请求最新的数据
      this.pageNoIndex = 1
      this.getmySiteList(done)
    },
    // 上拉加载
    infinite(done) {
      this.upList(this.pageNoIndex, done)
    },
    orderShow() {
      window.sessionStorage.setItem('orderShow', 'orderSite')
      this.$router.push({ name: 'orderSite' })
    },
    // 获取首屏列表数据
    async getmySiteList(fn) {
      const { data: res } = await this.$http.get(
        'place/getPlaceAppointmentHistroy',
        {
          params: {
            pageNo: 0,
            pageSize: 4,
            shopNum: this.shopNum,
            token: this.token
          }
        }
      )
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
        this.init = 'block'
        this.mySiteList = res.data
      } else {
        this.$toast(res.data)
      }
    },
    // 上拉加载
    async upList(pageNoIndex, fn) {
      if (!this.isOpen) return fn()
      const { data: res } = await this.$http.get(
        'place/getPlaceAppointmentHistroy',
        {
          params: {
            pageNo: pageNoIndex,
            pageSize: 4,
            shopNum: this.shopNum,
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
          this.mySiteList = this.mySiteList.concat(res.data)
          this.pageNoIndex++
          console.log(res.data)
        }
      } else {
        this.$toast(res.data)
      }
    },
    // 确认到场
    affrmSite(id) {
      let itemArr = this.mySiteList.filter(item => {
        return item.id === id
      })
      let item = itemArr[0]
      console.log(item.showStatus !== '1')
      if (item.showStatus !== '0' && item.showStatus !== '1') return
      // 弹框提示是否确认到场 发送请求
      this.$messagebox({
        title: '温馨提示',
        message: '您要确认到场吗',
        showCancelButton: true,
        confirmButtonText: '确认到场',
        cancelButtonText: '取消'
      }).then(async action => {
        if (action === 'confirm') {
          const { data: res } = await this.$http.get(
            'place/confirmPlaceAppointment',
            { params: { id, token: this.token } }
          )
          console.log(res)
          if (res.msg === 'success') {
            let mySiteList = this.mySiteList
            for (let i = 0; i < mySiteList.length; i++) {
              if (mySiteList[i].id === id) {
                mySiteList[i].showStatus = '2' // 变为已确认的状态
                return
              }
            }
          } else {
            this.$toast(res.data)
          }
        }
      })
    },
    // 取消场地预约
    cancelSite(id, billNum, stagenum) {
      return this.$toast('该功能暂未开通')
      let itemArr = this.mySiteList.filter(item => {
        return item.id === id
      })
      let item = itemArr[0]
      if (item.showStatus !== '0') return
      // 弹框提示是否取消场地预约
      this.$messagebox({
        title: '温馨提示',
        message: '您确定要取消场地预约吗',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async action => {
        if (action === 'confirm') {
          const { data: res } = await this.$http.get(
            'weixinPay/canclePlaceAppointment',
            { params: { id, billNum, stagenum, token: this.token } }
          )
          if (res.msg === 'success') {
            let len = this.mySiteList.length
            for (let i = 0; i < len; i++) {
              if (this.mySiteList[i].id === id) {
                this.mySiteList[i].showStatus = '4' // 变为已取消预约的状态
                return
              }
            }
          } else {
            this.$toast(res.data)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
#myOrderSite {
  position: relative;
  width: 100%;
  height: 12rem;
}
#myOrderSite ul li {
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
.subtime {
  float: left;
  margin: 0.24rem 0 0.14rem;
  font-size: 0.24rem;
  color: #999;
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
.disabled {
  background-color: #ccc !important;
}
</style>
