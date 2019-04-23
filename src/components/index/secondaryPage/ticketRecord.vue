<template>
  <div id="ticket_continer">
    <div class="tab">
      <div class="tab_content">
        <div class="l_wqp">
          <div id="l_wqp" :class="{active: wqp}" @click="getWqp">未取票</div>
        </div>
        <div class="r_qb">
          <div id="r_qb" :class="{active: yqp}" @click="getYqp">已取票</div>
        </div>
      </div>
    </div>
    <!-- 未取票 -->
    <div class="wqpBox" v-show="wqp" ref="wqpBox">
      <scroller :on-infinite="wqpinfinite" :on-refresh="wqprefresh" ref="my_scroller">
        <ul class="tabsUl wqp">
          <li class="dingdanbox" v-for="item of wqplist" :key="item.id">
            <div class="imgBox">
            <img :src="'./static/images/clubid' + clubId + '/ticket/' + item.picture" onerror="this.src='./static/images/default/ticketdefault.png'" alt="">
            </div>
            <div class="middle">
              <h6>{{item.ticket.name}}</h6>
              <p>金额： ￥{{item.subTotal}}</p>
              <p>时间：{{item.preTime}}</p>
            </div>
            <div class="right">
              <button v-if="item.showStatus==='effective'" @click="ticketQrCode(item)">使用</button>
              <button v-else-if="item.showStatus==='expired'" style="background:#ccc;">已过期</button>
            </div>
          </li>
        </ul>
      </scroller>
    </div>

    <!-- 已取票 -->
    <div class="yqpBox" v-show="yqp" id="yqpBox" ref="yqpBox">
      <scroller :on-infinite="yqpinfinite" :on-refresh="yqprefresh" ref="my_scroller">
        <ul class="tabsUl yqp">
          <li class="dingdanbox" v-for="item of yqplist" :key="item.id">
            <div class="imgBox">
            <img :src="'./static/images/clubid' + clubId + '/ticket/' + item.picture" onerror="this.src='./static/images/default/ticketdefault.png'" alt="">
            </div>
            <div class="middle">
              <h6>{{item.ticket.name}}</h6>
              <p>金额： ￥{{item.subTotal}}</p>
              <p>时间：{{item.preTime}}</p>
            </div>
            <div class="right">
              <button style="background:#ccc;" @click="ticketQrCode(item)">已使用</button>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ticketRecord',
  data() {
    return {
      wqp: true,
      yqp: false,
      wqplist: [],
      yqplist: [],
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      wqppageNoIndex: 1,
      yqppageNoIndex: 1,
      iswqpOpen: false,
      isyqpOpen: false
    }
  },
  created() {
    this.getwqpList()
  },
  methods: {
    // 未取票下拉刷新
    wqprefresh(done) {
      // 这是向下滑动的时候请求最新的数据
      this.wqppageNoIndex = 1
      this.getwqpList(done)
    },
    // 未取票上拉加载
    wqpinfinite(done) {
      this.upwqpList(this.wqppageNoIndex, done)
    },
    // 未取票获取首屏数据
    async getwqpList(fn) {
      const { data: res } = await this.$http.get('ticket/getTicketOrderiTem', {
        params: {
          shopNum: this.shopNum,
          token: this.token,
          pageNo: 0,
          pageSize: 6,
          state: 'canUse'
        }
      })
      console.log(res)
      if (fn) fn()
      if (res.msg === 'success') {
        this.iswqpOpen = true
        if (res.data.length === 0) {
          this.$refs.wqpBox.innerHTML = '<p class="init">暂无数据</p>'
        }
        this.wqplist = res.data
      } else {
        this.$toast(res.data)
      }
    },
    // 未取票上拉加载请求
    async upwqpList(wqppageNoIndex, fn) {
      if (!this.iswqpOpen) return fn()
      const { data: res } = await this.$http.get('ticket/getTicketOrderiTem', {
        params: {
          shopNum: this.shopNum,
          token: this.token,
          pageNo: wqppageNoIndex,
          pageSize: 6,
          state: 'canUse'
        }
      })
      if (fn) fn()
      if (res.msg === 'success') {
        if (res.data.length === 0) {
          // 没有更多数据了
          fn(true)
        } else {
          this.wqplist = this.wqplist.concat(res.data)
          this.wqppageNoIndex++
        }
      } else {
        this.$toast(res.data)
      }
    },
    // -------------------------
    // 已取票下拉刷新
    yqprefresh(done) {
      // 这是向下滑动的时候请求最新的数据
      this.yqppageNoIndex = 1
      this.getyqpList(done)
    },
    // 已取票上拉加载
    yqpinfinite(done) {
      this.upyqpList(this.yqppageNoIndex, done)
    },
    // 已取票获取首屏数据
    async getyqpList(fn) {
      const { data: res } = await this.$http.get('ticket/getTicketOrderiTem', {
        params: {
          shopNum: this.shopNum,
          token: this.token,
          pageNo: 0,
          pageSize: 6,
          state: 'noUse'
        }
      })
      console.log(res)
      if (fn) fn()
      if (res.msg === 'success') {
        this.isyqpOpen = true
        if (res.data.length === 0) {
          this.$refs.yqpBox.innerHTML = '<p class="init">暂无使用数据</p>'
        }
        this.yqplist = res.data
      } else {
        this.$toast(res.data)
      }
    },
    // 已取票下拉加载请求
    async upyqpList(yqppageNoIndex, fn) {
      if (!this.isyqpOpen) return fn()
      const { data: res } = await this.$http.get('ticket/getTicketOrderiTem', {
        params: {
          shopNum: this.shopNum,
          token: this.token,
          pageNo: yqppageNoIndex,
          pageSize: 6,
          state: 'noUse'
        }
      })
      if (fn) fn()
      if (res.msg === 'success') {
        if (res.data.length === 0) {
          // 没有更多数据了
          fn(true)
        } else {
          this.yqplist = this.yqplist.concat(res.data)
          this.yqppageNoIndex++
        }
      } else {
        this.$toast(res.data)
      }
    },
    getWqp() {
      this.wqp = true
      this.yqp = false
      this.getwqpList()
      this.wqppageNoIndex = 1
    },
    getYqp() {
      this.wqp = false
      this.yqp = true
      this.getyqpList()
      this.yqppageNoIndex = 1
    },
    // 跳转至二维码页面
    ticketQrCode(item) {
      this.$router.push({name: 'ticketQrCode', query: {item: JSON.stringify(item)}})
    }
  }
}
</script>

<style scoped>
#ticket_continer {
  width: 100%;
}
.tab {
  height: 1rem;
  background-color: #fff;
  width: 100%;
  border-radius: 8px;
  font-size: 0.36rem;
}
.tab_content {
  height: 100%;
}
.tab .l_wqp {
  float: left;
  width: 50%;
  height: 100%;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
}
#l_wqp,
#r_qb {
  width: 50%;
  height: 100%;
  line-height: 1rem;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
}
.tab .r_qb {
  float: right;
  width: 50%;
  height: 100%;
}
#l_wqp.active,
#r_qb.active {
  color: #7fbeff;
  border-bottom: 2px solid #7fbeff;
}
.tabsUl.wqp,
.tabsUl.yqp {
  padding: 0.2rem 0;
  font-size: 0.36rem;
  margin-top: 0.2rem;
}
.tabsUl li {
  overflow: hidden;
  padding: 0.2rem;
  border-radius: 8px;
  margin-bottom: 0.2rem;
  background-color: #fff;
  box-sizing: border-box;
}
.wqpBox {
  position: relative;
  height: 12rem;
}
.yqpBox {
  position: relative;
  height: 12rem;
}
.imgBox {
  overflow: hidden;
  float: left;
  width: 20%;
  height: 1.34rem;
  padding: 0.1rem;
  border-radius: 8px;
  box-sizing: border-box;
}
img {
  display: block;
  width: 100%;
}
.middle {
  float: left;
  width: 60%;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
.middle h6 {
  font-size: 0.34rem;
  font-weight: normal;
  /* margin-bottom: 0.4rem; */
}
.middle p {
  font-size: 0.28rem;
  color: #999;
  margin-top: 0.2rem;
}
.right {
  float: left;
  width: 20%;
}
button {
  display: block;
  outline: none;
  border: 0;
  margin: 0.5rem auto 0rem;
  width: 1.2rem;
  height: 28px;
  color: #fff;
  background: rgba(126, 206, 244, 1);
  border-radius: 5px;
}
</style>
