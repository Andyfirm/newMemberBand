<template>
  <div class="reachmain">
    <div class="back" @click="back()"></div>
    <header>
      <img src :onerror="defaultImg" alt>
    </header>
    <p class="name"></p>
    <p>您已连续达标</p>
    <div class="number">
      <i>6</i>天
    </div>
    <p>继续努力，加油啊！</p>
    <div class="jiangbeiBox"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultImg: 'this.src="' + require('../../assets/images/state.png') + '"'
    }
  },
  components: {},
  methods: {
    back() {
      this.$router.push({ name: 'indexBand' })
    }
  }
}
</script>
<style scoped>
.reachmain {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url('~@/assets/images/bg.png') no-repeat center/cover;
}
.reachmain .back {
  position: relative;
  top: 0.4rem;
  left: 0.4rem;
  width: 0.3rem;
  height: 0.4rem;
  background: url('~@/assets/images/jiantou_l.png') no-repeat center/cover;
}
.reachmain header {
  overflow: hidden;
  width: 2.34rem;
  height: 2.34rem;
  margin: 1.16rem auto 0;
  border: 8px solid #f7e09a;
  border-radius: 50%;
}
.reachmain img {
  width: 100%;
}
.reachmain p {
  font-size: 0.32rem;
  color: #fff;
  text-align: center;
}
.reachmain .name {
  margin-top: 0.28rem;
  margin-bottom: 0.8rem;
}
.reachmain .number {
  font-size: 0.3rem;
  text-align: center;
  margin-top: 0.18rem;
  margin-bottom: 0.26rem;
  color: #fff;
}
.reachmain .number i {
  font-size: 0.7rem;
}
.reachmain .jiangbeiBox {
  width: 2.26rem;
  height: 2.24rem;
  margin: 0.56rem auto 0;
  background: url('~@/assets/images/jiangbei.png') no-repeat center/cover;
}
</style>
