<template>
  <div id="classDetails_container">
    <div class="content">
      <div class="imgBox">
        <img :src="'./static/images/zxbb/' +item.imgurl" alt>
      </div>
      <!-- <div class="share">
        <i>分享这个课给好友</i>
        <span></span>
      </div>-->
      <div class="content_btom">
        <h6>班级介绍：</h6>
        <p>{{item.remark}}</p>
      </div>
    </div>
    <div class="btnBox">
      <button @click="signUp">立即报名</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'classDetails',
  data() {
    return {
      state: null,
      item: JSON.parse(this.$route.query.item),
      token: window.sessionStorage.getItem('token')
    }
  },
  methods: {
    signUp() {
      let dataObj = {
        classId: this.item.classId,
        money: this.item.price,
        shopNum: window.sessionStorage.getItem('shopNum'),
        token: this.token
      }
      this.setSubmittedData(dataObj)
      if (this.state === 1) {
        this.$router.push({ name: 'realNameCard', query: { badgeName: '5' } })
      } else if (this.state === 2) {
        this.$router.push({ name: 'confirmPayment', query: { badgeName: '5' } })
      }
    },
    ...mapMutations(['setSubmittedData'])
  }
}
</script>

<style scoped>
#classDetails_container {
  width: 100%;
}
.content {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
}
.content .imgBox {
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: 44.8%;
  background-color: #efefef;
  border-radius: 8px;
}
.content .imgBox img {
  width: 100%;
}
.content_btom {
  padding: 0.4rem 0.26rem 0.4rem 0.26rem;
}
.content h6,
.content p {
  color: #999;
  font-size: 0.32rem;
}
.content h6 {
  font-weight: 500;
  margin-bottom: 0.16rem;
}
.content p {
  text-indent: 0.63rem;
  line-height: 0.52rem;
}
.btnBox {
  width: 100%;
}
.btnBox button {
  outline: none;
  border: 0;
  width: 100%;
  padding: 0.34rem 0;
  margin-top: 0.4rem;
  font-size: 0.32rem;
  color: #fff;
  background-color: #7ecef4;
  border-radius: 8px;
}
.share {
  float: right;
  overflow: hidden;
  width: 100%;
  margin: 0.4rem 0;
}
.share span {
  float: right;
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background: url('../../../../static/images/icon/share.png') no-repeat
    center/cover;
  border-radius: 4px;
}
.share i {
  float: right;
  font-size: 0.24rem;
  font-style: normal;
  color: #999;
  margin: 0.04rem 0.2rem 0 6px;
}
</style>
