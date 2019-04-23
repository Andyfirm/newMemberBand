<template>
  <div id="courseDetails">
    <div class="content_box">
      <div class="content_top">
        <div class="imgBox">
          <img
            :src="'./static/images/clubid' + clubId + '/sjkc/' + imgUrl"
            onerror="this.src='./static/images/default/imgfault.png'"
            alt
          >
        </div>
        <div class="text_right">
          <p>项目：{{obj.name}}</p>
          <p>
            授课老师：
            <i>{{obj.teacher}}</i>
          </p>
          <p>
            课程价格：
            <i>{{obj.discountPrice}}</i>
          </p>
        </div>
      </div>
      <div class="content_btom">
        <h6>班级介绍：</h6>
        <p>{{obj.courseDetails}}</p>
      </div>
    </div>
    <button id="btn" @click="orderDetails(obj)">购买课程</button>
  </div>
</template>

<script>
export default {
  name: 'courseDetails',
  data() {
    return {
      imgUrl: '',
      id: this.$route.query.id,
      obj: {
        name: '',
        teacher: '',
        discountPrice: '',
        courseDetails: '',
        id: '',
        subtitle: '无'
      },
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  created() {
    this.getCourseDetails()
  },
  methods: {
    async getCourseDetails() {
      const { data: res } = await this.$http.get('homepageresp/GetEJtDeById', {
        params: { id: this.id, token: this.token }
      })
      if (res.msg === 'success') {
        let data = res.data
        this.obj.id = data.id
        this.obj.name = data.infI.name // 项目名
        this.obj.teacher = data.ejt.name
        this.obj.discountPrice = data.actualPrice // 价格
        this.obj.courseDetails = data.courseDetails
        this.imgUrl = data.infPTClassInfo ? data.infPTClassInfo.imgurl : ''
      }
    },
    async orderDetails(obj) {
      const { data: res } = await this.$http.get('card/getCardByUser', {
        params: { shopNum: this.shopNum, token: this.token }
      })
      console.log(res)
      if (res.msg === 'success') {
        if (res.data && res.data.length > 0) {
          this.$router.push({
            name: 'orderDetails',
            query: { item: JSON.stringify(obj), type: 'course' }
          })
        } else {
          this.$toast('您还没有会员卡，请您先购卡')
        }
      } else {
        this.$toast(res.data)
      }
    }
  }
}
</script>

<style scoped>
#courseDetails {
  width: 100%;
}
.content_box {
  padding: 0.4rem 0.2rem;
  background-color: #fff;
  border-radius: 8px;
}
.content_top {
  overflow: hidden;
  padding-bottom: 0.36rem;
}
.imgBox {
  overflow: hidden;
  float: left;
  width: 2.28rem;
  height: 2.28rem;
  background-color: #efefef;
  border-radius: 8px;
}
.imgBox img {
  width: 100%;
}
.text_right {
  float: right;
  width: 61%;
}
.text_right p {
  font-size: 0.28rem;
  color: #888;
  margin-bottom: 0.4rem;
}
.text_right i {
  color: #7ecef4;
  font-style: normal;
}
.content_btom {
  padding-left: 0.02rem;
}
.content_btom h6,
.content_btom p {
  color: #999;
  font-size: 0.32rem;
}
.content_btom h6 {
  font-weight: 500;
  margin-bottom: 0.16rem;
}
.content_btom p {
  text-indent: 0.63rem;
  line-height: 0.52rem;
}
#btn {
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
</style>
