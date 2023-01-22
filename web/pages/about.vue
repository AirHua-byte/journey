<template>
  <div class="container">
    <Headers
      v-if="refresh"
      :music="music"
      :sticky="true"
      :playMusic="true"
      title="嘿，你今天笑了么(≖ᴗ≖)✧"
    ></Headers>
    <div class="content" v-html="data.contentHtml"></div>
    <div class="contact">
      <div class="icon wechat">
        <div>
          <img
            src="https://assets.huabyte.com/blog/image/mood/WX20230122-222448%402x.png"
            alt=""
          />
        </div>
        <span><i class="iconfont icon-wechat"></i></span>
      </div>
      <div class="icon youxiang">
        <div>huabyte@qq.com</div>
        <span><i class="iconfont icon-youxiang"></i></span>
      </div>
      <a href="https://github.com/AirHua-byte" class="icon github">
        <div>我的github，可以的话来个star呀~</div>
        <span><i class="iconfont icon-github"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      title: false,
      music: 'https://assets.huabyte.com/blog/audio/if.mp3',
      refresh: true,
    };
  },
  head() {
    return {
      title: `Hello ${this.info.base.name}`,
    };
  },
  mounted() {
    if (this.info.page_music.about) {
      // this.music = this.info.page_music.about;
      this.refresh = false;
      this.$nextTick(() => (this.refresh = true));
    }
  },
  computed: {
    info() {
      return this.$store.state.data;
    },
  },
  async asyncData(context) {
    const { data } = await context.$axios.get('myself');
    // eslint-disable-next-line eqeqeq
    return { data: data.status == 1 ? data.body : '' };
  },
};
</script>

<style lang="scss" scoped>
.container {
  .content {
    width: 100%;
    max-width: 800px;
    margin: auto;
    padding: 100px 20px 50px;
    box-shadow: none !important;
    min-height: auto;
    transition: none;
    ::v-deep {
      h1,
      h2,
      h3,
      h4,
      h5 {
        border: 0;
        padding: 0;
        margin: 0 0 18px;
        line-height: 28px;
        transition: none;
        font-size: revert;
      }
      h1 {
        font-size: 32px;
        line-height: initial;
        margin-bottom: 22px;
      }
      p {
        line-height: 30px;
        margin: 0 0 18px;
        font-size: 16px;
        transition: none;
        * {
          font-size: 16px;
        }
        mark {
          padding: 0 4px;
          line-height: 22px;
          display: inline-block;
        }
      }
      blockquote {
        background: white;
        border-radius: 10px;
        padding-left: 22px;
        margin-bottom: 20px;
        p {
          margin: 10px 0;
        }
      }
      ul,
      ol {
        margin: 0 0 18px;
        padding-left: 20px;
        li {
          font-size: 16px;
          margin: 0 0 8px;
          line-height: 28px;
          list-style: none;
          position: relative;
          &:last-child {
            margin: 0;
          }
          &::before {
            content: '☼';
            font-size: 8px;
            position: absolute;
            top: 0px;
            left: -16px;
          }
        }
        ul {
          margin: 8px 0;
          li {
            margin: 0;
            font-size: 14px;
            color: #606060;
          }
        }
      }
      img {
        border-radius: 8px;
        transition: all 0.3s;
        &:hover {
          box-shadow: 0 2px 10px #a5a5a5;
        }
      }
      iframe {
        width: 100%;
        height: 450px;
        margin-bottom: 20px;
      }
      pre {
        padding: 0;
        font-size: 16px;
        max-height: 500px;
        overflow: hidden;
        border-radius: 4px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .content {
      ::v-deep {
        iframe {
          height: 310px;
        }
        blockquote {
          padding-left: 16px;
        }
        ol li,
        ul li,
        p,
        p * {
          font-size: 14px;
          line-height: 26px;
        }
        h1 {
          font-size: 24px;
        }
        ol,
        ul {
          padding-left: 16px;
          li,
          li {
            line-height: 22px;
            margin-bottom: 10px;
            &:after {
              transform: scale(0.9);
            }
          }
        }
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.contact {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 0px 20px 50px;
  display: flex;
}
.icon {
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #cacaca;
  border-radius: 50%;
  /* box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4); */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  margin-right: 18px;
  text-decoration: none;
}

.icon i {
  font-size: 20px;
  color: #ffffff;
}

.icon div {
  position: absolute;
  top: 0px;
  width: 192px;
  text-align: center;
  padding: 12px 0px;
  border-radius: 30px;
  color: #fff;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
  /* 默认隐藏 */
  opacity: 0;
  /* 知识点：贝塞尔曲线，让动画变得顺畅有节奏 */
  transition: 0.5s cubic-bezier(0.18, 1.09, 0.77, 1.33);
  /* 知识点：不响应鼠标事件 */
  pointer-events: none;
  img {
    width: 90%;
    border-radius: 8px;
    // height: 150px;
  }
}

/* 制作消息框的下方小三角 */

.icon div::before {
  /* 神奇的操作 */
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.icon.wechat div,
.icon.wechat div::before {
  background-color: #74afe6;
}

.icon.youxiang div,
.icon.youxiang div::before {
  background-color: #74afe6;
}

.icon.github div,
.icon.github div::before {
  background-color: #74afe6;
}

/* 按钮鼠标移入时变色 */
.icon.wechat:hover {
  background-color: lightgreen;
  color: #fff;
}

.icon.youxiang:hover {
  background-color: lightcoral;
  color: #fff;
}

.icon.github:hover {
  background-color: #080808;
  color: #fff;
}

.icon:hover div {
  opacity: 1;
}
.wechat:hover div {
  top: -220px;
}
.youxiang:hover div {
  top: -68px;
}
.github:hover div {
  top: -88px;
}
</style>
