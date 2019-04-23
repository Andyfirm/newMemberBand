<template>
  <div id="description">
    <div class="containBox">
      <div class="back" @click="back">取消</div>
      <img src="../../../static/images/icon/bindCard.png" alt>
      <h6>关联会员卡</h6>
      <p>亲爱的用户：
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了精准的为您提供服务，我们需要将此课程与您的已办理的会员卡关联，如果您没有会员卡，我们会为您办理一张以确保您的私教课程能正常使用。
      </p>
    </div>
    <button @click="bindCard">继续</button>
  </div>
</template>

<script>
export default {
  name: 'description',
  data() {
    return {
      dataStr: this.$route.query.dataStr
    }
  },
  methods: {
    bindCard() {
      this.$router.replace({
        name: 'selectBindCard',
        query: { dataStr: this.dataStr }
      })
    },
    back() {
      this.$router.back(-1)
      this.$toast('绑卡失败，请重试')
    }
  }
}
</script>

<style scoped>
#description {
  width: 100%;
}
.containBox {
  background-color: #fff;
  border-radius: 8px;
}
.back {
  font-size: 0.32rem;
  color: #7ecef4;
  text-align: right;
  padding: 0.2rem;
  margin-bottom: 0.56rem;
}
img {
  display: block;
  width: 3rem;
  height: 1.28rem;
  margin: 0 auto 0.8rem;
}
h6 {
  text-align: center;
  font-size: 0.44rem;
  margin-bottom: 0.3rem;
}
p {
  font-size: 0.3rem;
  color: #999;
  line-height: 0.56rem;
  padding: 0 0.4rem 0.4rem;
}
button {
  display: block;
  outline: none;
  margin: 0 auto;
  width: 100%;
  background-color: #7ecef4;
  color: #fff;
  font-size: 0.32rem;
  padding: 0.36rem;
  border: 0;
  border-radius: 8px;
  margin-top: 0.6rem;
}
</style>
