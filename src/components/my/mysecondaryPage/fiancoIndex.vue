<template>
  <div id="fiancoIndex">
    <div class="top" v-show="connect">
      <div class="topIcon_blue"></div>
      <span class="text_blue">体测仪已连接</span>
    </div>
    <div class="top" v-show="!connect">
      <div class="topIcon_red"></div>
      <span class="text_red">体测仪未连接</span>
    </div>
    <h6>请先完善您的信息</h6>
    <ul>
      <li class="clear">
        <span>仪器编号</span>
        <div class="select" ref="select">
          <i class="select_icon" ref="select_icon" @click="controlShow"></i>
          <span id="selected" ref="selected" @click="controlShow">easyserp01</span>
          <ul v-show="selectShow">
            <li ref="li" @click="controlShow" v-for="item of list" :key="item.id">{{item.name}}</li>
          </ul>
        </div>
      </li>
      <li>
        <span>姓名</span>
        <input type="text">
      </li>
      <li>
        <span>性别</span>
        <div class="select_sex" ref="select_sex">
          <i class="selectSex_icon" ref="selectSex_icon" @click="controlShowSex"></i>
          <span id="selected_sex" ref="selected_sex" @click="controlShowSex">男</span>
          <ul v-show="selectShowSex">
            <li ref="li_sex" @click="controlShowSex" v-for="itemSex of listSex" :key="itemSex.id">{{itemSex.sex}}</li>
          </ul>
        </div>
      </li>
      <li>
        <span>出生日期</span>
        <input type="text" :value="inputdateValue | convertDate" @click="openPicker">
        <mt-datetime-picker ref="picker" type="date" :startDate="startDate" v-model="pickerValue" @confirm="handleConfirm">
        </mt-datetime-picker>
      </li>
      <li class="height">
        <span>身高</span>
        <input type="text">
      </li>
      <li>
        <span>手机号</span>
        <input type="text">
      </li>
    </ul>
    <div class="btnBox">
      <button class="jc">马上检测</button>
      <router-link :to="{name: 'fiancoResult'}">
        <button class="jg">查看检测结果</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fiancoIndex',
  data() {
    return {
      connect: false,
      pickerValue: new Date(),
      startDate: new Date('1970-01-01'),
      inputdateValue: new Date(),
      selectShow: false,
      selectShowSex: false,
      list: [{ id: 1, name: 'easyserp01' }, { id: 2, name: 'easyserp02' }],
      listSex: [{ id: 1, sex: '男' }, { id: 2, sex: '女' }]
    }
  },
  methods: {
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm(value) {
      this.inputdateValue = value
    },
    controlShow: function(event) {
      var el = event.target
      this.selectShow = !this.selectShow
      var domSelected = this.$refs.selected
      var domLi = this.$refs.li
      var icon = this.$refs.select_icon
      if (el.innerHTML) {
        domSelected.innerHTML = el.innerHTML
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
    controlShowSex: function(event) {
      var el = event.target
      this.selectShowSex = !this.selectShowSex
      var domSelectedSex = this.$refs.selected_sex
      var domLiSex = this.$refs.li_sex
      var icon = this.$refs.selectSex_icon
      if (el.innerHTML) {
        domSelectedSex.innerHTML = el.innerHTML
      }
      if (this.selectShowSex) {
        icon.style.transition = 'all .5s'
        icon.style.transform = 'rotateZ(180deg)'
      } else {
        icon.style.transition = 'all .5s'
        icon.style.transform = 'rotateZ(0deg)'
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
    }
  }
}
</script>

<style scoped>
#fiancoIndex {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
}
.top {
  overflow: hidden;
  padding: 0.4rem;
}
.top .topIcon_red,
.top .topIcon_blue {
  float: left;
  width: 0.48rem;
  height: 0.34rem;
  background: url('~images/icon/nolianjie.png') no-repeat center/contain;
}
.top .text_red,
.top .text_blue {
  float: left;
  font-size: 0.24rem;
  color: #f47e7e;
  margin-top: 0.03rem;
  margin-left: 0.2rem;
}
.top .topIcon_blue {
  background-image: url('~images/icon/lianjie.png');
}
.top .text_blue {
  color: #5eb7e2;
}
h6 {
  color: #333;
  font-size: 0.36rem;
  text-align: center;
}
ul {
  padding: 0.4rem;
}
ul li {
  margin-bottom: 0.4rem;
}
ul li:after {
  content: '';
  display: block;
  clear: both;
}
ul li span {
  float: left;
  font-size: 0.32rem;
  color: #333;
  margin-top: 0.2rem;
}
ul li input {
  float: right;
  width: 4.2rem;
  height: 0.8rem;
  outline: none;
  -webkit-appearance: none;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  padding-left: 0.2rem;
  box-sizing: border-box;
}
li.height {
  position: relative;
  overflow: hidden;
}
li.height::after {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  content: 'cm';
  font-size: 0.26rem;
  color: #999;
}
input {
  color: #333 !important;
  text-shadow: 0px 0px 0px #495057;
  -webkit-text-fill-color: transparent;
  -webkit-appearance: none;
}
.btnBox {
  padding: 0 0.4rem 0.4rem;
}
button {
  display: block;
  width: 100%;
  height: 0.8rem;
  color: #fff;
  margin-bottom: 0.4rem;
  outline: none;
  border: 0;
  background-color: #5eb7e2;
  border-radius: 8px;
}
button.jg {
  background-color: #49bf5d;
}
.select,
.select_sex {
  position: relative;
  float: right;
  width: 4.2rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  padding-left: 10px;
  box-sizing: border-box;
}
.select span,
.select_sex span {
  display: block;
  color: #666;
  font-size: 0.32em;
  width: 100%;
  height: 100%;
  text-align: left;
  margin-top: 0;
}
.select_icon,
.selectSex_icon {
  position: absolute;
  right: 0.24rem;
  top: 50%;
  margin-top: -0.04rem;
  width: 0.24rem;
  height: 0.12em;
  background: url('~images/icon/select.png') no-repeat center/cover;
}
.select ul,
.select_sex ul {
  position: absolute;
  left: -1px;
  top: 0.7rem;
  width: 100%;
  padding: 0;
  margin-top: 0.2rem;
  border: 0.8px solid #7ecef4;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
  z-index: 1;
}
.select li,
.select_sex li {
  color: #999;
  font-size: 0.32em;
  margin-bottom: 0;
  border-bottom: 1px solid #efefef;
  padding: 0 20px 0 10px;
  background-color: #eff;
}
</style>
