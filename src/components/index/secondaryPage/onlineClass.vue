<template>
  <div id="onlineClass">
    <my-select @change="getOnlineClass"></my-select>
    <ul class="classBox">
      <li v-for="item of classList" :key="item.classId">
        <router-link :to="{name: 'classDetails',query: {item: JSON.stringify(item)}}"><img :src="'./static/images/zxbb/'+ item.imgurl" alt=""></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import select from '../public/select'
export default {
  name: 'onlineClass',
  components: {
    mySelect: select
  },
  data() {
    return {
      classList: [],
      shopNumOrigin: null,
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.getOnlineClass()
  },
  activated() {
    if (this.shopNumOrigin !== window.sessionStorage.getItem('shopNum')) {
      this.getOnlineClass()
    }
  },
  methods: {
    // 获取首屏数据
    async getOnlineClass() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      if (this.shopNumOrigin === shopNum) return
      this.classList = []
      const { data: res } = await this.$http.get('onclass/getOnlineClassByShop', {
        params: { shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        this.classList = res.data
        this.shopNumOrigin = window.sessionStorage.getItem('shopNum')
      }
    }
  }
}
</script>

<style scoped>
#onlineClass {
  width: 100%;
}
.classBox {
  width: 100%;
}
.classBox li {
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 44.8%;
  background-color: #efefef;
  border-radius: 8px;
}
.classBox li img {
  width: 100%;
}
</style>
