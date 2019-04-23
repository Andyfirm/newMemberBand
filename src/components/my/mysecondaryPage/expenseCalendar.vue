<template>
  <div id="expenseCalendar">
    <div class="initBox" v-if="init==='null'" @click="orderShow">
      <img src="../../../../static/images/icon/init.png" alt>
      <p>您最近暂无消费记录</p>
    </div>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
      <ul v-if="init==='block'">
        <li v-for="item of list" :key="item.id">
          <p>
            <span>消费事项</span>
            <i>{{item.itemname}}</i>
          </p>
          <p>
            <span>消费类型</span>
            <i>{{item.custometype}}</i>
          </p>
          <p>
            <span>消费金额</span>
            <strong>{{item.cusprice}}元</strong>
          </p>
          <p>
            <span>消费次数</span>
            <i>{{item.customnum}}次</i>
          </p>
          <p>
            <span>开始时间</span>
            <i>{{item.customedate}}</i>
          </p>
          <p>
            <span>结束时间</span>
            <i>{{item.customendtime}}</i>
          </p>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'expenseCalendar',
  data() {
    return {
      init: null,
      pageNoIndex: 1,
      list: [],
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      isOpen: false
    }
  },
  created() {
    this.pageNoIndex = 1
    this.getList()
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
    // 首屏数据获取
    async getList(fn) {
      const { data: res } = await this.$http.get(
        'myresp/getExpensesRecordByUser',
        {
          params: {
            pageNo: 0,
            pageSize: 6,
            shopNum: this.shopNum,
            token: this.token
          }
        }
      )
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
    async upList(pageNoIndex, fn) {
      if (!this.isOpen) return fn()
      const { data: res } = await this.$http.get(
        'myresp/getExpensesRecordByUser',
        {
          params: {
            pageNo: pageNoIndex,
            pageSize: 6,
            shopNum: this.shopNum,
            token: this.token
          }
        }
      )
      console.log(res)
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
    }
  }
}
</script>

<style scoped>
#expenseCalendar {
  position: relative;
  width: 100%;
  height: 13rem;
}
#expenseCalendar li {
  font-size: 0.28rem;
  background-color: #fff;
  padding: 0.2rem 0.4rem;
  margin-bottom: 0.2rem;
  border-radius: 8px;
}
#expenseCalendar li p {
  padding: 0.2rem 0;
}
#expenseCalendar li span {
  color: #999;
  margin-right: 0.2rem;
}
#expenseCalendar li i {
  font-style: normal;
  color: #333;
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
</style>
