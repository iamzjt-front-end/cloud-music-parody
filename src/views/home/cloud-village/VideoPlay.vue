<template>
  <div id="video-play">
    <!-- 顶栏 -->
    <top-bar @leftClick="back">
      <i class="iconfont icon-back" slot="left"></i>
    </top-bar>
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                  :options="playerOptions" v-show="this.url">
    </video-player>
    <div class="loading" v-show="!this.url">
      <van-loading size="36px" color="#fff" text-color="#323233"></van-loading>
    </div>
    <div class="operation-bar">
      <div class="operdation-bar-item">
        <i class="iconfont icon-dianzan"></i>
        <span>{{ likedCount }}</span>
      </div>
      <div class="operdation-bar-item">
        <i class="iconfont icon-pinglun1"></i>
        <span>{{ commentCount }}</span>
      </div>
      <div class="operdation-bar-item">
        <i class="iconfont icon-zhuanfa"></i>
        <span>{{ shareCount }}</span>
      </div>
      <div class="operdation-bar-item">
        <i class="iconfont icon-shoucang1"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="creator-box">
      <div class="creator-avatar">
        <img :src="avatarUrl" v-show="avatarUrl">
      </div>
      <div class="nickName">{{ nickname }}</div>
      <div class="title">{{ title }}</div>
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
      likedCount: '', // 点赞数
      commentCount: '', // 评论数
      shareCount: '', // 转发数
      avatarUrl: '', // 头像
      identityIconUrl: '', // 头像边上的星
      nickname: '', // 作者昵称
      title: '', // 标题
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
      this.$api.cloudVillage.videoUrlGet({
        id: val
      }).then(res => {
        this.url = res.data.urls[0].url;
      })
    },
    // 获取视频点赞转发评论数数据
    videoDetailInfoGet(val) {
      this.$api.cloudVillage.videoDetailInfoGet({
        vid: val
      }).then(res => {
        if (res.data.likedCount >= 10000) {
          this.handledData = (res.data.likedCount / 10000).toFixed(1); // 处理过的数据
          this.decimalPart = this.handledData.split('.')[1]; // 小数部分
          if (this.decimalPart == '0') {
            this.likedCount = this.handledData.substring(0, this.handledData.length - 2) + '万';
          } else {
            this.likedCount = this.handledData + '万';
          }
        } else {
          this.likedCount = res.data.likedCount;
        }
        this.commentCount = res.data.commentCount;
        this.shareCount = res.data.shareCount;
      })
    },
    // 获取视频详情
    videoDetailGet(val) {
      this.$api.cloudVillage.videoDetailGet({
        id: val
      }).then(res => {
        let videoInfo = res.data.data;
        this.avatarUrl = videoInfo.creator.avatarUrl; // 头像
        if (videoInfo.creator.avatarDetail) {
          this.identityIconUrl = videoInfo.creator.avatarDetail.identityIconUrl; // 头像边上的星
        }
        this.nickname = videoInfo.creator.nickname; // 作者昵称
        this.title = videoInfo.title; // 描述
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
  },
  created() {
    this.videoUrlGet(this.id);
    this.videoDetailGet(this.id);
    this.videoDetailInfoGet(this.id);
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/mixin";

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
    top: 45%;
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
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .operation-bar {
    width: 3rem;
    height: 14.6rem;
    position: absolute;
    right: 0.3rem;
    bottom: 2.2rem;

    .operdation-bar-item {
      width: 3rem;
      height: 3.65rem;

      .iconfont {
        color: #fff;
        font-size: 1.35rem;
        display: flex;
        width: 3rem;
        height: 1.5rem;
        justify-content: center;
        align-items: center;
      }

      span {
        display: inline-block;
        width: 3rem;
        height: 2.15rem;
        font-size: 0.75rem;
        text-align: center;
        opacity: 0.8;
      }
    }
  }

  .creator-box {
    width: 55vw;
    height: 6rem;
    position: absolute;
    left: 1rem;
    bottom: 4.2rem;
    display: flex;
    flex-wrap: wrap;

    .creator-avatar {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      overflow: hidden;
      background-color: #ccc;
      border: 2px solid #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .nickName {
      display: inline-block;
      width: calc(55vw - 3rem);
      height: 2.5rem;
      line-height: 2.5rem;
      padding-left: 8px;
      color: #fff;
      font-size: 0.95rem;
    }

    .title {
      width: 100%;
      height: 2.4rem;
      margin-top: 1.1rem;
      color: #fff;
      opacity: 0.85;
      line-height: 1.2rem;
      font-size: 0.85rem;
      @include multi-line-ellipsis(2);
    }
  }

  //
  //::v-deep .vjs-big-play-button {
  //  border: 0;
  //  background-color: transparent;
  //
  //  ::v-deep .vjs-icon-placeholder {
  //    ::v-deep &::before {
  //      font-size: 88px;
  //    }
  //  }
  //}
}
</style>