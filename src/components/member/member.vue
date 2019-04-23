<template>
  <div>
  </div>
</template>
<script>
import { publicUrl } from '../../api/index.js'
export default {
  data () {
    return {
      code: '',
      param: {
        method: 'authUserInfo',
        code: this.code
      },
      params: {
        method: 'testLogin',
        openid: 'oQc9-jtS4jo9VZ0jzBtRVyKH39Dk'
      }
    }
  },
  components: {
  },
  mounted () {
    this.getInfo()
    // this.getParameter('code')
    // if (!this.code) {
    //   this.getCodeDG()
    // } else {
    //   this.getCode()
    // }
  },
  methods: {
    // 获取code
    getCodeDG () {
      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaec1c79123e95c61&redirect_uri=' + location.href.split('#')[0] + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
      window.location.href = url
    },
    getParameter (param) {
      var query = window.location.search
      var iLen = param.length
      var iStart = query.indexOf(param)
      if (iStart === -1) return ''
      iStart += iLen + 1
      var iEnd = query.indexOf('&', iStart)
      if (iEnd === -1) {
        return query.substring(iStart)
      }
      return query.substring(iStart, iEnd)
    },
    getCode () {
      publicUrl(this.param).then(res => {

      })
    },
    // 测试调试接口
    getInfo () {
      publicUrl(this.params).then((res) => {
        sessionStorage.setItem('infoData', res)
        console.log(res)
        this.$router.push({path: 'index'})
      }).catch((msg) => {
        alert('网络错误')
      })
    }
  }
}
</script>
<style>
</style>
