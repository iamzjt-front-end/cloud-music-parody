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
      <!-- 标签栏 -->
      <van-tabs ref="tabs" scrollspy swipeable sticky animated @click="toggle">
        <van-tab v-for="(item, index) in videoTag" :title="item.name" :key="index" v-model="active"
                 title-style="font-size: 16px">
          <div class="loading" v-if="!videoList.length">
            <van-loading size="24px" color="#323233" text-color="#323233">加载中...</van-loading>
          </div>
          <div class="tag-content" v-if="videoList.length">
<!--            <scroll :data="{video: videoList}">-->
<!--              <div>-->

<!--              </div>-->
<!--            </scroll>-->
          </div>
        </van-tab>
      </van-tabs>
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
      active: 0,
      videoTag: [], // 视频标签
      videoList: [], // 视频列表
      recVideoList: [], // 推荐视频列表
    }
  },
  methods: {
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
      });
    },
    toggle(name) {
      this.videoList = [];
      this.videoListGet(this.videoTag[name].id);
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
  }
}
</style>