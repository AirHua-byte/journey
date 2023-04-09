<template>
  <div class="container">
    <Headers title="研究成果" :sticky="true"></Headers>

    <div class="entry" v-show="showLoading">
      <!-- <div class="part" v-for="(item, index) in gallery" :key="index"> -->
      <ThreeBox></ThreeBox>
      <div class="title">Loading...</div>
      <!-- <div @click="handleLink(index)" class="title">{{ item.name }}</div>
      </div> -->
    </div>
    <div class="iframe" v-show="!showLoading">
      <iframe
        width="100%"
        height="100%"
        src="http://localhost:5173/#/gallery"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Headers from '~/components/Header.vue';
import ThreeBox from '~/components/ThreeBox.vue';

const gallery = [
  {
    name: '平面展厅',
    link: 'http://localhost:5173/#/gallery',
  },
  {
    name: '视频展厅',
    link: 'http://localhost:5173/#/gallery',
  },
  {
    name: '音频展厅',
    link: 'http://localhost:5173/#/gallery',
  },
];

export default {
  components: { Headers, ThreeBox },
  data() {
    return {
      gallery,
      showLoading: true,
    };
  },
  mounted() {
    // window.addEventListener('message', (event) => {
    //   if (event.origin === 'http://localhost:5173') {
    //     setTimeout(() => {
    //       this.showLoading = false;
    //     }, 2000);
    //   }
    // });

    setTimeout(() => {
      this.showLoading = false;
    }, 10000);
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
  width: 100vw;
  height: 100vh;
  .iframe {
    position: fixed;
    width: 100%;
    height: 100%;
  }
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
  cursor: pointer;

  // align-items: center;

  // .part {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  .title {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: aqua;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  // }
}
</style>
