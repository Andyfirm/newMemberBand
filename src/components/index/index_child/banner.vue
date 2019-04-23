<template>
  <swipe class="my-swipe">
    <swipe-item class="slide1">
      <img :src="`./static/images/clubid${clubId}/banner/banner1.jpg`" alt>
    </swipe-item>
    <swipe-item class="slide2">
      <img :src="`./static/images/clubid${clubId}/banner/banner2.jpg`" alt>
    </swipe-item>
    <swipe-item class="slide3">
      <img :src="`./static/images/clubid${clubId}/banner/banner3.jpg`" alt>
    </swipe-item>
    <swipe-item class="slide4">
      <img :src="`./static/images/clubid${clubId}/banner/banner4.jpg`" alt>
    </swipe-item>
    <!-- <swipe-item class="slide5"><img src="`../../../../static/images/clubid${clubId}/banner/banner5.jpg`" alt=""></swipe-item> -->
  </swipe>
</template>

<script>
export default {
  name: 'banner',
  data() {
    return {
      clubId: window.sessionStorage.getItem('clubId')
    }
  }
}
</script>

<style scoped>
.my-swipe {
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  /* background-color: #fff; */
  box-sizing: border-box;
  overflow: hidden;
}
.my-swipe img {
  width: 100%;
  border-radius: 8px;
}
.mint-swipe-indicators {
  height: 20px;
  z-index: 1111;
  bottom: 0;
  position: absolute;
  width: 100%;
  background: red;
}
</style>
