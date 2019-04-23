<template>
  <div id="member"></div>
</template>

<script>
export default {
  name: 'member',
  data() {
    return {
      textNumbers: '',
      clubId: this.$route.query.clubId,
      code: '',
      token: '',
      appid: '',
      name: '',
      shopName: ''
    }
  },
  created() {
    if (this.clubId) {
      window.sessionStorage.setItem('clubId', this.clubId)
    }
    this.clubId = window.sessionStorage.getItem('clubId')
    this.code = this.getParameter('code')
    this.getTextNumbers()
  },
  methods: {
    // 动态获取appid和name
    async getAppid() {
      const { data: res } = await this.$http.get('wechar/getWXConfigInfo', {
        params: {
          clubMemberCode: this.textNumbers
        }
      })
      if (res.msg === 'success') {
        this.name = res.data.name
        this.appid = res.data.appid
        if (!this.code) {
          // 获取appid成功后判断是否有code 没有则动态获取code
          this.getCode()
        } else {
          // 有则根据code获取token
          this.getToken()
        }
      }
    },
    // 获取场馆编号
    async getTextNumbers() {
      if (!this.clubId || this.clubId === 0) return
      const { data: res } = await this.$http.get(
        'publicNumber/getClubInfoByClubMemberCode',
        { params: { clubId: this.clubId } }
      )
      if (res.msg === 'success') {
        let data = res.data
        this.textNumbers = data.clubmembercode
        this.shopName = data.clubname
        window.sessionStorage.setItem('clubmembercode', data.clubmembercode)
        this.getAppid()
      } else if (res.msg === 'fail') {
        this.$toast(res.data)
      }
    },
    // 获取code
    getCode() {
      // wxaec1c79123e95c61
      let url =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        this.appid +
        '&redirect_uri=' +
        location.href.split('#')[0] +
        '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
      window.location.replace(url)
    },
    // 获取token
    async getToken() {
      const { data: res } = await this.$http.get('wechar/member', {
        params: {
          code: this.code,
          clubMemberCode: this.textNumbers,
          name: this.name
        }
      })
      if (res.msg === 'success') {
        this.token = res.data
        window.sessionStorage.setItem('token', res.data)
        if (this.textNumbers) {
          this.goToNextPage()
        }
      } else {
        this.$toast(res.data)
      }
    },
    // 解析code
    getParameter(param) {
      let query = window.location.search
      let iLen = param.length
      let iStart = query.indexOf(param)
      if (iStart === -1) return ''
      iStart += iLen + 1
      let iEnd = query.indexOf('&', iStart)
      if (iEnd === -1) {
        return query.substring(iStart)
      }
      return query.substring(iStart, iEnd)
    },
    // 根据判断跳转至不同页面
    goToNextPage() {
      let dataOriginStr = window.localStorage.getItem('dataOriginStr' + this.clubId)
      if (dataOriginStr) { // 如果存在则证明不是第一次登陆，判断是否过期
        let dataOriginObj = JSON.parse(dataOriginStr)
        let date = new Date().getTime()
        let pastDate = dataOriginObj.pastDate
        if (pastDate < date) {
          // 当前时间大于以前保存的时间证明已过期，跳转至登录页
          window.sessionStorage.setItem('clubId' + this.clubId, this.clubId)
          this.$router.replace({
            name: 'branch',
            query: { textNumbers: this.textNumbers, clubId: this.clubId, shopName: this.shopName }
          })
          return
        }
        // 获取账号密码
        let userName = dataOriginObj.userName
        let password = dataOriginObj.passWord
        if (userName && password) {
          let shopNum = window.localStorage.getItem('shopNum' + this.clubId)
          this.selected(shopNum, userName, password)
        } else {
          this.$router.replace({
            name: 'branch',
            query: { textNumbers: this.textNumbers, clubId: this.clubId, shopName: this.shopName }
          })
        }
      } else {
        this.$router.replace({
          name: 'branch',
          query: { textNumbers: this.textNumbers, clubId: this.clubId, shopName: this.shopName }
        })
      }
    },
    async login(userName, passWord) {
      let token = window.sessionStorage.getItem('token')
      const { data: res } = await this.$http.get('memberLogin/logined', {
        params: {
          userName,
          passWord,
          token
        }
      })
      if (res.msg === 'success') {
        this.$router.replace({ name: 'index' })
        window.sessionStorage.setItem('isLogin', 'true')
      }
      if (res.msg === 'fail') {
        this.$toast(res.data)
        this.$router.replace({name: 'login'})
      }
    },
    async selected(shopNum, userName, password) {
      const { data: res } = await this.$http.get('wechar/saveClubInfoByToken', {
        params: {
          token: window.sessionStorage.getItem('token'),
          clubMemberCode: this.textNumbers,
          shopNum
        }
      })
      if (res.msg === 'success') {
        this.login(userName, password)
      }
    }
  }
}
</script>

<style scoped>
</style>
