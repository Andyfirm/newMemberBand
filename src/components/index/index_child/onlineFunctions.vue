<template>
  <div class="online">
    <h5>在线功能</h5>
    <div class="img_icon">
      <router-link :to="{name: 'ticketsOnline'}">
        <div class="imgBox one">
          <img src="~images/icon/Ticket.png" alt="">
        </div>
        <p>在线购票</p>
      </router-link>
      <!-- <router-link :to="{name: 'onlineClass'}"> -->
      <!-- <router-link to="/index" @click.native="tishiyu">
        <div class="imgBox">
          <img src="~images/icon/newspaper.png" alt="">
        </div>
        <p>在线报班</p>
      </router-link> -->
      <!-- <router-link :to="{name: 'headAccount'}">
        <div class="imgBox three">
          <img src="~images/icon/control.png" alt="">
        </div>
        <p>人数控制</p>
      </router-link> -->
      <router-link to="">
        <div class="imgBox">
          <img src="~images/icon/more.png" alt="">
        </div>
        <p>敬请期待...</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'onlineFunctions',
  data() {
    return {}
  },
  methods: {
    tishiyu() {
      this.$toast('该功能暂未开放')
    }
  }
}
</script>

<style scoped>
.online {
  width: 100%;
  height: 2.86em;
  margin-top: 0.2rem;
  padding: 0.32rem 0.2rem;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
.online h5 {
  font-size: 0.36rem;
  font-weight: 700;
  margin-bottom: 0.36rem;
}
.img_icon {
  display: flex;
  /* justify-content: center; */
  justify-content: left;
}
a {
  width: 25%;
  color: #999;
  font-size: 0.3rem;
  text-decoration: none;
  text-align: center;
  font-size: 0.24rem;
}
.imgBox {
  width: 0.7rem;
  height: 0.7rem;
  margin: 0 auto;
}
.imgBox.one {
  width: 1.1rem;
  box-sizing: border-box;
  padding: 0.1rem 0.12rem 0;
}
.imgBox.three {
  padding-left: 0.1rem;
}
.imgBox img {
  width: 100%;
}
p {
  margin-top: 0.24rem;
}
</style>
