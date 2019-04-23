<template>
  <div id="myPersonal">
    <div class="initBox" v-if="init==='null'" @click="orderShow">
      <img src="../../../../static/images/icon/init.png" alt>
      <p>您还没有购买任何私教，赶快点我去购买吧</p>
    </div>
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="my_scroller">
    <ul v-if="init==='block'">
      <li v-for="item of list" :key="item.id">
        <div class="imgBox_l">
          <img :src="'./static/images/clubid' + clubId + '/sjkc/' + (item.infPTClassInfo?item.infPTClassInfo.imgurl:'imgfault.png')" onerror="this.src='./static/images/default/imgfault.png'" alt>
        </div>
        <div class="content_r">
          <p>教练：{{item.teachername}}</p>
          <p>课程：{{item.teachitemname}}</p>
          <p>
            购买次数：
            <i>{{item.teachtime}}</i>
          </p>
          <p>
            剩余次数：
            <i>{{item.lastteachtime-(item.giftPtNum == null ? 0 : item.giftPtNum)}}</i>
          </p>
          <a :href="'tel:'+item.viewEJt.phone"><button>联系教练</button></a>
          <!-- 可预约 -->
          <router-link
            :to="{name: 'coachScheduling', query: {shortname: item.shortname,teachershortname:item.teachershortname,teachername:item.teachername,teachitemname:item.teachitemname,teachitemshortname:item.teachitemshortname,asscardnum:item.asscardnum}}"
            v-if="item.lastteachtime+(item.giftPtNum == null ? 0 : item.giftPtNum) > 0"
          >
            <button>预约课程</button>
          </router-link>
          <!-- 不可预约 -->
          <button v-else style="background-color: #ccc;border: 0px;outline: none;">预约课程</button>
        </div>
      </li>
    </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'myPersonal',
  data() {
    return {
      init: null,
      pageNoIndex: 1,
      list: [],
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId'),
      isOpen: false
    }
  },
  created() {
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
      const { data: res } = await this.$http.get('pt/getPTHistoryByUser', {
        params: {
          pageNo: 0,
          pageSize: 6,
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
      const { data: res } = await this.$http.get('pt/getPTHistoryByUser', {
        params: {
          pageNo: page,
          pageSize: 6,
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
    // 点击跳转至一级私教预约页面
    orderShow() {
      this.$router.push({ name: 'moreCoach' })
    }
    // 跳转至预约私教详情页面
  }
}
</script>

<style scoped>
#myPersonal {
  position: relative;
  width: 100%;
  height: 12rem;
}
#myPersonal ul li {
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
  margin-bottom: 0.1rem;
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
</style>
