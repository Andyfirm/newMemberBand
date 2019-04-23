export default {
  // 保存场馆详情数据
  getcgjjInfo(state, cgjjinfo) {
    state.cgjjinfo = cgjjinfo
  },
  // 保存首屏所用获取的数据
  getindexList(state, indexList) {
    state.indexList = indexList
  },
  // 改变选择分店名称
  getshopNumVuex(state, shopNumVuex) {
    state.shopNumVuex = window.sessionStorage.getItem('shopName') || shopNumVuex
  },
  // 过滤出选择的分店数据，如果没有选择，则默认为获取时默认的显示数据
  getindexListShow(state, ArrshopNum) {
    let indexListShow = state.indexList.filter(item => {
      return item.name === window.sessionStorage.getItem('shopName')
    })
    if (indexListShow.length > 0) {
      state.indexListShow = indexListShow
    } else {
      state.indexListShow = ArrshopNum
    }
  },
  // 设置支付时要提交的公共数据
  setSubmittedData(state, data) {
    state.submittedData = data
  }
}
