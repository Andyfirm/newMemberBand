<template>
  <div id="coach" v-if="coachList&&coachList.length > 0">
    <div class="top">
      <h5>教练风采</h5>
      <router-link :to="{name: 'moreCoach'}">更多教练推荐</router-link>
    </div>
    <div class="coachBox">
      <ul>
        <li v-for="item of coachList" :key="item.id" v-show="item.infEImage">
          <router-link :to="{name: 'coachingCourse', query: {id: item.id}}" class="imgBox">
            <img :src="'./static/images/clubid' + clubId + '/coach/' + (item.infEImage?item.infEImage.imgurl:'timg.jpg')" onerror="this.src='./static/images/default/timg.jpg'" alt>
          </router-link>
          <h6>{{item.name}}</h6>
          <p>{{item.job1L}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'coach',
  data() {
    return {
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  computed: {
    ...mapState(['indexListShow']),
    coachList() {
      return this.indexListShow[0].viewEJtList
    }
  }
}
</script>

<style scoped>
#coach {
  overflow: hidden;
  width: 100%;
  padding: 0.32rem 0.2rem 0.32rem 0.2rem;
  background-color: #fff;
  margin: 0.2rem 0;
  border-radius: 8px;
  box-sizing: border-box;
}
.top {
  height: 0.4rem;
  line-height: 0.4rem;
  overflow: hidden;
  margin-bottom: 0.4rem;
}
.top h5 {
  font-size: 0.36rem;
  float: left;
  font-weight: 700;
}
.top a {
  float: right;
  color: #7ecef4;
  font-size: 0.32rem;
  text-decoration: none;
}
.coachBox {
  width: 100%;
}
.coachBox li {
  float: left;
  width: 33.33%;
}
.coachBox li a {
  display: block;
  margin: 0 auto;
}
.coachBox li h6 {
  color: #666;
  font-size: 0.32rem;
  font-weight: 500;
  text-align: center;
  margin-top: 0.3rem;
}
.coachBox li p {
  color: #666;
  font-size: 0.24rem;
  text-align: center;
  margin-top: 0.2rem;
  line-height: 0.3rem;
}
.coachBox .imgBox {
  overflow: hidden;
  width: 1.54rem;
  height: 1.54rem;
  border-radius: 50%;
}
.coachBox .imgBox img {
  width: 100%;
}
</style>
