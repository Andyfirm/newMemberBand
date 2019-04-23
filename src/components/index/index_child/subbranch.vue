<template>
  <div id="subbranch">
    <div class="select" ref="select">
      <i class="select_icon" ref="select_icon" @click="controlShow"></i>
      <span id="selected" ref="selected" @click="controlShow">{{shopNumVuex}}</span>
      <ul v-show="selectShow">
        <li ref="li" @click="controlShow" v-for="item of indexList" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
    <div class="site">
      <span class="icon"></span>
      <p>{{address}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'subbranch',
  data() {
    return {
      selectShow: false
    }
  },
  methods: {
    controlShow: function(event) {
      var el = event.target
      this.selectShow = !this.selectShow
      var domSelected = this.$refs.selected
      var domLi = this.$refs.li
      var icon = this.$refs.select_icon
      if (el.innerHTML) {
        window.sessionStorage.setItem('shopName', el.innerHTML)
        let itemTrue = this.indexList.filter(item => {
          return item.name === el.innerHTML
        })
        window.sessionStorage.setItem('shopNum', itemTrue[0].shopNum)
        this.getshopNumVuex(itemTrue[0].shopNum)
        this.getindexListShow()
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
    ...mapMutations(['getshopNumVuex', 'getindexListShow'])
  },
  computed: {
    ...mapState(['indexList', 'shopNumVuex', 'indexListShow']),
    address() {
      let str = this.indexListShow[0].imgaddress || ''
      return str.split('#')[1]
    }
  }
}
</script>

<style scoped>
#subbranch {
  width: 100%;
  background-color: #fff;
  margin-top: 0.2rem;
  padding: 0.4rem 0.2rem 0.2rem 0.2rem;
  border-radius: 8px;
  box-sizing: border-box;
}
.select {
  position: relative;
  width: 2.86rem;
  height: 0.56rem;
  line-height: 0.56rem;
  border: 1px solid #7ecef4;
  border-radius: 8px;
  padding-left: 10px;
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
  left: -1px;
  top: 0.7rem;
  width: 100%;
  border: 0.8px solid #7ecef4;
  border-radius: 6px;
  overflow: hidden;
}
.select li {
  color: #999;
  font-size: 0.32em;
  border-bottom: 1px solid #efefef;
  padding: 4px 20px 4px 10px;
  background-color: #eff;
}
.site {
  overflow: hidden;
  margin-top: 0.24rem;
}
.site .icon {
  display: block;
  float: left;
  width: 0.32rem;
  height: 0.42rem;
  margin: 0.138rem 0.08rem 0 0;
  font-size: 0.5rem;
  background: url('~images/icon/address0.png') no-repeat center/cover;
}
.site p {
  float: left;
  width: 93%;
  color: #999;
  margin-top: 6px;
  font-size: 0.3rem;
  font-style: normal;
}
</style>
