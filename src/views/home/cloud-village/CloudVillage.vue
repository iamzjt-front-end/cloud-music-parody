<template>
  <div id="cloud-village">
    <!-- 顶栏 -->
    <top-bar>
      <div class="settings" slot="left">
        <i class="iconfont icon-settings"></i>
        <!-- todo 点击进入设置 -->
      </div>
      <h1 slot="center">广场</h1>
    </top-bar>
    <div class="cloud-village-square">

    </div>
  </div>
</template>

<script>
import TopBar from "components/TopBar";

export default {
  name: "CloudVillage",
  components: {
    TopBar
  },
  data() {
    return {
      videoTag: [], // 视频标签
      videoList: [], // 视频列表
      recVideoList: [], // 推荐视频列表
    }
  },
  methods: {
    // 获取视频标签列表
    videoTagGet() {
      this.$api.cloudVillage.videoTagGet().then(res => {
        console.log(res)
      });
    },
    // 获取视频标签下的视频
    videoListGet() {
      this.$api.cloudVillage.videoListGet({
        // id: ''
      }).then(res => {
        console.log(res)
      });
    },
    // 获取推荐视频
    recVideoGet() {
      this.$api.cloudVillage.recVideoGet().then(res => {
        console.log(res)
      });
    },
    // 获取相关视频
    relatedVideoGet() {
      this.$api.cloudVillage.relatedVideoGet({
        // id: ''
      }).then(res => {
        console.log(res);
      })
    },
    // 获取视频详情
    videoDetailGet() {
      this.$api.cloudVillage.videoDetailGet({
        // id: ''
      }).then(res => {
        console.log(res);
      })
    },
    // 获取视频点赞转发评论数数据
    videoDetailInfoGet() {
      this.$api.cloudVillage.videoDetailInfoGet({
        // vid: ''
      }).then(res => {
        console.log(res);
      })
    },
  },
  mounted() {
    // this.videoTagGet();
    // this.videoListGet();
    // this.recVideoGet();
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/variable';

#cloud-village {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #fff;

  .top-bar {
    color: $color-text-ddd;

    .icon-settings {
      font-size: $font-size-xxxl;
    }

    h1 {
      line-height: 54px;
      font-size: 1.1rem;
    }
  }

  .cloud-village-square {
    position: fixed;
    top: 54px;
    right: 0;
    bottom: 50px;
    left: 0;
    width: 100%;
    background-color: #fafafa;
    overflow: hidden;
  }
}
</style>