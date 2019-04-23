<template>
  <div id="top_nav">
    <div class="topnav_content">
      <ul>
        <li>
          <router-link :to="{name: list[0]}">场地</router-link>
        </li>
        <li>
          <router-link :to="{name: list[1]}">团课</router-link>
        </li>
        <li>
          <router-link :to="{name: list[2]}">私教</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topNav',
  props: ['routers'],
  data() {
    return {
      list: this.routers
    }
  }
}
</script>

<style scoped>
#top_nav {
  position: fixed;
  left: 0;
  top: 0;
  padding: 0.2rem;
  width: 100%;
  background-color: #f6f6f6;
  box-sizing: border-box;
  z-index: 9;
}
.topnav_content {
  overflow: hidden;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
}
.topnav_content li {
  float: left;
  width: 33.33%;
  font-size: 0.36rem;
  text-align: center;
}
.topnav_content li a {
  display: block;
  width: 0.8rem;
  padding: 0.32rem 0;
  margin: 0 auto;
  text-decoration: none;
  color: #333;
}
.topnav_content li a.myactive {
  color: #7fbeff;
  border-bottom: 2px solid #7fbeff;
}
</style>
