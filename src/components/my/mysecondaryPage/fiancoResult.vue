<template>
  <div id="fiancoResult">
    <ul>
      <li>
        <div class="li_left">
          <p>姓名:Linda</p>
          <p>性别:女</p>
          <p>身高:165.0cm</p>
          <p>体重:92kg</p>
          <p>目标体重:85kg</p>
        </div>
        <div class="li_right">
           <p>体质指数:25.2</p>
          <p>体脂含量:24.0%</p>
          <p>基础代谢:1475.0卡</p>
          <p>脂肪肝风险系数:40</p>
          <p>健康评分:74.9分</p>
        </div>
        <div class="li_bottom">
          <span>2018-07-19 15:46</span>
          <router-link :to="{name: 'fiancoDetails'}">查看详情</router-link>
        </div>
      </li>
       <li>
        <div class="li_left">
          <p>姓名:Linda</p>
          <p>性别:女</p>
          <p>身高:165.0cm</p>
          <p>体重:92kg</p>
          <p>目标体重:85kg</p>
        </div>
        <div class="li_right">
           <p>体质指数:25.2</p>
          <p>体脂含量:24.0%</p>
          <p>基础代谢:1475.0卡</p>
          <p>脂肪肝风险系数:40</p>
          <p>健康评分:74.9分</p>
        </div>
        <div class="li_bottom">
          <span>2018-07-19 15:46</span>
          <router-link :to="{name: 'fiancoDetails'}">查看详情</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'fiancoResult',
  data() {
    return {}
  }
}
</script>

<style scoped>
#fiancoResult {
  width: 100%;
}
li {
  overflow: hidden;
  padding: 0.4rem;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 0.2rem;
}
li p {
  margin-bottom: 0.2rem;
}
.li_left,
.li_right {
  width: 50%;
  font-size: 0.3rem;
  color: #333;
    margin-bottom: 0.1rem;
}
.li_left {
  float: left;
}
.li_right {
  float: right;
}
.li_bottom {
  float: left;
  width: 100%;
  font-size: 0.26rem;
  color: #999;
}
.li_bottom span {
  float: left;
}
.li_bottom a {
  float: right;
  font-size: 0.3rem;
  color: #7ECEF4;
}
</style>
