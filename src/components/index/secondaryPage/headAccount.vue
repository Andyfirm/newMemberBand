<template>
  <div id="headAccount">
    <mySelect @change="getList"></mySelect>
    <div class="canvas">
      <ve-line
        class="ve-line"
        :data="chartData"
        :settings="chartSettings"
        :colors="color"
      ></ve-line>
    </div>
  </div>
</template>

<script>
import select from '../public/select'
export default {
  name: 'headAccount',
  components: {
    mySelect: select
  },
  data() {
    this.chartSettings = {
      stack: { 用户: ['访问用户'] },
      area: true,
      areaStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255,204,204,1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(189,207,226,0)' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      }
    }
    return {
      token: sessionStorage.getItem('token'),
      originalShopNum: null,
      list: [],
      color: ['#7ECEF4'],
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { 日期: '9时', 访问用户: 0 },
          { 日期: '10时', 访问用户: 50 },
          { 日期: '11时', 访问用户: 80 },
          { 日期: '12时', 访问用户: 70 },
          { 日期: '13时', 访问用户: 100 },
          { 日期: '14时', 访问用户: 120 },
          { 日期: '15时', 访问用户: 130 },
          { 日期: '16时', 访问用户: 150 },
          { 日期: '17时', 访问用户: 160 },
          { 日期: '18时', 访问用户: 170 },
          { 日期: '19时', 访问用户: 140 },
          { 日期: '20时', 访问用户: 145 },
          { 日期: '21时', 访问用户: 130 },
          { 日期: '22时', 访问用户: 135 },
          { 日期: '23时', 访问用户: 150 },
          { 日期: '24时', 访问用户: 110 }
        ]
      }
    }
  },
  activated() {
    this.getList()
  },
  methods: {
    async getList() {
      let shopNum = window.sessionStorage.getItem('shopNum')
      if (this.originalShopNum === shopNum) return
      const { data: res } = await this.$http.get('homepageresp/getStatistics', {
        params: { shopNum, token: this.token }
      })
      if (res.msg === 'success') {
        console.log(res)
        this.originalShopNum = window.sessionStorage.getItem('shopNum')
      }
    }
  }
}
</script>

<style scoped>
#headAccount {
  width: 100%;
}
.canvas {
  height: 380px;
  background-color: #fff !important;
  padding: 16px 0;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
