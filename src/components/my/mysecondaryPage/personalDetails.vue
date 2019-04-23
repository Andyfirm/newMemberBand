<template>
  <div id="personalDetails">
    <ul>
      <li>
        <span>头像</span>
        <img v-if="headimgurl" :src="headimgurl" alt>
        <img v-else src="../../../../static/images/my/header.png" alt>
      </li>
      <li>
        <span>昵称</span>
        <input type="text" v-model="name">
      </li>
      <li>
        <span>手机号码</span>
        <!-- 暂留等验证更换绑定 -->
        <em>{{infa.mobile}}</em>
      </li>
      <li class="sexli clear">
        <span>性别</span>
        <div class="select_sex" ref="select_sex">
          <i class="selectSex_icon" ref="selectSex_icon" @click="controlShowSex"></i>
          <span id="selected_sex" ref="selected_sex" @click="controlShowSex">{{sex}}</span>
          <ul v-show="selectShowSex">
            <li
              ref="li_sex"
              @click="controlShowSex"
              v-for="itemSex of listSex"
              :key="itemSex.id"
            >{{itemSex.sex}}</li>
          </ul>
        </div>
      </li>
      <li>
        <span>出生年月</span>
        <input type="text" :value="inputdateValue | convertDate" @click="openPicker">
        <mt-datetime-picker
          ref="picker"
          type="date"
          :startDate="startDate"
          v-model="pickerValue"
          @confirm="handleConfirm"
        ></mt-datetime-picker>
      </li>
      <li>
        <span>年龄</span>
        <em style="color:#666;">{{ageNumber}}</em>
      </li>
      <li>
        <span>身高</span>
        <em class="unit">cm</em>
        <input type="number" placeholder="未设置" v-model="height">
      </li>
      <li>
        <span>体重</span>
        <em class="unit">kg</em>
        <input type="number" placeholder="未设置" v-model="weight">
      </li>
      <li @click="cityConfirm($event)">
        <span>住址</span>
        <em @click="showCity">{{addressData||'请选择'}}</em>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" :showToolbar="true">确定</mt-picker>
      </li>
    </ul>
    <button @click="sumbit">保存</button>
  </div>
</template>

<script>
import myaddress from '../../../../static/city/pca.json'
export default {
  name: 'personalDetails',
  data() {
    return {
      selectShowSex: false,
      headimgurl: null,
      listSex: [{ id: 1, sex: '男' }, { id: 2, sex: '女' }],
      sex: '请选择',
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), // 省份数组
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddressProvince: '省',
      myAddressCity: '市',
      myAddresscounty: '区/县',
      pickerValue: new Date(),
      inputdateValue: new Date(),
      startDate: new Date('1970-01-01'),
      token: window.sessionStorage.getItem('token'),
      infa: {}, // 获取到的首屏数据
      name: null, // 昵称
      height: null,
      weight: null,
      addressData: '请选择'
    }
  },
  mounted() {
    this.getInformation()
    this.$nextTick(() => {
      // vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
    })
  },
  methods: {
    // 首屏数据获取
    async getInformation() {
      const { data: res } = await this.$http.get('myresp/getUserInfoByToken', {
        params: { token: this.token }
      })
      console.log(res)
      if (res.msg === 'success') {
        let data = res.data.infa
        this.infa = res.data.infa
        this.name = data.name
        this.height = data.height
        this.weight = data.weight
        this.headimgurl = res.data.headimgurl
        if (data.sex) {
          this.sex = data.sex
        }
        this.addressData = data.address
        this.inputdateValue = data.birthday || new Date()
      }
    },
    // 提交
    async sumbit() {
      let obj = {
        name: this.name,
        sex: this.sex,
        mobile: this.infa.mobile,
        birthday: this.inputdateValue,
        age: this.ageNumber,
        height: this.height,
        weight: this.weight,
        address: this.addressData
      }
      console.log(obj)
      if (this.height < 0) {
        return this.$toast('请正确填写身高')
      }
      if (this.weight < 0) {
        return this.$toast('请正确填写体重')
      }
      if (this.ageNumber < 0) {
        return this.$toast('请正确填写年龄')
      }
      let sex = this.sex !== '请选择' ? this.sex : null
      let birthday = this.$moment(this.inputdateValue).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      let infoObj = {
        name: this.name,
        sex,
        mobile: this.infa.mobile,
        birthday,
        age: this.ageNumber,
        height: this.height,
        weight: this.weight,
        address: this.addressData
      }
      let infoStr = JSON.stringify(infoObj)
      const { data: res } = await this.$http.post(
        'myresp/updateUserInfoByToken',
        this.qs.stringify({
          infoStr,
          token: this.token
        })
      )
      if (res.msg === 'success') {
        this.$toast({
          message: '保存成功',
          iconClass: 'iconfont icon-caozuochenggong'
        })
        setTimeout(() => {
          this.$router.push('myCentre')
        }, 1000)
      }
    },
    // 打开时间选择
    openPicker() {
      this.$refs.picker.open()
    },
    // 选中时间事件
    handleConfirm(value) {
      this.inputdateValue = value
    },
    // 点击显示城市选择栏
    showCity() {
      let picker = document.getElementsByClassName('picker')[1]
      picker.style.display = 'block'
    },
    // 点击隐藏城市选择栏
    cityConfirm(event) {
      if (event.target.className === 'picker-toolbar') {
        let picker = document.getElementsByClassName('picker')[1]
        picker.style.display = 'none'
      }
    },
    // 选择性别
    controlShowSex: function(event) {
      var el = event.target
      this.selectShowSex = !this.selectShowSex
      var domSelectedSex = this.$refs.selected_sex
      var domLiSex = this.$refs.li_sex
      if (el.innerHTML) {
        domSelectedSex.innerHTML = el.innerHTML
        this.sex = el.innerHTML
        console.log(this.sex)
      }
      for (var i = 0; i < domLiSex.length; i++) {
        if (domSelectedSex.innerHTML === domLiSex[i].innerHTML) {
          domLiSex[i].style.backgroundColor = '#7ecef4'
          domLiSex[i].style.color = '#fff'
        } else {
          domLiSex[i].style.backgroundColor = '#fff'
          domLiSex[i].style.color = '#666'
        }
      }
    },
    // 触发选择城市事件
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])) // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]) // 区/县数据就是一个数组
        this.myAddressProvince = values[0]
        this.myAddressCity = values[1]
        this.myAddresscounty = values[2]
        this.addressData =
          this.myAddressProvince +
          ' ' +
          this.myAddressCity +
          ' ' +
          this.myAddresscounty
      }
    },
    // 计算年龄
    computeAge: function(startDate) {
      // 获得今天的时间
      let date = new Date()
      startDate = new Date(startDate)
      let newDate = date.getTime() - startDate.getTime()
      // 向下取整  例如 10岁 20天 会计算成 10岁
      // 如果要向上取整 计算成11岁，把floor替换成 ceil
      var age = Math.floor(newDate / 1000 / 60 / 60 / 24 / 365)
      if (age <= 0) age = 0
      return age
    }
  },
  computed: {
    ageNumber() {
      return this.computeAge(this.inputdateValue)
    }
  }
}
</script>

<style scoped>
#personalDetails {
  width: 100%;
}
ul {
  overflow: hidden;
  padding: 0.2rem 0.2rem 0.4rem;
  background-color: #fff;
  border-radius: 8px;
}
ul li {
  overflow: hidden;
  padding: 0.32rem 0;
  border-bottom: 1px solid #dcdcdc;
}
ul li span {
  float: left;
  font-size: 0.36rem;
  color: #333;
}
ul li img,
ul li i,
ul li em,
ul li select,
ul li input {
  float: right;
  outline: none;
  font-size: 0.36rem;
  font-style: normal;
  text-align: right;
  color: #333;
  border: 0;
}
.select_sex {
  float: right;
}
ul li img {
  width: 0.7rem;
  height: 0.7rem;
  background-color: #fff;
  border-radius: 50%;
}
ul li:first-child {
  line-height: 0.7rem;
}
.unit {
  line-height: 0.36rem;
  margin-left: 0.06rem;
  color: #777;
}
button {
  display: block;
  outline: none;
  width: 100%;
  padding: 0.28rem 0;
  margin-top: 0.4rem;
  color: #fff;
  font-size: 0.36rem;
  background-color: #7fbeff;
  border: 0;
  border-radius: 8px;
}
.select_sex {
  position: relative;
  float: right;
  /* width: 4.2rem; */
  /* height: 0.8rem; */
  /* line-height: 0.8rem; */
  /* border: 1px solid #7ecef4; */
  border-radius: 8px;
  padding-left: 10px;
  box-sizing: border-box;
}
.select_sex span {
  display: block;
  color: #666;
  font-size: 0.32em;
  width: 100%;
  height: 100%;
  text-align: left;
  margin-top: 0;
}
.selectSex_icon {
  position: absolute;
  right: 0.24rem;
  top: 50%;
  margin-top: -0.04rem;
  width: 0.24rem;
  height: 0.12em;
}
.select_sex ul {
  position: absolute;
  left: -1px;
  top: 0.4rem;
  width: 112%;
  padding: 0;
  margin-top: 0.2rem;
  border: 0.8px solid #7ecef4;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
  z-index: 1;
}
.select_sex li {
  color: #999;
  font-size: 0.32em;
  margin-bottom: 0;
  border-bottom: 1px solid #efefef;
  padding: 0 20px 0 6px;
  background-color: #eff;
}
.sexli {
  overflow: visible;
}
.sexli ul li {
  line-height: 0.7rem;
}
/* 地区选择样式 */
.picker {
  width: 100%;
  overflow: hidden;
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.picker-toolbar {
  height: 40px;
  font-size: 0.42rem;
  text-align: right;
  line-height: 40px;
  margin-right: 10px;
}
.picker {
  display: none;
  border-top: 1px solid #ccc;
}
</style>
