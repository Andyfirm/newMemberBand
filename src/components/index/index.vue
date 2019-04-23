<template>
  <div id="indexWrap">
    <banner></banner>
    <subbranch></subbranch>
    <introduction :info="info" :cgimgurl="cgimgurl" :venue_name="venue_name"></introduction>
    <online-functions></online-functions>
    <coach></coach>
    <stores-information></stores-information>
    <!-- 显示分享页面 -->
    <transition name="fade">
      <div class="shareBox" v-show="shareActive" ref="shareBox">
        <div class="shareContent">
          <div class="topBox">
            <div class="topImg" style="background-image: url('./static/images/img/jazz.jpg')"></div>
            <div class="imgBox" style="background-image: url('./static/images/img/jazz.jpg')"></div>
          </div>
          <p class="tishi">哇~您的好友xxx向您分享了</p>
          <!-- 主要信息显示区域 -->
          <div class="textBox">
            <p>教练:Linda</p>
            <p>所在门店:中关村5号楼汉王大厦235室</p>
            <p>擅长瑜伽，纤体瘦身。</p>
          </div>
          <button>查看详情</button>
          <div class="close" @click="close"></div>
        </div>
      </div>
    </transition>
    <footer-nav :page="0"></footer-nav>
  </div>
</template>

<script>
import banner from './index_child/banner'
import subbranch from './index_child/subbranch'
import introduction from './index_child/introduction'
import onlineFunctions from './index_child/onlineFunctions'
import coach from './index_child/coach'
import storesInformation from './index_child/storesInformation'
import footerNav from '../footer/footerNav'
import { mapMutations } from 'vuex'
export default {
  name: 'index',
  components: {
    banner: banner,
    subbranch: subbranch,
    introduction: introduction,
    onlineFunctions: onlineFunctions,
    coach: coach,
    storesInformation: storesInformation,
    footerNav: footerNav
  },
  data() {
    return {
      info: '',
      cgimgurl: '',
      venue_name: '',
      tbShopTrue: {},
      token: window.sessionStorage.getItem('token'),
      shareActive: false
    }
  },
  mounted() {
    let shareBox = this.$refs.shareBox
    shareBox.ontouchmove = function(e) {
      e.preventDefault()
    }
    this.loadIndex()
  },
  methods: {
    // 关闭分享弹框
    close() {
      let shareBox = this.$refs.shareBox
      shareBox.style.display = 'none'
    },
    async loadIndex() {
      const { data: res } = await this.$http.get('homepageresp/getVenue', {
        params: {
          token: this.token
        }
      })
      if (res.msg === 'success') {
        let data = res.data
        // 过滤出默认要显示的数据
        let ArrshopNum = data.tbShopsList.filter(item => {
          return item.firstShow === 'true'
        })
        this.info = data.info
        this.cgimgurl = data.imgurl
        this.venue_name = data.venue_name
        this.getcgjjInfo(data.info)
        // 将获取的列表数据保存到vuex中
        this.getindexList(data.tbShopsList)
        // 传入默认要显示的数据到vuex中
        this.getindexListShow(ArrshopNum)
        // 将默认分店名称保存到vuex中
        this.getshopNumVuex(ArrshopNum[0].name)
        // 将过滤出的默认的分店保存到本地
        window.sessionStorage.setItem('shopName', ArrshopNum[0].name)
        window.sessionStorage.setItem('shopNum', ArrshopNum[0].shopNum)
      }
    },
    ...mapMutations([
      'getcgjjInfo',
      'getshopNumVuex',
      'getindexList',
      'getindexListShow'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#indexWrap {
  padding-bottom: 1.6rem;
  border-radius: 8px;
}
.shareBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.2);
  /* display: none; */
}
.shareContent {
  position: absolute;
  top: -2rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 5.5rem;
  height: 7.34rem;
  background-color: #fff;
  border-radius: 8px;
}
.topBox {
  position: relative;
  width: 5.1rem;
  height: 2.8rem;
  margin: 0.2rem auto;
}
.topImg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('') no-repeat center/cover;
  opacity: 0.3;
}
.imgBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2.28rem;
  height: 2.28rem;
  background: url('') no-repeat center/cover;
  opacity: 1;
  border-radius: 8px;
}
.tishi {
  margin-left: 0.6rem;
  font-size: 0.24rem;
  color: #999;
}
.textBox {
  font-size: 0.3rem;
  width: 4.3rem;
  margin: 0.3rem auto;
}
.textBox p {
  margin-top: 0.2rem;
}
button {
  display: block;
  outline: none;
  width: 4.3rem;
  margin: auto;
  font-size: 0.3rem;
  color: #fff;
  padding: 0.2rem;
  border: 0;
  background: linear-gradient(
    123deg,
    rgba(138, 217, 213, 1) 0%,
    rgba(141, 187, 250, 1) 100%
  );
  border-radius: 20px;
}
.close {
  width: 0.84rem;
  height: 0.84rem;
  margin: 0.7rem auto;
  background: url('../../../static/images/icon/shareClose.png') no-repeat center/contain;
}
</style>
