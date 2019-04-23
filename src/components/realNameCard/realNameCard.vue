<template>
  <div id="realNameCard">
    <h6>请先完善您的信息</h6>
    <ul>
      <li>
        <span>姓名</span>
        <input type="text" v-model="name">
      </li>
      <li>
        <span>性别</span>
        <div class="sexBox">
          <div class="yuan_l" @click="setmale" :class="{active: male===true}"></div>
          <i class="sex">男</i>
          <div class="yuan_n" @click="setwoman" :class="{active: woman===true}"></div>
          <i class="sex">女</i>
        </div>
      </li>
      <li>
        <span>会籍顾问</span>
        <div class="subbranch_top">
          <div class="select" ref="select">
            <i class="select_icon" ref="select_icon" @click="controlShow"></i>
            <span id="selected" ref="selected" @click="controlShow">{{huijiname}}</span>
            <ul v-show="selectShow">
              <li
                ref="li"
                @click="controlShow($event,item.shortName)"
                v-for="item of huijiList"
                :key="item.id"
              >{{item.name}}</li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <span>手机号</span>
        <input type="number" v-model="mobile">
      </li>
    </ul>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: 'realNameCard',
  data() {
    return {
      sex: '男',
      male: true,
      woman: false,
      huijiname: '请选择会籍',
      huijiList: [],
      name: '',
      mobile: '',
      selectShow: false,
      hShortName: null,
      badgeName: this.$route.query.badgeName,
      shopNum: window.sessionStorage.getItem('shopNum'),
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.gethuijiList()
  },
  methods: {
    setmale() {
      this.sex = '男'
      this.male = true
      this.woman = false
    },
    setwoman() {
      this.sex = '女'
      this.male = false
      this.woman = true
    },
    async gethuijiList() {
      const { data: res } = await this.$http.get(
        'homepageresp/getEJtCoByShopNum',
        {
          params: { shopNum: this.shopNum, token: this.token }
        }
      )
      if (res.msg === 'success') {
        this.huijiList = res.data.eJtList
      }
    },
    controlShow: function(event, hShortName) {
      var el = event.target
      if (hShortName) {
        this.hShortName = hShortName
      }
      this.selectShow = !this.selectShow
      var domSelected = this.$refs.selected
      var domLi = this.$refs.li
      var icon = this.$refs.select_icon
      if (el.innerHTML) {
        this.huijiname = el.innerHTML
      }
      if (this.selectShow) {
        icon.style.transition = 'all .5s'
        icon.style.transform = 'rotateZ(180deg)'
      } else {
        icon.style.transition = 'all .5s'
        icon.style.transform = 'rotateZ(0deg)'
      }
      for (var i = 0; i < domLi.length; i++) {
        if (domSelected.innerHTML === domLi[i].innerHTML) {
          domLi[i].style.backgroundColor = '#7ecef4'
          domLi[i].style.color = '#fff'
        } else {
          domLi[i].style.backgroundColor = '#fff'
          domLi[i].style.color = '#666'
        }
      }
    },
    async submit() {
      let hName = this.huijiname
      if (this.huijiname === '请选择会籍') {
        hName = null
      }
      if (!this.name) {
        this.$toast('请输入姓名')
        return
      }
      if (this.mobile.length > 11 || this.mobile.length < 4) {
        this.$toast('请正确填写手机号')
        return
      }
      let _this = this
      const { data: res } = await this.$http.post(
        'homepageresp/bulkguest',
        _this.qs.stringify({
          name: this.name,
          sex: this.sex,
          mobile: this.mobile,
          shopNum: this.shopNum,
          hName,
          hShortName: this.hShortName,
          token: this.token
        })
      )
      if (res.msg === 'success') {
        this.$toast('认证成功，正在为您跳转...')
        switch (this.badgeName) {
          case '5': // 在线报班
            setTimeout(() => {
              this.$router.push({
                name: 'confirmPayment',
                query: { badgeName: '5' }
              })
            }, 2000)
            break
          case '7': // 购卡
            setTimeout(() => {
              this.$router.push({
                name: 'confirmPayment',
                query: { badgeName: '7' }
              })
            }, 2000)
            break
        }
      }
    }
  }
}
</script>

<style scoped>
#realNameCard {
  width: 100%;
  padding: 0.4rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
h6 {
  width: 100%;
  font-weight: 500;
  font-size: 0.36rem;
  text-align: center;
  color: #333;
}
li {
  padding: 0.6rem 0;
}
li::before {
  content: '';
  display: block;
  clear: both;
}
li span {
  float: left;
  font-size: 0.32rem;
  color: #333;
  margin-top: 0.2rem;
}
li input {
  float: right;
  width: 4.2rem;
  height: 0.8rem;
  outline: none;
  padding-left: 0.4rem;
  -webkit-appearance: none;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  box-sizing: border-box;
}
.sexBox {
  float: right;
  margin-right: 0.94rem;
  margin-top: 0.12rem;
}
.sexBox > div {
  float: left;
  width: 0.48rem;
  height: 0.48rem;
  margin: 0 0.4rem;
  border: 1px solid #7ecef4;
  border-radius: 50%;
}
.sexBox > div.active {
  background-color: #7ecef4;
}
.sexBox > i {
  float: left;
  font-size: 0.32rem;
  font-style: normal;
}
.subbranch_top {
  width: 4.2rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  float: right;
}
.select {
  position: relative;
  width: 100%;
  height: 0.8rem;
  line-height: 0.64rem;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
.select span {
  display: block;
  color: #666;
  font-size: 0.32em;
  width: 100%;
  height: 100%;
  text-align: left;
}
.select_icon {
  position: absolute;
  right: 0.24rem;
  top: 50%;
  margin-top: -0.04rem;
  width: 0.24rem;
  height: 0.12em;
  background: url('~images/icon/select.png') no-repeat center/cover;
}
.select ul {
  position: absolute;
  width: 100%;
  left: -1px;
  top: 0.7rem;
  margin-top: 0.16rem;
  border: 0.8px solid #7ecef4;
  border-radius: 6px;
  box-sizing: border-box;
  overflow: hidden;
}
.select li {
  color: #999;
  font-size: 0.32em;
  margin: 0;
  border-bottom: 1px solid #efefef;
  padding: 0px 20px 0px 10px;
  background-color: #fff;
}
#selected {
  margin-top: 0.06rem;
}
button {
  outline: none;
  width: 100%;
  padding: 0.2rem 0;
  margin-top: 0.7rem;
  margin-bottom: 0.2rem;
  font-size: 0.32rem;
  color: #fff;
  background-color: #7ecef4;
  border: 0;
  border-radius: 8px;
}
</style>
