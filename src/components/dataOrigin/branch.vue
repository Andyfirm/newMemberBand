<template>
  <div id="branch">
    <header>
      <img src="../../../static/images/logo/logo.png" alt>
      <p>易思普线上场馆运营管理系统</p>
    </header>
    <h6 class="changguan" v-if="shopName">北京易思普健身俱乐部</h6>
    <h6 class="changguan" v-else>暂无数据</h6>
    <ul id="fendianName">
      <!-- <li class="selected" @click="selected">中关村1店</li> -->
      <li
        v-for="item of subbranchList"
        :key="item.id"
        @click="selected(item.id,item.shopNum)"
        :class="{selected: item.id === id}"
      >{{item.name}}</li>
    </ul>
    <div class="button enter" @click="buttonEnter" v-if="shopName">进入</div>
  </div>
</template>
<script>
export default {
  name: 'branch',
  data() {
    return {
      id: null,
      subbranchList: [],
      clubId: this.$route.query.clubId,
      textNumbers: this.$route.query.textNumbers,
      shopName: this.$route.query.shopName
    }
  },
  mounted() {
    this.getSubbranch()
  },
  methods: {
    async getSubbranch() {
      const { data: res } = await this.$http.get(
        'publicNumber/getShopsByClub',
        {
          params: {
            clubMemberCode: this.textNumbers,
            clubId: this.clubId
          }
        }
      )
      if (res.msg === 'success') {
        this.subbranchList = res.data
      }
    },
    async selected(id, shopNum) {
      this.id = id
      const { data: res } = await this.$http.get('wechar/saveClubInfoByToken', {
        params: {
          token: window.sessionStorage.getItem('token'),
          clubMemberCode: this.textNumbers,
          shopNum
        }
      })
      if (res.msg === 'success') {
        window.localStorage.setItem('shopNum' + this.clubId, shopNum)
        this.$router.replace({ name: 'login' })
      }
    },
    buttonEnter() {
      if (this.subbranchList.length > 0) {
        this.selected(this.subbranchList[0].id, this.subbranchList[0].shopNum)
      }
    }
  }
}
</script>
<style scoped>
#branch {
  width: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
}
input,
.button {
  outline: none;
  text-decoration: none;
}
header {
  width: 100%;
  height: 0.8rem;
  position: relative;
  line-height: 0.8rem;
  display: flex;
  justify-content: center;
}
img {
  width: 0.8rem;
  height: 0.8rem;
  float: left;
}
p {
  width: 86%;
  text-align: center;
  font-size: 0.36rem;
  color: #333;
  line-height: 0.8rem;
}
h6 {
  width: 100%;
  height: 14px;
  text-align: center;
  line-height: 14px;
  font-size: 14px;
  color: #999;
  font-weight: 500;
  margin: 0.48rem 0 0.6rem;
}
#fendianName {
  width: 100%;
  height: 5.55rem;
  overflow: scroll;
}
#fendianName li {
  height: 1.08rem;
  padding-left: 0.266rem;
  box-sizing: border-box;
}
ul li {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  line-height: 1.08rem;
  font-size: 0.28rem;
  color: #999;
}
ul li.selected {
  background-color: #fff;
  border-radius: 6px;
  border-bottom: 0;
}
ul li.selected::after {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  content: '';
  display: block;
  width: 0.46rem;
  height: 0.46rem;
  background: url('../../../static/images/icon/success.png') no-repeat
    center/contain;
}
.button {
  width: 100%;
  height: 0.8rem;
  display: block;
  background: #5eb7e2;
  margin: 0.6rem auto;
  text-align: center;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.8rem;
  border-radius: 8px;
}
.button.logout {
  background-color: #49bf5d;
}
</style>
