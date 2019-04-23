<template>
  <div class="footer">
    <footer>
      <span></span>
        <i>我是有底线的</i>
      <span></span>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  }
}
</script>
<style scope>
.footer {
  width: 100%;
  margin-top: 0.4rem;
}
footer span {
  float: left;
  display: block;
  width: 1.2rem;
  height: 1px;
  background-color: #bfbfbf;
}
footer span:nth-child(1) {
  margin-left: 1rem;
}
footer i {
  float: left;
  display: block;
  color: #ccc;
  font-size: 0.24rem;
  margin: -0.18rem 0.8rem 0.2rem;
}
</style>
