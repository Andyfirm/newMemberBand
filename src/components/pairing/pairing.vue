<template>
  <div class="wrap">
    <div class="state_img"></div>
    <p>您还没有绑定手环</p>
    <input class="address" type="text" v-model="macNumber" placeholder="请输入MAC地址">
    <button @click="commitMac()">绑定手环</button>
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
    commitMac () {
      if (this.macNumber.length < 6) {
        alert('请输入正确的MAC地址')
        return false
      }
      this.$http.get('https://www.easyserp.com/wristband/wristband', {
        params: {
          method: 'binding',
          mac: this.macNumber
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.msg === 'Success') {
          alert('绑定成功')
          localStorage.setItem('mac', this.macNumber)
          this.$router.push({ name: 'indexBand' })
        } else if (res.data.msg === 'Bind') {
          alert('该手环已被绑定，请选择其他手环')
        } else if (res.data.msg === 'NonExistent') {
          alert('手环不存在，请确认MAC地址')
          localStorage.setItem('mac', this.macNumber)
          this.$router.push({ name: 'indexBand' })
        } else {
          alert('绑定失败')
        }
      }).catch((msg) => {
        alert('网络错误')
      })
    }
  }
}
</script>
<style scope>
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
.wrap {
  overflow: hidden;
}
.wrap .state_img {
  width: 2.72rem;
  height: 2.72rem;
  margin: 0.58rem auto 0.56rem;
  background: url("~@/assets/images/state.png") no-repeat center/cover;
}
.wrap p {
  text-align: center;
  font-size: 0.32rem;
  color: #999;
}
.address {
  display: block;
  outline: none;
  width: 6rem;
  height: 0.6rem;
  margin: 0.7rem auto 0;
  font-size: 0.32rem;
  background-color: #F2F2F2;
  border-bottom: 1px solid #ccc;
}
.wrap button {
  display: block;
  width: 5.4rem;
  height: 0.8rem;
  margin: 0.7rem auto 0;
  color: #fff;
  font-size: 0.32rem;
  background:rgba(54,153,255,1);
  border-radius: 20px;
  box-shadow:0px 1px 0px 0px rgba(44,132,222,0.14);
}
</style>
