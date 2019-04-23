<template>
  <div id="login_container">
    <p class="activity">
      <img :src="'./static/images/clubid' + clubId + '/logo/order-logo.jpg'">
    </p>
    <div class="mian">
      <p>
        <input
          type="text"
          name
          class="entry"
          id="userName"
          v-model="userName"
          placeholder="请输入用户名/手机号"
        >
        <input type="hidden" name value>
      </p>
      <p>
        <input type="password" name class="entry" id="pwd" v-model="pwd" placeholder="请输入密码">
        <input type="hidden" name value>
      </p>
      <p class="exmple">
        <router-link :to="{name: 'forgetpassword'}">
          <span class="forget">忘记密码？</span>
        </router-link>
      </p>
      <label>
        <button class="entry goIn" id="btn" @click="startLogin">登录</button>
      </label>
      <label>
        <router-link :to="{name: 'register'}">
          <button class="entry goIn zhuce">注册</button>
        </router-link>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: null,
      pwd: null,
      token: window.sessionStorage.getItem('token'),
      clubId: window.sessionStorage.getItem('clubId')
    }
  },
  created() {
    let token = 'oiqtX1A_fD5ePsjGMiNvIQ0FzRBw' //  oiqtX1A_fD5ePsjGMiNvIQ0FzRBw oQc9-jqBcb53o8R0s9yr1ydyeVZY
    window.sessionStorage.setItem('token', token)
    this.token = token
    window.sessionStorage.setItem('isLogin', 'false')
  },
  methods: {
    async startLogin() {
      if (this.userName === null || this.userName === '') {
        this.$toast('请先输入用户名哦')
        return
      }
      if (!/^[A-Za-z0-9]+$/.test(this.userName)) {
        this.$toast('用户名格式不正确，请重填')
        return
      }
      if (this.pwd === null || this.pwd === '') {
        this.$toast('请先输入密码哦')
        return
      }
      if (!/^[A-Za-z0-9]+$/.test(this.pwd)) {
        this.$toast('密码格式不正确，请重填')
        return
      }
      const { data: res } = await this.$http.get('memberLogin/logined', {
        params: {
          userName: this.userName,
          passWord: this.pwd,
          token: this.token
        }
      })
      console.log(res)
      if (res.msg === 'success') {
        // 登录成功后将用户名和密码保存至本地，并且设置有效时间
        let clubId = window.sessionStorage.getItem('clubId')
        let pastDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        let dataOrigin = {
          userName: this.userName,
          passWord: this.pwd,
          pastDate: pastDate
        }
        let dataOriginStr = JSON.stringify(dataOrigin)
        window.localStorage.setItem('dataOriginStr' + clubId, dataOriginStr)
        window.sessionStorage.setItem('isLogin', 'true')
        this.$router.replace({ name: 'index' })
      }
      if (res.msg === 'fail') this.$toast(res.data)
    }
  }
}
</script>

<style scoped>
.activity {
  width: 65px;
  height: 65px;
  margin: 0 auto;
  margin-top: 18%;
  position: relative;
}
.activity img {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.mian {
  flex: 1;
  width: 90%;
  margin: 0 auto;
  margin-top: 12%;
  position: relative;
  font-size: 0.32rem;
  z-index: 99;
}
p {
  margin: 0 0 10px;
}
#userName {
  border-radius: 0px !important;
}
.entry {
  flex: 1;
  width: 100%;
  height: 40px;
  background: #f6f6f6;
  border-bottom: 1px solid #dcdcdc;
  text-indent: 1em;
  font-size: 0.32rem;
  margin-bottom: 0.2rem;
  font-family: arial;
}
input,
button,
select {
  -webkit-appearance: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}
.exmple {
  width: 100%;
  height: 28px;
  font-size: 0.28rem;
  margin-top: 5px;
}
.forget {
  color: #999;
  float: right;
  line-height: 20px;
  text-decoration: underline;
  margin-left: 2%;
}
label {
  width: 100%;
  margin-bottom: 10px;
  display: inline-block;
}
.goIn {
  background: #4b9fd2;
  color: #fff;
  border-radius: 8px;
  margin-bottom: 0px;
  font-size: 0.34rem;
  font-weight: normal;
  outline: none;
  text-indent: 0;
}
.zhuce {
  background: #49bf5d;
}
</style>
