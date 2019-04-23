<template>
  <div id="coachScheduling" v-show="keyArr.length > 0">
    <div class="top_h">
      <h6>{{teachername}}教练的排期</h6>
    </div>
    <div class="milde_container">
      <div class="top_opcity"></div>
      <div class="left_opcity"></div>
      <div class="date_left" ref="leftdate_y">
        <ul>
          <li v-for="(item,index) of times" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="sitename_top" ref="top_x">
        <ul>
          <li v-for="(item,index) of keyArr" :key="index">{{item.slice(5)}}</li>
        </ul>
      </div>
      <div class="sitecontent" ref="scroll_top">
        <div class="sitecontentWrap" ref="scroll_left">
          <ul v-for="(item,key) of keyObj" :key="key">
            <li
              v-for="(item1,index) of item"
              :key="index"
              :class="{colorTwo: item1.state === 1, colorOne:item1.state === 4 ||item1.state === 2,colorThree:item1.state === 3 }"
              @click="select(item1.starttime,item1.endtime,item1.state,key,index)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="legend">
      <ul>
        <li>
          <span></span>
          <p>不可预约</p>
        </li>
        <li>
          <span></span>
          <p>可预约</p>
        </li>
        <li>
          <span></span>
          <p>已选择</p>
        </li>
      </ul>
    </div>
    <div class="btnBox">
      <button @click="trainerResult">提交约课</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coachScheduling',
  data() {
    return {
      times: [],
      keyObj: {},
      keyArr: [],
      selectList: [],
      aptId: this.$route.query.aptId,
      asscardnum: this.$route.query.asscardnum, // 卡号
      shortname: this.$route.query.shortname, // eg:"esp01"
      teachershortname: this.$route.query.teachershortname, // eg:"ws"
      teachername: this.$route.query.teachername, // eg:王石
      teachitemname: this.$route.query.teachitemname, // eg:"足球少年班"
      teachitemshortname: this.$route.query.teachitemshortname, // eg:"zqsnb"
      token: window.sessionStorage.getItem('token'),
      shopNum: window.sessionStorage.getItem('shopNum')
    }
  },
  mounted() {
    let scrollTop = this.$refs.scroll_top
    this.handleScroll()
    scrollTop.addEventListener('scroll', this.handleScroll)
    this.getList()
  },
  methods: {
    // 滚动事件
    handleScroll() {
      let scrollLeft = this.$refs.scroll_left // 获取主动触发的x方向的元素
      let topX = this.$refs.top_x // 获取顶部x方向滚动元素
      let xNumber = scrollLeft.scrollLeft // 得到主动触发x方向的滚动偏移量
      scrollLeft.addEventListener('scroll', () => {
        xNumber = scrollLeft.scrollLeft
        topX.scrollLeft = xNumber
      })
      let scrollTop = this.$refs.scroll_top // 获取主动触发的y方向的元素
      let leftdateY = this.$refs.leftdate_y // 获取侧部y方向要滚动的元素
      let yNumber = scrollTop.scrollTop
      leftdateY.scrollTop = yNumber
    },
    // 获取首屏数据
    async getList() {
      const { data: res } = await this.$http.get('pt/getPTInfo', {
        params: {
          ptShortname: this.teachitemshortname,
          shortname: this.teachershortname,
          token: this.token,
          shopNum: this.shopNum
        }
      })
      if (res.msg === 'success') {
        this.times = res.data.times
        let resObj = res.data.ptObject // 保存得到的对象列表
        let keyArr = [] // 声明数组，将循环出的键追加到此数组中，然后比较大小
        let keyObj = {} // 声明新的数组，储存排序好的键值对
        for (let key in resObj) {
          keyArr.push(new Date(key).getTime())
        }
        keyArr.sort(function(a, b) {
          return a - b
        })
        for (let i = 0; i < keyArr.length; i++) {
          let keys = this.$moment(keyArr[i]).format('YYYY-MM-DD')
          this.keyArr.push(keys)
          keyObj[keys] = resObj[keys]
        }
        this.keyObj = keyObj
      }
    },
    // 选择
    select(starttime, endtime, state, key, index) {
      let objTime = {}
      objTime.starttime = starttime
      objTime.endtime = endtime
      objTime.date = key
      if (state === 4) return this.$toast('该场次已出售或正在维护中...')
      if (state === 1) {
        let activeDate = `${key} ${starttime}` // 选择的日期时间
        let dateIngTime = new Date().getTime() // 当前时间时间戳
        let activeDateTime = new Date(activeDate).getTime() // 选择时间时间戳
        if (activeDateTime - dateIngTime <= 0) {
          return this.$toast('预约时间已过！')
        }
        // if (activeDateTime - dateIngTime <= 1800000) this.$toast('您距离本场次已不足30分钟')
        this.keyObj[key][index].state = 3
        this.selectList.push(objTime)
      } else if (state === 3) {
        this.keyObj[key][index].state = 1
        this.removeArray(this.selectList, objTime)
      }
    },
    // 点击弹框确认
    trainerResult() {
      if (this.selectList.length <= 0) {
        return this.$toast('请您至少选择一节课程！')
      }
      let selectListStr = JSON.stringify(this.selectList)
      let dateymd = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      let sjdataObj = {
        teachername: this.teachername,
        teachitemname: this.teachitemname,
        selectList: this.selectList
      }
      let sjdataStr = JSON.stringify(sjdataObj)
      window.sessionStorage.setItem('sjdataStr', sjdataStr) // 保存成功后所需数据
      // 弹框所需数据
      let title = '您已选择' + this.teachername + '教练以下课程'
      let str = ''
      for (let i = 0; i < this.selectList.length; i++) {
        str +=
          '<p>' +
          this.selectList[i].date +
          ' ' +
          this.selectList[i].starttime +
          '-' +
          this.selectList[i].endtime +
          '</p>'
      }
      let dateStr =
        '<div style="color:#7ecef4;">' +
        this.teachitemname +
        '课程</div><div>预约时间段</div><div style="overflow: scroll;max-height: 5rem;">' +
        str +
        '</div>'
      this.$messagebox({
        title: title,
        message: dateStr,
        showCancelButton: true,
        confirmButtonText: '预约',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.submit(selectListStr, dateymd)
        }
      })
    },
    // 提交
    async submit(selectListStr, dateymd) {
      const { data: res } = await this.$http.post(
        'pt/reservationPT',
        this.qs.stringify({
          preTime: dateymd,
          teachershortname: this.teachershortname,
          teachitemshortname: this.teachitemshortname,
          ClassName: this.teachitemname,
          assCardNum: this.asscardnum,
          useTime: selectListStr,
          shopNum: this.shopNum,
          aptId: this.aptId,
          token: this.token
        })
      )
      if (res.msg === 'success') {
        this.$router.push({ name: 'succeed', query: { stamp: '3' } })
      } else if (res.msg === 'fail') {
        this.$toast(res.data)
      }
    },
    // 删除选择元素方法
    removeArray(arr, val) {
      var length = arr.length
      for (var i = 0; i < length; i++) {
        if (
          arr[i].date === val.date &&
          arr[i].starttime === val.starttime &&
          arr[i].endtime === val.endtime
        ) {
          arr.splice(i, 1)
          return
        }
      }
    }
  }
}
</script>

<style scoped>
.top_h {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.2rem 0.2rem;
  background-color: #f6f6f6;
  box-sizing: border-box;
}
h6 {
  font-size: 0.3rem;
  color: #999;
  text-align: center;
  margin-top: 0.2rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #e5e5e5;
}
.milde_container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;
  margin-top: 1.1rem;
}
.date_left {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 300px;
  overflow: scroll;
  z-index: 3;
  background-color: #f6f6f6;
}
.date_left ul {
  width: 32px;
  height: 300px;
  padding-top: 12px;
}
.date_left li {
  font-size: 12px;
  color: #999;
  line-height: 12px;
  margin-bottom: 14px;
}
.sitename_top {
  position: absolute;
  background-color: #f6f6f6;
  top: 0;
  left: 0px;
  padding-left: 33px;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  overflow: scroll;
}
.sitename_top ul {
  display: flex;
  height: 20px;
}
.sitename_top li {
  width: 57px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
.sitecontent {
  position: absolute;
  right: 0;
  width: 100%;
  height: 300px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.sitecontentWrap {
  display: flex;
  overflow-y: scroll;
  padding-left: 33px;
  padding-top: 20px;
}
.sitecontentWrap ul {
  padding-bottom: 7px;
}
.sitecontent ul li {
  width: 55px;
  height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  margin-right: 2px;
  margin-bottom: 2px;
}
.milde_container::after {
  position: absolute;
  content: '';
  display: block;
  top: 0;
  left: -1px;
  width: 33px;
  height: 11px;
  background-color: #f6f6f6;
  z-index: 3;
}
.left_opcity {
  position: absolute;
  left: 0;
  top: 0;
  width: 34px;
  height: 300px;
  opacity: 0;
  z-index: 99999;
}
.top_opcity {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 16px;
  opacity: 0;
  z-index: 99999;
}
.legend {
  margin-top: 0.3rem;
}
.legend ul {
  width: 100%;
  display: flex;
  justify-content: center;
}
.legend span {
  display: block;
  width: 42px;
  height: 18px;
  background-color: #e5e5e5;
  border-radius: 4px;
}
.legend li:nth-child(2) span {
  margin: 0 0.4rem;
  background-color: #49bf5d;
}
.legend li:nth-child(3) span {
  background-color: #7ecef4;
}
.legend p {
  font-size: 12px;
  color: #333;
  text-align: center;
  margin-top: 0.14rem;
}
.btnBox {
  width: 100%;
  margin-top: 0.3rem;
}
button {
  outline: none;
  border: 0;
  width: 5.9rem;
  font-size: 15px;
  padding: 0.25rem 0;
  color: #fff;
  margin: 0 auto;
  background-color: #7ecef4;
  border-radius: 8px;
  display: flex;
  text-align: center;
  justify-content: center;
}
.colorOne {
  background-color: #e5e5e5;
}
.colorTwo {
  background-color: #49bf5d;
}
.colorThree {
  background-color: #7ecef4;
}
</style>
