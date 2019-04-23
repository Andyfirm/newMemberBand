<template>
<div>
  <div class="shouhuanBox" @click="pairing()">
    <div class="shouhuan_icon"></div>
    <span>手环管理</span>
    <div class="r_jiantou"></div>
  </div>
  <div class="jianshenBox">
    <div class="jianshen_icon"></div>
    <span>目标管理</span>
    <div class="right_input"><input type="number">步</div>
  </div>
</div>

</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    pairing () {
      let mac = localStorage.getItem('mac')
      console.log(mac)
      if (mac) {
        this.$router.push({ path: '../pairing/pairingSuccess' })
      } else {
        this.$router.push({ path: '../pairing/pairing' })
      }
    }
  }
}
</script>
<style scope>
.shouhuanBox,
.jianshenBox {
  overflow: hidden;
  margin-bottom: 0.1rem;
  background-color: #fff;
}
.shouhuanBox {
  padding: 0.3rem 0.3rem;
}
.jianshenBox {
  padding: 0.3rem 0.3rem 0.3rem 0.22rem;
}
.shouhuan_icon {
  float: left;
  width: 0.2rem;
  height: 0.5rem;
  margin-top: -0.04rem;
  margin-right: 0.22rem;
  background: url("~@/assets/images/shouhuan.png") no-repeat center/contain;
}
.jianshen_icon {
  float: left;
  width: 0.36rem;
  height: 0.32rem;
  margin-top: 0.06rem;
  margin-right: 0.14rem;
  background: url("~@/assets/images/jianshen.png") no-repeat center/contain;
}
span {
  float: left;
  display: block;
  font-size: 0.32rem;
  color: #333;
}
.r_jiantou {
  float: right;
  width: 0.22rem;
  height: 0.38rem;
  background: url("~@/assets/images/jiantou_r.png") no-repeat center/contain;
}
.right_input {
  float: right;
  font-size: 0.32rem;
  color: #333;
}
.right_input input {
  outline: none;
  text-align: right;
  margin-right: 0.1rem;
  font-size: 0.32rem;
  color: #999;
}
</style>
