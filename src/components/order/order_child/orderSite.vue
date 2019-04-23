<template>
  <div id="orderSite">
    <order-top></order-top>
    <my-select @change="getSiteList"></my-select>
    <ul>
      <li v-for="item of siteList" :key="item.id">
        <div class="imgBox_l"><img :src="'./static/images/clubid' + clubId + '/site/' + item.fieldimg" onerror="this.src='./static/images/default/imgfault.png'" alt=""></div>
        <div class="content_r">
          <p>项目：{{item.name}}</p>
          <p>营业时间：<i>{{item.workStartTime.slice(0,5)}}-{{item.workEndTime.slice(0,5)}}</i></p>
          <p>场地价格：<i>{{item.priceInfo}}</i></p>
          <button @click="goToSiteList(item.shortname,item.name,item.shopNum)">预约场地</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import orderTop from './orderTop'
import mySelect from '../../index/public/select'
import { mapState } from 'vuex'
export default {
  name: 'orderSite',
  components: {
    orderTop,
    mySelect
  },
  data() {
    return {
      siteList: [],
      originShopNum: null,
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  activated() {
    let shopNum = window.sessionStorage.getItem('shopNum')
    if (this.originShopNum !== shopNum) {
      this.getSiteList()
    }
    window.sessionStorage.setItem('orderShow', 'orderSite')
  },
  methods: {
    // 获取首屏数据
    async getSiteList() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      if (this.originShopNum === shopNum) return
      const { data: res } = await this.$http.get('place/getPlaceByShopNum', {
        params: { shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        this.siteList = res.data
        this.originShopNum = shopNum
      }
    },
    goToSiteList(shortname, name, shopNum) {
      this.$router.push({ name: 'siteList', query: { shortname, name, shopNum } })
    }
  },
  computed: {
    ...mapState(['indexListShow'])
  }
}
</script>

<style scoped>
#orderSite {
  width: 100%;
}
#orderSite ul li {
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
  height: 2.28rem;
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
  position: absolute;
  bottom: 0;
  display: block;
  outline: none;
  border: 0;
  font-size: 0.26rem;
  padding: 0.14rem 0.2rem;
  color: #fff;
  background-color: #7ecef4;
  border-radius: 8px;
  margin-top: 0.4rem;
}
</style>
