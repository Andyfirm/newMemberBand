<template>
  <div id="groupCourseDetails">
    <div class="content_box">
      <div class="content_top">
        <div class="imgBox">
          <img :src="'./static/images/league/' + imgUrl" alt>
        </div>
        <div class="text_right">
          <p>项目：{{courseName}}</p>
          <p>
            课程时间：
            <i>{{courseTime}}</i>
          </p>
          <p>
            授课地点：
            <i>{{classroom}}</i>
          </p>
          <p>
            课程人数：
            <i>{{shangkerenshu}}</i>
          </p>
          <!-- <div class="share">
            <span></span>
            <i>分享这个课给好友</i>
          </div> -->
        </div>
      </div>
      <div class="content_btom">
        <h6>课程详情：</h6>
        <p>{{remark}}</p>
      </div>
    </div>
    <div id="btn">
      <!-- 团课可预约 -->
      <button v-if="showStatus==0&&(maxRenShu-shangkerenshu) > 0" @click="isSure()">预约团课</button>
      <!-- 课程已预约 -->
      <button
        v-else-if="showStatus==1"
        style="background-color:#ccc;border: 0px;outline: none;"
      >课程已预约</button>
      <!-- 人数已满 -->
      <button
        v-else-if="(maxRenShu-shangkerenshu) <= 0"
        style="background-color:#ccc;border: 0px;outline: none;"
      >人数已满</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'groupCourseDetails',
  data() {
    return {
      imgUrl: '',
      courseName: '',
      courseTime: '',
      classroom: '',
      shangkerenshu: '',
      maxRenShu: '',
      remark: '',
      id: this.$route.query.id,
      showStatus: this.$route.query.showStatus,
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.getCourseObj()
  },
  methods: {
    // 获取首屏数据
    async getCourseObj() {
      const { data: res } = await this.$http.get('tuanke/selectTuanKeInfoById', {
        params: { id: this.id, token: this.token }
      })
      console.log(res)
      if (res.msg === 'success') {
        let data = res.data
        this.imgUrl = data.leagueimg
        this.courseName = data.courseName
        this.courseTime = data.courseTime
        this.classroom = data.classroom
        this.shangkerenshu = data.shangkerenshu
        this.maxRenShu = data.maxRenShu
        this.remark = data.remark
      }
    },
    // 弹框确认预约
    isSure() {
      this.$messagebox({
        title: '温馨提示',
        message: '您确定要预约团课吗',
        showCancelButton: true,
        confirmButtonText: '预约',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.submit()
        }
      })
    },
    async submit() {
      const { data: res } = await this.$http.get('tuanke/groupAppointment', {
        params: {
          shopName: window.sessionStorage.getItem('shopName'),
          tuanKeId: this.id,
          token: this.token
        }
      })
      if (res.msg === 'success') {
        window.sessionStorage.setItem('tuankecourseTime', this.courseTime)
        window.sessionStorage.setItem('tuankecourseName', this.courseName)
        this.$router.push({ name: 'succeed', query: { stamp: '2' } })
      } else {
        this.$toast(res.data)
      }
    }
  }
}
</script>

<style scoped>
#groupCourseDetails {
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
  margin-bottom: 0.08rem;
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
#btn button {
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
  overflow: hidden;
  margin-top: 0.1rem;
}
.share span {
  float: left;
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background: url('../../../../static/images/icon/share.png') no-repeat
    center/cover;
  border-radius: 4px;
}
.share i {
  float: left;
  font-size: 0.24rem;
  color: #999;
  margin-left: 6px;
  margin-top: 0.04rem;
}
</style>
