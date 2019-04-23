<template>
  <div id="orderLeague">
    <order-top></order-top>
    <!-- "1"为自定义的标识符，证明是自定义触发的状态 -->
    <my-select @change="getPersonalList('1')"></my-select>
    <div class="initBox" v-if="init==='null'" @click="orderShow">
      <img src="../../../../static/images/icon/init.png" alt>
      <p>您还没有购买任何私教，赶快点我去购买吧</p>
    </div>
    <ul v-if="init==='block'">
      <li v-for="item of personalList" :key="item.id">
        <div class="imgBox_l">
          <img :src="'./static/images/clubid' + clubId + '/sjkc/' + (item.infPTClassInfo?item.infPTClassInfo.imgurl:'imgfault.png')" onerror="this.src='./static/images/default/imgfault.png'" alt>
        </div>
        <div class="content_r">
          <p>私教姓名：{{item.teachername}}</p>
          <p>课程名称：{{item.teachitemname}}</p>
          <p>
            购买次数：
            <i>{{item.teachtime}}</i>
          </p>
          <p>
            剩余次数：
            <i>{{item.lastteachtime+(item.giftPtNum == null ? 0 : item.giftPtNum)}}</i>
          </p>
          <!-- 可预约 -->
          <router-link
            :to="{name: 'coachScheduling', query: {aptId:item.id,teachershortname:item.teachershortname,teachername:item.teachername,teachitemname:item.teachitemname,teachitemshortname:item.teachitemshortname,asscardnum:item.asscardnum}}"
            v-if="item.lastteachtime+(item.giftPtNum == null ? 0 : item.giftPtNum) > 0"
          >
            <button>预约课程</button>
          </router-link>
          <!-- 不可预约 -->
          <button v-else style="background-color: #ccc;border: 0px;outline: none;">预约课程</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import orderTop from './orderTop'
import mySelect from '../../index/public/select'
export default {
  name: 'orderPersonal',
  components: {
    orderTop,
    mySelect
  },
  data() {
    return {
      init: null,
      personalList: [],
      originShopNum: null,
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  activated() {
    this.getPersonalList()
    window.sessionStorage.setItem('orderShow', 'orderPersonal')
  },
  methods: {
    async getPersonalList(ischange) {
      let shopNum = window.sessionStorage.getItem('shopNum')
      let token = window.sessionStorage.getItem('token')
      if (ischange === '1' && this.originShopNum === shopNum) return
      const { data: res } = await this.$http.get('pt/getPTByUser', {
        params: { shopNum, token }
      })
      if (res.msg === 'success') {
        console.log(res)
        if (res.data.length === 0) {
          this.originShopNum = shopNum
          return (this.init = 'null')
        }
        this.init = 'block'
        this.personalList = res.data
        this.originShopNum = shopNum
      }
    },
    orderShow() {
      this.$router.push({ name: 'moreCoach' })
    }
  }
}
</script>

<style scoped>
#orderLeague {
  width: 100%;
}
#orderLeague ul li {
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
  display: block;
  outline: none;
  border: 0;
  font-size: 0.26rem;
  padding: 0.14rem 0.2rem;
  color: #fff;
  background-color: #7ecef4;
  border-radius: 8px;
  margin-top: 0.26rem;
}
.initBox {
  width: 100%;
  margin-bottom: 1rem;
}
.initBox img {
  display: block;
  width: 4rem;
  height: 4rem;
  margin: 0.52rem auto;
}
.initBox p {
  font-size: 0.32rem;
  text-align: center;
}
</style>
