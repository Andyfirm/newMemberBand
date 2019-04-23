<template>
  <div class="wrap">
    <div class="back" @click="back()">&lt;</div>
    <div class="state_img"></div>
    <p>您已成功绑定手环</p>
    <button @click="removeBind()">解除绑定</button>
    <ul class="list">
      <li>设备信息</li>
      <li>
        <span>型号</span>
        <i>c2</i>
      </li>
      <li>
        <span>MAC</span>
        <i class="mac">CJ8492JV9823</i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      macNumber: ''
    }
  },
  components: {
  },
  methods: {
    back () {
      window.history.go(-1)
    },
    removeBind () {
      this.macNumber = localStorage.getItem('mac')
      this.$http.get('https://www.easyserp.com/wristband/wristband', {
        params: {
          method: 'binding',
          mac: this.macNumber
        }
      }).then((res) => {
        if (res.data.msg === 'success') {
          alert('解绑成功')
          localStorage.removeItem('mac')
          this.$router.push({ path: './pairing' })
        }
      }).catch((msg) => {
        alert('网络错误')
      })
    }
  }
}
</script>
<style scope>
.wrap {
  overflow: hidden;
}
.back {
  position: relative;
  top: 0.3rem;
  left: 0.3rem;
  width: 0.56rem;
  height: 0.56rem;
  font-size: 0.56rem;
  color: #333;
  font-family: monospace;
}
.wrap .state_img {
  width: 1.64rem;
  height: 2.16rem;
  margin: 0.98rem auto 0.56rem;
  background: url("~@/assets/images/shouhuanBanner.png") no-repeat center/cover;
}
.wrap p {
  text-align: center;
  font-size: 0.32rem;
  color: #999;
}
.wrap button {
  outline: none;
  display: block;
  width: 5.5rem;
  height: 0.9rem;
  margin: 0.32rem auto 0;
  color: #3699FF;
  background-color: #F2F2F2F2;
  border: 1px solid #CCC;
  border-radius: 23px;
}
.list {
  padding: 0 1rem;
  margin-top: 1rem;
  font-size: 0.32rem;
  color: #999;
  box-sizing: border-box;
}
.list li {
  overflow: hidden;
  padding: 0.4rem 0;
  border-bottom: 1px solid #BFBFBF;
}
.list li span {
  float: left;
}
.list li i {
  float: right;
}
</style>
