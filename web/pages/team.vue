<template>
  <div class="container">
    <Headers title="团队成员" :sticky="true"></Headers>

    <div class="team">
      <div class="card" v-for="item in teamCore" :key="item.name">
        <div class="photo">
          <img :src="item.avatar" />
        </div>
        <h1>{{ item.name }}</h1>
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
        <a href="#">了解更多</a>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from '~/components/Header.vue';
import { teamCore } from '~/constants.js';

export default {
  components: { Headers },
  data() {
    return {
      teamCore,
    };
  },
};
</script>

<style lang="scss" scoped>
.team {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.card {
  /* flex布局下元素不按比例缩放 */
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  width: 300px;
  height: 450px;
  overflow: hidden;
  margin: 20px;
  background-color: var(--border-color);
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* flex 子元素 纵向排列 */
  flex-direction: column;
  /* 增加个阴影 */
  box-shadow: 0 0 30px #2c2c2c;
  /* 同意给字体价格颜色 */
  color: var(--font_color);
}

.photo {
  position: absolute;
  /* 默认为放大 */
  width: 100%;
  height: 100%;
  top: 0px;
  border-radius: 0%;
  overflow: hidden;
  transition: 0.5s;
}

.photo::before {
  /* 通过before增加渐变背景实现遮罩，让文字默认看起来清晰一些 */
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #5f5d5dad, transparent);
}
.card:hover .photo::before {
  /* 缩小时隐藏 */
  display: none;
}

.photo img {
  /* 图片高宽均为100% */
  /* 然后按照cover缩放，裁切长边 */
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card:hover .photo {
  /* 鼠标移上变小 */
  width: 120px;
  height: 120px;
  top: 30px;
  border-radius: 50%;
  box-shadow: 0 0 20px #111;
}

h1 {
  font-size: 30px;
  color: #fff;
  position: absolute;
  top: 380px;
  transition: 0.5s;
}

.card:hover h1 {
  position: absolute;
  top: 170px;
}

h2 {
  margin-top: 220px;
  width: 80%;
  font-weight: normal;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--h2_border_color);
}

p {
  width: 90%;
  /* 段落缩进2个字符大小 */
  text-indent: 2em;
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 30px;
}

a {
  color: var(--font_color);
  text-decoration: none;
  padding: 12px 36px;
  border: 1px solid var(--a_border_color);
  border-radius: 8px;
}

a:hover {
  color: blue;
  background-color: var(--a_hover_background_color);
}
</style>
