<template>
  <div id="fiancoDetails">
    <ul class="title_li after">
      <!-- 头部 -->
      <li class="titleBox">
        <h6>姓名:小灰灰</h6>
        <p class="bt_p">身体概况统计</p>
        <div class="top_btom">
          <div class="l">
            <span>182</span><i>(cm)</i>
            <p>身高</p>
          </div>
          <div class="m">
            <span>66.9</span><i>(kg)</i>
            <p>体重</p>
          </div>
          <div class="r">
            <span>24.0</span><i>(%)</i>
            <p>体脂百分比</p>
          </div>
        </div>
      </li>
      <!-- 综合评价 -->
      <li class="zhpjBox">
        <div class="zhpj_p">
          <div class="icon_zhpj"></div>
          <span class="zhpj_text">综合评价</span>
        </div>
        <ul class="zhpj_li">
          <li>
            <p>身体年龄</p>
            <span>41</span>
          </li>
          <li>
            <p>体质指数</p>
            <span>25.2</span>
          </li>
          <li>
            <p>健康评分</p>
            <span>74.8</span>
          </li>
          <li>
            <p>体型判断</p>
            <span>7</span>
          </li>
          <li>
            <p>瘦体重</p>
            <span>25.2</span><i>(kg)</i>
          </li>
          <li>
            <p>目标体重</p>
            <span>74.8</span><i>(kg)</i>
          </li>
          <li>
            <p>体重控制</p>
            <span>-6.0</span><i>%</i>
          </li>
          <li>
            <p>基础代谢</p>
            <span>1475.0</span><i>(卡)</i>
          </li>
        </ul>
      </li>
      <!-- 成分分析 -->
      <li class="cffxBox clear">
        <div class="cffx_p clear">
          <div class="icon_cffx"></div>
          <span class="cffx_text">成分分析</span>
        </div>
        <ul class="cffx_ul">
          <li>
            <p>骨质</p>
            <div>3.3%</div>
          </li>
          <li>
            <p>蛋白质</p>
            <div>10.5%</div>
          </li>
          <li>
            <p>水分</p>
            <div>37.1%</div>
          </li>
          <li>
            <p>肌肉</p>
            <div>47.6%</div>
          </li>
          <li>
            <p>脂肪</p>
            <div>16.0%</div>
          </li>
          <li>
            <p>骨骼肌</p>
            <div>33.9%</div>
          </li>
        </ul>
      </li>
      <!-- 组织指标 -->
      <li class="cffxBox clear">
        <div class="cffx_p clear">
          <div class="icon_zzzb"></div>
          <span class="cffx_text">组织指标</span>
        </div>
        <ul class="cffx_ul">
          <li>
            <p>细胞内液</p>
            <div>3.3%</div>
          </li>
          <li>
            <p>细胞外液</p>
            <div>10.5%</div>
          </li>
          <li>
            <p>脂肪控制量</p>
            <div>37.1%</div>
          </li>
          <li>
            <p>肌肉控制量</p>
            <div>47.6%</div>
          </li>
          <li id="zfgfxxs">
            <p>脂肪肝风险系数</p>
            <div>16.0%</div>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 底部三栏 -->
    <ul>
      <li class="bottomBox">
        <div class="zf_l">
          <div>
            <div class="icon_qgzf"></div>
            <span class="bottom_text">躯干脂肪量</span>
          </div>
          <ul>
            <li>
              <p>左上</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>右上</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>左下</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>右下</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
          </ul>
        </div>
        <div class="sf_r">
          <div>
            <div class="icon_qgsf"></div>
            <span class="bottom_text">躯干水分量</span>
          </div>
          <ul>
            <li>
              <p>左上</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>右上</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>左下</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>右下</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
          </ul>
        </div>
        <div class="jr_l">
          <div>
            <div class="icon_qgjr"></div>
            <span class="bottom_text">躯干肌肉量</span>
          </div>
          <ul>
            <li>
              <p>左上</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>右上</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>左下</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
            <li>
              <p>右下</p>
              <div><span>1.3</span><i>%</i></div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'fiancoDetails',
  data() {
    return {}
  }
}
</script>

<style scoped>
#fiancoDetails {
  width: 100%;
}
.title_li li {
  width: 100%;
  padding: 0.36rem;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
}
.titleBox {
  background-color: #fff;
}
h6 {
  width: 100%;
  font-size: 0.36rem;
  color: #333;
  margin-bottom: 0.3rem;
}
.bt_p {
  font-size: 0.3rem;
  color: #222;
  margin-bottom: 0.36rem;
}
.top_btom .l,
.top_btom .m,
.top_btom .r {
  float: left;
  width: 33.33%;
  font-size: 0;
  text-align: left;
}
.top_btom span {
  font-size: 0.5rem;
  font-weight: 700;
  color: #5eb7e2;
  margin-left: 0.3rem;
}
.top_btom {
  overflow: hidden;
}
.top_btom i {
  font-size: 0.42rem;
  color: #5eb7e2;
  font-weight: 700;
  font-style: normal;
}
.top_btom p {
  font-size: 0.3rem;
  color: #999;
  text-align: center;
  margin-top: 0.36rem;
}
.zhpjBox {
  background-color: #5eb7e2;
  border-radius: 8px;
}
.cffxBox {
  background-color: #fff;
}
.zhpjBox:after {
  content: '';
  display: block;
  clear: both;
}
.zhpj_text {
  float: left;
  font-size: 0.3rem;
  color: #fff;
}
.zhpj_p {
  font-size: 0;
  overflow: hidden;
}
.icon_zhpj,
.icon_cffx,
.icon_zzzb,
.icon_qgzf,
.icon_qgsf,
.icon_qgjr {
  float: left;
  width: 0.3rem;
  height: 0.36rem;
  margin-right: 0.2rem;
  background: url('~images/icon/zh.png') no-repeat center/contain;
}
.icon_cffx {
  margin-top: 0.03rem;
  background-image: url('~images/icon/cf.png');
}
.icon_zzzb {
  margin-top: 0.05rem;
  background-image: url('~images/icon/zz.png');
}
.icon_qgzf {
  margin-left: 0.6rem;
  margin-top: 0.03rem;
  background-image: url('~images/icon/qgzf.png');
}
.icon_qgsf {
  margin-left: 0.6rem;
  margin-top: 0.03rem;
  background-image: url('~images/icon/qgsf.png');
}
.icon_qgjr {
  margin-left: 0.6rem;
  background-image: url('~images/icon/qgjr.png');
}
.zhpj_li li {
  width: 26%;
  float: left;
  font-size: 0;
  padding: 0.4rem 0 0;
}
.zhpj_li li:nth-child(3n-1) {
  margin: 0 0.694rem;
}
.cffx_ul li:nth-child(3n-1) {
  margin: 0 1.166rem;
}
.zhpj_li li p {
  font-size: 0.26rem;
  color: #fff;
}
.zhpj_li li span {
  font-size: 0.4rem;
  font-weight: 700;
  color: #fff;
}
.zhpj_li li i {
  font-size: 0.32rem;
  font-style: normal;
  color: #fff;
}
.cffx_text {
  font-size: 0.3rem;
  float: left;
}
.cffx_ul li {
  float: left;
  width: 21%;
  padding: 0.4rem 0 0;
  margin-bottom: 0;
}
.cffx_ul li p {
  font-size: 0.26rem;
  color: #999;
}
.cffx_ul li div {
  font-size: 0.4rem;
  font-weight: 700;
  color: #333;
}
.bottomBox {
  overflow: hidden;
  padding: 0;
}
.bottom_text {
  float: left;
  font-size: 0.3rem;
  color: #333;
}
.bottomBox > div {
  width: 48.4%;
  background-color: #fff;
}
.zf_l,
.sf_r,
.jr_l {
  border-radius: 8px;
  margin-bottom: 0.2rem;
}
.zf_l {
  float: left;
}
.sf_r {
  float: right;
}
.jr_l {
  float: left;
}
.bottomBox > div > div {
  overflow: hidden;
  margin-top: 0.2rem;
}
.bottomBox ul li {
  float: left;
  width: 38%;
  padding: 0.2rem;
  text-align: center;
}
.bottomBox ul li p {
  font-size: 0.26rem;
  color: #999;
}
.bottomBox ul li div {
  font-weight: 700;
  font-size: 0.4rem;
  color: #333;
}
.bottomBox ul li div i {
  font-size: 0.26rem;
  font-style: normal;
}
#zfgfxxs {
  width: 40%;
}
</style>
