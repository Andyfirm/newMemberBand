<template>
  <div id="stadium_container">
    <h4>{{venue_name}}</h4>
    <div class="cgimg"><img :src="'./static/images/clubid' + clubId + '/shop/'+ cgimgurl" onerror="this.src='./static/images/default/imgfault.png'" alt=""></div>
    <p>{{venuedetails}}</p>
  </div>
</template>

<script>
export default {
  name: 'stadiumDetails',
  data() {
    return {
      venue_name: this.$route.query.venue_name,
      cgimgurl: this.$route.query.cgimgurl,
      venuedetails: this.$route.query.venuedetails,
      clubId: window.sessionStorage.getItem('clubId')
    }
  }
}
</script>

<style scoped>
#stadium_container {
  width: 100%;
  padding-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 0.3rem;
}
h4 {
  color: #222;
  font-size: 0.36rem;
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.2rem;
}
.cgimg {
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box;
  overflow: hidden;
}
.cgimg img {
  width: 100%;
  border-radius: 8px;
}
p {
  color: #999999;
  width: 90%;
  margin: 16px auto;
  text-indent: 2em;
  line-height: 24px;
  font-size: 0.28rem;
}
</style>
