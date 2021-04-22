<template>
  <div id="song-list-square">
    <!-- 顶栏 -->
    <top-bar>
      <i class="iconfont icon-back" slot="left" @click="backToHome"></i>
      <h1 slot="center">歌单广场</h1>
    </top-bar>
    <!-- 标签栏 -->
    <van-tabs scrollspy swipeable sticky animated @click="toggle">
      <van-tab v-for="(item, index) in tagList" :title="item.name" :key="index"
               title-style="font-size: 16px">
        <div class="loading" v-if="!highList.length">
          <van-loading size="24px" color="#323233" text-color="#323233">加载中...</van-loading>
        </div>
        <div class="tag-content" v-if="highList.length">
          <scroll :data="highList">
            <div>
              <song-list-item v-for="(item1, index1) in highList" :key="index1">
                <img :src="item1.coverImgUrl" slot="img" @load="load">
                <p slot="description">{{ item1.description }}</p>
              </song-list-item>
            </div>
          </scroll>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TopBar from "components/TopBar";
import SongListItem from "components/SongListItem";
import Scroll from "components/scroll/Scroll";

export default {
  name: "SongListSquare",
  components: {
    TopBar,
    SongListItem,
    Scroll
  },
  data() {
    return {
      tagList: [], // 歌单标签列表
      highList: [], // 精品歌单列表
    }
  },
  methods: {
    // 返回主页
    backToHome() {
      this.$router.push({path: '/found'});
    },
    // 精品歌单标签列表获取
    playListTagsGet() {
      return this.$api.found.playListTagsQry();
    },
    // 获取精品歌单获取
    highListGet(val, updateTime) {
      this.$api.found.highListQry({
        cat: val,
        limit: 18,
        before: updateTime ? updateTime : null,
      }).then(res => {
        this.highList = res.data.playlists;
      })
      // cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
      // limit: 取出歌单数量 , 默认为 20
      // before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
    },
    toggle(name, title) {
      this.highList = [];
      this.highListGet(title);
    },
    load() {
      if (!this.loading) {
        this.loading = true;
      }
    }
  },
  mounted() {
    this.playListTagsGet().then(res => {
      this.tagList = res.data.tags;
      this.highListGet(this.tagList[0].name);
    });
  }
}
</script>

<style lang="scss" scoped>
#song-list-square {
  .top-bar {
    box-shadow: none;
    color: #323233;
    background-color: transparent;
    position: relative;
    z-index: 81;

    h1 {
      line-height: 54px;
      font-size: 1.1rem;
    }

    .icon-back {
      font-size: 1.1rem;
    }
  }

  .tag {
    font-size: 2rem;
  }

  .loading {
    padding-top: 1rem;
    text-align: center;
  }

  .tag-content {
    width: 100vw;
    height: calc(100vh - 59px - 54px);
    background-color: #fff;
    padding: 0 calc((100vw - 22.2rem) / 2);
  }
}
</style>