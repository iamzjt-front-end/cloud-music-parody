<template>
  <div id="rec-list">
    <!-- 顶栏 -->
    <top-bar>
      <i class="iconfont icon-back" slot="left" @click="backToHome"></i>
      <h1 slot="center">歌单</h1>
      <i class="iconfont icon-more" slot="right"></i>
    </top-bar>
    <!-- 主图 -->
    <div class="main-img" :style="{backgroundImage:`url(${mainImgUrl})`}">
      <div class="main-img-left">

      </div>
      <div class="main-img-right">

      </div>
    </div>
    <!-- 播放全部 -->
    <div class="play-all">
      <i class="iconfont icon-play-all" slot="left"></i>
      <span class="play-text">播放全部</span>
      <p class="play-length">{{ '(' + ')' }}</p>
    </div>

  </div>
</template>

<script>
import TopBar from "components/TopBar";

export default {
  name: "RecList",
  components: {
    TopBar,
  },
  computed: {
    mainImgUrl() {
      return this.$route.params.imgUrl;
    }
  },
  methods: {
    // 返回主页
    backToHome() {
      this.$router.push({path: '/found'});
    },
    // 推荐歌单获取
    recListGet() {
      this.$api.found.recListQry({
        id: this.$route.params.id, // 歌单 id
      }).then(res => {
        console.log(res.data);
      })
    },
  },
  created() {
    this.recListGet();
  }
}
</script>

<style lang="scss" scoped>
#rec-list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: #fff;

  .top-bar {
    box-shadow: none;
    color: #fff;
    background-color: transparent;
    position: relative;
    z-index: 81;

    .center {
      h1 {
        line-height: 54px;
      }
    }

    .icon-back {
      font-size: 1.1rem;
    }

    h1 {
      font-size: 1.1rem;
    }

    .icon-more {
      font-size: 1.5rem;
    }
  }

  .main-img {
    width: 100%;
    height: 28vh;
    margin-top: -54px;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    z-index: 80;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      backdrop-filter: blur(66px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .play-all {
    width: 100%;
    height: 3.4rem;
    background-color: #fff;
    display: flex;
    position: relative;
    z-index: 80;

    .icon-play-all {
      height: 100%;
      padding: 0 0.3rem 0 0.7rem;
      color: #323537;
      font-size: 1.1rem;
      text-align: center;
      line-height: 3.4rem;
    }

    .play-text {
      height: 100%;
      padding: 0 0.1rem;
      color: #333334;
      font-size: 1.05rem;
      line-height: 3.4rem;
    }

    .play-length {
      width: 2rem;
      height: 100%;
      color: #999999;
      font-size: 0.8rem;
      padding: 1.5rem 0 0 0.2rem;
    }
  }
}
</style>