<template>
  <div id="orderLeague">
    <order-top></order-top>
    <my-select @change="getLeagueList"></my-select>
    <ul>
      <li v-for="item of leagueList" :key="item.id">
        <div class="imgBox_l">
          <img :src="'./static/images/clubid' + clubId + '/league/' + item.leagueimg" onerror="this.src='./static/images/default/imgfault.png'" alt>
        </div>
        <div class="content_r">
          <p>项目：{{item.courseName}}</p>
          <p>
            课程日期：
            <i>{{item.recorddate | convertDate}}</i>
          </p>
          <p>
            课程时间：
            <i>{{item.courseTime}}</i>
          </p>
          <p>
            授课地点：
            <i>{{item.classroom}}</i>
          </p>
          <p>
            剩余人数：
            <i>{{item.maxRenShu-item.shangkerenshu >= 0 ? item.maxRenShu-item.shangkerenshu : 0}}</i>
          </p>
          <!-- 团课可预约 -->
          <button
            v-if="item.showStatus==0&&(item.maxRenShu-item.shangkerenshu) > 0"
            @click="isSure(item)"
          >预约团课</button>
          <!-- 课程已预约 -->
          <button
            v-else-if="item.showStatus==1"
            style="background-color:#ccc;border: 0px;outline: none;"
          >课程已预约</button>
          <!-- 人数已满 -->
          <button
            v-else-if="(item.maxRenShu-item.shangkerenshu) <= 0"
            style="background-color:#ccc;border: 0px;outline: none;"
          >人数已满</button>
          <!-- 课程详情 -->
          <router-link
            :to="{name: 'groupCourseDetails',query: {id:item.id,showStatus: item.showStatus}}"
          >
            <button>课程详情</button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import orderTop from './orderTop'
import mySelect from '../../index/public/select'
export default {
  name: 'orderLeague',
  components: {
    orderTop,
    mySelect
  },
  data() {
    return {
      leagueList: [],
      originShopNum: null,
      success: this.$route.query.success,
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  activated() {
    this.getLeagueList()
    window.sessionStorage.setItem('orderShow', 'orderLeague')
  },
  methods: {
    // 获取团课首屏数据
    async getLeagueList() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      let shopName = window.sessionStorage.getItem('shopName')
      const { data: res } = await this.$http.get('tuanke/selectTuanKeByShop', {
        params: { shopNum, shopName, token: this.token }
      })
      if (res.msg === 'success') {
        this.leagueList = res.data
        this.originShopNum = shopNum
      }
    },
    // 点击触发确认预约弹框
    isSure(data) {
      this.$messagebox({
        title: '温馨提示',
        message: '您确定要预约团课吗',
        showCancelButton: true,
        confirmButtonText: '预约',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.submit(data)
        }
      })
    },
    // 确认触发提交按钮
    async submit(data) {
      const { data: res } = await this.$http.get('tuanke/groupAppointment', {
        params: {
          shopName: window.sessionStorage.getItem('shopName'),
          tuanKeId: data.id,
          token: this.token
        }
      })
      if (res.msg === 'success') {
        window.sessionStorage.setItem('tuankecourseName', data.courseName)
        window.sessionStorage.setItem('tuankecourseTime', data.courseTime)
        this.$router.push({ name: 'succeed', query: { stamp: '2' } })
      } else {
        this.$toast(res.data)
      }
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
  margin-bottom: 0.06rem;
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
</style>
