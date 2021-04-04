<template>
  <div id="home">
    <!-- 顶栏 -->
    <top-bar>
      <div class="settings" slot="left">
        <i class="iconfont icon-settings"></i>
        <!-- todo 点击进入设置 -->
      </div>
      <div class="search" slot="center">
        <form action="/">
          <van-search
              v-model="value"
              shape="round"
              input-align="center"
              placeholder="请输入搜索关键词"
              background="#fff"
              @search="onSearch"
          />
        </form>
      </div>
      <div class="distinguish" slot="right">
        <i class="iconfont icon-distinguish"></i>
        <!-- todo 听歌识曲功能 -->
      </div>
    </top-bar>
    <!-- 内容区 -->
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
      <!-- 播放器 -->
      <player></player>
    </div>
    <!-- tab栏 -->
    <tab-bar/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import Player from "@/components/Player";
import TabBar from "@/components/TabBar";
import {Toast} from "vant";

export default {
  name: "Home",
  components: {
    TopBar,
    TabBar,
    Player
  },
  data() {
    return {
      value: '',
      images: [],
      imgHeight: window.innerWidth * 193 / 522,
      recSongList: [], // 推荐歌单列表
      chartsList: [], // 排行榜歌单列表
    }
  },
  methods: {
    onSearch(val) {
      // todo 搜索功能
      Toast(val);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable';

.top-bar {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;

  .icon-settings, .icon-distinguish {
    color: $color-text-ddd;
    font-size: $font-size-xxxl;
  }
}

.content {
  width: 100%;
  height: 100%;
  margin-top: 54px;
}
</style>