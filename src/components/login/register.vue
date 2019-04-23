<template>
  <div id="register">
    <div class="back">
      <router-link :to="{name: 'login'}">
        <p>上一步</p>
      </router-link>
    </div>
    <div class="wrap loginPage">
      <section>
        <div class="wrapper" id="phone">
          <input
            type="text"
            id="tel1"
            placeholder="请输入您的手机号"
            maxlength="11"
            v-model="mobile"
            @blur="verifyMobile"
          >
        </div>
        <div class="wrapper2">
          <div class="ident2">
            <input
              type="number"
              pattern="[0-9]*"
              id="verCode"
              style="margin-left:0px !important;"
              placeholder="请输入验证码"
              v-model="verCode"
              @blur="setVerCode"
            >
            <!-- 初始状态 -->
            <div class="ident3" v-if="buttonState==='init'">
              <input type="button" id="yzm1" value="获取验证码" @click="sendMessage">
            </div>
            <!-- 发送验证码后 -->
            <div class="ident3 buttonBan" v-else-if="buttonState==='ban'">
              <input type="button" id="yzm1" :value="count + 's后重新获取'">
            </div>
            <!-- 重新发送 -->
            <div class="ident3" v-else-if="buttonState==='open'">
              <input type="button" id="yzm1" value="重新发送验证码" @click="sendMessage">
            </div>
          </div>
        </div>
        <div class="wrapper" id="passTiShi1">
          <input
            type="password"
            id="pwd1"
            placeholder="请输入您的密码"
            v-model="pwd1"
            @focus="focusPwd"
            @blur="blurPwd"
          >
        </div>
        <div class="wrapper" id="passTiShi2">
          <input
            type="password"
            id="repwd1"
            placeholder="请再次输入您的密码"
            v-model="pwd2"
            @blur="blurpassPwd"
          >
        </div>
        <button id="register" @click="register">立即注册</button>
        <input type="hidden" id="loginResult" value>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      mobile: null,
      verCode: null,
      sendcode: null,
      pwd1: '',
      pwd2: '',
      passMobile: false,
      passPwd1: false,
      passPwd2: false,
      buttonState: 'init',
      count: 60,
      token: window.sessionStorage.getItem('token'),
      clubMemberCodeParam: window.sessionStorage.getItem('clubmembercode')
    }
  },
  methods: {
    // 验证手机号是否正确
    verifyMobile() {
      let telReg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
      if (!telReg.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        this.passMobile = false
        return false
      } else {
        this.passMobile = true
        return true
      }
    },
    // 验证手机号是否注册
    async sendMessage() {
      this.count = 59
      let verifyMobile = this.verifyMobile()
      if (!verifyMobile) return
      const { data: res } = await this.$http.get('memberLogin/mobileIfExit', {
        params: { mobile: this.mobile, token: this.token }
      })
      console.log(res)
      if (res.msg === 'fail') {
        this.$toast('该手机号已被注册')
        this.passMobile = false
        return
      }
      const { data: res1 } = await this.$http.get(
        'memberLogin/sendVerificationCode',
        {
          params: { mobile: this.mobile, sign: 1, token: this.token, clubMemberCodeParam: this.clubMemberCodeParam }
        }
      )
      console.log(res1)
      if (res1.msg === 'success') {
        this.$toast('验证码发送成功')
        this.sendcode = res1.data
      } else {
        this.$toast('验证码发送失败')
        return
      }
      this.buttonState = 'ban'
      let InterValObj = window.setInterval(() => {
        if (this.count === '01') {
          clearInterval(InterValObj)
          this.buttonState = 'open'
        } else {
          this.count--
          this.count = this.count >= 10 ? this.count : '0' + this.count
        }
      }, 1000)
    },
    // 提示输入验证码
    setVerCode() {
      if (!this.verCode) {
        this.$toast('请输入验证码')
      }
    },
    // 提示密码位数
    focusPwd() {
      this.$toast('密码长度必须为5-12位之间')
    },
    blurPwd() {
      if (this.pwd1.length <= 4 || this.pwd1.length > 12 || !this.pwd1) {
        this.$toast('密码格式错误')
        this.passPwd1 = false
      } else {
        this.passPwd1 = true
      }
    },
    // 确认密码校验
    blurpassPwd() {
      if (this.pwd1 !== this.pwd2) {
        this.$toast('两次密码输入不一致')
        return
      }
      if (this.pwd2.length <= 4 || this.pwd2.length > 12 || !this.pwd2) {
        this.$toast('密码格式错误')
        this.passPwd2 = false
      } else {
        this.passPwd2 = true
      }
    },
    // 开始注册
    async register() {
      if (this.verCode !== this.sendcode) {
        return this.$toast('验证码填写有误')
      }
      if (!this.passMobile) {
        return this.$toast('请填写正确的手机号码')
      }
      if (!this.verCode) {
        return this.$toast('请填写正确的验证码')
      }
      if (!this.passPwd1) {
        return this.$toast('请完善您的密码')
      }
      if (!this.passPwd2) {
        return this.$toast('请确认您的密码')
      }
      const { data: res } = await this.$http.get('memberLogin/registUser', {
        params: {
          mobile: this.mobile,
          password: this.pwd1,
          code: this.verCode,
          token: this.token
        }
      })
      if (res.msg === 'success') {
        this.$toast('恭喜您注册成功，正在为您自动跳转!')
        setTimeout(async() => {
          const { data: res1 } = await this.$http.get('memberLogin/logined', {
            params: {
              userName: this.mobile,
              passWord: this.pwd1,
              token: this.token
            }
          })
          if (res1.msg === 'success') {
            // 登录成功后将用户名和密码保存至本地，并且设置有效时间
            let clubId = window.sessionStorage.getItem('clubId')
            let pastDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
            let dataOrigin = {
              userName: this.mobile,
              passWord: this.pwd1,
              pastDate: pastDate
            }
            let dataOriginStr = JSON.stringify(dataOrigin)
            window.localStorage.setItem('dataOriginStr' + clubId, dataOriginStr)

            window.sessionStorage.setItem('isLogin', 'true')
            this.$router.replace({ name: 'index' })
            return
          }
          this.$router.push({ name: 'login' })
        }, 2000)
      } else {
        this.$toast('注册失败')
      }
    }
  }
}
</script>

<style scoped>
.back {
  position: absolute;
  top: 16px;
  left: 9%;
  margin-top: 15px;
}
.back a {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
section {
  flex: 1;
  position: absolute;
  top: 1.6rem;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  width: 80%;
  border-radius: 7px;
}
#phone {
  position: relative;
}
.wrapper {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #ccc;
  background: #f6f6f6;
  margin-bottom: 0.6rem;
}
.wrapper input {
  flex: 1;
  height: 1rem;
  margin-right: 0.25rem;
  text-align: center;
  text-align: left;
  /* color: #fff; */
}
input {
  border: none;
  outline: none;
  display: inline-block;
  background-color: transparent;
  font-size: 0.32rem;
}
.wrap {
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 7.5rem;
  margin: 0 auto;
  padding-top: 0.1rem;
}
.wrapper2 {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1rem;
  border-radius: 7px;
  margin-top: 0.06rem;
  margin-bottom: 0.24rem;
}
.ident2 {
  width: 100%;
  justify-content: center;
  height: 1rem;
  float: left;
  margin-left: 0px;
  line-height: 1rem;
  background: #f6f6f6;
  border-radius: 0px;
  margin-bottom: 0.1rem;
}
#verCode {
  float: left;
  width: 54%;
  line-height: 1rem;
  text-align: left;
  border-bottom: 1px solid #ccc !important;
}
.ident3 {
  float: right;
  height: 0.9rem;
  padding: 0 0.2rem;
  background: #4b9fd2;
  border-radius: 7px;
  margin-top: 2px;
}
#yzm1 {
  width: 100%;
  text-align: center;
  line-height: 1rem;
  color: #fff;
  float: right;
}
section #register {
  height: 0.92rem;
  border-radius: 7px;
  background: #4b9fd2;
  color: #fff;
  border: none;
  outline: none;
  font-size: 0.32rem;
  margin-top: 15px;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #ccc;
}
.buttonBan {
  background-color: #cbcbcb;
}
.buttonBan input {
  color: #999;
}
</style>
