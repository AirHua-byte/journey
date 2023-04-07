<template>
  <div class="container">
    <Headers title="研究成果" :sticky="true"></Headers>

    <div class="entry">
      <div class="part" v-for="(item, index) in gallery" :key="index">
        <ThreeBox></ThreeBox>
        <div @click="handleLink(index)" class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from '~/components/Header.vue';
import ThreeBox from '~/components/ThreeBox.vue';

const gallery = [
  {
    name: '平面展厅',
    link: '',
  },
  {
    name: '视频展厅',
    link: '',
  },
  {
    name: '音频展厅',
    link: '',
  },
];

export default {
  components: { Headers, ThreeBox },
  data() {
    return {
      gallery,
    };
  },
  methods: {
    handleLink(index) {
      location.href = gallery[index].link;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
.entry {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url('https://user-images.githubusercontent.com/26748614/96337246-f14d4580-1085-11eb-8793-a86d929e034d.jpg');
  background-size: cover;
  backdrop-filter: brightness(50%);
  display: flex;
  justify-content: center;
  // align-items: center;
  .part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 24px;
      font-weight: bold;
      color: aliceblue;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: aqua;
      }
    }
  }
}
</style>
