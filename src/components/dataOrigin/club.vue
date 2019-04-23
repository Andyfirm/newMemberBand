<template>
  <div id="club">
    <div class="icon">
      <img src="../../../static/images/logo/logo.png" alt>
    </div>
    <p>易思普线上场馆运营管理系统</p>
    <div class="pinpai">
      <span>品牌代码:&nbsp;</span>
      <input type="text" id="memberCode" v-model="textNumbers" placeholder="请输入文本编号">
    </div>
    <div class="button" @click="goToNextPage">下一步</div>
  </div>
</template>
<script>
export default {
  name: 'club',
  data() {
    return {
      textNumbers: this.$route.query.textNumbers,
      clubId: this.$route.query.clubId
    }
  },
  methods: {
    // 跳转至分店
    goToNextPage() {
      this.$router.replace({
        name: 'branch',
        query: { textNumbers: this.textNumbers, clubId: this.clubId }
      })
    }
  }
}
</script>
<style scoped>
#club {
  width: 100%;
}
input,
.button {
  outline: none;
  text-decoration: none;
}

body {
  background: #f2f2f2;
}

.icon {
  width: 1.32rem;
  height: 1.32rem;
  margin: 1rem auto 0.8rem;
}

.icon img {
  width: 100%;
}

p {
  text-align: center;
  font-size: 0.36rem;
  color: #333;
}

.pinpai {
  width: 80%;
  height: 30px;
  line-height: 30px;
  margin: 0.8rem auto;
  display: flex;
  justify-content: center;
}
.pinpai span {
  font-size: 0.32rem;
  color: #333;
}
.pinpai input {
  border: none;
  padding-left: 10px;
  color: #333;
  background: transparent;
  border-bottom: 1px solid #dcdcdc;
}

input::-webkit-input-placeholder {
  color: #999;
  font-size: 13px;
}

.button {
  width: 5.9rem;
  height: 0.8rem;
  display: block;
  background: #5eb7e2;
  margin: 2rem auto;
  text-align: center;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.8rem;
  border-radius: 8px;
}
</style>
