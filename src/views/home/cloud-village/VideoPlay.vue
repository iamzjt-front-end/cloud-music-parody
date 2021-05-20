<template>
  <div id="video-play">
    <!-- 顶栏 -->
    <top-bar @leftClick="back">
      <i class="iconfont icon-back" slot="left"></i>
    </top-bar>
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                  :options="playerOptions" v-if="this.url">
    </video-player>
    <div class="loading" v-if="!this.url">
      <van-loading size="36px" color="#fff" text-color="#323233"></van-loading>
    </div>
  </div>
</template>

<script>
import {videoPlayer} from 'vue-video-player';
import 'video.js/dist/video-js.css';
import TopBar from "components/TopBar";

export default {
  name: "VideoPlay",
  data() {
    return {
      url: '', // 视频url
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    playerOptions() {
      return {
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '9:16', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: this.url, // url地址
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false
      }
    },
  },
  components: {
    videoPlayer,
    TopBar
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1);
    },
    // 获取视频url
    videoUrlGet(val) {
      let that = this;
      this.$api.cloudVillage.videoUrlGet({
        id: val
      }).then(res => {
        that.url = res.data.urls[0].url;
      })
    },
    // 获取推荐视频
    //recVideoGet() {
    //  this.$api.cloudVillage.recVideoGet().then(res => {
    //    console.log(res)
    //  });
    //},
    // 获取相关视频
    //relatedVideoGet() {
    //  this.$api.cloudVillage.relatedVideoGet({
    //     id: ''
    //  }).then(res => {
    //    console.log(res);
    //  })
    //},
    // 获取视频详情
    //videoDetailGet() {
    //  this.$api.cloudVillage.videoDetailGet({
    //     id: ''
    //  }).then(res => {
    //    console.log(res);
    //  })
    //},
    // 获取视频点赞转发评论数数据
    //videoDetailInfoGet(val) {
    //  this.$api.cloudVillage.videoDetailInfoGet({
    //    vid: val
    //  }).then(res => {
    //    console.log(res);
    //  })
    //},
  },
  created() {
    this.videoUrlGet(this.id);
  }
}
</script>

<style lang="scss" scoped>
#video-play {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
  width: 100%;
  height: 100%;
  z-index: 100;

  .top-bar {
    background-color: transparent !important;
    color: #fff;
    z-index: 101;

    .icon-back {
      font-size: 1.1rem;
    }
  }

  .video-player {
    width: 100vw;
    height: calc(666.66 / 375 * 100vw);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    .vjs-big-play-button {
      display: none;
    }
  }

  .loading {
    width: 2rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>