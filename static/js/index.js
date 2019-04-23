export default {
  check (i) {
    var num
    i < 10 ? (num = '0' + i) : (num = i)
    return num
  },
  
  ifmorning (hour) {
    var jieduan
    if (hour > 6 && hour < 12) {
      jieduan = '上午'
    } else if (hour == 12) {
      jieduan = '中午'
    } else if (hour > 12 && hour <= 18) {
      jieduan = '下午'
    } else {
      jieduan = '晚上'
    }
    return jieduan
  },
  NowTime () {
    var time = new Date()
    var month = time.getMonth()
    var day = time.getDate()
    var h = time.getHours()
    var m = time.getMinutes()
    var s = time.getSeconds()
    var ifmorning = ''
    ifmorning = this.ifmorning(h)
    h = this.check(h)
    m = this.check(m)
    s = this.check(s)
    var nowtime = (month + 1)+ '月' + day + '日  ' + ifmorning + '  ' + h + ':' + m + ':' + s
    return  nowtime
  },
  TimeNow () {
    var time = new Date()
    var h = time.getHours()
    var m = time.getMinutes()
    var s = time.getSeconds()
    var ifmorning = ''
    ifmorning = this.ifmorning(h)
    h = this.check(h)
    m = this.check(m)
    s = this.check(s)
    var timeNow = ifmorning + '  ' + h + ':' + m + ':' + s
    return timeNow
  }
}