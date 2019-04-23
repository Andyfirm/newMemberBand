<template>
  <div class="subbranch_top">
    <div class="select" ref="select">
      <i class="select_icon" ref="select_icon" @click="controlShow"></i>
      <span id="selected" ref="selected" @click="controlShow">{{shopNumVuex}}</span>
      <ul v-show="selectShow">
        <li ref="li" @click="controlShow" v-for="item of indexList" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'onlineClass',
  data() {
    return {
      selectShow: false,
      shopName: window.sessionStorage.getItem('shopName')
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
        this.$emit('change')
        this.$emit('changeShopName')
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
    ...mapState(['shopNumVuex', 'indexList'])
  }
}
</script>

<style scoped>
.subbranch_top {
  width: 100%;
  height: 1.4rem;
  padding: 0.4rem 0.4rem;
  margin-bottom: 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
.select {
  position: relative;
  width: 100%;
  height: 0.64rem;
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
  border: 0.8px solid #7ecef4;
  border-radius: 6px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;
}
.select li {
  color: #999;
  font-size: 0.32em;
  border-bottom: 1px solid #efefef;
  padding: 0px 20px 0px 10px;
  background-color: #fff;
}
</style>
