<template>
  <div id="cloud-village">
    <!-- 顶栏 -->
    <top-bar @leftClick="toSetting">
      <div class="settings" slot="left">
        <i class="iconfont icon-settings"></i>
        <!-- todo 点击进入设置 -->
      </div>
      <h1 slot="center">广场</h1>
    </top-bar>
    <div class="cloud-village-square">
      <!-- 标签栏 -->
      <van-tabs ref="tabs" animated @click="toggle">
        <van-tab v-for="(item, index) in videoTag" :title="item.name" :key="index" v-model="active"
                 title-style="font-size: 16px">
          <div class="loading" v-if="!videoList.length">
            <van-loading size="24px" color="#323233" text-color="#323233">加载中...</van-loading>
          </div>
          <div class="tag-content" v-if="videoList.length">
            <scroll :data="{video: videoList}">
              <div class="video-card-wrapper">
                <video-card v-for="(item, index) in videoList" :key="index" :data="item.data"
                            @click.native="toPlay(item.data.vid)"/>
              </div>
            </scroll>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import TopBar from "components/TopBar";
import videoCard from "components/VideoCard";
import Scroll from "components/scroll/Scroll";
import { mapMutations } from 'vuex';

export default {
  name: "CloudVillage",
  components: {
    TopBar,
    videoCard,
    Scroll
  },
  data() {
    return {
      active: 0,
      videoTag: [], // 视频标签
      videoList: [], // 视频列表
      recVideoList: [], // 推荐视频列表
    }
  },
  methods: {
    ...mapMutations(['updatePlayingState']),
    // 获取视频标签列表
    videoTagGet() {
      return this.$api.cloudVillage.videoTagGet();
    },
    // 获取视频标签下的视频
    videoListGet(val) {
      this.$api.cloudVillage.videoListGet({
        id: val
      }).then(res => {
        this.videoList = res.data.datas;
        this.$bus.$emit('videoListUpt');
      });
    },
    // tab栏切换
    toggle(name) {
      this.videoList = [];
      this.videoListGet(this.videoTag[name].id);
    },
    // 去播放
    toPlay(val) {
      this.$bus.$emit('audioPause'); // 暂停音乐
      this.$router.push({
        name: 'video-play',
        params: {
          id: val,
        }
      });
    },
    // 去设置
    toSetting() {
      this.$bus.$emit('toSetting');
    }
  },
  created() {
    this.videoTagGet().then(res => {
      this.videoTag = res.data.data;
      this.videoListGet(this.videoTag[0].id);
    })
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
    .icon-settings {
      color: $color-text-ddd;
      font-size: $font-size-xxxl;
    }

    h1 {
      line-height: 54px;
      font-size: 1.1rem;
      color: #333334;
    }
  }

  .cloud-village-square {
    position: fixed;
    top: 54px;
    right: 0;
    bottom: 50px;
    left: 0;
    width: 100%;
    overflow: hidden;

    .loading {
      padding-top: 1rem;
      text-align: center;
    }

    .tag-content {
      width: 100vw;
      height: calc(100vh - 54px - 44px - 50px);
      background-color: #fff;

      .video-card-wrapper {
        padding: 10px 0 5px 0;
      }
    }
  }
}
</style>