<template>
  <div id="messageBoard">
    <div class="fixBox_top">
      <div class="message_top">
        <span>留言</span>
        <div @click="popups">请写下您的意见或建议，不少于15个字</div>
      </div>
    </div>
    <ul class="contentBox">
      <li v-for="item of list" :key="item.id">
        <div class="content_top">
          <img src="../../../../static/images/my/header.png" alt>
          <span class="name">{{item.name}}</span>
          <span class="time">{{item.datetime.slice(0,16)}}</span>
        </div>
        <div class="textBox">{{item.text}}</div>
      </li>
    </ul>
    <!-- 留言弹出层 -->
    <transition name="fade">
      <div class="msgPopups" v-show="shade" ref="msgPopups" @click.self="closePopups">
        <div class="popupsWrap">
          <div class="topBox">
            <span class="textNumber">当前输入字数:（{{number}}字）</span>
            <div class="close" @click="closePopups"></div>
          </div>
          <textarea v-model="text"></textarea>
          <button @click="submit" v-show="number >= 15">提交评论</button>
          <button class="disable" v-show="number < 15">提交评论</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'messageBoard',
  data() {
    return {
      shade: false,
      text: null,
      list: [],
      page: 0,
      token: window.sessionStorage.getItem('token')
    }
  },
  created() {
    this.getList(this.page)
  },
  methods: {
    // 首屏数据获取
    async getList(page) {
      const { data: res } = await this.$http.get('myresp/getMessageBoardInfo', {
        params: { pageNo: page, pageSize: 6, token: this.token }
      })
      console.log(res)
      if (res.msg === 'success') {
        this.list = res.data
      }
    },
    // 留言弹出层
    popups() {
      this.shade = true
      let body = document.getElementsByTagName('body')[0]
      body.style.position = 'fixed'
    },
    // 关闭弹出层
    closePopups() {
      this.shade = false
      let body = document.getElementsByTagName('body')[0]
      body.style.position = 'static'
    },
    // 提交
    async submit() {
      const { data: res } = await this.$http.post(
        'myresp/addMessageBoardInfo',
        this.qs.stringify({
          text: this.text,
          token: this.token
        })
      )
      console.log(res)
      if (res.msg === 'success') {
        let id = res.data.data.id
        let time = this.$moment(new Date()).format('YYYY-MM-DD HH:mm')
        let nickName = window.sessionStorage.getItem('userNickName')
        let obj = {
          datetime: time,
          name: nickName,
          id,
          text: this.text
        }
        this.list.unshift(obj)
        this.text = null
        this.shade = false
        let body = document.getElementsByTagName('body')[0]
        body.style.position = 'static'
        this.$toast({
          message: '提交成功',
          iconClass: 'iconfont icon-caozuochenggong'
        })
      }
    }
  },
  computed: {
    number() {
      return this.text ? this.text.length : 0
    }
  }
}
</script>

<style scoped>
#messageBoard {
  width: 100%;
  padding: 1.16rem 0 0.4rem;
}
.fixBox_top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.2rem;
  background-color: #f6f6f6;
  box-sizing: border-box;
}
.message_top {
  width: 100%;
  height: 1.16rem;
  background-color: #fff;
  border-radius: 8px;
}
.message_top span {
  float: left;
  margin: 0.32rem 0.18rem 0;
  font-size: 0.36rem;
  color: #333;
}
.message_top div {
  float: right;
  width: 5.64rem;
  height: 0.7rem;
  padding-left: 0.2rem;
  margin-right: 0.2rem;
  margin-top: 0.22rem;
  font-size: 0.3rem;
  text-align: left;
  line-height: 0.7rem;
  color: #e7e7e7;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  box-sizing: border-box;
}
.contentBox li {
  width: 100%;
  padding: 0.44rem;
  background-color: #fff;
  margin-top: 0.2rem;
  border-radius: 8px;
  box-sizing: border-box;
}
.content_top {
  overflow: hidden;
  margin-bottom: 0.34rem;
}
.content_top img {
  float: left;
  display: block;
  width: 0.88rem;
  height: 0.88rem;
  background-color: pink;
  border-radius: 50%;
}
.content_top .name {
  float: left;
  margin-top: 0.26rem;
  margin-left: 0.2rem;
  font-size: 0.3rem;
  color: #333;
}
.content_top .time {
  float: right;
  font-size: 0.26rem;
  color: #999;
}
.textBox {
  line-height: 0.52rem;
  font-size: 0.3rem;
  text-indent: 0.6rem;
  word-wrap: break-word;
  color: #333;
}
.msgPopups {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.2);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.popupsWrap {
  position: relative;
  overflow: hidden;
  width: 6.6rem;
  height: 7.5rem;
  padding-top: 0.05rem;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 8px;
}
textarea {
  resize: none;
  outline: none;
  width: 6.2rem;
  height: 5rem;
  line-height: 0.5rem;
  padding: 0.2rem;
  text-indent: 0.2rem;
  margin: 0 0.2rem;
  font-size: 0.32rem;
  font-family: '微软雅黑';
  color: #333;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  box-sizing: border-box;
}
button {
  display: block;
  outline: none;
  width: 6.2rem;
  padding: 0.2rem 0;
  margin: 0.2rem 0.2rem 0;
  color: #fff;
  background-color: #7ecef4;
  border: 0;
  border-radius: 8px;
}
.textNumber {
  display: block;
  margin: 0.2rem;
  font-size: 0.3rem;
  color: #999;
}
.close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 0.3rem;
  height: 0.3rem;
  background: url('../../../..//static/images/icon/close.png') no-repeat center/cover;
}
.disable {
  background-color: #ccc;
}
</style>
