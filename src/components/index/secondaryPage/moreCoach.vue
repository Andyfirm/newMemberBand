<template>
  <div id="moreCoach_container">
    <my-select @change="getList"></my-select>
    <div class="content">
      <ul>
        <li v-for="item of list" :key="item.id" @click="coachingCourse(item.id)" v-show="item.infEImage">
          <div class="imgBox"><img :src="'./static/images/clubid' + clubId + '/coach/' + (item.infEImage?item.infEImage.imgurl:'timg.jpg')" onerror="this.src='./static/images/default/timg.jpg'" alt=""></div>
          <div class="text_right">
            <div>
              <span>{{item.name}}</span> <i>{{item.job1L}}</i>
            </div>
            <p>所在门店：{{shopNumVuex}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import select from '../public/select'
import { mapState } from 'vuex'
export default {
  name: 'moreCoach',
  components: {
    mySelect: select
  },
  data() {
    return {
      token: sessionStorage.getItem('token'),
      originalShopName: null,
      list: [],
      clubId: window.sessionStorage.getItem('clubId'),
      defaultImg: 'this.src="./static/images/icon/init.png"'
    }
  },
  activated() {
    if (this.originalShopName !== this.shopNumVuex) {
      this.getList()
    }
  },
  methods: {
    // 获取数据
    async getList() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      if (this.originalShopName === this.shopNumVuex) return // homepageresp/GetEJtByShopNum
      const { data: res } = await this.$http.get('pt/GetEJtByShopNum', {
        params: { shopNum, token: this.token, state: true }
      })
      if (res.msg === 'success') {
        this.list = res.data
        console.log(this.list)
        this.originalShopName = window.sessionStorage.getItem('shopName')
      }
    },
    // 点击进入下级页面
    coachingCourse(id) {
      this.$router.push({ name: 'coachingCourse', query: { id } })
    }
  },
  computed: {
    ...mapState(['shopNumVuex'])
  }
}
</script>

<style scoped>
.content li {
  overflow: hidden;
  padding: 0.44rem 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
}
.content .imgBox {
  overflow: hidden;
  width: 20%;
  float: left;
  width: 0.88rem;
  height: 0.88rem;
  background-color: #efefef;
  border-radius: 50%;
}
.content .imgBox img {
  width: 100%;
  display: block;
}
.content .text_right {
  float: right;
  width: 84%;
}
.text_right div {
  overflow: hidden;
  margin-bottom: 0.1rem;
}
.content span {
  float: left;
  font-size: 0.32rem;
  color: #333;
}
.content i {
  float: left;
  font-size: 0.26rem;
  color: #999;
  font-style: normal;
  margin-top: 0.048rem;
  margin-left: 0.1rem;
}
.content p {
  font-size: 0.26rem;
  color: #333;
}
</style>
