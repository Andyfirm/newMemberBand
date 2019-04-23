<template>
  <div id="coachingCourse">
    <div class="content_top">
      <div class="imgBox">
        <img
          :src="'./static/images/clubid' + clubId + '/coach/' + infEImage.imgurl"
          onerror="this.src='./static/images/default/timg.jpg'"
          alt
        >
      </div>
      <div class="text_right">
        <p>教练：{{viewEJt.name}}</p>
        <p>所在门店：{{viewEJt.shopName}}</p>
        <p>{{infEImage.info}}</p>
        <a :href="'tel:' + viewEJt.phone">
          <button class="contactCoach">联系教练</button>
        </a>
        <!-- <div class="share">
          <span></span>
          <i>分享这个教练给好友</i>
        </div>-->
      </div>
    </div>
    <ul class="course_bottom">
      <li v-for="item of tbPriList" :key="item.id">
        <span>{{item.infI.name}}</span>
        <!-- <router-link :to="{name: 'courseDetails', query: {id: item.id}}"> -->
        <button @click="courseDetails(item.id)">购买课程</button>
        <!-- </router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'coachingCourse',
  data() {
    return {
      tbPriList: [],
      viewEJt: {},
      infEImage: {},
      id: this.$route.query.id,
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  created() {
    this.getCourse()
  },
  methods: {
    async getCourse() {
      // homepageresp/GetViewEJtById
      const { data: res } = await this.$http.get('pt/GetViewEJtById', {
        params: {
          id: this.id,
          token: this.token
        }
      })
      if (res.msg === 'success') {
        this.tbPriList = res.data.ptClassArray
        this.viewEJt = res.data.viewEJt
        this.infEImage = res.data.viewEJt ? res.data.viewEJt.infEImage : ''
      }
    },
    courseDetails(id) {
      if (this.clubId === '10') {
        this.$toast('暂不支持线上购买，请前往场馆购买')
      } else {
        this.$router.push({ name: 'courseDetails', query: { id } })
      }
    }
  }
}
</script>

<style scoped>
#coachingCourse {
  width: 100%;
  padding: 0.4rem 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
.content_top {
  overflow: hidden;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #dcdcdc;
}
.imgBox {
  overflow: hidden;
  float: left;
  width: 2.28rem;
  height: 2.28rem;
  border-radius: 8px;
}
.imgBox img {
  width: 100%;
}
.text_right {
  position: relative;
  float: right;
  width: 61%;
  height: 2.28rem;
}
.text_right p {
  font-size: 0.28rem;
  color: #888;
  margin-bottom: 0.06rem;
}
button.contactCoach {
  position: absolute;
  bottom: 0;
  display: block;
  outline: none;
  border: 0;
  font-size: 0.26rem;
  color: #fff;
  padding: 0.1rem 0.2rem;
  margin-top: 0.1rem;
  background-color: #7ecef4;
  border-radius: 0.16rem;
}
.course_bottom li {
  overflow: hidden;
  padding: 0.26rem 0;
  border-bottom: 1px solid #dcdcdc;
}
.course_bottom li span {
  float: left;
  font-size: 0.28rem;
  color: #888;
  margin-top: 0.16rem;
}
.course_bottom li button {
  float: right;
  outline: none;
  padding: 0.12rem 0.2rem;
  font-size: 0.28rem;
  color: #7ecef4;
  background-color: #fff;
  border: 1px solid #7ecef4;
  border-radius: 0.16rem;
}
/* .share {
  position: absolute;
  bottom: -0.8rem;
  overflow: hidden;
  margin-top: 0.1rem;
}
.share span {
  float: left;
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background: url('../../../../static/images/icon/share.png') no-repeat center/cover;
  border-radius: 4px;
}
.share i {
  float: left;
  font-size: 0.24rem;
  font-style: normal;
  color: #999;
  margin-left: 6px;
  margin-top: 0.04rem;
} */
</style>
